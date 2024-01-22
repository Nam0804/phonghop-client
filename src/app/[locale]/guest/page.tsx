'use client'
import styles from '@/css/CompanyList.module.css'
import {Table, Tag } from 'antd';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import customstyle from '@/css/MeetingRoomList.module.css';
import CustomTimePicker from "@/components/Manager/TimePicker";
import type { ColumnsType } from 'antd/es/table';
import api from '@/axiosService';
import { useEffect, useState, useCallback } from "react";
import { get } from "lodash";
import toast from "react-hot-toast";
import {useSelector} from 'react-redux';
import moment from "moment";

const HomePage = () => {
    const [allRoomsData, setAllRoomData] = useState<DataType[]>([]);
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [selectedTimeStartValue, setSelectedTimeStartValue] = useState('');
    const [selectedTimeEndValue, setSelectedTimeEndValue] = useState('');
    const [filteredRooms, setFilteredRooms] = useState<DataType[]>([]);
    const [selectedDate, setSelectedDate] = useState('');
    const user = useSelector((state:any) => state.user.value);
    const company_id = user.company_id;
    const usertype = user.type;
    

    const fetchData = useCallback(async () => {
      try {
        const url =window.location.href;
        const registerurl = `${url}/${company_id}`;
        const formattedStartTime = moment(selectedTimeStartValue, 'hh:mm A').format('HH:mm:ss');
        const formattedEndTime = moment(selectedTimeEndValue, 'hh:mm A').format('HH:mm:ss');
        const data = await api.get(`allroom/${company_id}`, {
          params: {
            starttime: `${selectedDate} ${formattedStartTime}`,
            endtime: `${selectedDate} ${formattedEndTime}`
          }
        });
        
        setAllRoomData(data.data.data)
        setFilteredRooms(data.data.data);
        } catch (error) {
          console.error(error);
          toast.error('Error');
  
        }
      }, [selectedDate, selectedTimeStartValue, selectedTimeEndValue])
    useEffect(() => {
        fetchData()
    }, []);

    const handleSelectChange = (event:any) => {
        const selectedRoomName = event.target.value;
        if (selectedRoomName === "all") {
          setFilteredRooms(allRoomsData);
        } else {
          const filteredRooms = allRoomsData.filter((room) => room.name === selectedRoomName);
          setFilteredRooms(filteredRooms);
        }
     };

    const handleTimeStartChange = (newTimeStart:any) => {
        setSelectedTimeStartValue(newTimeStart);
        fetchData();
      };
      const handleTimeEndChange = (newTimeEnd:any) => {
        setSelectedTimeEndValue(newTimeEnd);
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
            </Space>
          ),
          fixed: 'right',
          width: 137,
        },
      ];
    // const t = useTranslations('Index');
    // const locale = useLocale();
    // const user = useAppSelector((state) => state.user)
    return (
        // <div>
        //     <p>this is gúet</p>
        //     {/* {user.value} */}
        //     {/* {t('title')} */}
        //     {/* {locale} */}
        // </div>
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
                            <CustomTimePicker onChange={handleTimeStartChange}></CustomTimePicker>
                            <p>To:</p>
                            <CustomTimePicker onChange={handleTimeEndChange}></CustomTimePicker>
                        </div>
                    </div>
                    <div className={customstyle.roomPicker}>
                        <p>Choose a room</p>
                        <select onChange={(e) => handleSelectChange(e)}>
                        <option value="all">All Rooms</option>
                          {allRoomsData.map((room) => (
                            <option key={room.id} value={room.name}>
                              {room.name}
                            </option>
                          ))}
                        </select>
                    </div>
            </div>
            <div className={styles.companytable}>

                <Table columns={columns} dataSource={allRoomsData} 
                scroll={{x:1000}} className={customstyle.customtable} bordered={true}
                components={{
                    header: {
                        cell: (props: any) => (
                            <th style={{
                                background: '#255D6A',
                                color: '#fff',
                                borderRight: '1px solid #ffffff',
                            }}>
                                {props.children}
                            </th>
                        ),
                    },
                    body: {
                        cell: (props: any) => {
                            const isEvenRow = props.index % 2 === 0;
                            console.log(isEvenRow)

                            return (
                                <td
                                    className={styles.customTable}
                                >
                                    {props.children}
                                </td>
                            );
                        },
                    },
                }}
                />
            </div>
        </div>
    );
};

export default HomePage;