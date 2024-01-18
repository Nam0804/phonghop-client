"use client";
import styles from "@/css/CompanyList.module.css";
import { Row, Col, Image, Card, Layout, DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import customstyle from "@/css/MeetingRoomList.module.css";
import CustomTimePicker from "@/components/Manager/TimePicker";
import FullCalendar from "@fullcalendar/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Meta from "antd/es/card/Meta";
import api from "@/axiosService";
import { get } from "lodash";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const DayView = () => {
  const [title, settitle] = useState(moment().format("MMMM DD, YYYY"));
  const calendarRef = useRef<FullCalendar>(null);
  const user = useSelector((state: any) => state.user.value);
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState("allMeetings");
  const [initialCheckbox, setInitialCheckbox] = useState("allMeetings");
  const [events, setEvents] = useState([{}]);

  const fetchRoom = useCallback(async () => {
    try {
      const response = await api.get(`/meeting-rooms/listing`);
      const rooms = get(response, "data.data", []);
      setRoomList(rooms);
    } catch (error) {
      console.error(error);
      toast.error("Error");
    }
  }, []);

  const handleCheckboxChange = (id: any) => {
    setSelectedCheckbox(id);
  };
  
  const handleCb = async () => {
    try {
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    if (selectedCheckbox === "myMeeting") {
      const myBookings = await fetchMyBookingHistory();
      const eventMyBooking = myBookings.data.map((booking) => ({
        title: booking.topic,
        start: booking.from_time,
        end: booking.to_time,
        allDay: false,
        backgroundColor: "#388697",
        booking_user: booking.username,
      }));
      setEvents(eventMyBooking);
    } else {
      const allBookings = await fetchAllBookingHistory();
      const eventAllBooking = allBookings.map((booking) => ({
        title: booking.topic,
        start: booking.from_time,
        end: booking.to_time,
        allDay: false,
        backgroundColor: "#388697",
        booking_user: booking.username,
      }));
      setEvents(eventAllBooking);
    }
  };

  useEffect(() => {
    setInitialCheckbox(selectedCheckbox);
    handleCb();
  }, [selectedCheckbox]);

  const fetchMyBookingHistory = useCallback(async () => {
    try {
      const response = await api.get(`/bookings/history/${user.id}`);
      const myBookings = get(response, "data.data", []);
      console.log(myBookings);
      return myBookings;
    } catch (error) {
      console.error(error);
      toast.error("Error");
    }
  }, []);

  const fetchAllBookingHistory = useCallback(async (company_id = "") => {
    try {
      const response = await api.get(`/bookings`);
      const allBookings = get(response, "data.data", []);
      console.log(allBookings);
      return allBookings;
    } catch (error) {
      console.error(error);
      toast.error("Error");
    }
  }, []);

  useEffect(() => {
    fetchRoom();
  }, [fetchRoom]);

  const handleRoomChange = (event: any) => {
    setSelectedRoom(event.target.value);
  };

  const nextHandle = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next();
      settitle(calendarRef.current.getApi().view.title);
    }
  };

  const prevHandle = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev();
      settitle(calendarRef.current.getApi().view.title);
    }
  };

  const todayHandle = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().today();
      settitle(calendarRef.current.getApi().view.title);
    }
  };

  dayjs.extend(customParseFormat);
  const dateFormat = "dddd, DD MMMM YYYY";
  const customFormat: DatePickerProps["format"] = (value: any) =>
    ` ${value.format(dateFormat)}`;
  const customDayHeaderFormat = ({ date }: any) => {
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return `${dayOfWeek} ${formattedDate}`;
  };
  const calendarStyle = (date: any) => {
    let currentDate = `${new Date().getDate()} ${
      new Date().getMonth() + 1
    } ${new Date().getFullYear()}`;
    let allDate = `${date.getDate()} ${
      date.getMonth() + 1
    } ${date.getFullYear()}`;

    if (allDate === currentDate)
      return {
        style: {
          backgroundColor: "#88C9E8",
          border: "1px solid gray",
          margin: 0,
          padding: 0,
        },
      };
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <p>
          <strong>{eventInfo.event.title}</strong>
        </p>
        <p>Booked by Kim: {eventInfo.event.extendedProps.booking_user}</p>
        <b>{eventInfo.timeText}</b>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.labelsection}>
        <div className={styles.square}></div>
        <h1 className={styles.label}>Meeting Room Detail (DayView)</h1>
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
            <CustomTimePicker
              onChange={"handleTimeEndChange"}
            ></CustomTimePicker>
          </div>
        </div>
        <div className={customstyle.roomPicker}>
          <p>Choose a room</p>
          <select>
            <option value="all">All Rooms</option>

            <option>abc</option>
          </select>
        </div>
      </div>
      <div>
        <Row>
          <Col span={6}>
            <Layout
              style={{
                backgroundColor: "#EAEEF6",
                width: 370,

                borderRadius: 8,
                marginTop: 8,
                padding: 8,
              }}
              content="center"
            >
              <Card
                bordered={false}
                style={{
                  backgroundColor: "#EAEEF6",
                  padding: 0,
                  boxShadow: "none",
                }}
                cover={
                  <Image
                    alt="example"
                    src="https://explore.zoom.us/media/what-are-zoom-rooms.jpg"
                    width={354}
                    height={197}
                    preview={true}
                  />
                }
              >
                <Meta title={"rec.meeting_room.name"} />
                <div className="inforRoom">
                  <span>
                    <strong>Capacity: </strong>
                    {"rec.meeting_room.capacity"}
                  </span>
                  <br />
                  <span>
                    <strong>Location: </strong>
                    {"rec.meeting_room.location"}
                  </span>
                  <br />
                  <span>
                    <strong>Floor: </strong>
                    {"rec.meeting_room.floor"}
                  </span>
                  <br />
                  <span>
                    <strong>Equipment: </strong>
                    {"rec.meeting_room.equipment"}
                  </span>
                </div>
              </Card>
            </Layout>
          </Col>
          <Col span={18}>
            <div className={styles.calender}>
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={false}
                initialView={"timeGridDay"}
                allDaySlot={true}
                editable={false}
                selectable
                selectOverlap={false}
                eventOverlap={false}
                expandThrough={false}
                events={events}
                dayPropGetter={calendarStyle}
                expandRows={true}
                slotMinTime={"08:00:00"}
                slotMaxTime={"19:00:00"}
                slotDuration={"01:00:00"}
                slotLabelInterval={{ hours: 1 }}
                slotLabelFormat={{
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }}
                dayHeaderContent={(args: any) => (
                  <div>
                    <div>{moment(args.date).format("dddd, DD/MM/YYYY")}</div>
                    {/* <div>{moment(args.date).format("DD/MM/YYYY")}</div> */}
                  </div>
                )}
                contentHeight={786}
                eventContent={renderEventContent}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default DayView;
