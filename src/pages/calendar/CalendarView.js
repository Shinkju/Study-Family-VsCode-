import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';

import { callCalendarViewApi } from "../../apis/CalendarApiCalls";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// https://fullcalendar.io/docs/google-calendar
function CalendarView() {
  
  const apiKey = process.env.REACT_APP_CAL_API_KEY;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const calendars = useSelector(state => state.calendarReducer);

  // const calendar = calendars.map(calendar => {
  //   return { content : calendar.content };
  // });

  // const onClickCalendarClickDayHandler = (e) => {
  //   dispatch(callCalendarViewApi({
      
  //   }));
  // }

  useEffect(
    () => {
      dispatch(callCalendarViewApi)
    }, []
  );

  const onclickDateSelectHandler = (e) => {
    
  }

  var result = [];

  return (
    <>
    <div className="cal-container">
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey={apiKey}
        selectable={true}
        select={ function(e) {
          const clickDay = moment(e.endStr).subtract(1, 'day').format('YYYY-MM-DD');
          navigate(`/calendarView`, { state : { start : e.startStr, end : clickDay } });
        }}
        events={
          {'title': 'TEST', 'content': 'TEST', 'backgroundColor': '#C27EE2', 'AllDay' : true}
        }

        eventDisplay={'block'}
        eventTextColor={'#FFF'}
        eventColor={'#F2921D'}
        height={'660px'}
        Toolbar
      />
    </div>
    <div>
      <input
        type= 'text'
        onClick = { onclickDateSelectHandler }
      >
      </input>
    </div>
  </>
  );
}

export default CalendarView;