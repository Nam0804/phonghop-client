'use client'
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '@/constants/Form/Input';
import styles from '@/css/Booking.module.css';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import CustomTimePicker from "./TimePickerBook";    
import axios from 'axios';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import 'rc-time-picker/assets/index.css';
import { Button, message, Upload } from 'antd';
import Select from 'react-select';
import type { UploadProps } from 'antd';
import './customantd.css';
import TextArea from "antd/es/input/TextArea";
import {Form as Form1} from 'antd'
import api from '@/axiosService';

export default function BookRoom({ onAddSuccess }:any) {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.min.js");
    }, [])

    interface Room {
        id: number;
        name: string;
        // Add other properties as needed
    }

    const [selectedDate, setSelectedDate] = useState(new Date('2023-01-01'));
    const [startTime, setStartTime] = useState<moment.Moment | undefined>();
    const [endTime, setEndTime] = useState<moment.Moment | undefined>();
    const [form] = Form1.useForm();
    const [formCompleted, setFormCompleted] = useState(false)
    const [visible, setVisible] = useState(false);
    const [allRoomsData, setAllRoomData] = useState<DataType[]>([]);
    const [filteredRooms, setFilteredRooms] = useState<DataType[]>([]);
    const [repeatType, setRepeatType] = useState(null);
    const user = useSelector((state:any) => state.user.value);


    const generateRepeatOptions = (date: Date | null) => {
        const dayOfWeek = date ? new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date) : '(Select a date)';

        return [
          { value: 'no-repeat', label: 'Doesn’t repeat' },
          { value: 'every-weekday', label: 'Every weekday' },
          {
            value: 'weekly',
            label: `Weekly - ${date ? dayOfWeek : '(Select a date)'}`,
          },
          {
            value: 'monthly',
            label: `Monthly - ${date ? dayOfWeek : '(Select a date)'}`,
          },
          {
            value: 'annually',
            label: `Annually - ${date ? dayOfWeek : '(Select a date)'}`,
          },
        ];
      };



    const handleRepeatChange = (selectedOption) => {
        setRepeatType(selectedOption);
      };

      const handleDateChange = (date: React.SetStateAction<Date>) => {
        setSelectedDate(date);

        setRepeatType(null);
      };

    const repeatOptions = generateRepeatOptions(selectedDate);

    const handleStartTimeChange = (value: moment.Moment | undefined) => {
        setStartTime(value);
    };

    const handleEndTimeChange = (value: moment.Moment | undefined) => {
        setEndTime(value);
    };

    const handleSelectChange = (event:any) => {
        const selectedRoomName = event.target.value;
        if (selectedRoomName === "all") {
          setFilteredRooms(allRoomsData);
        } else {
          const filteredRooms = allRoomsData.filter((room) => room.name === selectedRoomName);
          setFilteredRooms(filteredRooms);
        }
     };

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(dateString);
        if (date && typeof date === 'object') {
            setSelectedDate(date.toDate());
        }
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

      const handleSubmit = () => {
        form
          .validateFields()
          .then(async (values) => {
            try {
                values = {
                    ...form.getFieldsValue(),
                    booking_name: user.name,
                    booking_email: user.email,
                    booking_title: user.title,
                    meeting_room_id: user.room_id,
                }

              const data = await api.post(`bookings`, values);
              if (data.status === 200) {
                message.success('User created successfully');
                form.resetFields();
                setVisible(false);
                if (onAddSuccess) {
                  onAddSuccess();
                }
              } else {
                message.error('Failed to create user');
                form.resetFields();
                setVisible(false);
                if (onAddSuccess) {
                  onAddSuccess();
                }
              }
              setFilteredRooms(data.data.data);
            } catch (e) {
              console.error('Error creating user:', e);
              message.error('Failed to create user');
              console.log(values);
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
                                        <label htmlFor="inputTopic" className={`col-4 ${styles.formLabel}`}>
                                            Room*:
                                        </label>
                                        <div className="col-8">
                                            <select className={`${styles.formSelect}`} onChange={(e) => handleSelectChange(e)}>
                                            <option value="all">All Rooms</option>
                                                {allRoomsData.map((room) => (
                                                    <option key={room.id} value={room.name}>
                                                    {room.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3 row" >
                                        <label htmlFor="inputTopic" className={`col-4 ${styles.formLabel}`}>
                                            Date*:
                                        </label>
                                        <div className="col-8 position-relative">
                                            <div className={styles.dateTimePicker}>
                                                <div className={styles.date}>
                                                        <Space direction="vertical">
                                                                <DatePicker selected={selectedDate} onChange={onChange} showToday={false} style={{ width:'181px',height:'44px' }}/>
                                                        </Space>
                                                </div>
                                                <div>
                                                    <Select  options={repeatOptions} onChange={handleRepeatChange} className={ styles.selectedDate } />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 row" style={{ alignItems:'center' }}>
                                        <label htmlFor="inputTopic" className={`col-4 ${styles.formLabel}`}>
                                            Time*:
                                        </label>
                                        <div className="col-4">
                                            <div className={styles.dateTimePicker}>
                                                <div className={styles.time}>
                                                    <CustomTimePicker onChange={handleStartTimeChange}></CustomTimePicker>
                                                    <p>To:</p>
                                                    <CustomTimePicker onChange={handleEndTimeChange}></CustomTimePicker>
                                                </div>
                                            </div>
                                        </div>
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
                                <input type="checkbox" name="" id=""/>
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