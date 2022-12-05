import { callReceiverAPI } from '../../../apis/MsgApiCalls';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function RceiverModal({form, setForm, setReceiverModal, receiver}){

    const dispatch = useDispatch();
    const user = useSelector(state => state.msgReducer);
    

    //수신할 대상 선택 핸들러
    const selecReceiverHandler = (u) => {
        receiver(u.studentName);
        setForm({
            ...form,
            receiver : {
                loginCode : u.student
            }
        })
    }


    return(
        <>
           <div>
                <table>
                    <colgroup>
                        <col width="5%" />
                        <col width="10%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>학번</th>
                            <th>이름</th>
                            <th>학과</th>
                        </tr>
                    </thead>
                    <tbody>
                    { Array.isArray(user) && user.map((u) => (
                            <tr
                                key={ u.appClassCode }
                                onClick={ () => selecReceiverHandler(u) }
                            >
                                <td>{ u.student.studentCode }</td>
                                <td>{ u.student.studentName }</td>
                                <td>{ u.student.department.departmentName }</td>
                            </tr>
                        ))
                        }                
                    </tbody>
                </table>
           </div>
        </>
    );
}

export default RceiverModal;