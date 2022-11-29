import { callRegistTaskAPI } from '../../apis/LectureApiCalls';
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate  } from "react-router-dom";
import lectureListStuCSS from './LectureStu_module.css';

function TaskRegistStu(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInput = useRef();
    const [img, setImg] = useState(null);
    const [imgUrl, setImgUrl] = useState('');

    const [form, setForm] = useState({
        task: 0,
        originName: '',
        fileType: ''
    })


    //file 리랜더링 시 작동 
    useEffect(() => {

        if(img) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if(result) {
                    setImgUrl(result);
                }
            }
            fileReader.readAsDataURL(img);
        }
    },[img]);


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

        const img = e.target.files[0];
        setImg(img);

        console.log(e.target.files[0]);
    };


    const onClickLectureRegistHandler = () => {

        const formData = new FormData();
        formData.append("task", form.task);
        formData.append("originName", form.originName);
        formData.append("fileType", form.fileType);
        formData.append("lectureFiles", img);

        dispatch(callRegistTaskAPI({
            form : formData
        }));

        // navigate(-1)
        alert('과제 등록이 완료 되었습니다.');
    }



    return(
        
        <div style={{ marginLeft:600, paddingTop:200 }}>
            <div>
                <table style={{ width:800, height:300 }}>
                    <tbody>
                        <tr>
                            <td>
                                <label>자료 코드</label>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="task"
                                    style={{ width:400 }}
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
                                    type="text"
                                    name="fileType"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                    { imgUrl && <img 
                            src={ imgUrl } 
                            alt="preview"
                            autoPlay={ true }
                            muted ={ true }
                        />}
                    <div>
                        <input
                            type="file"
                            name="lectureFiles"
                            accept = ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/*, video/*"
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

export default TaskRegistStu;