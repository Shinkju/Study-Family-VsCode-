import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callSubnoticeWriteAPI }  from '../../apis/SubnoticeApiCalls';
import SubnoticeDetailCSS from './SubnoticeDetail.module.css';
import BtnCSS from './Btn.module.css';
import Swal from 'sweetalert2';

function SubnoticeModal({lectureCode}) {
    
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

     const [form, setForm] = useState({
        lectureCode: lectureCode,   
        subnoticeTitle: '',
        content: ''
     });

     const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    // 공지사항 작성
    const onClickSubnoticeMakeHandler = () => {        
       
        dispatch(callSubnoticeWriteAPI({	
            form : form
        }));

        Swal.fire({
            title: '작성 완료',
            icon: 'success'
          }).then((result) => {
            if (result.value) {
                navigate(`/layout/subnotice`, { replace: true});
                window.location.reload();
            }
        })
    }

        return (
        <div>
                <div> <br/><br/><br/>
                <table className={ SubnoticeDetailCSS.subNoticeInsertTable }>
                <tbody>
                    <tr>
                    <td><input
                        className={ SubnoticeDetailCSS.code }  
                        name="lectureCode"
                        placeholder="코드를 입력하세요."
                        autoComplete='off'
                        onChange={ onChangeHandler }/>
                    </td>
                    </tr>

                    <tr>
                    <td>
                    <input
                        className={ SubnoticeDetailCSS.subNoticeTitle }  
                        name="subnoticeTitle"
                        placeholder="제목을 입력하세요."
                        onChange={ onChangeHandler }
                    />
                    </td>
                    </tr>

                    <tr>
                    <td>
                    <textarea
                        placeholder="내용을 입력하세요."
                        name="content"
                        autoComplete='off'
                        onChange={ onChangeHandler }
                    >
                    </textarea>
                    </td></tr>
                </tbody>
            </table>
        </div>
    <br/>

                    <div className= { BtnCSS.sinBtn } >
                   <button className= { BtnCSS.sinBtn2 } 
                        onClick={ () => navigate(-1) }
                    >
                        돌아가기
                    </button>

                    <button className= { BtnCSS.sinBtn2 } 
                    onClick={ onClickSubnoticeMakeHandler }
                    >       
                        공지등록
                    </button>
            </div>
        </div>
    );
}

export default SubnoticeModal;