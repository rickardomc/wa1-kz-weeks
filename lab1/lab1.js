'use strict';

const dayjs = require('dayjs');

function Film(id, title, favorite = false, date = undefined, rating = undefined) {
  this.id = id;
  this.title = title;
  this.favorite = favorite;
  this.date = date;
  this.rating = rating;
}

function FilmLibrary() {
  this.list = [];


  this.addNewFilm = (film) => {
    this.list.push(film);
  }


  this.sortByDate = () => {
    return [...this.list].sort((a, b) => {
      if (a.date == undefined)
        return 1;
      if (b.date == undefined)
        return -1;
      return a.date.isAfter(b.date) ? 1 : -1;
    })
  }


  this.deleteFilm = (filmID) => {
    this.list = this.list.filter(film => film.id != filmID);
  }


  this.resetWatchedFilms = () => {
    this.list = this.list.map(film => {
      film.date = undefined;
      return film;
    });
  }


  this.getRated = () => {
    return this.list.filter(film => film.rating !== undefined)
      .sort((a, b) => b.rating - a.rating);
  }
}

const library = new FilmLibrary();
const film1 = new Film(1, "Pulp fiction", true, dayjs("2022-03-10"), 5);
const film2 = new Film(2, "21 Grams", true, dayjs("2022-03-17"), 4);
const film3 = new Film(3, "Star Wars", false, undefined);
const film4 = new Film(4, "Matrix", false, undefined);
const film5 = new Film(5, "Shrek", false, dayjs("2022-03-21"), 3);
library.addNewFilm(film1);
library.addNewFilm(film2);
library.addNewFilm(film3);
library.addNewFilm(film4);
library.addNewFilm(film5);

console.log(library.getRated());