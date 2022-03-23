'use strict';
const sqlite = require("sqlite3");
const dayjs = require('dayjs');

function Film(id, title, favorite, watchdate, rating) {
  this.id = id;
  this.title = title;
  this.favorite = favorite;
  this.watchdate = watchdate;
  this.rating = rating;

  this.toString = () => { console.log(`ID:${this.id} ${this.title} - ${this.favorite ? "(⭐)" : "(🤞)"}, ${this.rating}`) };
}

function FilmList() {
  const db = new sqlite.Database("films.db", err => { if (err) throw err });

  this.getAll = () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM films";
      db.all(
        query,
        (err, rows) => {
          if (err)
            reject(err);
          else {
            const films = rows.map(row => new Film(row.id, row.title, row.favorite ? true : false, row.watchdate, row.rating));
            resolve(films);
          }
        });
    })
  };

  this.getAllFavorite = () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM films WHERE favorite=1";
      db.all(
        query,
        (err, rows) => {
          if (err)
            reject(err);
          else {
            const films = rows.map(row => new Film(row.id, row.title, row.favorite ? true : false, row.watchdate, row.rating));
            resolve(films);
          }
        });
    })
  };

  this.getAllWatchedToday = () => {
    return new Promise((resolve, reject) => {
      const todayString = dayjs().format("YYYY-MM-DD");
      const query = 'SELECT * FROM films WHERE watchdate=?';
      db.all(query, [todayString], (err, rows) => {
        if (err)
          reject(err);
        else {
          const films = rows.map(row => new Film(row.id, row.title, row.favorite ? true : false, row.watchdate, row.rating));
          resolve(films);
        }
      })
    })
  };

  this.getWatchedBefore = (date) => {
    return new Promise((resolve, reject) => {
      const dateString = date.format("YYYY-MM-DD");
      const query = "select * from films where watchdate<?";
      db.all(query, [dateString], (err, rows) => {
        if (err)
          reject(err);
        else {
          const films = rows.map(row => new Film(row.id, row.title, row.favorite ? true : false, row.watchdate, row.rating));
          resolve(films);
        }
      })
    })
  };

  this.getRatingGreater = (rating) => {
    return new Promise((resolve, reject) => {
      const query = "select * from films where rating>=?";
      db.all(query, [rating], (err, rows) => {
        if (err)
          reject(err);
        else {
          const films = rows.map(row => new Film(row.id, row.title, row.favorite ? true : false, row.watchdate, row.rating));
          resolve(films);
        }
      })
    })
  };

  this.getFilmByName = (name) => {
    return new Promise((resolve, reject) => {
      const query = "select * from films where title=?";
      db.all(query, [name], (err, rows) => {
        if (err)
          reject(err);
        else {
          const films = rows.map(row => new Film(row.id, row.title, row.favorite ? true : false, row.watchdate, row.rating));
          resolve(films);
        }
      })
    })
  };

  this.addMovie = (movie) => {
    return new Promise((resolve, reject) => {
      const query = "insert into films (id,title,favorite,watchdate,rating) values(?,?,?,?,?)";
      const values = [movie.id, movie.title, movie.favorite ? 1 : 0, movie.watchdate.format("YYYY-MM-DD"), movie.rating];
      db.run(query, values, (err) => {
        if (err) {
          reject(err);
        }
        else {
          resolve("Movie successfully added to the database");
        }
      })
    })
  };

  this.deleteMovie = (id) => {
    return new Promise((resolve, reject) => {
      const query = "delete from films where id=?";
      db.run(query, id, function (err) {
        if (err) {
          reject(err);
        }
        else {
          if (this.changes == 1)
            resolve(`Film with ID ${id} has been removed`);
          reject("Film not found");
        }
      })

    })
  };

  this.resetAllWatchDate = () => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE films SET watchdate=NULL";
      db.run(query, function (err) {
        if (err) {
          reject(err);
        }
        else {
          resolve("All dates have been reset");
        }
      })

    })
  }

  this.closeDB = () => {
    try {
      db.close();
    }
    catch (error) {
      console.log('Impossible to close the database. Error:');
      console.error(error);
    }
  }
}

async function main() {
  const filmsDB = new FilmList();
  await filmsDB.resetAllWatchDate();

  filmsDB.closeDB();
}

main();