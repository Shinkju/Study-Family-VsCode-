import { useNavigate, useLocation } from 'react-router-dom';
import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { callCalendarInsertApi } from '../../apis/CalendarApiCalls';

function CalendarRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const calendars = useSelector(state => state.calendarReducer);

    const [form, setForm] = useState({
        scheduleContent: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickCalendarInsertHandler = () => {

        const formData = new FormData();

        formData.append("scheduleContent", form.scheduleContent);

        dispatch(callCalendarInsertApi({
            form : formData
        }));
        console.log(formData);
    }

    // return(

    // );

}

export default CalendarRegist;