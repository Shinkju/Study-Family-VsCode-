import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callCalendarSelectApi, callCalendarUpdateApi, callCalendarDeleteApi } from '../../apis/CalendarApiCalls';

function CalendarSelect ({}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const calendars = useSelector(state => state.calendarReducer);
    const params = useParams();
    const calendarCode = params.calendarCode;
    const [form, setForm] = useState({});
    const [modifyMode, setModifyMode] = useState(false);

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            calendarContent : calendars.calendarCode
        });
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    useEffect(
        () => {
            dispatch(callCalendarSelectApi({
                calendarCode : calendarCode
            }));
        },
        []
    );


    const onClickCalendarUpdateHandler = () => {

        const formData = new FormData();

        formData.append("calendarContent", form.calendarContent);

        dispatch(callCalendarUpdateApi({
            form : formData
        }));

        navigate('/calendarView', { replace : true });
        window.location.reload();
    }

    const onClickCalendarDeleteHandler = () => {

        dispatch(callCalendarDeleteApi({
            calendarCode : calendars.calendarCode
        }));

        navigate('/calendarView', { replace : false });
        window.location.reload();
    }

    const onClickBackHandler = () => {
        navigate('/calendarView', { replace : false });
        window.location.reload();
    }

    // return(
        
    // );
}

export default CalendarSelect;