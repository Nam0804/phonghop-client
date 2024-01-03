import React, { useState } from "react";
import { Button, Modal, Form } from "antd";
import "@/css/AddNewRoom.css";
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import api from '@/axiosService';
import styles from '@/css/CompanyList.module.css'

// import Title from "antd/es/skeleton/Title";

const AddNewRoom = ({ onAddSuccess }:any) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [formCompleted, setFormCompleted] = useState(false)

  const { Dragger } = Upload;

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  function handleSubmit() {
    form.validateFields()
        .then(async (values) => {
            try {
                const data = await api.post(`meeting-rooms`,values)
                if (data.status == 200) {
                    message.success('Room created successfully');
                    form.resetFields();
                    setVisible(false);
                    if (onAddSuccess) {
                        onAddSuccess();
                    }
                } else {
                    message.error('Failed to create room');
                    form.resetFields();
                    setVisible(false);
                    if (onAddSuccess) {
                        onAddSuccess();
                    }
                }
            } catch (e) {
                console.error('Error creating room:', e);
                message.error('Failed to create room');
                console.log(values)
            }
        })
        .catch((errorInfo) => {
            console.log(errorInfo);
        });
}


  const showModal = () => {
    setVisible(true);;
  };

  
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);

  };

  return (
    <>
      <button key="add" className={styles.addbtn} onClick={showModal}>ADD NEW COMPANY</button>
      <Modal
        open={visible}
        closable={false}
        title
        centered
        footer={(_) => (
          <>
            <div className="btn">
              <Button className={`AddNew ${formCompleted ? styles.formCompleted : ''}`} htmlType="submit" onClick={handleSubmit}>
                ADD NEW ROOM
              </Button>
              <Button className="Cancel" onClick={handleCancel}>
                CANCEL
              </Button>
            </div>
          </>
        )}
      >
        <h3>Add New Meeting Room</h3>

        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          style={{ maxWidth: 700 }}
          requiredMark={false}
          onValuesChange={(changedValues, allValues) => {
            const isFormCompleted = Object.values(allValues).every(value => value !== undefined && value !== '');
            setFormCompleted(isFormCompleted);
          }}
        >

          <Form.Item
            label="Room Name*"
            labelAlign="left"
            required
            rules={[
              {
                  required: true,
                  message: (
                      <span className="errorMessage">
                          This field is required!
                      </span>
                  ),
              },
          ]}

            className="right-asterisk"
          >
            <input type="input"  />
          </Form.Item>
          <Form.Item label="Location*" labelAlign="left" rules={[{ required: true, message: (<span className="errorMessage">This field is required!</span> ), }, ]}>
            <input type="input" />
          </Form.Item>
          <Form.Item label="Floor" labelAlign="left">
            <input type="input"  />
          </Form.Item>
          <Form.Item label="Capacity*" labelAlign="left" rules={[{ required: true, message: (<span className="errorMessage">This field is required!</span> ), }, ]}>
            <input type="input" />
          </Form.Item>
          <Form.Item label="Equipment" labelAlign="left">
            <input type="input" />
          </Form.Item>
          <Form.Item label="Availability" labelAlign="left">
            <select >
              <option value="apple">Open</option>
              <option value="pear">Close</option>
            </select>
          </Form.Item>
          <p>Upload Meeting Room Image</p>
          <Dragger {...props}>
            <img src="/public/cloud-upload.svg"></img>
            <p className="ant-upload-text">Drag and drop files here</p>
          </Dragger>
        </Form>
      </Modal>
    </>
  );
};

export default AddNewRoom;
