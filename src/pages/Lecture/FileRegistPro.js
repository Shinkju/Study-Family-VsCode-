import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { callRegistFileAPI } from '../../apis/LectureApiCalls';
import React from "react";
import { useNavigate  } from "react-router-dom";

function FileRegistPro(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInput = useRef();
    const [video, setVideo] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');

    const [form, setForm] = useState({
        lectureWeek: 0,
        originName: '',
        week: '',
        startDate: 0,
        endDate: 0,
        fileType: ''
    });

    //file 리랜더링 시 작동 
    useEffect(() => {

        if(video) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if(result) {
                    setVideoUrl(result);
                }
            }
            fileReader.readAsDataURL(video);
        }
    },[video]);




    //입력양식 변경
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }



    //파일 첨부 버튼 클릭
    const handleButtonClick = () => {

      fileInput.current.click();

    };



    //파일 첨부
    const handleChange = (e) => {

        const video = e.target.files[0];
        setVideo(video);

        console.log(e.target.files[0]);
    };



    //등록하기
    const onClickLectureRegistHandler = () => {

        const formData = new FormData();
        formData.append("lectureWeek", form.lectureWeek);
        formData.append("originName", form.originName);
        formData.append("startDate", form.startDate);
        formData.append("endDate", form.endDate);
        formData.append("lectureWeek.week", form.week);
        formData.append("fileType", form.fileType);

        if(video) {
            formData.append("lectureFiles", video);
        }
        
        dispatch(callRegistFileAPI({
            form : formData
        }));

        //등록 후 디테일 페이지로 돌아가기
        navigate(-1) 
        alert('수업자료가 등록 되었습니다.');
        window.location.reload();
    };



    return(
        
        <div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>회차 코드</label>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="lectureWeek"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>회차</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="week"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>시작일</label>
                            </td>
                            <td>
                                <input
                                    type="date"
                                    name="startDate"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>마감일</label>
                            </td>
                            <td>
                                <input
                                    type="date"
                                    name="endDate"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>자료명</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="originName"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>자료 타입</label>
                            </td>
                            <td>
                                <input
                                    name="fileType"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                    { videoUrl && <video 
                            src={ videoUrl } 
                            alt="preview"
                            autoPlay={ true }
                            muted ={ true }
                        />}
                    <div>
                        <input
                            type="file"
                            name="lectureFiles"
                            accept = "image/jpg, image/jpeg, image/png, video/*"
                            ref={ fileInput }
                            onChange={ handleChange }
                            multiple={true}
                            style={{ display: "none" }}
                        />  
                        <button onClick={handleButtonClick}>파일 업로드</button>
                    </div>
            </div>
            <div>
                <button
                    onClick={ onClickLectureRegistHandler }
                >
                    등록 하기
                </button>
                <button
                    onClick={ () => navigate(-1) }
                >
                    목록
                </button>
            </div>
        </div>
        
    );
}

export default FileRegistPro;