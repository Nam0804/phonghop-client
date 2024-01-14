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
import './customantd.css'
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
import ManagerBookingList from "@/components/Manager/ManagerBookingList";
import MyBookingHistory from "@/components/Staff/MyBookingHistory";

const BookingPage = () => {
  const user = useSelector((state:any) => state.user.value);
  const dispatch = useAppDispatch()
  const usertype = user.type;
  return (
  <>
    {user.type === 1 && (
      <ManagerBookingList></ManagerBookingList>
    )}
    {user.type === 2 && (
      <MyBookingHistory></MyBookingHistory>
    )}
  </>
  )
}
export default BookingPage



