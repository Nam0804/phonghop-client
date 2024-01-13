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
import { useEffect, useState, useCallback } from "react";
import "./customantd.css";
import AddNewRoom from '@/components/Room/createMeetingRoomModal';
import { get } from "lodash";
import toast from "react-hot-toast";
import DeleteMeeting from '@/components/DeleteMeeting/DeleteMeeting';
import EditRoom from '@/components/Room/EditMeetingRoomModal';
import { useSelector } from 'react-redux';

const CompanyList = () => {      
  const [allRoomsData, setAllRoomData] = useState<DataType[]>([]);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const user = useSelector((state: any) => state.user.value);
  const usertype = user.type;

  const fetchData = useCallback(async () => {
    try {
      const data = await api.get('meeting-rooms/listing')
      console.log(data.data);
      const res = get(data, 'data.data')     
      setAllRoomData(res)
    } catch (error) {
      console.error(error);
      toast.error('Error');

    }
  }, [])
    useEffect(() => {
      fetchData()
    }, []);

    const handleDeleteSuccess = () => {
      setDeleteConfirmationVisible(false);
      fetchData();
    };
    const handleAddSuccess = () => {
      fetchData();
    };
    const handleEditSuccess = () => {
      fetchData();
    };
  

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
      };
      interface DataType {
        id:number;
        key: string;
        no: number;
        name: string;
        location: string;
        capacity:number;
        equipment:string;
        availabilitys: boolean;
        book:string;
      }
      let columns: ColumnsType<DataType> = [];
      {if (usertype === 1) {
        columns = [
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
          sorter:(a,b) => a.name.localeCompare(b.name),
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
                <EditRoom rec={record} onEditSuccess={handleEditSuccess}></EditRoom>
                <DeleteMeeting room_id={record.id} onDeleteSuccess={handleDeleteSuccess}></DeleteMeeting>
            </Space>
          ),
          fixed: 'right',
          width: 137,
        },
      ];
    }}

    
    {if (usertype === 2) {
      columns = [
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
          sorter:(a,b) => a.name.localeCompare(b.name),
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
      ];}}
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
                            <option value="apple">All Rooms</option>
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
                {usertype === 1 && (
                  <div className={styles.addco}>
                      <AddNewRoom onAddSuccess={handleAddSuccess}>ADD NEW ROOM</AddNewRoom>
                  </div>
                )}
            </div>
    );
}
export default CompanyList