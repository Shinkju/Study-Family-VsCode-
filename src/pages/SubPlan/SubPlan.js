import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import styles from './ModalBasic.module.css';
import { callSubPlanListAPI } from '../../apis/SubPlanApiCalls';

function SubPlan({ setModalOpen, id, title, content, writer }) {

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const subPlan = useSelector(state => state.subPlanReducer);
    const subPlanList = subPlan.data;  

    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    /* 수업계획서 조회 */
    useEffect(() => {
            dispatch(callSubPlanListAPI({
                planCode : params.planCode
            }));
    },[]);

    return (
        <>
        <div className={styles.container}>
            <button className={styles.close} onClick={closeModal}>
                X
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
                        <th>제목</th>
                         <th>강좌번호</th>
                         <th>학점</th>
                          <th>담당 교수</th>
                          <th>담당 교수 이메일</th>
                          <th>연락처</th>
                          <th>이수 구분</th>
                          <th>학습 목표</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            Array.isArray(subPlanList) && subPlanList.map(
                                (subPlan) => (
                                    <tr
                                        key={ subPlan.planCode }
                                    >
                                        <td>{ subPlan.planName }</td>
                                        <td>{ subPlan.lecture.lectureCode }</td>
                                        <td>3</td>
                                        <td>{ subPlan.professor.professorName }</td>
                                        <td>{ subPlan.professor.professorEmail }</td>
                                        <td>{ subPlan.lecture.subject.majorType }</td>
                                        <td>{ subPlan.purpose }</td>
                                    </tr>
                                )
                            )
                        }

                    </tbody>   
                    </table>
                    </button>
                    </div>
        </>
    );
}


export default SubPlan;