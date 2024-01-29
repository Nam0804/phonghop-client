"use client";
import React, {useRef, useState, useEffect, useCallback} from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {Layout} from 'antd';
import './calender.css';
import {get} from 'lodash';
import moment from 'moment';
import api from '@/axiosService';
import styles from 'src/css/Calender.module.css';
import type {DatePickerProps} from 'antd';
import {DatePicker, Space} from 'antd';
import {useSelector} from 'react-redux'
import toast from "react-hot-toast";
import DeleteUser from "@/components/User/deleteUser/deleteUser";

const RoomDetailWeekly = ({calendarRef, events, renderEventContent}: any) => {
    const showModalBooking = (e:any) => {
        <DeleteUser/>
    }

    return (
        <>

            <div className={styles.calender}>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[timeGridPlugin, interactionPlugin]}
                    headerToolbar={false}
                    allDaySlot={false}
                    editable
                    selectable={true}
                    selectMirror={true}
                    selectOverlap={true}
                    eventDurationEditable={false}
                    eventStartEditable={false}
                    eventOverlap={false}
                    // expandThrough={false}
                    events={events}
                    eventMinHeight={66}
                    eventMinWidth={1000}
                    dateClick={showModalBooking}
                    eventClick={showModalBooking}
                    // dayPropGetter={calendarStyle}
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
