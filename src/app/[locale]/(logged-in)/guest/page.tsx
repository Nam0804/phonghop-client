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
import AddInforGuest from '@/components/Guest/AddInforGuest';
import BookingRoomGuest from '@/components/Guest/BookingRoomGuest';

const HomePage = () => {
    const [allRoomsData, setAllRoomData] = useState<DataType[]>([]);
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState<DataType[]>([]);
    const [selectedRoomName, setSelectedRoomName] = useState('all');
    const [selectedTimeStartValue, setSelectedTimeStartValue] = useState("");
    const [selectedTimeEndValue, setSelectedTimeEndValue] = useState("");
    
    const handleSelectChange = (event:any) => {
        setSelectedRoomName(event.target.value);
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
    const handleTimeEndChange = (newTimeEnd: any) => {
      setSelectedTimeEndValue(newTimeEnd);
      fetchData();
    };

    const fetchData = useCallback(async () => {
    try {

        
        // const data = await api.get('meeting-rooms/listing')
        // console.log(data.data.data.data);
        // const res = get(data, 'data.data.data')  
        // setAllRoomData(res)
        } catch (error) {
        console.error(error);
        toast.error('Error');

        }
    }, [])
    useEffect(() => {
        fetchData()
    }, []);
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
                scroll={{x:1000}} className={customstyle.customtable}
                components={{
                    header: {
                      cell: (props: any) => (
                        <th
                          style={{
                            width: "100%",
                            background: "#255D6A",
                            color: "#fff",
                          }}
                        >
                          {props.children}
                        </th>
                      ),
                    },
                    body: {
                      cell: (props: any) => {
                        const isEvenRow = props.index % 2 === 0;
    
                        return (
                          <td className={styles.customTable}>{props.children}</td>
                        );
                      },
                    },
                  }}
                />
            </div>
            <BookingRoomGuest></BookingRoomGuest>
        </div>
    );
};

export default HomePage;