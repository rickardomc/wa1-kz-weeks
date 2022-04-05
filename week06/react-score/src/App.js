import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import dayjs from 'dayjs';
import { Container, Row, Col } from 'react-bootstrap';
import { ExamScores } from './components/ExamComponents.js';

const fakeExams = [
  { code: '01TYMOV', name: 'Information system security', score: 30, date: dayjs('2022-02-01') },
  { code: '01SQJOV', name: 'Data science and database', score: 21, date: dayjs('2022-06-15') },
  { code: '04GSP0V', name: 'Software engineering', score: 26, date: dayjs('2022-05-04') },
];

const AppTitle = (props) => {
  return (
    <Container className='App'>
      <Row>
        <Col>
          <h1>{props.title}</h1>
        </Col>
      </Row>
      <Row>
        <ExamScores exams={fakeExams}></ExamScores>
      </Row>
    </Container>);
}

function App() {
  return (<AppTitle title='My exams' />);
}

export default App;
