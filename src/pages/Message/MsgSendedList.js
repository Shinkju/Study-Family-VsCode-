import { callSendBoxAPI } from '../../apis/MsgApiCalls';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


function MsgSendedList(){


    const dispatch = useDispatch();
    const msg = useSelector(state => state.msgReducer);
    const msgList = msg.data;
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callSendBoxAPI({
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

    }


    return(
        <>
        <div>
            <div>
                <button
                    onClick={ onClickMsgSendingHandler }
                >
                    쪽지 쓰기
                </button>
            </div>
            <table>
                <colgroup>
                    <col width="15%" />
                    <col width="15%" />
                    <col width="40%" />
                    <col width="15%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>수신자</th>
                        <th>제목</th>
                        <th>발신일</th>
                    </tr>
                </thead>
                <tbody>
                { Array.isArray(msgList) && msgList.map((m) => (
                        <tr
                            key={ m.msgCode }
                            // onClick={ () => onClickTableTr(sn.schoolNoticeCode)}
                        >
                            <td>{ m.msgCode }</td>
                            <td>{ m.receiver.professor.professorName || m.receiver.student.studentName }</td>
                            <td>{ m.msgTitle }</td>
                            <td>{ m.shipDate }</td>
                        </tr>
                    ))
                    }                
                </tbody>
            </table>
            <div style={ { listStyleType: 'none', display: 'flex'} }>
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

export default MsgSendedList;