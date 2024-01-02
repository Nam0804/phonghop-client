import React, {useEffect, useState} from 'react';
import {Modal, message} from 'antd';
import Input from "@/constants/Form/Input";
import Button from "@/constants/Form/Button";
import styles from '/src/css/AddUser.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '@/axiosService';
import customstyle from '@/css/CompanyList.module.css'
import {Form as Form} from 'antd'

const EditNewCompany = ({rec}:any) => {
    const [visible, setVisible] = useState(false);
    const [form1] = Form.useForm();

    const showPopup = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    useEffect(() => {
        form1.setFieldsValue({
            company_name: rec.name,
            company_address: rec.address,
            company_domain: rec.domain,
            company_taxcode: rec.taxcode,
            name: rec.manager.manager_name,
            title: rec.manager.manager_title,
            email: rec.manager.manager_email,
            phone: rec.manager.manager_phone,
        });
    }, [rec]);

    function handleSubmit() {
        form1.validateFields()
            .then(async (values) => {
                try {
                    console.log(values)
                    const { data } = await api.put(`update-company/${rec.id}`,values)
                    if (data.ok) {
                        message.success('User update successfully');
                        form1.resetFields();
                        setVisible(false);
                    } else {
                        message.error('Failed to create user');
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
            <button key="edit" className={customstyle.custombutton} onClick={showPopup}><img src="/edit.svg"></img></button>
            <Modal
                title={
                    <div className={styles.formTitle}>Edit Company Infomation</div>
                }
                open={visible}
                onCancel={handleCancel}
                footer={null}
                closable={false}
                width={973}
            >
                <Form
                    form={form1}
                    name="Edit Company"
                    requiredMark={false}
                >
                    <p className={styles.toplabel}>Company Information</p>
                    <div className={styles.formControl}>
                        <Form.Item
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
                            <input className={styles.Input}/>
                        </Form.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
                            label={<span className={styles.label}>Address*</span>}
                            name="company_address"
                            style={{width: '100%'}}
                        >
                            <input className={styles.Input}/>
                        </Form.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
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
                            <input className={styles.Input}/>
                        </Form.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
                            label={<span className={styles.label}>Tax Code</span>}
                            name="company_taxcode"
                            style={{width: '100%'}}
                        >
                            <input className={styles.Input}/>
                        </Form.Item>

                    </div>
                    <p className={styles.toplabel}>Company Manager Information</p>
                    <div className={styles.formControl}>
                        <Form.Item
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
                            <input className={styles.Input}/>
                        </Form.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
                            label={<span className={styles.label}>Title*</span>}
                            name="title"
                            style={{width: '100%'}}
                        >
                            <input className={styles.Input}/>
                        </Form.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
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
                            ]}
                            style={{width: '100%'}}
                        >
                            <input className={styles.Input}/>
                        </Form.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
                            label={<span className={styles.label}>Phone Number*</span>}
                            name="phone"
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
                            <input className={styles.Input}/>
                        </Form.Item>

                    </div>
                    <Form.Item>
                        <div className={styles.buttonContainer}>
                            <div>
                                <Button className={styles.buttonAdd} htmlType="submit" onClick={handleSubmit}
                                        label='SAVE'/>
                            </div>
                            <div>
                                <Button className={styles.buttonCancel} onClick={handleCancel} label='CANCEL'/>
                            </div>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditNewCompany