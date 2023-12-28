'use client'
import React from "react";
import styles from '@/css/CompanyList.module.css'
import Button from "@/constants/Form/Button";
import {Table, Tag } from 'antd';
import { DatePicker, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from "axios";
import { useEffect, useState } from "react";
import './customantd.css';
import DeleteMeeting from "@/components/DeleteCompany/DeleteCompany";

const CompanyPage = () => {
    const [allStaffData, setAllStaffData] = useState<DataType[]>([]);
    useEffect(() => {
        const token = "45|OMb1B7djnXw6DiGS96sEBu6cWK32J7hs1UADcdCVbe5ef1a0";
        const config ={
            headers:{
                Authorization: `Bearer ${token}`,
            },
        }; 
        fetch("http://localhost:8000/api/index-companies",config)
        .then((res) => res.json())
        .then((result) => {
          console.log(result.data)
            setAllStaffData(result.data);
        })
      }, []);
    interface DataType {
        attributes:{
            key: string;
            no: number;
            name:string;
            domain:string;
            address:string;
            title: string;
            email: string;
            phonenumber:number;
        }
      }
      const columns: ColumnsType<DataType> = [
        {
          title: 'No',
          dataIndex: 'id',
          key: 'id',
          render: (number) => <a>{number}</a>,
          sorter: (a, b) => a.attributes.no - b.attributes.no,
          width:73,
          fixed:'left',
        },
        {
          title: 'Company Name',
          dataIndex: ['attributes', 'name'],
          key: 'attributes[name]',
          sorter:(a, b) => a.attributes.name.localeCompare(b.attributes.name),
          fixed:'left',
          width:146,
        },
        {
          title: 'Company Domain',
          dataIndex: ['attributes', 'domain'],
          key: 'attributes[domain]',
          sorter:(a, b) => a.attributes.domain.localeCompare(b.attributes.domain),
          width: 149,
        },
        {
            title: 'Address',
            dataIndex: ['attributes', 'address'],
            key: 'attributes[address]',
            width:159
        },
        {
            title: 'Manager Name',
            dataIndex: ['attributes', 'phone'],
            key: 'attributes[phone]',
            width: 128,
        },
        {
            title: 'Manager Title',
            dataIndex: ['attributes', 'phone'],
            key: 'attributes[phone]',
            width: 143,
        },
        {
            title: 'Email',
            dataIndex: ['attributes', 'phone'],
            key: 'attributes[phone]',
            width: 162,
        },
        {
            title: 'Manager Phone Number',
            dataIndex: ['attributes', 'phone'],
            key: 'attributes[phone]',
            width: 145,
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
                <button key="view" className={styles.custombutton}><img src="/eye.svg"></img></button>
                <button key="edit" className={styles.custombutton}><img src="/edit.svg"></img></button>
                <DeleteMeeting></DeleteMeeting>
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
                <Button className={styles.addbtn}>ADD NEW COMPANY</Button>
            </div>
        </div>
    );
}
export default CompanyPage