import React, { useState } from "react";
import { Button, Modal, Form, message } from "antd";
import "@/css/AddNewCompany.css";
// import Title from "antd/es/skeleton/Title";

const AddNewCompany: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [company, setCompany] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      try {
        
      } catch (e) {
        console.error("Error creating company:", e);
        message.error("Failed to create company");
      }
    });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add New Company
      </Button>
      {/* <br />
      <br />
      <Button type="primary" onClick={showModal}>
        Edit New Company
      </Button> */}
      <Modal
        open={isModalOpen}
        closable={false}
        title
        centered
        footer={(_) => (
          <>
            <div className="btn">
              <Button className="AddNew" onClick={handleSubmit}>
                ADD NEW COMPANY
              </Button>
              <Button className="Cancel" onClick={handleCancel}>
                CANCEL
              </Button>
            </div>
          </>
        )}
      >
        <h3>Add New Company</h3>

        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          style={{ maxWidth: 700 }}
          requiredMark={false}
        >
          <p>Company Information</p>

          <Form.Item
            label="Name"
            labelAlign="left"
            required
            className="right-asterisk"
          >
            <input type="input" placeholder="Enter Company" />
          </Form.Item>
          <Form.Item label="Address" labelAlign="left">
            <input type="input" placeholder="Enter Company" />
          </Form.Item>
          <Form.Item label="Domain" labelAlign="left">
            <input type="input" placeholder="Enter Company" />
          </Form.Item>
          <Form.Item label="Tax Code" labelAlign="left">
            <input type="input" placeholder="Enter Company" />
          </Form.Item>

          <p>Company Manager Information</p>
          <Form.Item label="Name" labelAlign="left">
            <input type="input" placeholder="Enter Company" />
          </Form.Item>
          <Form.Item label="Title" labelAlign="left">
            <input type="input" placeholder="Enter Company" />
          </Form.Item>
          <Form.Item label="Email" labelAlign="left">
            <input type="input" placeholder="Enter Company" />
          </Form.Item>
          <Form.Item label="Phone Number" labelAlign="left">
            <input type="input" placeholder="Enter Company" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddNewCompany;
