import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { callRegistFileAPI } from '../../apis/LectureApiCalls';
import React from "react";
import { useNavigate  } from "react-router-dom";
import FileRegistCSS from './FileRegist.module.css';
import Swal from 'sweetalert2'

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
        Swal.fire({
            title: '자료 등록 성공',
            text: "수업자료가 등록 되었습니다.",
            icon: 'success'
          }).then((result) => {
            if (result.value) {
                navigate(-1) 
                window.location.reload();
            }
          })

    };



    return(
        
        <div style={{ paddingTop:130 }}>
            <h1 style={{ textAlign:'center' }}>자료 등록</h1>
            <div>
                <table className={ FileRegistCSS.tbodySt }>
                    <p style={{ width:300, height:10}}></p>
                    <tbody>
                        <tr>
                            <td className={ FileRegistCSS.labelSt }>
                                <label>회차 코드</label>
                            </td>
                            <td>
                                <input
                                    className={ FileRegistCSS.inputBox }
                                    type="number"
                                    name="lectureWeek"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={ FileRegistCSS.labelSt }>
                                <label>회차</label>
                            </td>
                            <td>
                                <input
                                    className={ FileRegistCSS.inputBox }
                                    type="text"
                                    name="week"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={ FileRegistCSS.labelSt }>
                                <label>시작일</label>
                            </td>
                            <td>
                                <input
                                    className={ FileRegistCSS.inputBox }
                                    type="date"
                                    name="startDate"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={ FileRegistCSS.labelSt }>
                                <label>마감일</label>
                            </td>
                            <td>
                                <input
                                    className={ FileRegistCSS.inputBox }
                                    type="date"
                                    name="endDate"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={ FileRegistCSS.labelSt }>
                                <label>자료명</label>
                            </td>
                            <td>
                                <input
                                    className={ FileRegistCSS.inputBox }
                                    type="text"
                                    name="originName"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={ FileRegistCSS.labelSt }>
                                <label>자료 타입</label>
                            </td>
                            <td>
                                <input
                                    className={ FileRegistCSS.inputBox }
                                    name="fileType"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <div style={{ paddingTop:30, marginLeft:40 }}>
                    <strong
                        style={{ paddingTop:30, marginLeft:40 }}
                    >
                        자료 영상 미리보기
                    </strong>
                    <p>
                        { videoUrl && <video 
                                src={ videoUrl } 
                                alt="preview"
                                autoPlay={ true }
                                muted ={ true }
                            />}
                    </p>
                </div>
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
                    <button 
                        onClick={handleButtonClick}
                        style={{ marginLeft:40 }}
                    >
                        파일 업로드
                    </button>
                    <button
                        onClick={ () => navigate(-1) }
                        style={{ float:"right", marginRight:50, marginLeft:4 }}
                    >
                        목록
                    </button>
                    <button
                        onClick={ onClickLectureRegistHandler }
                        style={{ float:"right" }}
                    >
                        등록 하기
                    </button>
                </div>
            </div>
        </div>
        
    );
}

export default FileRegistPro;