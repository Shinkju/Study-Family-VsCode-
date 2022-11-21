import SubnoticeCSS from './Subnotice.module.css';

function NavbarSubnotice() {

    return(
      
        <div className={ SubnoticeCSS.SubnoticeDiv }>
        <ul className={ SubnoticeCSS.SubnoticeUl }>
            <li>No</li>
            <li>제목</li>
            <li>작성일</li>
        </ul>
        </div>
      
    );
}

export default NavbarSubnotice;



