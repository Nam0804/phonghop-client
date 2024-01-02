import React, {useEffect, useState} from 'react';
import {Modal, Form, message} from 'antd';
import Input from "@/constants/Form/Input";
import Button from "@/constants/Form/Button";
import styles from '/src/css/AddUser.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

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

    function handleSubmit() {
        form.validateFields()
            .then(async (values) => {
                try {
                    const password = Math.random().toString(36);
                    values = {
                        ...values,
                        password: password,
                        password_confirmation: password,
                        company_id: 1,
                        type: 1
                    }
                    const bearerToken = '2|SvAcZwcaNfXKQWK93eLcq8hht2WvVmO4eUL0dY5j995482db';
                    const { data } = await axios.post(
                        process.env.API_URL + "store-user",
                        values,
                        {
                            headers: {Authorization: 'Bearer ' + bearerToken}
                        }
                    );

                    if (data.ok) {
                        message.success('User created successfully');
                        form.resetFields();
                        setVisible(false);
                    } else {
                        message.error('Failed to create user');
                    }
                } catch (e) {
                    console.error('Error creating user:', e);
                    message.error('Failed to create user');
                }
            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    }

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