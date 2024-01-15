"use client";
import React, {useRef, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {Layout} from 'antd';
import './calender.css';
import dayjs from 'dayjs';
import moment from 'moment';
import styles from 'src/css/Calender.module.css';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type {DatePickerProps} from 'antd';
import {DatePicker, Space} from 'antd';

const RoomDetailWeekly = () => {
    const calendarRef = useRef(null);
    const [title, settitle] = useState(new moment().format("MMMM DD, YYYY"))

    const events = [
        {
            title: 'Your Event',
            start: '2024-01-12T10:00:00',
            end: '2024-01-12T11:00:00',
            allDay: false,
            meeting: 'trung',
            booking_user: 'tttttt',
        },
    ];

    const nextHandle = () => {
        calendarRef.current._calendarApi.next()
        settitle(calendarRef.current._calendarApi.currentDataManager.data.viewTitle)
    }
    const prevHandle =() => {
        calendarRef.current._calendarApi.prev()
        settitle(calendarRef.current._calendarApi.currentDataManager.data.viewTitle)
    }
    const todayHandle = () => {
        calendarRef.current._calendarApi.today()
        settitle(calendarRef.current._calendarApi.currentDataManager.data.viewTitle)
    }
    const renderEventContent = (eventInfo) => {
        return (
            <div>
                <p>{eventInfo.event.extendedProps.meeting}</p>
                <p>{eventInfo.event.extendedProps.booking_user}</p>
                <p>{eventInfo.timeText}</p>
            </div>
        );
    };

    dayjs.extend(customParseFormat);
    const dateFormat = 'dddd, DD MMMM YYYY'; // Adjust the format as needed
    const customFormat = (value) => value.format(dateFormat);
    const customDayHeaderFormat = ({date}) => {
        const dayOfWeek = date.toLocaleDateString('en-US', {weekday: 'long'});
        const formattedDate = date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        return `${dayOfWeek} ${formattedDate}`;
    };

    return (
        <>
            <Layout style={{padding: 20, backgroundColor: "#EAEEF6", height: "100%"}}>
                <div className={styles.calendarContainer}>
                    <div className={styles.headerContainer}>
                        <div className={styles.square}></div>
                        <h1 className={styles.labelsection}>Room Detail</h1>
                    </div>
                    <div className={styles.textContainer}>
                        <div className={styles.childTextContainer} style={{paddingLeft: "32px"}}>
                            <p className={styles.text}>Date:</p>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M8.29303 12.7073C8.10556 12.5198 8.00024 12.2655 8.00024 12.0003C8.00024 11.7352 8.10556 11.4809 8.29303 11.2933L13.95 5.63634C14.0423 5.54083 14.1526 5.46465 14.2746 5.41224C14.3966 5.35983 14.5279 5.33225 14.6606 5.33109C14.7934 5.32994 14.9251 5.35524 15.048 5.40552C15.1709 5.4558 15.2825 5.53006 15.3764 5.62395C15.4703 5.71784 15.5446 5.82949 15.5949 5.95239C15.6451 6.07529 15.6704 6.20696 15.6693 6.33974C15.6681 6.47252 15.6405 6.60374 15.5881 6.72575C15.5357 6.84775 15.4595 6.9581 15.364 7.05034L10.414 12.0003L15.364 16.9503C15.5462 17.1389 15.647 17.3915 15.6447 17.6537C15.6424 17.9159 15.5373 18.1668 15.3518 18.3522C15.1664 18.5376 14.9156 18.6427 14.6534 18.645C14.3912 18.6473 14.1386 18.5465 13.95 18.3643L8.29303 12.7073Z"
                                          fill="white"/>
                                </svg>

                                {/* Input with current date */}
                                <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={customFormat}/>

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M15.7071 11.2932C15.8946 11.4807 15.9999 11.735 15.9999 12.0002C15.9999 12.2653 15.8946 12.5197 15.7071 12.7072L10.0501 18.3642C9.95785 18.4597 9.84751 18.5359 9.7255 18.5883C9.6035 18.6407 9.47228 18.6683 9.3395 18.6694C9.20672 18.6706 9.07504 18.6453 8.95215 18.595C8.82925 18.5447 8.7176 18.4705 8.6237 18.3766C8.52981 18.2827 8.45556 18.171 8.40528 18.0481C8.355 17.9252 8.32969 17.7936 8.33085 17.6608C8.332 17.528 8.35959 17.3968 8.412 17.2748C8.46441 17.1528 8.54059 17.0424 8.6361 16.9502L13.5861 12.0002L8.6361 7.05018C8.45394 6.86158 8.35315 6.60898 8.35542 6.34678C8.3577 6.08458 8.46287 5.83377 8.64828 5.64836C8.83369 5.46295 9.0845 5.35778 9.3467 5.35551C9.60889 5.35323 9.8615 5.45402 10.0501 5.63618L15.7071 11.2932Z"
                                          fill="white"/>
                                </svg>
                            </div>
                        </div>
                        <div className={styles.childTextContainer}>
                            <p className={styles.text}>View As:</p>
                            <select className={styles.roomPicker}>
                                <option value="Room 12A-04">Room 12A-04</option>
                                <option value="Room 12A-05">Room 12A-05</option>
                            </select>
                        </div>
                        <div className={styles.childTextContainer}>
                            <p className={styles.text}>View:</p>
                            <select className={styles.weekPicker}>
                                <option value="Week">Week</option>
                                <option value="Day">Day</option>
                            </select>
                        </div>
                        <div className={styles.childTextContainer} style={{marginLeft: "84px"}}>
                            <div style={{display: "flex"}}>
                                <input type="checkbox" id="myMeeting"/>
                                <label htmlFor="myMeeting" className={styles.checkboxLabel}>My meeting</label>
                            </div>

                            <div style={{display: "flex"}}>
                                <input type="checkbox" id="allMeetings" name="AllMeetings"/>
                                <label htmlFor="allMeetings" className={styles.checkboxLabel}>All meetings</label>
                            </div>
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: "15px"
                        }}>
                            <button className={styles.bookingButton}>Book Now</button>
                        </div>

                    </div>
                    <div className={styles.calender}>
                        <FullCalendar
                            ref={calendarRef}
                            plugins={[timeGridPlugin, interactionPlugin]}
                            headerToolbar={false}
                            allDaySlot={false}
                            editable
                            selectable
                            selectOverlap={false}
                            eventOverlap={false}
                            expandThrough={false}
                            events={events}
                            slotMinTime={"08:00:00"}
                            slotMaxTime={"18:30:00"}
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
                        />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default RoomDetailWeekly;
