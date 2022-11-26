import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callAppClassAPI,callAppClassListAPI } from '../../apis/AppClassApiCalls';
import { decodeJwt } from '../../utils/tokenUtils';
import AppClassCSS from './AppClass.module.css';
import { useState } from 'react';
import PageCSS from './Page.module.css';

function AppClass() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const lecture = useSelector(state => state.lectureReducer);
    const lectureList = lecture.data;     
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  
    

    /* 페이징 버튼 */
    const [currentPage, setCurrentPage] = useState(1);
    const pageInfo = lecture.pageInfo;
    const pageNumber = [];
    if (pageInfo) {
        for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callAppClassListAPI({
                lectureCode : params.lectureCode,
                currentPage : currentPage
            }));
        }
        , [currentPage]
    );

    /* 수강 목록 클릭시 이동 */
    const onClickAppClassListHandler = () => {
        navigate("/AppClassMyList", { replace : true });
    }

    const [form, setForm] = useState({
        lectureCode : lecture.lectureCode
    });
  

    /* 수강신청 버튼 이벤트 */
    const onClickAppClassHandler = () => {

        dispatch(callAppClassAPI({
            form : form
        }));

        alert("수강 신청 되었습니다.");

    }


    return (
        <>
      
                <div>
                <table>
                    <colgroup>
                        <col width="15%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="5%" />
                    </colgroup>
                    <thead>
                        <tr>
                        <th>구분</th>
                         <th>강좌번호</th>
                         <th>학과명</th>
                          <th>강좌명</th>
                          <th>교수명</th>
                          <th>수강신청</th>
                          <th>수강인원</th>
                         <th>강의계획서</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            Array.isArray(lectureList) && lectureList.map(
                                (lecture) => (
                                    <tr
                                    key={ lecture.lectureCode }
                                    >
                                        <td>{ lecture.subject.majorType }</td>
                                        <td>{ lecture.lectureCode }</td>
                                        <td>{ lecture.subject.department.departmentName }</td>
                                        <td>{ lecture.lectureName }</td>
                                        <td>{ lecture.professor.professorName }</td>
                                        <td><button onClick={onClickAppClassHandler}>
                                                신청
                                        </button></td>
                                        <td>{ lecture.lecturePersonnel } / { lecture.capacity }</td>
                                        <td><button>
                                                조회
                                        </button></td>
                                        
                                    </tr>
                                )
                            )
                          
                        }

                    </tbody>    
                    </table>
                    <div className= { AppClassCSS.sinBtn } >
                    <button className= { AppClassCSS.sinBtn2 } onClick= {onClickAppClassListHandler}> 신청목록 </button>
                  </div> 
                  </div>




                  <div style={ { listStyleType: 'none', display: 'flex'} }>
            {
                Array.isArray(lectureList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage - 1) }
                    disabled={ currentPage === 1 }
                    className={ PageCSS.pagingBtn }
                >
                    &lt;
                </button>
            }    
            {
                pageNumber.map((num) => (
                    <li key={num} onClick={ () => setCurrentPage(num) }>
                        <button
                            style={ currentPage === num ? { backgroundColor : 'orange'} : null }
                            className={ PageCSS.pagingBtn }
                        >
                            {num}
                        </button>
                    </li>
                ))
            }
          { 
                 /*이거 쓰면 오류뜸 Array.isArray(lectureList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage + 1) }
                    disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
                    className={ PageCSS.pagingBtn }
                >
                    &gt;
                </button>*/
            } 
            </div>
                   
           </>
    );
}

export default AppClass;