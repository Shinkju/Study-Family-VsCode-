import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callSubnoticeListAPI }  from '../../apis/SubnoticeAPICalls';
import MainCSS from './Main.module.css';
import Subnotices from '../../components/subnotice/Subnotice';

function Subnotice({}) {
    
    /* 강좌공지 목록 데이터 조회 */
    const dispatch = useDispatch();
    const subnotice = useSelector(state => state.subnoticeReducer);
    const subnoticeList = subnotice.data;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callSubnoticeListAPI({
                currentPage : currentPage
            }));
        }
        , [currentPage]
    );

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
        <div className={ MainCSS.productDiv }>
            {
                Array.isArray(subnoticeList) 
                && subnoticeList.map((subnotice) => (<Subnotices key={ subnotice.subnoticeCode } subnotice={ subnotice } />))
            }
            </div>
            <div style={ { listStyleType: 'none', display: 'flex'} }>
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
            </div>


        </>
    );
}

export default Subnotice;