'use client'
import styles from '@/css/CompanyList.module.css'
import {Table, Tag } from 'antd';
import Button from "@/constants/Form/Button";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import customstyle from '@/css/MeetingRoomList.module.css';
import CustomTimePicker from "@/components/Manager/TimePicker";
import type { ColumnsType } from 'antd/es/table';
import api from '@/axiosService';
import { useEffect, useState } from "react";
import "./customantd.css";


const CompanyList = () => {      
    const [selectedRoomData, setSelectedRoomData] = useState<DataType[] | null>(null);
    const [allRoomsData, setAllRoomsData] = useState<DataType[]>([]);
    
    const handleRoomChange = async (event: any) => {
      const selectedRoom = event.target.value;
      try {
        const response = await api.get(`meeting-rooms/${selectedRoom}`);
        const roomData = response.data;
        setSelectedRoomData(roomData);
      } catch (error) {
        console.error('Error fetching selected room data:', error);
      }
    };
    
    useEffect(() => {
      const fetchAllRoomsData = async () => {
        try {
          const response = await api.get('meeting-rooms');
          console.log(response);
          const roomsData = response.data;
          setAllRoomsData(roomsData);
          setSelectedRoomData(roomsData); // Default to displaying all rooms
        } catch (error) {
          console.error('Error fetching all rooms data:', error);
        }
      };
    
      fetchAllRoomsData();
    }, []);
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
      };
      interface DataType {
        key: string;
        no: number;
        roomname: string;
        location: string;
        capacity:number;
        equipment:string;
        availabilitys: boolean;
        book:string;
      }
      const columns: ColumnsType<DataType> = [
        {
          title: 'No',
          dataIndex: 'id',
          key: 'id',
          render: (number) => <a>{number}</a>,
          sorter: (a, b) => a.no - b.no,
          width:73,
          fixed:'left',
        },
        {
          title: 'Room Name',
          dataIndex: 'name',
          key: 'name',
          sorter:(a,b) => a.roomname.localeCompare(b.roomname),
          fixed:'left',
          width:175,
        },
        {
          title: 'Location',
          dataIndex: 'location',
          key: 'location',
          sorter:(a,b) => a.location.localeCompare(b.location),
          width: 165,
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
            key: 'capacity',
            sorter:(a,b) => a.capacity-b.capacity,
            width:159
        },
        {
            title: 'Equipment',
            dataIndex: 'equipment',
            key: 'equipment',
            width: 251,
        },
        {
            title: 'Room Availability',
            key: 'availabilitys',
            dataIndex: 'availabilitys',
            render: (_, { availabilitys }) => {
                let color = availabilitys ? '#E56353' : '#388697';
                return (
                    <Tag color={color} className="">
                        {availabilitys ? 'Unavailable' : 'Available'}
                    </Tag>
                );
            },
            width: 183,
          },
        {
            title: 'View Room Detail',
            key: 'book',
            dataIndex: 'book',
            render: (_, { availabilitys }) => {
               const color = availabilitys ? '#8B8B8B' : '#388697';
               return (
                  <Tag color={color} key={_}>
                     Book
                  </Tag>
               );
            },
            width: 154,
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
                <button key="edit" className={styles.custombutton}><img src="/edit.svg"></img></button>
                <button key="delete" className={styles.custombutton} style={{backgroundColor:'#E56353'}}><img src="/delete.svg"></img></button>
            </Space>
          ),
          fixed: 'right',
          width: 137,
        },
      ];
    return(
            <div className={styles.container}>
                <div className={styles.labelsection}>
                    <div className={styles.square}>
                    </div>
                    <h1 className={styles.label}>Meeting Room List</h1>
                </div>
                <p className={customstyle.text}>View By:</p>
                <div className={customstyle.selectsection}>
                    <div className={customstyle.dateTimePicker}>
                        <div className={customstyle.date}>
                            <p>Date:</p>
                            <Space direction="vertical">
                                <DatePicker style={{ width:'221px',height:'36px' }} onChange={onChange} showToday={false}/>
                            </Space>
                        </div>
                        <div className={customstyle.time}>
                            <p>Time:</p>
                            <CustomTimePicker></CustomTimePicker>
                            <p>To:</p>
                            <CustomTimePicker></CustomTimePicker>
                        </div>
                    </div>
                    <div className={customstyle.roomPicker}>
                        <p>Choose a room</p>
                        <select >
                            <option value="apple">Quả táo</option>
                            <option value="pear">Quả lê</option>
                            <option value="peach">Quả đào</option>
                        </select>
                    </div>
                </div>
                <div className={styles.companytable}>

                    <Table columns={columns} dataSource={allRoomsData} 
                    scroll={{x:1000}} className={customstyle.customtable}
                    />
                </div>
                <div className={styles.addco}>
                    <Button className={styles.addbtn}>ADD NEW ROOM</Button>
                </div>
            </div>
    );
}
export default CompanyList