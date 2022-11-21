import SubnoticeCSS from './Subnotice.module.css';
import { useNavigate } from 'react-router-dom';

function Subnotice({ subnotice : {subnoticeCode, subnoticeTitle, registrationDate}}) {

    const navigate = useNavigate();

    const onClickSubnoticeHandler = (subnoticeCode) => {
      navigate(`/subnotice/${subnoticeCode}`, { replace : false });
    }

    return (
        <div
            className={ SubnoticeCSS.subnoticeDiv }
            onClick={ () => onClickSubnoticeHandler(subnoticeCode) }
        >
           
            <h5>{ subnoticeTitle }</h5>
            <h5>{ registrationDate }</h5>
        </div>
    );

}

export default Subnotice;