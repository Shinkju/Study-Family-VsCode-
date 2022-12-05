import { callReceivedBoxAPI } from '../../apis/MsgApiCalls';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


function MsgReceiveList(){


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const msg = useSelector(state => state.msgReducer);
    const msgList = msg.data;
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callReceivedBoxAPI({
                currentPage : currentPage
            }));
            }
        , [currentPage]
    );


    /* 페이징 버튼 */
    const pageInfo = msg.pageInfo;
    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    //쪽지 작성 페이지 넘기기
    const onClickMsgSendingHandler = () => {
        navigate("/layout/msgSend", { replace : false });
    }

    //수신함 페이지
    const onClickReceiveBoxHandler = () => {
        navigate("/layout/msgReceiveList", { replace : false });
    }

    //발신함 페이지
    const onClickSendedBoxHandler = () => {
        navigate("/layout/msgSendedList", { replace : false });
    }


    return(
        <>
        <div>
            <div>
                <div style={{ marginLeft:350, paddingTop:20, paddingBottom:80 }}>
                    <h2
                        style={{  float:'left', cursor:"pointer" }}
                        onClick={ onClickReceiveBoxHandler }
                    >
                        수신 쪽지함 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </h2>
                    <h2
                        style={{  float:'left', cursor:"pointer" }}
                        onClick={ onClickSendedBoxHandler }
                    >
                        발신 쪽지함
                    </h2>
                </div>
            </div><br/><br/>
            <div>
            <table>
                <colgroup>
                    <col width="5%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="5%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>발신자</th>
                        <th>제목</th>
                        <th>수신일</th>
                    </tr>
                </thead>
                <tbody>
                { Array.isArray(msgList) && msgList.map((m) => (
                        <tr
                            key={ m.msgCode }
                            // onClick={ () => onClickTableTr(sn.schoolNoticeCode)}
                        >
                            <td>{ m.msgCode }</td>
                            <td>{ m.sender.professor?.professorName || m.sender.student?.studentName }</td>
                            <td>{ m.msgTitle }</td>
                            <td>{ m.receiveDate }</td>
                        </tr>
                    ))
                    }                
                </tbody>
            </table>
            </div><br/>
            <div>
                <button
                    onClick={ onClickMsgSendingHandler }
                    style={{ float:"right", width:130, height:50, fontSize:16 }}
                >
                    쪽지 쓰기
                </button>
            </div><br/><br/>
            <div style={ { listStyleType: 'none', display: 'flex', justifyContent: "center"} }>
            {
                Array.isArray(msgList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage - 1) }
                    disabled={ currentPage === 1 }
                >
                    &lt;
                </button>
            }    
            {
                pageNumber.map((num) => (
                    <li key={num} onClick={ () => setCurrentPage(num) }>
                        <button
                            style={ currentPage === num ? { backgroundColor : 'orange'} : null }
                        >
                            {num}
                        </button>
                    </li>
                ))
            }
            {
                Array.isArray(msgList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage + 1) }
                    disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
                >
                    &gt;
                </button>
            } 
            </div>
        </div>
        </>
    );
}

export default MsgReceiveList;