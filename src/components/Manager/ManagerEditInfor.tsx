import {Form, message, Modal} from "antd";
import React, {useState, useEffect} from "react";
import Input from "@/constants/Form/Input";
import Button from "@/constants/Form/Button";
import styles from "@/css/ManagerEditInfor.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '@/axiosService';
import { toast } from 'react-hot-toast';
import { useLocale, useTranslations } from 'next-intl';

const ManagerEditInfor = ({user}: any) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({...user});
    const [visible, setVisible] = useState(false);
    const t = useTranslations('Edit');
    const locale = useLocale();

    useEffect(() => {
        form.setFieldsValue({
            'manager-title': user.title,
            'phone': user.phone,
        });
    }, [form, user]);
    const showPopup = () => {
        setVisible(true);
    }
    const handleCancel = () => {
        setVisible(false);
    };
    const handleEdit = async () => {
        try {
            const values = await form.validateFields();
            const updateData = {
                phone: user.phone,
                title: user.title,
            };
            const response = await api.put(
                `update-user/${user.id}`,
                values,
            );

            if (response.status === 200) {
                toast.success(t('success'));
                setVisible(false);
            }
        } catch (error) {
            console.error(error);
            toast.error(t('error'));
        }
    };
    return (
        <>
            <button onClick={showPopup} className={styles.custombutton}><img src="/edit.svg"></img></button>
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
                            label={<span className={styles.label}>Manager Name*</span>}
                            name="manager-name"
                        >
                            <p className={styles.formFields}>{user.name}</p>
                        </Form.Item>
                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
                            label={<span className={styles.label}>Company*</span>}
                            name="company"
                        >
                            <p className={styles.formFields}>{user.company.data.company_name}</p>
                        </Form.Item>
                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
                            label={<span className={styles.label}>Manager Title*</span>}
                            name="manager-title"
                            rules={[
                                {min: 6},
                                {max: 100}
                            ]}
                        >
                            <Input
                                className={styles.Input}
                                type="text"
                                value={formData.title}
                                onChange={(e: any) => setFormData({...formData, title: e.target.value})}
                            />
                        </Form.Item>
                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
                            label={<span className={styles.label}>Email Address*</span>}
                            name="email"
                        >
                            <p className={styles.formFields}>{user.email}</p>
                        </Form.Item>
                    </div>
                    <div className={styles.formControl}>
                        <Form.Item
                            label={<span className={styles.label}>Phone Number*</span>}
                            name="phone"
                            rules={[
                                {min: 10, message: 'Please input a valid phone number'},
                                {max: 20, message: 'Please input a valid phone number'}
                            ]}
                        >
                            <Input
                                className={styles.Input}
                                type="number"
                                value={formData.phone}
                                onChange={(e: any) => setFormData({...formData, phone: e.target.value})}
                            />
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <div className={styles.buttonContainer}>
                            <div>
                                <Button className={styles.buttonEdit} htmlType="submit" onClick={handleEdit}
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