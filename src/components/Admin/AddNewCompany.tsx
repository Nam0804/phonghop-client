import React, {useEffect, useState} from 'react';
import {Modal, message,Input} from 'antd';
import Button from "@/constants/Form/Button";
import styles from '/src/css/AddUser.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '@/axiosService';
import customstyle from '@/css/CompanyList.module.css'
import {Form as Form2} from 'antd'

const AddNewCompany = ({ onAddSuccess }:any) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form2.useForm();
    const [formCompleted, setFormCompleted] = useState(false)


    const showPopup = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setVisible(false);
    };

    function handleSubmit() {
        form.validateFields()
            .then(async (values) => {
                try {
                    const password = Math.random().toString(36);
                    values = {
                        ...form.getFieldsValue(),
                        password: password,
                        password_confirmation: password,
                    }
                    const data = await api.post(`user/register/company`,values)
                    if (data.status == 200) {
                        message.success('User created successfully');
                        form.resetFields();
                        setVisible(false);
                        if (onAddSuccess) {
                            onAddSuccess();
                        }
                    } else {
                        message.error('Failed to create user');
                        form.resetFields();
                        setVisible(false);
                        if (onAddSuccess) {
                            onAddSuccess();
                        }
                    }
                } catch (e) {
                    console.error('Error creating user:', e);
                    message.error('Failed to create user');
                    console.log(values)
                }
            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    }

    return (
        <>
            <button key="add" className={customstyle.addbtn} onClick={showPopup}>ADD NEW COMPANY</button>
            <Modal
                title={
                    <div className={styles.formTitle}>Add New Company</div>
                }
                open={visible}
                onCancel={handleCancel}
                footer={null}
                closable={false}
                width={973}
            >
                <Form2
                    form={form}
                    name="Add new company"
                    requiredMark={false}
                    onValuesChange={(changedValues, allValues) => {
                        const isFormCompleted = Object.values(allValues).every(value => value !== undefined && value !== '');
                        setFormCompleted(isFormCompleted);
                      }}
                >
                    <p className={styles.toplabel}>Company Information</p>
                    <div className={styles.formControl}>
                        <Form2.Item
                            label={<span className={styles.label}>Name*</span>}
                            name="company_name"
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <span className={styles.errorMessage}>
                                            This field is required!
                                        </span>
                                    ),
                                },
                            ]}
                            style={{width: '100%'}}
                        >
                            <Input type='text' className={styles.Input}/>
                        </Form2.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form2.Item
                            label={<span className={styles.label}>Address*</span>}
                            name="company_address"
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <span className={styles.errorMessage}>
                                            This field is required!
                                        </span>
                                    ),
                                },
                            ]}
                            style={{width: '100%'}}
                        >
                            <Input type='text' className={styles.Input}/>
                        </Form2.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form2.Item
                            label={<span className={styles.label}>Domain*</span>}
                            name="company_domain"
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <span className={styles.errorMessage}>
                                            This field is required!
                                        </span>
                                    ),
                                },
                            ]}
                            style={{width: '100%'}}
                        >
                            <Input type='text' className={styles.Input} placeholder='IT Service/Healthcare'/>
                        </Form2.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form2.Item
                            label={<span className={styles.label}>Tax Code</span>}
                            name="company_taxcode"
                            style={{width: '100%'}}
                        >
                            <Input type='text' className={styles.Input}/>
                        </Form2.Item>

                    </div>
                    <p className={styles.toplabel}>Company Manager Information</p>
                    <div className={styles.formControl}>
                        <Form2.Item
                            label={<span className={styles.label}>Name*</span>}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <span className={styles.errorMessage}>
                                            This field is required!
                                        </span>
                                    ),
                                },
                            ]}
                            style={{width: '100%'}}
                        >
                            <Input type='text' className={styles.Input}/>
                        </Form2.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form2.Item
                            label={<span className={styles.label}>Title*</span>}
                            name="title"
                            style={{width: '100%'}}
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <span className={styles.errorMessage}>
                                            This field is required!
                                        </span>
                                    ),
                                },
                            ]}
                        >
                            <Input type='text' className={styles.Input}/>
                        </Form2.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form2.Item
                            label={<span className={styles.label}>Email*</span>}
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <span className={styles.errorMessage}>
                                            This field is required!
                                        </span>
                                    ),
                                },
                                {
                                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: (
                                        <span className={styles.errorMessage}>
                                            Please enter email
                                        </span>
                                    ),
                                },
                            ]}
                            style={{width: '100%'}}
                        >
                            <Input type='text' className={styles.Input}/>
                        </Form2.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form2.Item
                            label={<span className={styles.label}>Phone Number*</span>}
                            name="phone"
                            style={{width: '100%'}}
                            getValueFromEvent={(e) => e.target.value.slice(0, 12)}
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <span className={styles.errorMessage}>
                                            This field is required!
                                        </span>
                                    ),
                                },
                                {
                                    max: 12,
                                    message: (
                                        <span className={styles.errorMessage}>
                                            Maximum length is 12 digits.
                                        </span>
                                    ),
                                },
                            ]}
                        >
                            <Input type='number' className={styles.Input}/>
                        </Form2.Item>

                    </div>
                    <Form2.Item>
                        <div className={styles.buttonContainer}>
                            <div>
                                <Button className={`${styles.buttonAdd} ${formCompleted ? styles.formCompleted : ''}`} htmlType="submit" onClick={handleSubmit}
                                        label='ADD NEW USER' />
                            </div>
                            <div>
                                <Button className={styles.buttonCancel} onClick={handleCancel} label='CANCEL'/>
                            </div>
                        </div>
                    </Form2.Item>
                </Form2>
            </Modal>
        </>
    );
};

export default AddNewCompany;