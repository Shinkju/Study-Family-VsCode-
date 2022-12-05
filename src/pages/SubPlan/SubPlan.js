import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import styles from './ModalBasic.module.css';
import { callSubPlanListAPI } from '../../apis/SubPlanApiCalls';

function SubPlan({ setModalOpen , lectureCode}) {

    const dispatch = useDispatch();
    const subPlan = useSelector(state => state.subPlanReducer);  

    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    /* 수업계획서 조회 */
    useEffect(
        () => {
        console.log('[SubPlan] planCode페이지쪽 : ', lectureCode);
            dispatch(callSubPlanListAPI({
                lectureCode : lectureCode
            }));
    },[]);

    console.log('서브플랜', subPlan);

    return (
        <>
        <div className={styles.container}>
            <button className={styles.close} onClick={closeModal}>
                <p>X</p></button>
                    <tbody>
                        { subPlan?.lecture && subPlan?.professor && (
                                    <tr
                                        key={ subPlan.planCode }
                                    >
                                        <tr className={styles.head}>{ subPlan.planName }</tr><br/>
                                        <tr className={styles.body}>강좌번호 : { subPlan.lecture.lectureCode }</tr><br/>
                                        <tr className={styles.body}>학점 : 3</tr><br/>
                                        <tr className={styles.body}>담당 교수 : { subPlan.professor.professorName }</tr><br/>
                                        <tr className={styles.body}>이메일 : { subPlan.professor.professorEmail }</tr><br/>
                                        <tr className={styles.body}>연락처 : { subPlan.professor.professorPhone }</tr><br/>
                                        <tr className={styles.body}>이수 구분 : { subPlan.lecture.subject.majorType }</tr><br/>
                                        <tr className={styles.body}>학습 목표 :{ subPlan.purpose }</tr>
                                    </tr>
                        )}

                    </tbody>    
                    </div>
        </>
    );
}


export default SubPlan;