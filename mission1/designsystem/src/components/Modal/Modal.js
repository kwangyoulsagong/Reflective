import React from "react";
import "./Modal.css"
function Modal({onClose}){
    return(
        <div className="modal-container">
            <div className="modal-view">
                <div className="modal-header">
                    <h3>나는야 모달</h3>
                    {/* props로 전달받은 onClose함수를 실행 */}
                    <button className="close-btn" onClick={onClose}>x</button>
                </div>
                <div className="modal-body">
                    <p>나는야 모달이야 한번 X 버튼 눌러봐</p>
                </div>
            </div>
        </div>
    )
}
export default Modal