import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import dayjs from 'dayjs';
import { Container, Row, Col } from 'react-bootstrap';
import { ExamScores, FormRoute } from './components/ExamComponents.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

const fakeExams = [
  { code: '01TYMOV', name: 'Information system security', score: 30, date: dayjs('2022-02-01') },
  { code: '01SQJOV', name: 'Data science and database', score: 21, date: dayjs('2022-06-15') },
  { code: '04GSP0V', name: 'Software engineering', score: 26, date: dayjs('2022-05-04') },
];

function App() {
  const [exams, setExams] = useState(fakeExams);

  const deleteExam = (id) => {
    setExams((currExams) => currExams.filter(exam => exam.code !== id));
  }

  const addExam = (exam) => {
    setExams((currExams) => [...currExams, exam]);
  }

  const updateExam = (exam) => {
    setExams((oldExams) => {
      return oldExams.map(ex => {
        if (exam.code === ex.code)
          return exam;
        else
          return ex;
      });
    });
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ExamRoute exams={exams} deleteExam={deleteExam} editExam={updateExam} addExam={addExam} />} />
        <Route path='/add' element={<FormRoute addExam={addExam} />} />
        <Route path='/edit' element={<FormRoute editExam={updateExam} />} />
        <Route path='*' element={<DefaultRoute />} />
      </Routes>
    </BrowserRouter >
  );
}


const ExamRoute = (props) => {
  return (
    <Container className='App'>
      <Row>
        <Col>
          <h1>My exams ({props.exams.length})</h1>
        </Col>
      </Row>
      <Row>
        <ExamScores exams={props.exams} deleteExam={props.deleteExam} addExam={props.addExam} editExam={props.updateExam}></ExamScores>
      </Row>
    </Container>
  );
}

const DefaultRoute = () => {
  return (
    <>
      <h1>No data here</h1>
      <h2>This is not the route you are looking for</h2>
    </>
  );
}

export default App;
