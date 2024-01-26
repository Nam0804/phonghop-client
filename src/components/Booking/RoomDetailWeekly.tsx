"use client";
import React, {useRef, useState, useEffect, useCallback} from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {Layout, Modal} from 'antd';
import './calender.css';
import {get} from 'lodash';
import moment from 'moment';
import api from '@/axiosService';
import styles from 'src/css/Calender.module.css';
import type {DatePickerProps} from 'antd';
import {DatePicker, Space} from "antd";
import {useSelector} from 'react-redux'
import toast from "react-hot-toast";
import DeleteUser from "@/components/User/deleteUser/deleteUser";
import BookingDetail from "@/components/Manager/Booking/BookingDetail";

const RoomDetailWeekly = ({calendarRef, events, renderEventContent, fetchAllBookingHistory, booking_id}: any) => {
    const [visible, setVisible] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);
    const handleCancel = () => {
        setVisible(false);
    };
    const showBookingDetail = async (eventInfo: any) => {
        const booking_id = eventInfo.event.extendedProps.booking_id;
        try {
            const response = await api.get(`/bookings/${booking_id}`);
            const res = get(response, 'data.data');
            setBookingDetails(res);
            setVisible(true);
        } catch (error) {
            console.error('Error fetching booking details:', error);
        }
    };

    return (
        <>
            <Modal
                title={<div className={styles.formTitle}>Booking Detail</div>}
                open={visible}
                onCancel={handleCancel}
                footer={null}
                closable={false}
                width={1296}
            >
                <p>ddd</p>
            </Modal>
            <div className={styles.calender}>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[timeGridPlugin, interactionPlugin]}
                    headerToolbar={false}
                    allDaySlot={false}
                    editable
                    selectable={true}
                    selectOverlap={true}
                    eventDurationEditable={false}
                    eventStartEditable={false}
                    eventOverlap={false}
                    events={events}
                    eventMinHeight={66}
                    eventMinWidth={1000}
                    eventClick={showBookingDetail}
                    expandRows={true}
                    slotMinTime={"08:00:00"}
                    slotMaxTime={"19:00:00"}
                    slotDuration={"00:30:00"}
                    slotLabelInterval={{hours: 1}}
                    slotLabelFormat={{
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                    }}
                    dayHeaderContent={
                        (args: any) => (
                            <div>
                                <div>{moment(args.date).format('dddd')}</div>
                                <div>{moment(args.date).format('DD/MM/YYYY')}</div>
                            </div>
                        )
                    }
                    contentHeight={786}
                    eventContent={renderEventContent}
                />
            </div>
        </>
    );
};

export default RoomDetailWeekly;
