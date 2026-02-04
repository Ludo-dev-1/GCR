fetch('.env')
    .then(response => response.text()) 
    .then(response => response.split('=').pop())
    .then(main)

async function main(api_key) {
    const sectionEl = document.querySelector(".movies");

    const upcomingMovies = await getUpcomingMovies(api_key);
    // console.log(upcomingMovies);

    for (const upcomingMovie of upcomingMovies) {
        let titleEl = document.createElement("h3");
        titleEl.textContent = upcomingMovie.original_title;
        sectionEl.appendChild(titleEl);

        const imageEl = document.createElement("img");
        imageEl.src = "https://image.tmdb.org/t/p/w300/" + upcomingMovie.poster_path;
        sectionEl.appendChild(imageEl);
        
        const releaseDateEl = document.createElement("p");
        releaseDateEl.textContent = upcomingMovie.release_date;
        sectionEl.appendChild(releaseDateEl);


        
    }

/* TITRE DU FILM / AFFICHE / DATE DE SORTIE / DUREE / GENRE */
/* original_title / poster_path / release_date / passage par l'id ? */
}

async function getUpcomingMovies(api_key) {

    const upcomingMovies = fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`)
        .then(response => response.json())
        .then(response => response.results);  

    return upcomingMovies;
}
