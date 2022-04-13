import { Col, Table, Button, Form } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs from "dayjs";
import { useState } from "react";


const ExamScores = (props) => {
  return (
    <Col>
      <ExamTable exams={props.exams} deleteExam={props.deleteExam} addExam={props.addExam}></ExamTable>
    </Col>
  );
}


const ExamTable = (props) => {
  const [showForm, setShowForm] = useState(false);

  const hideForm = () => {
    setShowForm(false);
  }
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Code</th>
            <th>Exam</th>
            <th>Score</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            props.exams.map(ex => <ExamRow exam={ex} key={ex.code} deleteExam={props.deleteExam} />)
          }
        </tbody>
      </Table>
      {showForm ? <ExamForm addExam={props.addExam} hideForm={hideForm} /> : <Button variant='success' onClick={() => setShowForm(true)}>Add</Button>}
    </>
  );
}


const ExamRow = (props) => {
  return (
    <tr>
      <ExamData exam={props.exam} />
      <ExamActions deleteExam={props.deleteExam} id={props.exam.code} />
    </tr>
  );
}


const ExamData = (props) => {
  return (
    <>
      <td>{props.exam.code}</td>
      <td>{props.exam.name}</td>
      <td>{props.exam.score}</td>
      <td>{props.exam.date.format('YYYY-MM-DD')}</td>
    </>
  );
}


const ExamActions = (props) => {
  return (
    <td>
      <Button variant='danger' onClick={() => props.deleteExam(props.id)}>
        <i className="bi bi-trash3"></i>
      </Button>
    </td>
  );
}

const ExamForm = (props) => {
  const [code, setCode] = useState('');
  const [course, setCourse] = useState('');
  const [score, setScore] = useState('30');
  const [date, setDate] = useState(dayjs());

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Code</Form.Label>
          <Form.Control type="text" value={code} onChange={event => { setCode(event.target.value) }} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Course name</Form.Label>
          <Form.Control type="text" value={course} onChange={event => { setCourse(event.target.value) }} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Score</Form.Label>
          <Form.Control type="number" value={score} onChange={event => { setScore(event.target.value) }} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" value={date.format("YYYY-MM-DD")} onChange={event => { setDate(dayjs(event.target.value)) }} />
        </Form.Group>
        <Button type="submit">
          Save
        </Button>
      </Form>
      <Button variant="danger" onClick={() => { props.hideForm() }}> Cancel </Button>
    </>
  );
}


export { ExamScores };