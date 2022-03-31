'use strict';

function Film(id, title, favorite, watchdate, rating) {
  this.id = id;
  this.title = title;
  this.favorite = favorite;
  this.watchdate = watchdate;
  this.rating = rating;

  this.toString = () => { console.log(`ID:${this.id} ${this.title} - ${this.favorite ? "(⭐)" : "(🤞)"}, ${this.rating}`) };
}

function FilmLibrary() {
  this.list = [];

  this.getAll = () => {
    return this.list;
  }


  this.init = () => {
    const film1 = new Film(1, "Pulp fiction", true, dayjs("2022-03-10"), 5);
    const film2 = new Film(2, "21 Grams", true, dayjs("2022-03-17"), 4);
    const film3 = new Film(3, "Star Wars", false, undefined);
    const film4 = new Film(4, "Matrix", false, undefined);
    const film5 = new Film(5, "Shrek", false, dayjs("2022-03-21"), 3);
    library.addNewFilm(film5);
    library.addNewFilm(film4);
    library.addNewFilm(film3);
    library.addNewFilm(film2);
    library.addNewFilm(film1);
  }


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


  this.getFavorites = () => {
    return this.list.filter(film => film.favorite);
  }

  this.get5Stars = () => {
    return this.list.filter(film => film.rating == 5);
  }

  this.getFilmWatchedThisMonth = () => {
    return this.list.filter(film => film.watchdate.month() == dayjs().month());
  }

  this.getUnwatched = () => {
    return this.list.filter(film => film.watchdate == undefined);
  }

}


this.createFilmRow = (film) => {
  return `<tr>
  <td ${(film.favorite ? 'class="col-5 redText"' : '')}>${film.title}</td>
  <td>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" ${(film.favorite ? 'checked' : '')}>
      <label class="form-check-label" for="flexCheckChecked">
        Favorite
      </label>
    </div>
  </td>
  <td>${(film.watchdate != undefined ? film.watchdate.format("MMM DD, YYYY") : 'Unseen')}</td>
  <td>${('<i class="bi bi-star-fill"></i>'.repeat(film.rating))}${('<i class="bi bi-star"></i>'.repeat(5 - film.rating))}</td>
  <td><button class="btn btn-danger">X</button></td>
  </tr>`;
}

this.clearTable = () => {
  const filmTable = document.querySelector("#film-table");
  filmTable.replaceChildren();
}

this.fillFilmTable = (films, titleContent) => {
  clearTable();
  const filmTable = document.querySelector("#film-table");
  const title = document.querySelector("#title");
  title.textContent = titleContent;
  for (const film of films) {
    const filmRow = createFilmRow(film);
    filmTable.insertAdjacentHTML("afterbegin", filmRow);
  }

  const deleteButtons = document.querySelectorAll("#film-table > tr > td > button.btn");
  deleteButtons.forEach(button => button.addEventListener("click", e => { button.parentElement.parentElement.remove(); }))
}






this.toggleActive = elemId => {
  const lastActive = document.querySelector("a.active");
  lastActive.className = lastActive.className.replace("active", "") + "bg-transparent";

  const newActive = document.querySelector(`#${elemId}`);
  newActive.className = newActive.className.replace("bg-transparent", "") + "active";
}


const library = new FilmLibrary();
library.init();
// Adding click listeners to sidebar
const sidebarElements = document.querySelectorAll(".sidebar > a");
sidebarElements[0].addEventListener("click", e => {
  toggleActive(e.target.id);
  fillFilmTable(library.getAll(), "All");
});
sidebarElements[1].addEventListener("click", e => {
  toggleActive(e.target.id);

  const films = library.getFavorites();
  fillFilmTable(films, "Favorites");
});
sidebarElements[2].addEventListener("click", e => {
  toggleActive(e.target.id);
  fillFilmTable(library.get5Stars(), "Best rated");
});
sidebarElements[3].addEventListener("click", e => {
  toggleActive(e.target.id);
  fillFilmTable(getFilmWatchedThisMonth(), "Seen last month");
});
sidebarElements[4].addEventListener("click", e => {
  toggleActive(e.target.id);
  fillFilmTable(library.getUnwatched(), "Unseen");
});

fillFilmTable(library.getAll(), "All");

