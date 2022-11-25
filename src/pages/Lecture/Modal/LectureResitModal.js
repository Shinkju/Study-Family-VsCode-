import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import LectureRegistModalCSS from './LectureRegistModal.module.css';
// import {  } from "../../apis/ProductAPICalls";
 
function LectureResitModal() {

    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const fileInput = useRef();    
    const [file, setFile] = useState(null);   
    const [ fileUrl, setFileUrl] = useState('');
   

    const [form, setForm] = useState({
       week : '',
       startDate : '',
       endDate : '',
       originalName : '',
       fileType : '',
       lectureWeekCode : ''
    });

    //입력 양식 변경 시 동작 함
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    //파일 첨부 버튼 클릭 이벤트
    const onClickFileUpload = () => {
        //ref하는 대상의 현재상태를 참조한다는 의미!
        fileInput.current.click();
    }

    //파일 첨부 시 동작하는 이벤트
    const onChangeImageUpload = (e) => {

        const file = e.target.files[0];

        setFile(file);
    }

    //상품 등록 버튼 클릭 이벤트 
    const onClickProductRegistrationHandler = () => {

        const formData = new FormData();   

        //formData에 value 값을 넣을때는 append() 사용
        formData.append("productName", form.productName);
        formData.append("productPrice", form.productPrice);
        formData.append("productOrderable", form.productOrderable);
        formData.append("productStock", form.productStock);
        formData.append("productDescription", form.productDescription);
                        //매칭 시킬 name 이기 때문에 category 안의 categoryCode로 가져온다.
        formData.append("category.categoryCode", form.categoryCode);

        //이미지는 첨부 될수도 안될수도 있기 때문에 if문으로 묶어준다.
        if(file) {
            formData.append("savedRoute", file);
        }

        //API 호출
        dispatch(({
            form : formData
        }));
        
        //등록 완료 후 admin-상품 리스트로 이동
        navigate('/product-management', { replace : true });
        alert('메뉴 등록이 완료되었습니다.');
        window.location.reload();
    }
 
  
    return (        
        <div className={LectureRegistModalCSS.modal}>
            <div className={ LectureRegistModalCSS.modalContainer }>
                <div className={ LectureRegistModalCSS.loginModalDiv }>
                    <h1>파일 등록</h1>
                    <input 
                        type="file" 
                        name='savedRoute'
                        accept='image/jpg,image/png,image/jpeg,image/gif,video/*'
                        onChange={ onChangeHandler }
                        ref={ fileInput }
                    />
                    <button 
                        className=''
                        onClick={ onClickFileUpload } //위 input의 참조값을 받아 업로드한다.
                    >
                        이미지 업로드
                    </button>



                    <div className={ LectureRegistModalCSS.productInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>회차 코드</label></td>
                                <td>
                                    <input 
                                        name='lectureWeekCode'
                                        id='lectureWeekCode'
                                        type='number'
                                        className={ LectureRegistModalCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>  

                            <tr>
                                <td><label>회차</label></td>
                                <td>
                                    <input 
                                        name='week'
                                        id='week'
                                        type='text'
                                        placeholder='상품 이름'
                                        className={ LectureRegistModalCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr> 

                            <tr>
                                <td><label>시작 일자</label></td>
                                <td>
                                    <input 
                                        name='startDate'
                                        id='startDate'
                                        type='date'
                                        className={ LectureRegistModalCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>    

                            <tr>
                                <td><label>파일 명</label></td>
                                <td>
                                    <input 
                                        name='originalName'
                                        id='originalName'
                                        type='text'
                                        className={ LectureRegistModalCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>  

                            <tr>
                                <td><label>파일 종류</label></td>
                                <td>
                                    <label><input type="radio" name="fileType" onChange={ onChangeHandler } value="동영상"/> 동영상</label> &nbsp;
                                    <label><input type="radio" name="fileType" onChange={ onChangeHandler } value="외 파일"/> 외 파일</label> &nbsp;
                                </td>
                            </tr>  
                        </tbody>                        
                    </table>
                </div>










                    <button
                        onClick={ onClickProductRegistrationHandler }
                    >
                        등록
                    </button>
                    <button
                        style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                        onClick={ () => LectureResitModal(false) }  
                    >
                        돌아가기
                    </button>
                </div>
            </div>
        </div>
    )   
}
 
export default LectureResitModal;