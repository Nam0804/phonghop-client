import React, { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Row,
  Col,
  Form,
  Card,
  Image,
  Layout,
  List,
  Skeleton,
  Avatar,
  Select,
} from "antd";
import Button from "@/constants/Form/Button";
import styles from "/src/css/BookingDetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "@/axiosService";
import customstyle from "@/css/CompanyList.module.css";
import { Form as Form2 } from "antd";
import Meta from "antd/es/card/Meta";
import { listenerCancelled } from "@reduxjs/toolkit/dist/listenerMiddleware/exceptions";
import TextArea from "antd/es/input/TextArea";
import "@/css/BookingDetail.css";

const BookingDetail = ({ rec }: any) => {
  const [visible, setVisible] = useState(false);
  const [formBookingDetail] = Form.useForm();
  console.log(rec);

  const showPopup = () => {
    setVisible(true);
    formBookingDetail.resetFields();
  };

  const handleCancel = () => {
    formBookingDetail.resetFields();
    setVisible(false);
    formBookingDetail.resetFields();
  };

  useEffect(() => {
    formBookingDetail.setFieldsValue({
      topic: rec.topic,
      type: rec.type_of_booking,
      room: rec.room,
      date: rec.date,
      time: rec.time,
      guest: rec.guest,
      agenda: rec.agenda,
      objective: rec.objective,
      materials: rec.materials,
      meeting_room: rec.meeting_room,
    });
  }, [rec, formBookingDetail]);

  return (
    <>
      <button key="view" className={styles.custombutton} onClick={showPopup}>
        <img src="/eye.svg"></img>
      </button>
      <Modal
        title={<div className={styles.formTitle}>Booking Detail</div>}
        open={visible}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        width={1296}
      >
        <Form
          labelAlign="left"
          form={formBookingDetail}
          labelCol={{ flex: "200px" }}
          name="BookingDetail"
          requiredMark={false}
        >
          <Row>
            <Col span={12}>
              <Form.Item label="Meeting topic" name="topic">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Type of booking" name="type">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Room" name="room">
                <Input disabled />
                <Layout
                  style={{
                    backgroundColor: "#EAEEF6",
                    width: 370,

                    borderRadius: 8,
                    marginTop: 8,
                    padding: 8,
                  }}
                  content="center"
                >
                  <Card
                    bordered={false}
                    style={{
                      backgroundColor: "#EAEEF6",
                      padding: 0,
                      boxShadow: "none",
                    }}
                    cover={
                      <Image
                        alt="example"
                        src="https://explore.zoom.us/media/what-are-zoom-rooms.jpg"
                        width={354}
                        height={197}
                        preview={true}
                      />
                    }
                  >
                    <Meta title={rec.meeting_room.name} />
                    <div className="inforRoom">
                      <span>
                        <strong>Capacity: </strong>
                        {rec.meeting_room.capacity}
                      </span>
                      <br />
                      <span>
                        <strong>Location: </strong>
                        {rec.meeting_room.location}
                      </span>
                      <br />
                      <span>
                        <strong>Floor: </strong>
                        {rec.meeting_room.floor}
                      </span>
                      <br />
                      <span>
                        <strong>Equipment: </strong>
                        {rec.meeting_room.equipment}
                      </span>
                    </div>
                  </Card>
                </Layout>
              </Form.Item>
              <Form.Item label="Date" name="date">
                <Row gutter={8}>
                  <Col className="gutter-row" span={11}>
                    <Input
                      style={{ width: 181, height: 44, borderRadius: 8 }}
                      disabled
                    />
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <Input
                      style={{ width: 181, height: 44, borderRadius: 8 }}
                      disabled
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                label="Time"
                name="time"
                style={{ fontWeight: 600, fontSize: 16 }}
              >
                <div
                  style={{
                    width: 370,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Input
                    style={{ width: 140, height: 44, borderRadius: 8 }}
                    disabled
                    value={rec.from_time}
                  />
                  <p style={{ margin: 0 }}>TO</p>
                  <Input
                    style={{ width: 140, height: 44, borderRadius: 8 }}
                    disabled
                    value={rec.to_time}
                  />
                </div>
              </Form.Item>
            </Col>
            {/* ===================================== */}
            <Col span={12}>
              <Form.Item label="Guest" name="guest">
                {/* <Select
                  showSearch
                  value={""}
                  placeholder="Invitee's email"
                  defaultActiveFirstOption={false}
                  suffixIcon={null}
                  filterOption={false}
                  onSearch={handleSearch}
                  onChange={handleChange}
                  notFoundContent={null}
                  options={(data || []).map((d) => ({
                    value: d.value,
                    label: d.text,
                  }))}
                /> */}
                <List
                  style={{
                    backgroundColor: "#EAEEF6",
                    borderRadius: 8,
                    width: 370,
                    marginTop: 8,
                  }}
                  className="demo-loadmore-list"
                  itemLayout="horizontal"
                  // dataSource={list}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <a key="list-loadmore-edit">edit</a>,
                        <a key="list-loadmore-more">more</a>,
                      ]}
                    >
                      <Skeleton
                        avatar
                        title={true}
                        // loading={item.loading}
                        active
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={
                                "https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg"
                              }
                            />
                          }
                          title={<p>Vitex Name</p>}
                          // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>content</div>
                      </Skeleton>
                    </List.Item>
                  )}
                />
              </Form.Item>
              <Form.Item label="Agenda" name="agenda">
                <TextArea
                  value={""}
                  // onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter agenda"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  disabled
                />
              </Form.Item>
              <Form.Item label="Objective" name="objective">
                <TextArea
                  value={""}
                  // onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter objective"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  disabled
                />
              </Form.Item>
              <Form.Item label="Materials" name="materials">
                {/* <div>Button</div> */}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {/* =================== */}
        <Form2.Item>
          <div className={styles.buttonContainer}>
            <div>
              <Button
                className={styles.buttonClose}
                onClick={handleCancel}
                label="Close"
              />
            </div>
          </div>
        </Form2.Item>
      </Modal>
    </>
  );
};

export default BookingDetail;
