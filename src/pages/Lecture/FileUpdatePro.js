import { callLectureProDetailAPI, callProductUpdateAPI } from '../../apis/LectureApiCalls';
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { decodeJwt } from '../../utils/tokenUtils';


function FileUpdatePro(){

    const params = useParams(); 
    const lectureDetail = useSelector(state => state.lectureReducer);
    const lectureCode = params.lectureCode;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInput = useRef();   
    const [video, setVideo] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');

    //읽기모드(false), 수정모드(true)
    const [modifyMode, setModifyMode] = useState(false); 
    const [form, setForm] = useState({});

    const token = decodeJwt(window.localStorage.getItem("accessToken"));  
    
    useEffect(() => {
        dispatch(callLectureProDetailAPI({
            lectureCode : lectureCode
        }));
    },
    []);


    //file preview 
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
    };



    //수정 모드 변경
    const onClickModifyHandler = () => {
        setModifyMode(true);
        setForm({
            fileCode : lectureDetail.lectureWeeks.fileCode,
            lectureWeek : lectureDetail.lectureWeeks.lectureWeek,
            originName : lectureDetail.lectureWeeks.originName,
            startDate : lectureDetail.lectureWeeks.startDate,
            endDate : lectureDetail.lectureWeeks.endDate,
            fileType : lectureDetail.lectureWeeks.fileType,
            week : lectureDetail.lectureWeeks.week
        });
    }


    //수정 내용 등록하기
    const onClickLectureRegistHandler = () => {

        const formData = new FormData();
        formData.append("lectureWeeks.fileCode", form.fileCode);
        formData.append("lectureWeeks.lectureWeek", form.lectureWeek);
        formData.append("lectureWeeks.originName", form.originName);
        formData.append("lectureWeeks.startDate", form.startDate);
        formData.append("lectureWeeks.endDate", form.endDate);
        formData.append("lectureWeeks.week", form.week);
        formData.append("lectureWeeks.fileType", form.fileType);

        if(video) {
            formData.append("lectureFiles", video);
        }
        
        dispatch(callProductUpdateAPI({
            form : formData
        }));


        //등록 후 디테일 페이지로 돌아가기
        navigate(-1) 
        alert('수업자료가 등록 되었습니다.');

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
                                    value={ (!modifyMode ? lectureDetail.lectureWeeks.lectureWeek : form.lectureWeek) || '' }
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true } 
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
                                    value={ (!modifyMode ? lectureDetail.lectureWeeks.week : form.week) || '' }
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true } 
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
                                    value={ (!modifyMode ? lectureDetail.lectureWeeks.startDate : form.startDate) || '' }
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true } 
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
                                    value={ (!modifyMode ? lectureDetail.lectureWeeks.endDate : form.endDate) || '' }
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true } 
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
                                    value={ (!modifyMode ? lectureDetail.lectureWeeks.originName : form.originName) || '' }
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true } 
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
                                    type="text"
                                    value={ (!modifyMode ? lectureDetail.lectureWeeks.fileType : form.fileType) || '' }
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true } 
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                    { lectureDetail && <video 
                            src={ (videoUrl == null) ? lectureDetail.lectureWeeks.savedRoute : videoUrl } 
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
                        <button 
                            onClick={handleButtonClick}
                            disabled={ !modifyMode }     
                        >
                            파일 업로드
                        </button>
                    </div>
            </div>
            <div>
            {modifyMode &&
                <button
                    onClick={ onClickLectureRegistHandler }
                >
                    저장 하기
                </button>
}
            {!modifyMode &&
                <button
                    onClick={ onClickModifyHandler }
                >
                    수정 모드
                </button>
            }
                <button
                    onClick={ () => navigate(-1) }
                >
                    목록
                </button>
            </div>
        </div>
        
    );

}

export default FileUpdatePro;