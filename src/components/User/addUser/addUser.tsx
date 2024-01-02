import React, {useEffect, useState} from 'react';
import {Modal, Form, message} from 'antd';
import Input from "@/constants/Form/Input";
import Button from "@/constants/Form/Button";
import styles from '/src/css/AddUser.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '@/axiosService';

const AddUser = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);

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
                company_id: 1,
                type: 1
            };
            const bearerToken = '5|LZTjWFa2QqubYjM1JSJZ1F7GFnqTdKxxbabeAJHH54f2abb6';
            const response = await api.post(`store-user`, values, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`
                },
            });

            console.log('Add response:', response);

            if (response.ok) {
                message.success('User created successfully');
                form.resetFields();
                setVisible(false);
            }
        } catch (e) {
            console.error('Error creating user:', e);
            message.error('Failed to create user');
        }
    };

    return (
        <>
            <button onClick={showPopup}>New User</button>
            <Modal
                title={
                    <div className={styles.formTitle}>Add New Staff</div>
                }
                open={visible}
                onCancel={handleCancel}
                footer={null}
                closable={false}
                width={973}
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