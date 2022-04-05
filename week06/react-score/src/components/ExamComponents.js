import { Col, Table, Button } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';


const ExamScores = (props) => {
  return (
    <Col>
      <ExamTable exams={props.exams}></ExamTable>
    </Col>
  );
}


const ExamTable = (props) => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Exam</th>
          <th>Score</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          props.exams.map(ex => <ExamRow exam={ex} key={ex.code} />)
        }
      </tbody>
    </Table>
  );
}


const ExamRow = (props) => {
  return (
    <tr>
      <ExamData exam={props.exam} />
      <ExamActions />
    </tr>
  );
}


const ExamData = (props) => {
  return (
    <>
      <td>{props.exam.name}</td>
      <td>{props.exam.score}</td>
      <td>{props.exam.date.format('YYYY-MM-DD')}</td>
    </>
  );
}


const ExamActions = () => {
  return (
    <td>
      <Button variant='danger'>
        <i className="bi bi-trash3"></i>
      </Button>
    </td>
  );
}


export { ExamScores };