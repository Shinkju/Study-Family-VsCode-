import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from "react";
import{ callStudentListForAdminAPI } from '../../apis/StudentListApiCalls';
import StudentManagementCSS from './StudentManagement.module.css';



function StudentManagement() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const students  = useSelector(state => state.studentListReducer);      
    const studentList = students.data;
    console.log('StudentManagement', studentList);
   

    const pageInfo = students.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);



    const pageNumber = [];
    if(pageInfo){
        for(let i = pageInfo.startPage ; i <= pageInfo.endPage ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {         
            dispatch(callStudentListForAdminAPI({
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    const onClickStudentInsert = () => {
        navigate(`/management/student-registration`, { replace: false })
    }

    const onClickTableTr = (studentNo) => {
        navigate(`/management/studentdetail/${studentNo}`, { replace: false });
    }

    return (
        <>
        <div>
      
            <table className={ StudentManagementCSS.detailTable }>
                <colgroup>
                    <col width="15%" />
                    <col width="20%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>학과</th>
                        <th>학번</th>
                        <th>이름</th>
                        <th>입학년도</th>
                        <th>재학상태</th>
                        <th>국적</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(studentList) && studentList.map((s) => (
                        <tr
                            key={ s.studentNo }
                            onClick={ () => onClickTableTr(s.studentNo) }
                        >
                            <td>{ s.studentNo }</td>
                            <td>{ s.department.departmentName }</td>
                            <td>{ s.studentCode }</td>
                            <td>{ s.studentName }</td>
                            <td>{ s.admissionsDay }</td>
                            <td>{ s.schoolStatus.schoolStatusName }</td>
                            <td>{ s.nationality }</td>
                        </tr>
                    )) 
                    }
                </tbody>                    
            </table>       
            
            <div>
                <button 
                    onClick={ onClickStudentInsert }
                >
                    학생 등록
                </button>
            </div>      
        </div>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(studentList) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                    
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(studentList) &&
            <button 
                
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
            >
                &gt;
            </button>
            }
        </div>
        </>
    );
}

export default StudentManagement;