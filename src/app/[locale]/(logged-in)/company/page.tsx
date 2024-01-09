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
import './customantd.css';
import DeleteCompany from "@/components/DeleteCompany/DeleteCompany";
import api from "@/axiosService";
import { get } from "lodash";
import toast from "react-hot-toast";
import EditNewCompany from "@/components/Admin/EditNewCompany";
import InformationCompany from "@/components/Admin/InfomationCompany";

const CompanyPage = () => {
  const [allStaffData, setAllStaffData] = useState<DataType[]>([]);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  

  const fetchData = useCallback(async () => {
    try {
      const data = await api.get('index-companies')
      const res = get(data, 'data.data')
      // const sortedData = res.sort(
      //   (a: DataType, b: DataType) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      // );      
      setAllStaffData(res)
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
    name: string;
    domain: string;
    address: string;
    manager: {
      manager_title: string,
      manager_email: string,
      manager_name: string,
      manager_phone: number,
    }
    created_at: string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      render: (number) => <a>{number}</a>,
      sorter: (a, b) => a.no - b.no,
      width: 73,
      fixed: 'left',
    },
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      fixed: 'left',
      width: 146,
    },
    {
      title: 'Company Domain',
      dataIndex: 'domain',
      key: 'domain',
      sorter: (a, b) => a.domain.localeCompare(b.domain),
      width: 149,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 159
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
          <InformationCompany rec={record} ></InformationCompany>
          <button key="skipdownline" className={styles.custombutton}><img src="/skipdownline.svg"></img></button>
          <EditNewCompany rec={record} onEditSuccess={handleEditSuccess}></EditNewCompany>
          <DeleteCompany company_id={record.id} onDeleteSuccess={handleDeleteSuccess}></DeleteCompany>
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
export default CompanyPage