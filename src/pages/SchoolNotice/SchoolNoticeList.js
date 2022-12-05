import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callSchoolNoticeListAPI } from "../../apis/SchoolNoticeApiCalls";

function SchoolNoticeList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const schoolNotices = useSelector(state => state.schoolNoticeReducer);
    const schoolNoticeList = schoolNotices.data;
    console.log('SchoolNotice', schoolNoticeList);

    const pageInfo = schoolNotices.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage ; i <= pageInfo.endPage ; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callSchoolNoticeListAPI({
                currentPage: currentPage
            }));
        }
        ,[currentPage]
    );

    const onClickSchoolNoticeInsert = () => {
        navigate(`/board/schoolnotice-registration`, { replace: false })
    }

    const onClickTableTr = (schoolNoticeCode) => {
        navigate(`/board/schoolnoticeDetail/${schoolNoticeCode}`, { replace: false });
    }    

    return (
        <>
        <div>
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
                        <th>구분</th>
                        <th>제목</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(schoolNoticeList) && schoolNoticeList.map((sn) => (
                        <tr
                            key={ sn.schoolNoticeCode }
                            onClick={ () => onClickTableTr(sn.schoolNoticeCode)}
                        >
                            <td>{ sn.schoolNoticeCode }</td>
                            <td>{ sn.schoolNoticeCategory }</td>
                            <td>{ sn.schoolNoticeTitle }</td>
                            <td>{ sn.schoolNoticeRegDate }</td>
                        </tr>
                    ))
                    }                    
                </tbody>
            </table>
            <div>
                <button
                    onClick={ onClickSchoolNoticeInsert }
                >
                    게시글 등록
                </button>
            </div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                { Array.isArray(schoolNoticeList) &&
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => {
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button
                            style={ currentPage === num ? {backgroundColor : 'orange'} : null}
                        >
                            {num}
                        </button>
                    </li>
                })}
                { Array.isArray(schoolNoticeList) &&
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
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

export default SchoolNoticeList;