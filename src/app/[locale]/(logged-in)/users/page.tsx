'use client'
import React from "react";
import styles from '@/css/CompanyList.module.css'
import Button from "@/constants/Form/Button";
import {Table, Tag } from 'antd';
import { DatePicker, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from "axios";
import { useEffect, useState } from "react";
import './customantd.css'

const UserPage = () => {
    const [allStaffData, setAllStaffData] = useState<DataType[]>([]);
    useEffect(() => {
        const token = "34|SJrxVEn6FBLtlsM9pO08LRElSUw4LkhIiP0pEODg022b32f7";
        const config ={
            headers:{
                Authorization: `Bearer ${token}`,
            },
        }; 
        fetch("http://localhost:8000/api/users/company/2",config)
        .then((res) => res.json())
        .then((result) => {
          console.log(result.data.data)
            setAllStaffData(result.data.data);
        })
      }, []);
    interface DataType {
        key: string;
        no: number;
        name:string;
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
          title: 'Name',
          dataIndex: ['attributes', 'name'],
          key: 'attributes[name]',
          sorter:(a,b) => a.name.localeCompare(b.name),
          fixed:'left',
          width:272,
        },
        {
          title: 'Role',
          dataIndex: ['attributes', 'title'],
          key: 'attributes[type]',
          sorter:(a,b) => a.title.localeCompare(b.title),
          width: 273,
        },
        {
            title: 'Email',
            dataIndex: ['attributes', 'email'],
            key: 'attributes[email]',
            width:262
        },
        {
            title: 'Phone Number',
            dataIndex: ['attributes', 'phone'],
            key: 'attributes[phone]',
            width: 251,
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
                <button key="view" className={styles.custombutton}><img src="/eye.svg"></img></button>
                <button key="edit" className={styles.custombutton}><img src="/edit.svg"></img></button>
                <button key="delete" className={styles.custombutton} style={{backgroundColor:'#E56353'}}><img src="/delete.svg"></img></button>
            </Space>
          ),
          fixed: 'right',
          width: 168,
        },
      ];
    return (
        <div className={styles.container}>
            <div className={styles.labelsection}>
                <div className={styles.square}>
                </div>
                <h1 className={styles.label}>Staff List</h1>
            </div>
            <div className={styles.companytable}>
                <Table columns={columns} dataSource={allStaffData} 
                    scroll={{x:1000}} 
                />
            </div>
            <div className={styles.addco}>
                <Button className={styles.addbtn}>ADD NEW USER</Button>
            </div>
        </div>
    );
}
export default UserPage