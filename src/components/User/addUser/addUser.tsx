import React, {useEffect, useState} from 'react';
import {Modal, Form, message} from 'antd';
import Input from "@/constants/Form/Input";
import Button from "@/constants/Form/Button";
import styles from '/src/css/AddUser.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '@/axiosService';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { useLocale, useTranslations } from 'next-intl';
import { get } from 'lodash';

const AddUser = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const t = useTranslations('Add');
    const locale = useLocale();
    const user = useSelector((state) => state.user.value);
    const showPopup = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setVisible(false);
    };

    async function handleSubmit() {
        try {
            await form.validateFields();
            const password = Math.random().toString(36);
            const values = {
                ...form.getFieldsValue(),
                password: password,
                password_confirmation: password,
                company_id: user.id,
                type: 2
            };
            const response = await api.post(`store-user`, values);
            if (response.ok) {
                toast.success(t('success'));
                form.resetFields();
            }
            setVisible(false);
        } catch (error) {
            console.log(error);
            toast.error(t('error'));
        }
    };

    return (
        <>
            <button onClick={showPopup} className={styles.addbtn}>ADD NEW USER</button>
            <Modal
                title={
                    <div className={styles.formTitle}>Add New Staff</div>
                }
                open={visible}
                onCancel={handleCancel}
                footer={null}
                closable={false}
                width={973}
                centered
            >
                <Form
                    form={form}
                    name="Add new staff"
                    requiredMark={false}
                >
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
                            <Input className={styles.Input}/>
                        </Form.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
                            label={<span className={styles.label}>Title</span>}
                            name="title"
                            style={{width: '100%'}}
                        >
                            <Input className={styles.Input}/>
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
                                {
                                    type: 'email',
                                    message: (
                                        <span className={styles.phoneError}>
                        Please enter a valid email address
                    </span>
                                    ),
                                },
                            ]}
                            style={{width: '100%'}}
                        >
                            <Input className={styles.Input}/>
                        </Form.Item>
                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
                            label={<span className={styles.label}>Phone Number</span>}
                            name="phone"
                            style={{width: '100%'}}
                            rules={[
                                {min: 6, message:<span className={styles.phoneError}>Please input a valid phone number</span>},
                                {max: 15, message:<span className={styles.phoneError}>Please input a valid phone number</span>}
                            ]}
                        >
                            <Input className={styles.Input}/>
                        </Form.Item>

                    </div>
                    <Form.Item>
                        <div className={styles.buttonContainer}>
                            <div>
                                <Button className={styles.buttonAdd} htmlType="submit" onClick={handleSubmit}
                                        label='ADD NEW USER'/>
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

export default AddUser;