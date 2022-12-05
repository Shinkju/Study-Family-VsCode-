import { callSendMsgAPI } from '../../apis/MsgApiCalls';
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate  } from "react-router-dom";
import RceiverModal from './Modal/RceiverModal';

function MsgSend(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rceiverModal, setReceiverModal] = useState(false);
    const [selectReceiver, setSelectReceiver] = useState('');

    const [form, setForm] = useState({
        lecture: 0,
        receiver: {
            loginCode : 0
        },
        msgTitle: '',
        msgContent: '',
        msgStatus: '발송'
    });


    //수신자 조회 핸들러
    const selectReceiverHandler = () => {
        setReceiverModal(true);
    }

    /* 메시지 내용 상태 저장 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }


    return(
        <>
            <div>
                <div>
                    {
                        rceiverModal ?
                        <RceiverModal
                            form={form}
                            setForm={setForm}
                            // recipientName={selectRecipient}
                            receiver={setSelectReceiver}
                            setReceiverModal={setReceiverModal}
                        /> : null
                    }
                    <div style={{ marginLeft:600, paddingTop:60 }}>
                        <h1>쪽지 작성하기</h1>
                        <button
                            onClick={ selectReceiverHandler }
                        >
                            수신자
                        </button><br/>
                        <input 
                            type="text" 
                            name='msgTitle'
                            placeholder="제목을 작성하세요" 
                            style={{ width:800, height:35, marginTop:10 }}
                            onChange={ onChangeHandler }
                        />
                        <br/>
                        <textarea
                            placeholder="내용을 작성하세요" 
                            name='msgContent'
                            style={{ width:800, height:500, marginTop:20 }}
                            onChange={ onChangeHandler }
                        >
                        </textarea>
                    </div><br/>
                    <div
                        style={{ marginLeft:900 }}
                    >
                        <button
                            // onClick={ onClickProductReviewHandler }
                            style={{ marginRight:40 }}
                        >
                            쪽지 발송
                        </button>
                        <button
                            onClick={ () => navigate(-1) }
                        >
                            쪽지함
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default MsgSend;