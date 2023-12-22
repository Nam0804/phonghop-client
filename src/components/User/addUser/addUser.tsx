import React, {useEffect, useState} from 'react';
import {Modal, Form, message} from 'antd';
import Input from "@/constants/Form/Input";
import Button from "@/constants/Form/Button";
import styles from '/src/css/AddUser.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddUser = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const baseUrl = 'http://127.0.0.1:8000/api';

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/store-user")
            .then(response => response.json())
            .then(json => setUsers(json))
    }, [])
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
                    const response = await fetch(baseUrl + "/users", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values),
                    });

                    if (response.ok) {
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
                            label={<span className={styles.label}>Name*</span> }
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
                            style={{ width: '100%' }}
                        >
                            <Input className={styles.Input}/>
                        </Form.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
                            label={<span className={styles.label}>Title</span> }
                            name="role"
                            style={{ width: '100%' }}
                        >
                            <Input className={styles.Input}/>
                        </Form.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
                            label={<span className={styles.label}>Email*</span> }
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
                            style={{ width: '100%' }}
                        >
                            <Input className={styles.Input}/>
                        </Form.Item>

                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
                            label={<span className={styles.label}>Phone Number</span> }
                            name="phone"
                            style={{ width: '100%' }}
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