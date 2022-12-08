import React, { useEffect, useState } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import CalendarCss from './main.css'
import { useDispatch, useSelector } from "react-redux";

import { callCalendarViewApi } from '../../apis/CalendarApiCalls'

// function callCalendarViewApi() {

//   const [ form, setForm ] = useState({
//     calendarCode : '',
//     calendarDate : '',
//     calendarContent : "",
//     calendarStatus : "",
//     calendarType : "",
//     departemtnCode : ""
//   });

//   const onChangeHandler = (e) => {
//     setForm({
//         ...form,
//         [e.target.name]: e.target.value
//     });

// }
//   useEffect(() => {

//       dispatchEvent(CalendarApiCalls({
//         form : form
//       }));

//     }
//     , [form]
//   )

// }

// 클래스 형식 api

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}

export default class DemoApp extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: []
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('무엇을 등록하시겠습니까?')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove()
    // }
    clickInfo.event.remove()
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

  render() {
    return (
      <div className={CalendarCss.demo}>
        <div className={CalendarCss.demoMain}
        style={ {width: '65%' ,float: 'left'}}
        >
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
        <div  >
          {this.renderSidebar()}
        </div>
      </div>
    )
  }

  renderSidebar() {
    return (
      <div className={CalendarCss.demoSidebar}>
        {/* <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div> */}
        <div className={CalendarCss.demoSidebarSection}>
          {/* <h2>All Events ({this.state.currentEvents.length})</h2> */}
          <h2>학사 일정</h2>
          
            {this.state.currentEvents.map(renderSidebarEvent)}
          
        </div>
      </div>
    )
  }

}

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// function CalendarView(){

//   const dispatch = useDispatch();
//   const changeCalendar = useSelector(state => state.changeCalendar);

// }

// import React from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import googleCalendarPlugin from '@fullcalendar/google-calendar';
// import interactionPlugin from '@fullcalendar/interaction';
// import moment from 'moment';
// import { formatDate } from '@fullcalendar/react'
// import CalendarCss from './main.css'
// import { INITIAL_EVENTS, createEventId } from './event-utils'
// import { Calendar } from '@fullcalendar/core';

// import { callCalendarViewApi } from "../../apis/CalendarApiCalls";
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";

// // https://fullcalendar.io/docs/google-calendar

// // function renderSidebarEvent(event) {
// //   return (
// //     <li key={event.id}>
// //       <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
// //       <i>{event.title}</i>
// //     </li>
// //   )
// // }

// // function renderSidebar() {
// //   return (
// //     <div className={CalendarCss.demoSidebar}>
// //       {/* <div className='demo-app-sidebar-section'>
// //         <h2>Instructions</h2>
// //         <ul>
// //           <li>Select dates and you will be prompted to create a new event</li>
// //           <li>Drag, drop, and resize events</li>
// //           <li>Click an event to delete it</li>
// //         </ul>
// //       </div> */}
// //       <div className={CalendarCss.demoSidebarSection}>
// //         {/* <h2>All Events ({this.state.currentEvents.length})</h2> */}
// //         <h2>학사 일정</h2>
        
// //           {this.state.currentEvents.map(renderSidebarEvent)}
        
// //       </div>
// //     </div>
// //   )
// // }


// function CalendarView() {
  
//   const apiKey = process.env.REACT_APP_CAL_API_KEY;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const[form, setForm] = useState({
//     calendarCode : '',
//     calendarDate : '',
//     calendarContent : '',
//     calendarStatus : '',
//     calendarType : '',
//     departemtnCode : ''
//   });

//   useEffect(() => {
//       dispatch(callCalendarViewApi({
//         form : form
//       }))
//     }, []
//   );

//   const handleDateClick = (form) => {
//     let title = prompt("일정을 입력하세요.")
//     let calendarApi = form.view.calendar

//     calendarApi.unselect()

//     if (form) {
//       calendarApi.addEvent({
//         title: 'dynamic event',
//         start: form.calendarDate,
//         allDay: true
//       });
//     }

//   }

//   // handleEventClick = (clickInfo) => {
//   //   clickInfo.event.remove()
//   // }

//   // handleEvents = (events) => {
//   //   this.setState({
//   //     currentEvents: events
//   //   })
//   // }

//   var result = [];

//   return (
//     <div>
//       <div className="cal-container">
//         <FullCalendar
//           plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           googleCalendarApiKey={apiKey}
//           selectable={true}
//           // select={ function(e) {
//           //   const DateClick = moment(e.endStr).subtract(1, 'day').format('YYYY-MM-DD');
//           // }}
//           dateClick={handleDateClick}
//           events={
//             {'title': 'TEST', 'content': 'TEST', 'backgroundColor': '#C27EE2', 'AllDay' : true}
//           }
//           // eventClick={handleEventClick}
//           // eventsSet={handleEvents}
//           eventDisplay={'block'}
//           eventTextColor={'#FFF'}
//           eventColor={'#F2921D'}
//           height={'660px'}
//           Toolbar
//         />
//       </div>
//       {/* <div>
//       {this.renderSidebar()}
//       </div> */}
//   </div>
//   );

// }

// export default CalendarView;