import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { callLectureStuDetailAPI } from '../../../apis/LectureApiCalls';
import LecModalCSS from './LectureRegistModal.module.css';
import React from 'react';
// import ReactPlayer from 'react-player/lazy';

function LecModal({savedRoute, setLecModal}){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lecture = useSelector(state => state.lectureReducer);
    const lectureModal = lecture.data;
    const params = useParams();


    console.log("savedRoute = ", savedRoute)


    return( 
        <div>
            <div>
                <video 
                    // url={process.env.PUBLIC_URL + savedRoute}
                    width='auto' 
                    height='auto' 
                    controls={true}
                >
                    {/* <source src={ require(savedRoute) } type="video/mp4"/> */}
                    <source src={ savedRoute } type="video/mp4"/>
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