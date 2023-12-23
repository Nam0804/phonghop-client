import {Form, Modal} from "antd";
import React, {useState, useEffect} from "react";
import Input from "@/constants/Form/Input";
import Button from "@/constants/Form/Button";
import styles from "@/css/ManagerEditInfor.module.css"

const ManagerEditInfor = (user:any) => {
    const [form] = Form.useForm();
    const [updatedInfor, setUpdatedInfor] = useState({...user});
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Update the form fields when the user prop changes
        form.setFieldsValue(updatedInfor);
    }, [user]);
    const showPopup = () => {
        setVisible(true);
    }
    const handleCancel = () => {
        setVisible(false);
    };
    const handleEdit = () => {
        form.resetFields();
    };
    return (
        <>
            <button onClick={showPopup}>Edit Information</button>
            <Modal
                title={
                    <div className={styles.formTitle}>Add New Staff</div>
                }
                open={visible}
                onCancel={handleCancel}
                footer={null}
                closable={false}
                width={975}>
                <Form
                    form={form}
                    name="Edit personal information"
                    requiredMark={false}
                >
                    <div className={styles.formControl}>
                        <Form.Item
                            label={<span className={styles.label}>Company</span>}
                            name="Company-name"
                        >
                            <Input
                                className={styles.Input}
                                value={updatedInfor.Company}
                            />
                        </Form.Item>
                    </div>
                    <div className={styles.formControl}>
                        <Form.Item label="Manager-name">
                            <Input
                                className={styles.Input}
                                value={updatedInfor.managerName}
                            />
                        </Form.Item>
                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
                            label="Title"
                            rules={[
                                {min: 6},
                                {max: 100}
                            ]}
                        >
                            <Input
                                className={styles.Input}
                                type="text"
                                value={updatedInfor.title}
                                onChange={(e: any) => setUpdatedInfor({...updatedInfor, title: e.target.value})}
                            />
                        </Form.Item>
                    </div>
                    <div className={styles.formControl}>
                        <Form.Item label="Email">
                            <Input
                                className={styles.Input}
                                value={updatedInfor.email}
                            />
                        </Form.Item>
                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
                            label="Phone"
                            rules={[
                                {min: 10, message: 'Please input a valid phone number'},
                                {max: 20, message: 'Please input a valid phone number'}
                            ]}
                        >
                            <Input
                                className={styles.Input}
                                type="number"
                                value={updatedInfor.phoneNumbers}
                                onChange={(e: any) => setUpdatedInfor({...updatedInfor, phoneNumbers: e.target.value})}
                            />
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <div className={styles.buttonContainer}>
                            <div>
                                <Button className={styles.buttonEdit} htmlType="submit" onClick={handleEdit()}
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
    )
};
export default ManagerEditInfor;