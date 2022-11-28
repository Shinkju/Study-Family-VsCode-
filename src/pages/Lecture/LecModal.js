import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LecModalCSS from './LecModal.module.css';
import { callLectureStuDetailAPI } from '../../apis/LectureAPICalls';

function LecModal({setLecModal}){

    const dispatch = useDispatch();
    const lecture = useSelector(state => state.lectureReducer);
    const lectureModal = lecture.data;
    const params = useParams();


    console.log(lectureModal)


    useEffect(
        () => {
            console.log('[lectureModal 동영상 정보 : ', params.lectureModal.lectureWeeks.file);
            
             dispatch(callLectureStuDetailAPI({
                lectureCode: params.lectureCode
            }));
            
        },
        []
    );




    return(
        <div>
            <div>
                <video width='800' height='400' controls="controls">
                    {/* <source src={require("../../components/file/petVideo.mp4")} type="video/mp4"/> */}
                    <source src={ lecture.lectureWeeks.file } type="video/mp4"/>
                </video>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick={ () => setLecModal(false) }
                >
                    X
                </button>
            </div>
        </div>
    )
}

export default LecModal;