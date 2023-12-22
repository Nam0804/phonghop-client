'use client'
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '@/constants/Form/Input';
import styles from '@/css/CompanyRegister.module.css';
import DefaultLoginLayout from '@/layouts/User/DefaultLoginLayout';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import Link from 'next/link';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Button from '@/constants/Form/Button';
import axios from 'axios';
import { FormDataSchema } from '@/lib/schema';
import { useForm, SubmitHandler, Field, FieldName } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const steps = [
    {},
    { id: 1, title: 'Company Information', fields: ['company_name', 'company_domain', 'company_address', 'company_taxcode'] },
    { id: 2, title: 'Manager Information', fields: ['mng_name', 'mng_title', 'mng_email', 'mng_phone', 'password', 'confirmation_password'] },
]

type Inputs = z.infer<typeof FormDataSchema>;

export default function RegisterNewCompany() {

    const [currentStep, setCurrentStep] = useState(1);
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const [isRePasswordVisible, setRePasswordVisibility] = useState(false);


    const togglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    };
    const toggleRePasswordVisibility = () => {
        setRePasswordVisibility(!isRePasswordVisible);
    };
    const { register, handleSubmit, watch, reset, trigger, clearErrors, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema)
    });


    const processForm: SubmitHandler<Inputs> = data => {
        clearErrors();
        axios.post('http://localhost:8000/api/user/register/company', data).then(response => {
            console.log(response);
            if (response?.status == 200) {
                setCurrentStep(3);
            }
        })
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
            else{
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
                await handleSubmit(processForm)()};
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(1);
        }
    }
    return (
        <DefaultLoginLayout>
            <form className={`${styles.content} w-75`} onSubmit={handleSubmit(processForm)}>
                {currentStep == 1 && (
                    <>
                        <h3>Register New Account</h3>
                        <p className={styles.subContent}>Please input your information</p>
                        <div className={styles.input}>
                            <img src="/company.svg" alt="" className={styles.icon} />
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
                            {/* <Button className={`${styles.nextBtn}`} onClick={nextStep}>NEXT</Button> */}
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
                                <div className={styles.showhide}  onClick={togglePasswordVisibility}>
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
                                <div className={styles.showhide}  onClick={toggleRePasswordVisibility}>
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
            {currentStep == 3 && (
                <div className={styles.content}>
                    <h3>Register Company Account</h3>
                    <p className={styles.subContent}>Please check your email to verify your account.</p>
                    <div className=' d-flex justify-content-between pt-5'>
                        <Link href='/'>
                            <Button className={styles.createBtn}>BACK TO HOME</Button>
                        </Link>
                    </div>
                </div>
            )}

        </DefaultLoginLayout>
    );
};
