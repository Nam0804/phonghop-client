'use client'
import React from "react";
import styles from '@/css/CompanyList.module.css'
import Button from "@/constants/Form/Button";
<<<<<<< HEAD
import Modal from "@/constants/Modal/ChangePasswordModal";
import AddNewCompany from "@/components/Admin/AddNewCompany";
=======
import {Table, Tag } from 'antd';
import { DatePicker, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from "axios";
import { useEffect, useState } from "react";
import './customantd.css';
import DeleteCompany from "@/components/DeleteCompany/DeleteCompany";
import { json } from "stream/consumers";

const CompanyPage = () => {
    const [allStaffData, setAllStaffData] = useState<DataType[]>([]);
    useEffect(() => {
        const token = "1|FrRHqIiDPPINlg9UM9zxzW15Vz8PwpRGuzd1TIMwbff51f52";
        const config ={
            headers:{
                Authorization: `Bearer ${token}`,
            },
        };
        // axios.get("http://localhost:8000/api/index-companies",config)
        // .then(response => {
        
        //   if(response)
        //   {
        //     console.log(response.data.data)
        //     setAllStaffData(response.data.data);
        //   }else{
        //     console.error('Not found')
        //   }
        // })
        // .catch(error => {
        //   if (error.response) {
        //     console.error('HTTP Error:', error.response.data);
        //   } else if (error.request) {
        //     console.error('No response received for the request.');
        //   } else {
        //     console.error('Error setting up the request or handling the response:', error.message);
        //   }
        // }); 
        fetch("http://localhost:8000/api/index-companies",config)
        .then((res) => res.json())
        .then((result) => {
          console.log(result.data.data)
            setAllStaffData(result.data.data);
        })
      }, []);
    interface DataType {
            id:number;
            key: string;
            no: number;
            name:string;
            domain:string;
            address:string;
            title: string;
            email: string;
            phonenumber:number;
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
          title: 'Company Name',
          dataIndex: 'name',
          key: 'name',
          sorter:(a, b) => a.name.localeCompare(b.name),
          fixed:'left',
          width:146,
        },
        {
          title: 'Company Domain',
          dataIndex: 'domain',
          key: 'domain',
          sorter:(a, b) => a.domain.localeCompare(b.domain),
          width: 149,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width:159
        },
        {
            title: 'Manager Name',
            dataIndex: ['manager', 'manager_name'],
            key: 'manager[manager_name]',
            width: 128,
        },
        {
            title: 'Manager Title',
            dataIndex: ['manager', 'manager_title'],
            key: 'manager[manager_title]',
            width: 143,
        },
        {
            title: 'Email',
            dataIndex: ['manager', 'manager_email'],
            key: 'manager[manager_email]',
            width: 162,
        },
        {
            title: 'Manager Phone Number',
            dataIndex: ['manager', 'manager_phone'],
            key: 'manager[manager_phone]',
            width: 145,
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
                <button key="view" className={styles.custombutton}><img src="/eye.svg"></img></button>
                <button key="edit" className={styles.custombutton}><img src="/edit.svg"></img></button>
                <p>{JSON.stringify(record.id)}</p>
                <DeleteCompany company_id={record.id}></DeleteCompany>
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
                <h1 className={styles.label}>Company List</h1>
            </div>
            <div className={styles.companytable}>
                <Table columns={columns} dataSource={allStaffData} 
                    scroll={{x:1000}} 
                />
            </div>
            <div className={styles.addco}>
                {/* <Button className={styles.addbtn}>ADD NEW COMPANY</Button> */}
                <AddNewCompany></AddNewCompany>
            </div>
        </div>
    );
}
export default CompanyPage