import TacMainCSS from './TacMain.module.css';

function TacMain() {
    return (
        <div className={ TacMainCSS.TacMainDiv }>
            <ul className={ TacMainCSS.TacMainUl }>
                <li>구분</li>
                <li>과목번호</li>
                <li>학과명</li>
                <li>교과목명</li>
                <li>교수명</li>
                <li>수강신청</li>
                <li>수강인원</li>
                <li>강의계획서</li>
            </ul>
        </div>
    );
}

export default TacMain;