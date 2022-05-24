/* Methods to handle the API calls */
import Exam from "./Exam";

async function getAllExams() {
  const response = await fetch('http://localhost:3001/api/exams');
  const examsJson = await response.json();
  if (response.ok) {
    return examsJson.map(ex => new Exam(ex.code, ex.name, ex.credits, ex.date, ex.score + (ex.laude ? 'L' : '')));
  }
  else
    throw examsJson;
}

const API = { getAllExams };
export default API;