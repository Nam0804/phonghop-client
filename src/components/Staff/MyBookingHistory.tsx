'use client'
import React, { useCallback } from "react";
import styles from '@/css/CompanyList.module.css'
import Button from "@/constants/Form/Button";
import Modal from "@/constants/Modal/ChangePasswordModal";
import AddNewCompany from "@/components/Admin/AddNewCompany";
import { Table, Tag } from 'antd';
import { DatePicker, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from "react";
import 'src/app/[locale]/(logged-in)/booking/customantd.css';
import moment from 'moment';
import DeleteCompany from "@/components/DeleteCompany/DeleteCompany";
import api from "@/axiosService";
import { get } from "lodash";
import toast from "react-hot-toast";
import EditNewCompany from "@/components/Admin/EditNewCompany";
import InformationCompany from "@/components/Admin/InfomationCompany";
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/lib/hooks';
import { setLoading } from '@/lib/features/loadingSlice';

const MyBookingHistory = () => {
  const [allStaffData, setAllStaffData] = useState<DataType[]>([]);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const user = useSelector((state:any) => state.user.value);
  const dispatch = useAppDispatch()
  
  const fetchData = useCallback(async () => {
    try {
      const user_id = user.id;
      const data = await api.get(`bookings/history/${user_id}`)
      const res = get(data, 'data.data')
      const sortedData = res.sort((a: DataType, b: DataType) => b.id - a.id);
      setAllStaffData(sortedData)
      
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
  interface DataType {
    id: number;
    key: string;
    no: number;
    meeting_room:{
        name: string;
    }
    booking_name: string;
    date: string;
    from_time:string;
    to_time:string;
    topic:string;
    status:number;
    meeting_note:boolean;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      render: (number) => <a>{number}</a>,
      sorter: (a, b) => a.no - b.no,
      width: 76,
      fixed: 'left',
    },
    {
      title: 'Room Name',
      dataIndex: ['meeting_room','name'],
      key: 'meeting_room[name]',
      fixed: 'left',
      width: 146,
    },
    {
      title: 'Booked by',
      dataIndex: 'booking_name',
      key: 'booking_name',
      width: 149,
    },
    {
      title: 'Date',
      dataIndex: 'from_time',
      key: 'from_time',
      render: (from_time) => moment(from_time).format('ddd,DD MMM YYYY'), 
      width: 159
    },
    {
      title: 'From',
      dataIndex: 'from_time',
      key: 'from_time',
      render: (from_time) => moment(from_time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm A'),
      width: 128,
    },
    {
      title: 'To',
      dataIndex: 'to_time',
      key: 'to_time',
      render: (to_time) => moment(to_time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm A'),
      width: 143,
    },
    {
      title: 'Meeting Topic',
      dataIndex: 'topic',
      key: 'topic',
      width: 161,
    },
    {
      title: 'Status',
      dataIndex: 'register_status',
      key: 'status',
      width: 145,
      render: (status) => {
        switch (status) {
          case 0:
            return 'Pending';
          case 1:
            return 'Accepted';
          case 2:
            return 'Rejected';
          default:
            return '';
        }
      },
    },
    {
        title: 'Add meeting notes',
        key: 'meeting_note',
        width: 145,
        render: (_, record,meeting_note) => {
          const color = meeting_note ? '#8B8B8B' : '#388697';
          return (
            <Space size="middle">
                <button className={styles.custombutton}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                    <path d="M16.5 0H2.5C1.397 0 0.5 0.897 0.5 2V16C0.5 17.103 1.397 18 2.5 18H10.5C10.6313 18.0002 10.7614 17.9744 10.8828 17.9241C11.0041 17.8738 11.1143 17.8 11.207 17.707L18.207 10.707C18.2892 10.6217 18.3556 10.5225 18.403 10.414C18.417 10.384 18.425 10.353 18.436 10.321C18.4645 10.2373 18.4816 10.1502 18.487 10.062C18.489 10.041 18.5 10.021 18.5 10V2C18.5 0.897 17.603 0 16.5 0ZM2.5 2H16.5V9H10.5C10.2348 9 9.98043 9.10536 9.79289 9.29289C9.60536 9.48043 9.5 9.73478 9.5 10V16H2.5V2ZM11.5 14.586V11H15.086L11.5 14.586Z" fill="white"/>
                  </svg>
                </button>
            </Space>
          );
       },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <button key="view" className={styles.custombutton} ><img src="/eye.svg"></img></button>
          <button key="edit" className={styles.custombutton} ><img src="/edit.svg"></img></button>
          <button key="delete" className={styles.custombutton} style={{backgroundColor:'#E56353'}} ><img src="/delete.svg" ></img></button>
        </Space>
      ),
      fixed: 'right',
      width: 191,
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.labelsection}>
        <div className={styles.square}>
        </div>
        <h1 className={styles.label}>Booking List</h1>
      </div>
      <div className={styles.companytable}>
        <Table columns={columns} dataSource={allStaffData}
          scroll={{ x: 1000 }} pagination={false} rowKey={(record) => record.id}
        />
      </div>
      <div className={styles.addco}>
        {/* <Button className={styles.addbtn}>ADD NEW COMPANY</Button> */}
        <AddNewCompany onAddSuccess={handleAddSuccess}></AddNewCompany>
      </div>
    </div>
  );
}
export default MyBookingHistory



