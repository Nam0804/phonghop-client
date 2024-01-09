'use client'
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/css/CompanyRegister.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Button from '@/constants/Form/Button';
import axios, { AxiosError } from 'axios';
import { FormDataSchema } from '@/lib/schema';
import { useForm, SubmitHandler, Field, FieldName } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from "@/constants/Modal/ViewModal";
import { get } from 'lodash';
import api from '@/axiosService';

const steps = [
    {},
    { id: 1, title: 'Company Information', fields: ['company_name', 'company_domain', 'company_address', 'company_taxcode'] },
    { id: 2, title: 'Manager Information', fields: ['mng_name', 'mng_title', 'mng_email', 'mng_phone', 'password', 'confirmation_password'] },
]

interface ErrorResponse {
    data?: {
        errors?: Record<string, string[]>;
    };
}

type Inputs = z.infer<typeof FormDataSchema>;

export default function RegisterNewCompany() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const [isRePasswordVisible, setRePasswordVisibility] = useState(false);
    const [apiData, setApiData] = useState(null);


    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const togglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    };
    const toggleRePasswordVisibility = () => {
        setRePasswordVisibility(!isRePasswordVisible);
    };
    const { register, handleSubmit, watch, reset, trigger, clearErrors, setError, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema)
    });



    const processForm: SubmitHandler<Inputs> = data => {
        clearErrors();
        api.post('user/register/company', data).then(response => {

            if (response?.data?.errors) {
                const errorResponse = response?.data?.errors;
                Object.keys(errorResponse).forEach((key) => {
                    setError(key as FieldName, {
                        type: 'manual',
                        message: errorResponse[key][0]
                    })
                })
                console.log(errors);
            }
            if (response?.status == 200) {
                setIsModalOpen(true);
            }
        })
            .catch((error: AxiosError) => {
                console.error('Error in API request:', error);

                if (error.response?.status === 422) {
                    // const errorResponse = error.response?.data?.errors;
                    const errorResponse = get(error, 'response.data.errors');

                    if (errorResponse) {
                        Object.keys(errorResponse).forEach((key) => {
                            setError(key as FieldName, {
                                type: 'manual',
                                message: errorResponse[key][0]
                            });
                        });
                    }
                }

                console.log(errors);
                return error;
            });


    }
    // Next and Prev Step
    type FieldName = keyof Inputs;
    const nextStep = async () => {
        const fields = steps[currentStep].fields;

        if (currentStep == 1) {
            const output = await trigger(fields as FieldName[], { shouldFocus: true });
            if (!output) {
                return;
            }
            else {
                clearErrors();
                setCurrentStep(2);
            }
        }

        if (currentStep == 2) {
            clearErrors();
            const output = await trigger(fields as FieldName[], { shouldFocus: true });
            if (!output) {
                return;
            }
            else {
                await handleSubmit(processForm)()
            };
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(1);
        }
    }
    return (
        <>
            <form className={`${styles.content} w-75`} onSubmit={handleSubmit(processForm)}>
                {currentStep == 1 && (
                    <>
                        <h3>Register New Account</h3>
                        <p className={styles.subContent}>Please input your information</p>
                        <div className={styles.input}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 28 24" fill="none" className={styles.icon}>
                            <path d="M22 16H19.3333V18.6667H22M22 10.6667H19.3333V13.3333H22M24.6667 21.3333H14V18.6667H16.6667V16H14V13.3333H16.6667V10.6667H14V8H24.6667M11.3333 5.33333H8.66667V2.66667H11.3333M11.3333 10.6667H8.66667V8H11.3333M11.3333 16H8.66667V13.3333H11.3333M11.3333 21.3333H8.66667V18.6667H11.3333M6 5.33333H3.33334V2.66667H6M6 10.6667H3.33334V8H6M6 16H3.33334V13.3333H6M6 21.3333H3.33334V18.6667H6M14 5.33333V0H0.666672V24H27.3333V5.33333H14Z" fill="#5D5D5D"/>
                        </svg>
                            <input type="text" placeholder="Company Name*" {...register('company_name')} className={styles.inputsection} />
                        </div>
                        {errors.company_name && (
                            <p className={styles.errorMessage}>
                                {errors.company_name.message}
                            </p>
                        )}
                        <div className={styles.input}>
                            <img src="/domain.svg" alt="" className={styles.icon} />
                            <input type="text"  {...register('company_domain')} placeholder="Company Domain*" className={styles.inputsection} />
                        </div>
                        {errors.company_domain && (
                            <p className={styles.errorMessage}>
                                {errors.company_domain.message}
                            </p>
                        )}
                        <div className={styles.input}>
                            <img src="/address.svg" alt="" className={styles.icon} />
                            <input type="text" {...register('company_address')} placeholder="Company Address*" className={styles.inputsection} />
                        </div>
                        {errors.company_address && (
                            <p className={styles.errorMessage}>
                                {errors.company_address.message}
                            </p>
                        )}
                        <div className={styles.input}>
                            <img src="/tax-code.svg" alt="" className={styles.icon} />
                            <input type="text" {...register('company_taxcode')} placeholder="Tax Code" className={styles.inputsection} />
                        </div>
                        {errors.company_taxcode && (
                            <p className={styles.errorMessage}>
                                {errors.company_taxcode.message}
                            </p>
                        )}
                        <div className={`text-end pt-5 ${styles.w90}`}>
                            <button className={`${styles.nextBtn}`} onClick={nextStep}>Next</button>
                        </div>


                        <div className={`${styles.progressbar} mb-3`}>
                            <div className={styles.halfColor}></div>
                        </div>

                    </>

                )}
                {currentStep == 2 && (
                    <>
                        <div className={styles.content}>
                            <h3>Register Company Account</h3>
                            <p className={styles.subContent}>Please input your company manager information.</p>
                            <div className={styles.input}>
                                <img src="/userlogin.svg" alt="" className={styles.icon} />
                                <input type="text"  {...register('name')} placeholder="Manager Name*" className={styles.inputsection} />
                            </div>
                            {errors.name && (
                                <p className={styles.errorMessage}>
                                    {errors.name.message}
                                </p>
                            )}
                            <div className={styles.input}>
                                <img src="/title.svg" alt="" className={styles.icon} />
                                <input type="text"  {...register('title')} placeholder="Manager Title*" className={styles.inputsection} />
                            </div>
                            {errors.title && (
                                <p className={styles.errorMessage}>
                                    {errors.title.message}
                                </p>
                            )}
                            <div className={styles.input}>
                                <img src="/mail.svg" alt="" className={styles.icon} />
                                <input type="text" {...register('email')} placeholder="Manager Email*" className={styles.inputsection} />
                            </div>
                            {errors.email && (
                                <p className={styles.errorMessage}>
                                    {errors.email.message}
                                </p>
                            )}
                            <div className={styles.input}>
                                <img src="/phone.svg" alt="" className={styles.icon} />
                                <input type="text" {...register('phone')} placeholder="Manager Phone" className={styles.inputsection} />
                            </div>
                            {errors.phone && (
                                <p className={styles.errorMessage}>
                                    {errors.phone.message}
                                </p>
                            )}
                            <div className={styles.input}>
                                <img src="/pass.svg" alt="" className={styles.icon} />
                                <input type={isPasswordVisible ? 'text' : 'password'} {...register('password')} placeholder="Password*" className={styles.inputsection} />
                                <div className={styles.showhide} onClick={togglePasswordVisibility}>
                                    {isPasswordVisible ? <img src="/eyeshow.svg" alt="" className={styles.showhide} /> : <img src="/eyeshide.svg" alt="" className={styles.showhide} />}
                                </div>
                            </div>
                            {errors.password && (
                                <p className={styles.errorMessage}>
                                    {errors.password.message}
                                </p>
                            )}
                            <div className={styles.input}>
                                <img src="/pass.svg" alt="" className={styles.icon} />
                                <input type={isRePasswordVisible ? 'text' : 'password'} {...register('password_confirmation')} placeholder="Confirm Password*" className={styles.inputsection} />
                                <div className={styles.showhide} onClick={toggleRePasswordVisibility}>
                                    {isRePasswordVisible ? <img src="/eyeshow.svg" alt="" className={styles.showhide} /> : <img src="/eyeshide.svg" alt="" className={styles.showhide} />}
                                </div>
                            </div>
                            {(errors.password_confirmation) && (
                                <p className={styles.errorMessage}>
                                    {errors.password_confirmation.message}
                                </p>
                            )}
                        </div>
                        <div className=' d-flex justify-content-between pt-5'>
                            <Button className={styles.createBtn} onClick={nextStep}>CREATE ACCOUNT</Button>
                            <Button className={styles.cancelbtn} onClick={prevStep}>CANCEL</Button>
                        </div>
                        <div className={`${styles.progressbar} mb-3`}>
                            <div className={styles.halfColorEnd}></div>
                        </div>

                    </>
                )}
            </form>
            {isModalOpen && (
                <Modal title="Register Successfully!" onClose={closeModal} >
                    {
                        <>
                            <div className='text-center'>
                                <p className={styles.popupInfo}>Your account is successfully registered.</p>
                                <p className={styles.popupInfo}>Kindly check your email for confirmation letter!</p>
                            </div>
                            <div className='d-flex justify-content-center mt-4'>
                                <Link href="/login" >
                                    <button className={`${styles.loginbtn}`}>LOGIN</button>
                                </Link>
                            </div>

                        </>
                    }
                </Modal>)}

        </>
    );
};
