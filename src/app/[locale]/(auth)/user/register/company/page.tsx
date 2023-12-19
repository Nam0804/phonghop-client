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
    { id: 1, title: 'Company Information', fields:['company_name','company_domain','company_address','company_taxcode'] },
    { id: 2, title: 'Manager Information',fields:['mng_name','mng_title','mng_email','mng_phone','password','confirmation_password'] },
]

type Inputs = z.infer<typeof FormDataSchema>;

export default function RegisterNewCompany() {
    const [currentStep, setCurrentStep] = useState(1);

    const { register, handleSubmit, watch, reset, trigger, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema)
    });


    const processForm: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        // api call here
        reset()
    }

    // Next and Prev Step
    type FieldName = keyof Inputs;
    const nextStep = async() => {

        const fields = steps[currentStep].fields;
        const output = await trigger(fields as FieldName[], { shouldFocus: true });
        console.log(output);
        if(!output) return;
        if(currentStep ==1){
            setCurrentStep(2);

        }

        if (currentStep == 2) {
            // if(currentStep === steps.length - 1){
               
            // }
            await handleSubmit(processForm)();
        }
    }
    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(1);
        }
    }

    console.log(currentStep);



    return (
        <DefaultLoginLayout>
            {currentStep === 1 && (
                    <>
                        <form className={`${styles.content} w-75`} onSubmit={handleSubmit(processForm)}>
                            <h3>Register New Account</h3>
                            <p>Please input your information</p>
                            <div className={styles.input}>
                                <img src="/company.svg" alt="" className={styles.icon} />
                                <input type="text" placeholder="Company Name*" {...register('company_name')} className={styles.inputsection} />  
                            </div>
                            {errors.company_name &&(
                                        <p className="mt-2 text-danger">
                                            {errors.company_name.message}
                                        </p>
                                    )}
                            <div className={styles.input}>
                                <img src="/domain.svg" alt="" className={styles.icon} />
                                <input type="text"  {...register('company_domain')}  placeholder="Company Domain*" className={styles.inputsection} />
                            </div>
                            {errors.company_domain &&(
                                        <p className="mt-2 text-danger">
                                            {errors.company_domain.message}
                                        </p>
                                    )}
                            <div className={styles.input}>
                                <img src="/address.svg" alt="" className={styles.icon} />
                                <input type="text" {...register('company_address')} placeholder="Company Address*" className={styles.inputsection} />
                            </div>
                            {errors.company_address &&(
                                        <p className="mt-2 text-danger">
                                            {errors.company_address.message}
                                        </p>
                                    )}
                            <div className={styles.input}>
                                <img src="/tax-code.svg" alt="" className={styles.icon} />
                                <input type="text" {...register('company_taxcode')} placeholder="Tax Code" className={styles.inputsection} />
                            </div>
                            {errors.company_taxcode &&(
                                        <p className="mt-2 text-danger">
                                            {errors.company_taxcode.message}
                                        </p>
                                    )}
                            <div className='w-100 text-end pt-5'>
                                <Button className={`${styles.nextBtn}`} onClick={nextStep}>NEXT</Button>
                            </div>
                        </form>

                        <div className={`${styles.progressbar} mb-3`}>
                            <div className={styles.halfColor}></div>
                        </div>

                    </>

            )}
            {currentStep === 2 && (
                <>
                    <div className={styles.content}>
                        <h3>Register Company Account</h3>
                        <p>Please input your company manager information.</p>
                        <div className={styles.input}>
                            <img src="/userlogin.svg" alt="" className={styles.icon} />
                            <input type="text" name="mng_name" placeholder="Manager Name*" className={styles.inputsection} />
                        </div>
                        <div className={styles.input}>
                            <img src="/title.svg" alt="" className={styles.icon} />
                            <input type="text" name="title" placeholder="Manager Title*" className={styles.inputsection} />
                        </div>
                        <div className={styles.input}>
                            <img src="/mail.svg" alt="" className={styles.icon} />
                            <input type="text" name="email" placeholder="Manager Email*" className={styles.inputsection} />
                        </div>
                        <div className={styles.input}>
                            <img src="/phone.svg" alt="" className={styles.icon} />
                            <input type="text" name="username" placeholder="Manager Phone" className={styles.inputsection} />
                        </div>
                        <div className={styles.input}>
                            <img src="/pass.svg" alt="" className={styles.icon} />
                            <input type="password" name="password" placeholder="Password*" className={styles.inputsection} />
                            <img src="/eyeshide.svg" alt="" className={styles.showhide} />
                        </div>
                        <div className={styles.input}>
                            <img src="/pass.svg" alt="" className={styles.icon} />
                            <input type="password" name="confirmpassword" placeholder="Confirm Password*" className={styles.inputsection} />
                            <img src="/eyeshide.svg" alt="" className={styles.showhide} />
                        </div>
                    </div>
                    <div className='w-75 d-flex justify-content-between pt-5'>
                        <Button className={styles.createBtn}>CREATE ACCOUNT</Button>
                        <Button className={styles.cancelbtn}>CANCEL</Button>
                    </div>
                    <div className={`${styles.progressbar} mb-3`}>
                        <div className={styles.halfColorEnd}></div>
                    </div>

                </>
            )}
        </DefaultLoginLayout>
    );
};
