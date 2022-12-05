import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import{ callProfessorListForAdminAPI } from '../../apis/ProfessorListApiCalls';
import ProfessorManagementCSS from './ProfessorManagement.module.css';



function ProfessorManagement() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const professors  = useSelector(state => state.professorListReducer);      
    const professorList = professors.data;
    console.log('ProfessorManagement', professorList);

    const pageInfo = professors.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = pageInfo.startPage ; i <= pageInfo.endPage ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {         
            dispatch(callProfessorListForAdminAPI({
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    const onClickProfessorInsert = () => {
        navigate(`/management/professor-registration`, { replace: false })
    }

    const onClickTableTr = (professorCode) => {
        navigate(`/management/professordetail/${professorCode}`, { replace: false });
    }

    return (
        <>
        <div>
            <table className={ ProfessorManagementCSS.professorListTable }>
                <colgroup>
                    <col width="15%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>학과</th>
                        <th>이름</th>
                        <th>직위</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(professorList) && professorList.map((p) => (
                        <tr
                            key={ p.professorCode }
                            onClick={ () => onClickTableTr(p.professorCode) }
                        >
                            <td>{ p.professorCode }</td>
                            <td>{ p.department.departmentName }</td>
                            <td>{ p.professorName }</td>
                            <td>{ p.professorPosition }</td>
                        </tr>
                    )) 
                    }
                </tbody>                    
            </table>         
            <div>
                <button 
                    onClick={ onClickProfessorInsert }
                >
                    교수 등록
                </button>
            </div>      
        </div>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(professorList) &&
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
            { Array.isArray(professorList) &&
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

export default ProfessorManagement;