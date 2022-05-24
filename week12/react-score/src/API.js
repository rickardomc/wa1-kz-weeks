import Exam from './Exam';

const SERVER_URL = 'http://localhost:3001';

const getAllExams = async () => {
  const response = await fetch('http://localhost:3001/api/exams');
  const examsJson = await response.json();
  if (response.ok) {
    return examsJson.map(ex => new Exam(ex.code, ex.name, ex.credits, ex.date, (ex.laude ? ex.score + 'L' : ex.score)));
  }
  else
    throw examsJson;
};

const addExam = async (exam) => {
  // handling the laude
  if (exam.score === 31) {
    exam.score = 30;
    exam.laude = true;
  }
  else exam.laude = false;

  const response = await fetch(SERVER_URL + '/api/exams', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: exam.code, score: exam.score, date: exam.date.formt('YYYY-MM-DD'), laude: exam.laude })
  })

  if (!response.ok) {
    // this catches only wrong responses
    const errMessage = await response.json();
    throw errMessage;
  }
  else return null;
}

const deleteExam = async (courseCode) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/exams/${courseCode}`, {
      method: 'DELETE'
    });

    if (response.ok) return null;
    else {
      const errMessage = await response.json();
      throw errMessage;
    }
  }
  catch (e) {
    throw new Error('Cannot communicate with the server');
  }
}

const API = { getAllExams, addExam, deleteExam };
export default API;