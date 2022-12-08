import { callRegistTaskAPI } from '../../apis/LectureApiCalls';
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate  } from "react-router-dom";
import FileRegistCSS from './FileRegist.module.css';
import Swal from 'sweetalert2'

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

        Swal.fire({
            title: '과제 등록 성공',
            text: "과제 등록이 완료 되었습니다.",
            icon: 'success'
          }).then((result) => {
            if (result.value) {
                navigate(-1) 
                window.location.reload();
            }
        })
    }



    return(
        
        <div style={{ paddingTop:130 }}>
            <h1 style={{ textAlign:'center' }}>과제 제출</h1>
            <div> 
                <table className={ FileRegistCSS.tbodySt }>
                    <p style={{ width:300, height:10}}></p>
                    <tbody>
                        <tr>
                            <td className={ FileRegistCSS.labelSt }>
                                <label>자료 코드</label>
                            </td>
                            <td>
                                <input
                                    className={ FileRegistCSS.inputBox }
                                    type="number"
                                    name="task"
                                    style={{ width:400 }}
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
                                    style={{ width:400 }}
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
                                    type="text"
                                    name="fileType"
                                    style={{ width:400 }}
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <div style={{ paddingTop:30 }}>
                    { imgUrl && <img 
                            src={ imgUrl } 
                            alt="preview"
                            autoPlay={ true }
                            muted ={ true }
                        />}
                </div>
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
                        <button 
                            style={{ marginLeft:40 }}
                            onClick={handleButtonClick}
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

export default TaskRegistStu;