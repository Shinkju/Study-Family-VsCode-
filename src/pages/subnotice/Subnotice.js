import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callSubnoticeListAPI }  from '../../apis/SubnoticeApiCalls';
import MainCSS from './Main.module.css';
import SubnoticeModal from './SubnoticeModal';

function Subnotice() {
    
    /* 강좌공지 목록 데이터 조회 */
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const subnotice = useSelector(state => state.subnoticeReducer);
    const subnoticeList = subnotice.data;
    const [currentPage, setCurrentPage] = useState(1);
    const params = useParams();

    const [subnoticeModal, setSubnoticeModal] = useState(false);
    const [lectureCode, setlectureCode] = useState(0);
    const [professorCode, setprofessorCode] = useState(0);

    /* 작성 클릭시 이동 */
    const onClickSubnoticeChangeHandler = () => {
        navigate("/layout/SubnoticeModal", { replace : false });
    }

    /* 공지사항 조회 */
    useEffect(
        () => {
            dispatch(callSubnoticeListAPI({
                currentPage : currentPage
            }));
        }
        , [currentPage]
    )

    /* 상세 조회 */
    const onClickTableTr = (subnoticeCode) => {
        navigate(`/layout/subnoticeDetail/${subnoticeCode}`, { replace : true });
    }
    
    /* 페이징 버튼 */
    const pageInfo = subnotice.pageInfo;
    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }




    return (
         <>
         { 
                subnoticeModal ? 
                <SubnoticeModal 
                    lectureCode={lectureCode} 
                    professorCode={professorCode}
                    setSubnoticeModal={setSubnoticeModal}
                /> 
                : null
            }
        <div>
                <table>
                    <colgroup>
                        <col width="5%" />
                        <col width="5%" />
                        <col width="15%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>강좌명</th>
                            <th>제목</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(subnoticeList) && subnoticeList.map(
                                (subnotice) => (
                                    <tr
                                        key={ subnotice.subnoticeCode }
                                        onClick={ () => onClickTableTr(subnotice.subnoticeCode) }
                                    >
                                        <td>{ subnotice.subnoticeCode }</td>
                                        <td>{ subnotice.lecture.lectureName }</td>
                                        <td className={MainCSS.content}>{ subnotice.subnoticeTitle }</td>
                                        <td>{ subnotice.registrationDate }</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>                    
                </table>            
            </div>

            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            {
                Array.isArray(subnoticeList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage - 1) }
                    disabled={ currentPage === 1 }
                    className={ MainCSS.pagingBtn }
                >
                    &lt;
                </button>
            }    
            {
                pageNumber.map((num) => (
                    <li key={num} onClick={ () => setCurrentPage(num) }>
                        <button
                            style={ currentPage === num ? { backgroundColor : 'orange'} : null }
                            className={ MainCSS.pagingBtn }
                        >
                            {num}
                        </button>
                    </li>
                ))
            }
            {
                Array.isArray(subnoticeList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage + 1) }
                    disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
                    className={ MainCSS.pagingBtn }
                >
                    &gt;
                </button>
            } 
            <button       
                            /*className={ ReviewDetailCSS.backBtn }*/
                            onClick={ onClickSubnoticeChangeHandler }    
                            >                                         
                                    등록
                                </button>
            </div>
        </>
    );
}

export default Subnotice;