import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callLectureStuListAPI } from '../../apis/LectureApiCalls';
import lectureListStuCSS from './LectureStu_module.css';



function LectureStuList(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const lectures = useSelector(state => state.lectureReducer);
    const lectureList = lectures.data;       
    const pageInfo = lectures.pageInfo;



    /* paging */
    const pageNumber = [];
    if(pageInfo){
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++){
            pageNumber.push(i);
        }
    }


    useEffect(() => {
        dispatch(callLectureStuListAPI({
            studentNo : params.studentNo,
            currentPage : currentPage       
        }));

        }
     ,[currentPage] 
    )

    //학생 강의실 상세 페이지 넘기기
    const onClickTableTr = (lectureCode) => {
        navigate(`/lectureStuDetail/${lectureCode}`, { replace : true });
    }



    return(
        <>
            <div>
                <table>
                    <colgroup>
                        <col width="10%" />
                        <col width="50%" />
                        <col width="20%" />
                        <col width="20%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>강좌 명</th>
                            <th>담당 학과</th>
                            <th>담당 교수</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                            Array.isArray(lectureList) && lectureList.map(
                                (lecture) => (
                                    <tr
                                        key={ lecture.lectureCode }
                                    >
                                        <td>테스트 데이터</td>
                                        <td>테스트 데이터</td>
                                        <td>테스트 데이터</td>
                                        <td>{ lecture.lectureCode || '' }</td>
                                        <td>{ lecture.lectureName || '' }</td>
                                    </tr>
                                )
                            )
                        } */}
                        <tr>
                            <td>테스트 데이터</td>
                            <td>테스트 데이터</td>
                            <td>테스트 데이터</td>
                            <button
                                onClick={ () => onClickTableTr() }
                            >
                            입장하기
                            </button>  
                        </tr>
                    </tbody>              
                </table>         
            </div>

            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
             {
                Array.isArray(lectureList) &&
                //왼쪽 방향 버튼!
                <button
                    onClick={ () => setCurrentPage(currentPage -1) }
                    disabled={ currentPage === 1 }  //현재페이지가 1페이지면 비활성화
                    className={ lectureListStuCSS }
                >
                    &lt;
                </button>
            }
            {
                //숫자 버튼 처리    - 반복적으로 나타내야 하는 요소들은 key={}를 사용하는것이 좋다.
                pageNumber.map((num) => (  //결과를 가공시키기 위해 map() 처리
                    <li key={num} onClick={ () => setCurrentPage(num) }>
                        <button
                            style={ currentPage === num ? { backgroundColor : 'orange' } : null }
                            className={ lectureListStuCSS }
                        >
                            {num}
                        </button>
                    </li>
                ))    
            }
            {
                Array.isArray(lectureList) &&
                //오른쪽 방향 버튼
                <button
                    onClick={ () => setCurrentPage(currentPage +1) }
                    disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}  //현재페이지가 마지막페이지면 비활성화
                    className={ lectureListStuCSS }
                >
                    &gt;
                </button>
            }
            </div>
        </>
    )
}

export default LectureStuList;