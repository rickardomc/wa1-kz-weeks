import { Col, Table, Button, Form } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs from "dayjs";
import { useState } from "react";


const ExamScores = (props) => {
  return (
    <Col>
      <ExamTable exams={props.exams} deleteExam={props.deleteExam} addExam={props.addExam} editExam={props.editExam}></ExamTable>
    </Col>
  );
}


const ExamTable = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [editableExam, setEditableExam] = useState();

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
            props.exams.map(ex => <ExamRow exam={ex} key={ex.code} deleteExam={props.deleteExam} setEditableExam={setEditableExam} setShowForm={setShowForm} />)
          }
        </tbody>
      </Table>
      {showForm ? <ExamForm  
        key={editableExam ? editableExam.code : '0'}
        addExam={(exam) => { props.addExam(exam); setShowForm(false); }}
        editExam={(exam) => { props.editExam(exam); setShowForm(false); }}
        cancel={() => setShowForm(false)}
        editableExam={editableExam}
      />
        :
        <Button variant='success' onClick={() => { setShowForm(true); setEditableExam(); }}>Add</Button>}
    </>
  );
}


const ExamRow = (props) => {
  return (
    <tr>
      <ExamData exam={props.exam} />
      <ExamActions exam={props.exam} deleteExam={() => props.deleteExam(props.exam.code)} setShowForm={props.setShowForm} setEditableExam={props.setEditableExam} />
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
      <Button variant="primary" onClick={() => { props.setShowForm(true); props.setEditableExam(props.exam) }}>
        <i className="bi bi-pencil-square "></i>
      </Button>
      &nbsp;
      <Button variant='danger' onClick={() => props.deleteExam()}>
        <i className="bi bi-trash3"></i>
      </Button>
    </td >
  );
}

const ExamForm = (props) => {
  // When we want to update another exam by directly clicking on another edit action button,
  // even if the selected exam (row) is selected, the form is not properly filled with the new one.
  // this happens because this code, before return, is only executed once. At most the component is re-rendered.
  // We have to tell to react that, whenever we click some of the edit button, first we need to reset the form (all the states will be re-created).
  // Another way to solve this problem, without changing states and form is by using keys in ExamForm as we did in ExamRow.
  const [code, setCode] = useState(props.editableExam ? props.editableExam.code : '');
  const [course, setCourse] = useState(props.editableExam ? props.editableExam.name : '');
  const [score, setScore] = useState(props.editableExam ? props.editableExam.score : 30);
  const [date, setDate] = useState(props.editableExam ? props.editableExam.date : dayjs());


  const handleSubmit = (event) => {
    event.preventDefault(); // necessary to avoid the common form submit behavior
    const exam = { code: code, name: course, score: score, date: dayjs(date) };
    // TODO validation
    props.editableExam ? props.editExam(exam) : props.addExam(exam);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Code</Form.Label>
        <Form.Control type="text" required={true} minLength={5} maxLength={7} value={code} onChange={event => { setCode(event.target.value) }} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Course name</Form.Label>
        <Form.Control type="text" required={true} value={course} onChange={event => { setCourse(event.target.value) }} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Score</Form.Label>
        <Form.Control type="number" value={score} min={18} max={31} onChange={event => { setScore(event.target.value) }} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date.format("YYYY-MM-DD")} onChange={event => { setDate(dayjs(event.target.value)) }} />
      </Form.Group>
      <Button type="submit">Save</Button> <Button variant="danger" onClick={props.cancel}>Cancel</Button>
    </Form>
  );
}


export { ExamScores };