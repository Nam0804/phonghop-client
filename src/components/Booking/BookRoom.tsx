'use client'
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '@/constants/Form/Input';
import styles from '@/css/Booking.module.css';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import CustomTimePicker from "./TimePickerBook";    
import Meta from "antd/es/card/Meta";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import 'rc-time-picker/assets/index.css';
import { Button, message, Upload } from 'antd';
import Selects from 'react-select';
import type { UploadProps } from 'antd';
import "@/css/BookingAdd.css";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import {Form as Form1} from 'antd'
import api from '@/axiosService';
import {Card,Image,Layout,Select} from "antd";
import { SingleValue } from 'react-select';

export default function BookRoom({onAddSuccess }:any) {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.min.js");
    }, [])
    interface DataType {
        id: number;
        name: string;
      }

    const [startTime, setStartTime] = useState<moment.Moment | null>(null);
    const [endTime, setEndTime] = useState<moment.Moment | null>(null);
    const [form] = Form1.useForm();
    const [formCompleted, setFormCompleted] = useState(false)
    const [visible, setVisible] = useState(false);
    const [allRoomsData, setAllRoomData] = useState<DataType[]>([]);
    const [filteredRooms, setFilteredRooms] = useState<DataType[]>([]);
    const [repeatType, setRepeatType] = useState<{ value: string; label: string } | null>(null);
    const user = useSelector((state:any) => state.user.value);
    const [selectedDate, setSelectedDate] = useState('');
    const [roomData, setRoomData] = useState<DataType[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<string>('');
    const [isChecked, setIsChecked] = useState(true);
    const handleSelectChange = (value: SingleValue<{ label: string; value: string; }>) => {
        if (value) {
          setSelectedRoom(value.value);
        } else {
          setSelectedRoom("");
        }
      };

    const handleCheckboxChange = (e:any) => {
        setIsChecked(e.target.checked);
    };
    // const generateRepeatOptions = (date: Date | null) => {
    //     const dayOfWeek = date ? new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date) : '(Select a date)';
      
    //     return [
    //       { value: 'no-repeat', label: 'Doesn’t repeat' },
    //       { value: 'every-weekday', label: 'Every weekday' },
    //       {
    //         value: 'weekly',
    //         label: `Weekly - ${date ? dayOfWeek : '(Select a date)'}`,
    //       },
    //       {
    //         value: 'monthly',
    //         label: `Monthly - ${date ? dayOfWeek : '(Select a date)'}`,
    //       },
    //       {
    //         value: 'annually',
    //         label: `Annually - ${date ? dayOfWeek : '(Select a date)'}`,
    //       },
    //     ];
    //   };

    const handleRepeatChange = (selectedOption: { value: string; label: string } | null) => {
        setRepeatType(selectedOption);
      };


    const handleStartTimeChange = (value: moment.Moment | undefined) => {
        setStartTime(value || null);
    };

    const handleEndTimeChange = (value: moment.Moment | undefined) => {
        setEndTime(value || null);
    };


     const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setSelectedDate(dateString);
    };
    

    const handleCancel = () => {
        form.resetFields();
        setVisible(false);
    };
   
    const props: UploadProps = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };


      useEffect(() => {
        const fetchRooms = async () => {
          try {
            const company_id = user.company_id;
            const response = await api.get(`allroom/${company_id}`);
            if (response.status === 200) {
              setRoomData(response.data.data);
            } else {
              console.error('Failed to fetch rooms');
            }
          } catch (error) {
            console.error('Error fetching rooms:', error);
          }
        };
    
        fetchRooms();
      }, []);
      
    const handleSubmit = () => {
        form
          .validateFields()
          .then(async (values) => {
            try {
               const meetingRoomsResponse = await api.get('meeting-rooms/listing');
              
                if (meetingRoomsResponse.status === 200)
                {
                const meetingRooms = meetingRoomsResponse.data.data;
      
                const selectedMeetingRoomId = meetingRooms.length > 0 ? meetingRooms[0].id : null;
      
                values = {
                  ...form.getFieldsValue(),
                  booking_name: user.name,
                  booking_email: user.email,
                  booking_title: user.title,
                  meeting_room_id: 1,
                    from_time: `${selectedDate} ${moment(startTime,'HH:mm A').format('HH:mm:ss')}`,
                    to_time: `${selectedDate} ${moment(endTime,'HH:mm A').format('HH:mm:ss')}`,
                    repeat_type:1,
                    room_status: isChecked ? 1 : 0,
                };

                const bookingResponse = await api.post('external-bookings', values,
                {headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                });
      
                if (bookingResponse.status === 200) {
                  message.success('Booking created successfully');
                  form.resetFields();
                  setVisible(false);
                  if (onAddSuccess) {
                    onAddSuccess();
                  }
                } else {
                  message.error('Failed to create booking');
                }
                
                setFilteredRooms(bookingResponse.data.data);
            }
            } catch (e) {
              console.error('Error creating booking:', e);
              message.error('Failed to create booking');
            }
          })
          .catch((errorInfo) => {
            console.log(errorInfo);
          });
      };
    

    return (
        <>

            <button
                type="button"
                className={ styles.addbtn }
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Book A Room
            </button>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <Form1
                            form={form}
                            name="Add new company"
                            requiredMark={false}
                            onValuesChange={(changedValues, allValues) => {
                                const isFormCompleted = Object.values(allValues).every(value => value !== undefined && value !== '');
                                setFormCompleted(isFormCompleted);
                            }}
                        >
                        <div className="modal-header" style={{ borderBottom:'unset', justifyContent:'center' }}>
                            <h5 className={`modal-title ${styles.modalTitle}`} id="exampleModalLabel">
                                New Booking Session
                            </h5>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className="col-md-6 ml-2">
                                    <div className="mb-3 row" >
                                        <Form1.Item
                                            name="topic" 
                                            label={<span className={styles.formLabel}>Meeting Topic*:</span>}
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
                                            >
                                            <Input type="text" className={`${styles.formControl}`} id="inputTopic" />
                                            </Form1.Item>

                                    </div>
                                    <div className="mb-3 row" >
                                    <Form1.Item
                                            name="type_of_booking" 
                                            label={<span className={styles.formLabel}>Type of booking*:</span>}
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
                                            >
                                        <select className={`${styles.formSelect}`} aria-label="Default select example">
                                                <option selected>Choose type of booking</option>
                                                <option value="1">Meeting</option>
                                                <option value="2">Personal use</option>
                                                <option value="3">Unavailable</option>
                                        </select>
                                        </Form1.Item>
                                    </div>
                                    <div className="mb-3 row" >
                                    <Form1.Item label={<span className={styles.formLabel}>Room*:</span>} name="room">
                                        <Selects
                                            options={roomData.map((room) => ({
                                                label: room.name,
                                                value: room.name,
                                              }))}
                                              className={styles.roomselect}
                                              onChange={handleSelectChange}
                                            />
                                            {selectedRoom && (
                                            <Layout
                                            style={{
                                                backgroundColor: "#EAEEF6",
                                                width: 370,

                                                borderRadius: 8,
                                                marginTop: 16,
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
                                                    width={354}
                                                    height={197}
                                                    preview={true}
                                                />
                                                }
                                            >
                                                <Meta />
                                                <div className="inforRoom">
                                                <span>
                                                    <strong>Capacity: </strong>
                                                </span>
                                                <br />
                                                <span>
                                                    <strong>Location: </strong>
                                                </span>
                                                <br />
                                                <span>
                                                    <strong>Floor: </strong>
                                                </span>
                                                <br />
                                                <span>
                                                    <strong>Equipment: </strong>
                                                </span>
                                                </div>
                                            </Card>
                                            </Layout>
                                            )}
                                        </Form1.Item>
                                    </div>
                                    <div className="mb-3 row" >
                                    <Form1.Item
                                            label={<span className={styles.formLabel}>Date*:</span>}
                                            >
                                        <div className={styles.dateTimePicker}>
                                                <div className={styles.date}>
                                                        <Space direction="vertical">
                                                            <DatePicker onChange={onChange} showToday={false} style={{ width:'181px',height:'44px' }}/>
                                                        </Space>
                                                </div>
                                                <div>
                                                    <Selects onChange={handleRepeatChange} className={ styles.selectedDate } />
                                                </div>
                                            </div>
                                        </Form1.Item>
                                    </div>
                                    <div className="mb-3 row" style={{ alignItems:'center' }}>
                                    <Form1.Item
                                            label={<span className={styles.formLabel}>Time*:</span>}
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
                                            >
                                        <div className={styles.dateTimePicker}>
                                                <div className={styles.time}>
                                                    <Form1.Item name="from_time">
                                                        <CustomTimePicker onChange={handleStartTimeChange}></CustomTimePicker>
                                                    </Form1.Item>
                                                    <p>To:</p>
                                                    <Form1.Item name="to_time">
                                                        <CustomTimePicker onChange={handleEndTimeChange}></CustomTimePicker>
                                                    </Form1.Item>
                                                </div>
                                            </div>
                                        </Form1.Item>
                                    </div>
                                </div>
                                <div className="col-md-6 ml-2">
                                    <div className="mb-3 row" >
                                        <label htmlFor="inputGuest" className={`col-4 ${styles.formLabel}`}>
                                            Guest:
                                        </label>
                                        <div className="col-8">
                                            <input type="text" className={`${styles.formControl}`} id="inputGuest" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row" >
                                        <label htmlFor="inputGuest" className={`col-4 ${styles.formLabel}`}>
                                            Agenda:
                                        </label>
                                        <div className="col-8">
                                        <TextArea
                                            placeholder="Agenda"
                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                            className={`${styles.formControl1}`}
                                        />
                                        </div>
                                    </div>
                                    <div className="mb-3 row" >
                                        <label htmlFor="inputObject" className={`col-4 ${styles.formLabel}`}>
                                            Objective:
                                        </label>
                                        <div className="col-8">
                                        <TextArea
                                            placeholder="Objective"
                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                            className={`${styles.formControl1}`}
                                        />
                                        </div>
                                    </div>
                                    <div className="mb-3 row" >
                                        <label htmlFor="inputMaterial" className={`col-4 ${styles.formLabel}`}>
                                                Material:
                                        </label>
                                        <div className={`col-8 ${styles.materialpush}`}>
                                            <div className='col-4'>
                                                <Upload {...props}>
                                                    <Button>Choose a file</Button>
                                                </Upload>
                                            </div>
                                            <div className='col-4'>
                                                <Upload {...props}>
                                                    <Button>Share a link</Button>
                                                </Upload>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.checkbox}`}>
                                <input type="checkbox"
                                       name=""
                                       id=""
                                       checked={isChecked}
                                       onChange={handleCheckboxChange}/>
                                <h6>Share meeting information to the organization</h6>
                        </div>

                        <div className="modal-footer" style={{ borderTop:'unset', justifyContent:'center' }}>
                            <button type="button" className={`${styles.buttonAdd} ${formCompleted ? styles.formCompleted : ''}`}  onClick={handleSubmit} >
                                BOOK NOW
                            </button>
                            <button type="button" className={styles.buttonCancel} onClick={handleCancel} data-bs-dismiss="modal">
                                CLOSE
                            </button>
                        </div>
                    </Form1>
                    </div>
                </div>
            </div>
        </>
    )
}