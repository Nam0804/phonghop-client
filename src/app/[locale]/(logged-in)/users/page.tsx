'use client'
import React from "react";
import styles from '@/css/CompanyList.module.css'
import Button from "@/constants/Form/Button";
import {Table, Tag } from 'antd';
import { DatePicker, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from "react";
import { get } from 'lodash';
import './customantd.css'
import api from '@/axiosService';
import ManagerEditInfor from "@/components/Manager/ManagerEditInfor";
import DeleteUser from '@/components/User/deleteUser/deleteUser';
import AddUser from '@/components/User/addUser/addUser';
import { useSelector } from 'react-redux'

const UserPage = () => {
    const [allStaffData, setAllStaffData] = useState<DataType[]>([]);
    const user = useSelector((state) => state.user.value);
    useEffect(() => {
        const company_id = user.id;
        if(company_id) {
            try {
                api.get(`users/company/${company_id}`)
                    .then((response: any) => {
                        const rawData = get(response, 'data.data.data', []);
                        setAllStaffData(rawData);
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
            } catch (error) {
                console.error("Error", error);
            }
        }
    }, [allStaffData]);

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
          dataIndex: ['name'],
          key: 'attributes[name]',
          sorter:(a,b) => a.name.localeCompare(b.name),
          fixed:'left',
          width:272,
        },
        {
          title: 'Role',
          dataIndex: ['title'],
          key: 'attributes[type]',
          sorter:(a,b) => a.title.localeCompare(b.title),
          width: 273,
        },
        {
            title: 'Email',
            dataIndex: ['email'],
            key: 'attributes[email]',
            width:262
        },
        {
            title: 'Phone Number',
            dataIndex: ['phone'],
            key: 'attributes[phone]',
            width: 251,
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record: any) => (
            <Space size="middle">
                <button key="view" className={styles.custombutton}><img src="/eye.svg"></img></button>
                <ManagerEditInfor user={record}/>
                <DeleteUser user_id = {record.id}/>
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
                <AddUser />
            </div>
        </div>
    );
}
export default UserPage