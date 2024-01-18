"use client";
import styles from "@/css/CompanyList.module.css";
import { Table, Tag, Pagination } from "antd";
import Button from "@/constants/Form/Button";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import customstyle from "@/css/MeetingRoomList.module.css";
import CustomTimePicker from "@/components/Manager/TimePicker";
import type { ColumnsType } from "antd/es/table";
import api from "@/axiosService";
import { useEffect, useState, useCallback } from "react";
import "./customantd.css";
import AddNewRoom from "@/components/Room/createMeetingRoomModal";
import { get } from "lodash";
import toast from "react-hot-toast";
import DeleteMeeting from "@/components/DeleteMeeting/DeleteMeeting";
import EditRoom from "@/components/Room/EditMeetingRoomModal";
import { useSelector } from "react-redux";
import moment from "moment";

const CompanyList = () => {
  
  return (
    <div className={styles.container}>
      <div className={styles.labelsection}>
        <div className={styles.square}></div>
        <h1 className={styles.label}>Meeting Room List</h1>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </span>
      </div>
      <p className={customstyle.text}>View By:</p>
      <div className={customstyle.selectsection}>
        <div className={customstyle.dateTimePicker}>
          <div className={customstyle.date}>
            <p>Date:</p>
            <Space direction="vertical">
              <DatePicker
                style={{ width: "221px", height: "36px" }}
                // onChange={onChange}
                showToday={false}
              />
            </Space>
          </div>
          <div className={customstyle.time}>
            <p>Time:</p>
            <CustomTimePicker
              onChange={"handleTimeStartChange"}
            ></CustomTimePicker>
            <p>To:</p>
            <CustomTimePicker onChange={"handleTimeEndChange"}></CustomTimePicker>
          </div>
        </div>
        <div className={customstyle.roomPicker}>
          <p>Choose a room</p>
          <select >
            <option value="all">All Rooms</option>
            
              <option>
                abc
              </option>
            
          </select>
        </div>
      </div>
      
    </div>
  );
  };
export default CompanyList;
