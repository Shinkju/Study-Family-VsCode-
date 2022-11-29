// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { callLectureStuDetailAPI } from '../../../apis/LectureApiCalls';
// import ReactPlayer from 'react-player/lazy';
import { useRef , useState } from "react";
import LecModalCSS from './LectureRegistModal.module.css';
import React from 'react';


function LecModal({savedRoute, setLecModal}){

    
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const lecture = useSelector(state => state.lectureReducer);
    // const lectureModal = lecture.data;
    // const params = useParams();

    console.log("savedRoute = ", savedRoute)


    return( 
        <div>
            <div style={ { zindex:100, position:"absolute", marginLeft:400 } }>
                <video 
                    width='1200px' 
                    height='600px' 
                    controls={true}
                >
                    <source 
                        src={ savedRoute } 
                        type="video/mp4"
                    />
                </video>
                <button
                        style={ { marginLeft: 5 } }
                        onClick={ () => setLecModal(false) }
                    >
                        X
                </button>
            </div>
        </div>
    )
}

export default LecModal;