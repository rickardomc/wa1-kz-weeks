'use strict';

const dayjs = require('dayjs');
const sqlite = require("sqlite3");

function Exam(code, name, credits, date, score, laude = false) {
  this.code = code;
  this.name = name;
  this.credits = credits;
  this.date = date;
  this.score = score;
  this.laude = laude;

  this.toString = () => `${this.code} - ${this.name}: ${laude ? this.score + 'L' : this.score}`;
}

function ExamList() {
  const db = new sqlite.Database('exams.sqlite', err => { if (err) throw err });

  // add
  this.add = (exam) => {
    // write something clever
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO score (coursecode, score, laude, datepassed) VALUES(?, ?, ?, DATE(?))";
      db.run(
        query,
        [exam.code, exam.score, exam.laude, exam.date],
        function (err) { err ? reject(err) : resolve(this.lastID) }
      );
    });
  };

  // getAll
  this.getAll = () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM course, score WHERE course.code = score.coursecode";
      db.all(
        query,
        (err, rows) => {
          if (err)
            reject(err);
          else {
            const exams = rows.map(row => new Exam(row.code, row.name, row.CFU, row.datepassed, row.score, row.laude ? true : false));
            resolve(exams);
          }
        });
    })
  };

  // find
  this.find = (code) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM course, score WHERE course.code=score.coursecode AND course.code=?";
      db.get(query, [code], (err, row) => {
        if (err)
          reject(err);
        else
          resolve(new Exam(row.code, row.name, row.CFU, row.datepassed, row.score, row.laude ? true : false));
      })
    })
  }

  // afterDate
  this.afterDate = (date) => {
    // write something clever
  }

  //getWorst
  this.getWorst = (num) => {
    // write something clever
  };
}


/* TESTING */
async function main() {
  const examDb = new ExamList();



  const exam = await examDb.find('01TXYOV');
  console.log(`${exam}`);
  //console.log(`${allExams}`);
  //is the same as consolellog(allExams.toString()), where allExams is an array
}

main();