import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Button as ModalButton } from 'react-bootstrap';
import ButtonGroup from './components/Button/ButtonGroup';
import InputGroup from './components/Input/InputGroup';
import CardGroup from './components/Card/CardGroup';
import { useState } from 'react';
import Modal from './components/Modal/Modal';
import Navbar from './components/Navbar/Navbar';


function App() {
  // 상태로 모달이 상태를 확인
  const [showModal, setShowModal]=useState(false)
  //모달 클릭시 상태 트루로 업데이트
  const openModal=()=>{
    setShowModal(true)
  }
  // 모달이 트루 일때 닫기를 누르면 상태 false
  const closeModal=()=>{
    setShowModal(false)
  }
  return (
    <div className="App">
      {/* 네비게이션바 컴포넌트 */}
      <Navbar/>
      {/* 코드 가독성을 위한 컨테이너 그룹화 진행 */}
      <Container className='container'>
        {/* 컨테이너로 버튼 색상 관리 컨테이너 */}
        <ButtonGroup/>
        {/* 인풋 스타일 적용 */}
        <InputGroup/>
        {/* 카드 컴포넌트 스타일  */}
        <CardGroup/>
        {/* 모달 버튼 부트스트랩으로 가지고 왔음 */}
        <ModalButton onClick={openModal}>모달 창 열기</ModalButton>
        {/* showModal 상태가 트루이면 모달창 뛰움 */}
        {showModal&& <Modal onClose={closeModal}/>}
      </Container>
    </div>
  );
}

export default App;
