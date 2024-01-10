import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import Button from "@/constants/Form/Button";
import styles from "/src/css/BookingDetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "@/axiosService";
import customstyle from "@/css/CompanyList.module.css";
import { Form as Form2 } from "antd";

const BookingDetail = ({ onAddSuccess }: any) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form2.useForm();

  const showPopup = () => {
    setVisible(true);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <button key="add" className={customstyle.addbtn} onClick={showPopup}>
        Booking Detail
      </button>
      <Modal
        title={<div className={styles.formTitle}>Booking Detail</div>}
        open={visible}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        width={973}
      >
        <Form2
          form={form}
          name="BookingDetail"
          requiredMark={false}
        >
          <p className={styles.toplabel}>Company Information</p>
          <div className={styles.formControl}>
            <Form2.Item
              label={<span className={styles.label}>Name*</span>}
              name="company_name"
              style={{ width: "100%" }}
            >
              <Input type="text" className={styles.Input} />
            </Form2.Item>
          </div>
          <div className={styles.formControl}>
            <Form2.Item
              label={<span className={styles.label}>Address*</span>}
              name="company_address"
              style={{ width: "100%" }}
            >
              <Input type="text" className={styles.Input} />
            </Form2.Item>
          </div>
          <div className={styles.formControl}>
            <Form2.Item
              label={<span className={styles.label}>Domain*</span>}
              name="company_domain"
              style={{ width: "100%" }}
            >
              <Input
                type="text"
                className={styles.Input}
                placeholder="IT Service/Healthcare"
              />
            </Form2.Item>
          </div>
          <div className={styles.formControl}>
            <Form2.Item
              label={<span className={styles.label}>Tax Code</span>}
              name="company_taxcode"
              style={{ width: "100%" }}
            >
              <Input type="text" className={styles.Input} />
            </Form2.Item>
          </div>
          <p className={styles.toplabel}>Company Manager Information</p>
          <div className={styles.formControl}>
            <Form2.Item
              label={<span className={styles.label}>Name*</span>}
              name="name"
              style={{ width: "100%" }}
            >
              <Input type="text" className={styles.Input} />
            </Form2.Item>
          </div>
          <div className={styles.formControl}>
            <Form2.Item
              label={<span className={styles.label}>Title*</span>}
              name="title"
              style={{ width: "100%" }}
            >
              <Input type="text" className={styles.Input} />
            </Form2.Item>
          </div>
          <div className={styles.formControl}>
            <Form2.Item
              label={<span className={styles.label}>Email*</span>}
              name="email"
              style={{ width: "100%" }}
            >
              <Input type="text" className={styles.Input} />
            </Form2.Item>
          </div>
          <div className={styles.formControl}>
            <Form2.Item
              label={<span className={styles.label}>Phone Number*</span>}
              name="phone"
              style={{ width: "100%" }}
            >
              <Input type="number" className={styles.Input} />
            </Form2.Item>
          </div>
          <Form2.Item>
            <div className={styles.buttonContainer}>
              <div>
                <Button
                  className={styles.buttonClose}
                  htmlType="submit"
                  onClick={handleCancel}
                  label="Close"
                  justify="center"
                />
              </div>
            </div>
          </Form2.Item>
        </Form2>
      </Modal>
    </>
  );
};

export default BookingDetail;
