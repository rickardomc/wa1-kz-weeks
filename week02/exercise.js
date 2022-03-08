'use strict';

const dayjs = require('dayjs');

function Exam(code, name, credits, date, score, laude = false) {
  this.code = code;
  this.name = name;
  this.credits = credits;
  this.date = date;
  this.score = score;
  this.laude = laude;
}

function ExamList() {
  this.list = [];

  this.add = (exam) => this.list.push(exam);

  this.find = (code) => {
    return this.list.filter(course => course.code === code)[0];
  }
  this.listByDate = () => {
    return [...this.list].sort((a, b) => { a.date.isAfter(b.date) ? 1 : -1 });
  }

  this.listByScore = () => {
    return [...this.list].sort((a, b) => { b.score - a.score });
  }

  this.afterDate = (date) => {
    return this.list.filter(course => course.date.isAfter(date));
  }
  this.average = () => {
    return this.list
      .map(course => course.score)
      .reduce((accumulator, currentScore, currentIndex, scores) => accumulator + currentScore / scores.length, 0);
  }
}

const wa1 = new Exam('01abc', 'Web application 1', 6, dayjs('2022-06-07'), 30, true);
const se1 = new Exam('01adc', 'Software engineering 1', 6, dayjs('2022-07-02'), 28);
const examList = new ExamList();
examList.add(wa1);
examList.add(se1);
console.log(examList.average());
