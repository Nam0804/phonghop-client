import React, { useEffect, useState } from "react";
import {Modal,Input,Row, Col,Form,Card,Image,Layout,List,Skeleton,Avatar,Select,Flex,CheckboxProps,Checkbox, Progress,} from "antd";
import Button from "@/constants/Form/Button";
import styles from "/src/css/BookingDetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form as Form2 } from "antd";
import Meta from "antd/es/card/Meta";
import TextArea from "antd/es/input/TextArea";
import "@/css/BookingDetail.css";
import Link from "next/link";
import { useLocale } from "next-intl";

const AddInforGuest = ({openModal, closeModal,step1Data}:any) => {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [formBookingDetail] = Form.useForm();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [openModal1, setOpenModal] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(70);
  
useEffect(() => {
  if (checked1) {
    setCurrentProgress(100);
  } else {
    setCurrentProgress(70);
  }
}, [checked1]);

  const onChange1 = (e:any) => {
    setChecked1(e.target.checked);
  };
  const onChange2 = (e: any) => {
    setChecked2(e.target.checked);
  };

 const closeModal1 = (value: boolean) => {
  setOpenModal(value);
 }
  const showPopup = () => {
    setVisible(true);
    formBookingDetail.resetFields();
  };

  const handleCancel = () => {
    formBookingDetail.resetFields();
    closeModal(true);
  };
  return (
    <>
      <Modal
        title={<div className={styles.formTitle ? '' : 'inVisibleModal'}>New Booking Session</div>}
        open={openModal}
        footer={null}
        closable={false}
        width={1296}
      >
        <h4 className="title-Guest">
          <i>User Information</i>
        </h4>
        <br />
        <Form
          labelAlign="left"
          form={formBookingDetail}
          labelCol={{ flex: "200px" }}
          requiredMark={false}
        >
          <Row>
            <Col span={12}>
              <Form.Item label="Name*">
                <Input className="bookingInput" />
              </Form.Item>
              <Form.Item label="Email*">
                <Input className="bookingInput" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Title">
                <Input className="bookingInput" />
              </Form.Item>
              <Form.Item label="Company">
                <Input className="bookingInput" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Checkbox checked={checked1} onChange={onChange1}>
              <span>Create an account to skip this part next time or</span>
            </Checkbox>
            <Link href={`/${locale}/login`} className="SignIn-Guest">
              {" "}
              Sign In
            </Link>
          </Form.Item>
          {/* =======enter password======= */}
          {checked1 && (
              <Row className="checkToVisible">
                <Col span={12}>
                  <Form.Item label="Password*">
                    <Input className="bookingInput" type="password" />
                  </Form.Item>
                  <Form.Item label="Confirm Password*">
                    <Input className="bookingInput" type="password" />
                  </Form.Item>
                </Col>
                <Form.Item>
                  <Checkbox checked={checked2} onChange={onChange2}>
                    <span>
                      By checking on this box I would like to register as member
                      of the system and agree with terms of usage
                    </span>
                  </Checkbox>
                </Form.Item>
              </Row>
            )}
        </Form>

        {/* =================== */}
        <Form.Item>
          <div className="btnBookGroup">
            <Button className="btnBookNow" label="Book Now" />
            <Button className="btnClose" onClick={handleCancel} label="Close" />
          </div>
        </Form.Item>
        <Progress
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            margin: "24px auto",
          }}
          percent={currentProgress}
          status="active"
          showInfo={false}
          strokeColor="#388697"
        />
      </Modal>
    </>
  );
};

export default AddInforGuest;
