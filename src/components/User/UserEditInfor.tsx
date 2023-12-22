import {Form} from "antd";
import {useState, useEffect} from "react";
import Input from "@/constants/Form/Input";
import button from "@/constants/Form/Button";

const UserEditInfor = ({user, onSave}) => {
    const [form] = Form.useForm();
    const [updatedInfor, setUpdatedInfor] = useState({ ...user });

    useEffect(() => {
        // Update the form fields when the user prop changes
        form.setFieldsValue(updatedInfor);
    }, [user]);
    const handleEdit = ()=>{
        onSave(updatedInfor);
        form.resetFields();
    }
    return(
        <Form form={form}>
            <Form.Item label="Company-name">
                <Input
                    value={updatedInfor.companyName}
                />
            </Form.Item>
            <Form.Item label="Manager-name">
                <Input
                    value={updatedInfor.managerName}
                />
            </Form.Item>
            <Form.Item label="Title">
                <Input
                    value={updatedInfor.title}
                    onChange={(e: any) => setUpdatedInfor({ ...updatedInfor, title: e.target.value })}
                />
            </Form.Item>
            <Form.Item label="Email">
                <Input
                    value={updatedInfor.email}
                />
            </Form.Item>
            <Form.Item label="Phone">
                <Input
                    value={updatedInfor.phoneNumbers}
                    onChange={(e: any) => setUpdatedInfor({ ...updatedInfor, phoneNumbers: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <div className="button-container">
                    <Input htmltype="submit">Save</Input>
                    <Input htmltype={button}>Close</Input>
                </div>
            </Form.Item>
        </Form>
        )
}
export default UserEditInfor;