import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import ButtonGroup from './components/Button/ButtonGroup';
import InputGroup from './components/Input/InputGroup';


function App() {
  return (
    <div className="App">
      {/* 코드 가독성을 위한 컨테이너 그룹화 진행 */}
      <Container className='container'>
        {/* 컨테이너로 버튼 색상 관리 컨테이너 */}
        <ButtonGroup/>
        {/* 인풋 스타일 적용 */}
        <InputGroup/>
      </Container>
    </div>
  );
}

export default App;
