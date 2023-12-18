import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
const AddUser = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const showPopup = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values:any) => {
        console.log('Success:', values);
        setVisible(false);
    };

    const onFinishFailed = (errorInfo:any) => {
        console.log('Failed:', errorInfo);
    };

    function handleSubmit() {
        console.log('Add user successfully');
    }

    return (
        <>
            <button onClick={showPopup}>New User</button>
            <Modal
                title="New User"
                visible={visible}
                onCancel={handleCancel}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Form
                    form={form}
                    name="newUser"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'This field is required!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Role"
                        name="role"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'This field is required!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="submit" onClick={handleSubmit} label='Create' />
                        <Button onClick={handleCancel} label='Cancel' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddUser;