import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callSubnoticeWriteAPI }  from '../../apis/SubnoticeApiCalls';
import SubnoticeDetailCSS from './SubnoticeDetail.module.css';
import BtnCSS from './Btn.module.css';

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
        console.log('[SubnoticeModal] onClickSubnoticeMakeHandler Start!!');        

        dispatch(callSubnoticeWriteAPI({	
            form: form
        }));

        alert('공지사항을 작성하였습니다.');

        navigate(`/layout/subnotice`, { replace: true});
        window.location.reload();

        console.log('[SubnoticeModal] onClickSubnoticeMakeHandler End!!');

    }




           return (
            <div>
            <div>
                <div>
                <input
                        className={ SubnoticeDetailCSS.detailtitle }  
                        type="text"
                        name="lectureCode"
                        placeholder="코드를 입력하세요."
                        autoComplete='off'
                        onChange={ onChangeHandler }
                    />
                    
                    <input
                        className={ SubnoticeDetailCSS.detailtitle }  
                        type="text"
                        name="subnoticeTitle"
                        placeholder="제목을 입력하세요."
                        autoComplete='off'
                        onChange={ onChangeHandler }
                    />
                    <textarea
                        className={ SubnoticeDetailCSS.detailcontent }  
                        placeholder="내용을 입력하세요."
                        name="content"
                        autoComplete='off'
                        onChange={ onChangeHandler }
                    >
                    </textarea>

                    <div className= { BtnCSS.sinBtn } >
                    <button className= { BtnCSS.sinBtn2 } 
                    onClick={ onClickSubnoticeMakeHandler }
                    >       
                        등록
                    </button>
                    
                   <button className= { BtnCSS.sinBtn2 } 
                        onClick={ () => navigate(-1) }
                        // onClick={ () => setSubnoticeModal(false) }
                    >
                        돌아가기
                    </button>
                    </div>
        </div>
        </div>
        </div>
    );
}

export default SubnoticeModal;