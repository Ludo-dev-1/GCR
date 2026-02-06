getApiKey().then(main)

async function main(api_key) {
    const sectionEl = document.querySelector(".movies");

    const upcomingMovies = await getUpcomingMovies(api_key);
    console.log(upcomingMovies);

    for (const upcomingMovie of upcomingMovies) {
        const articleEl = document.createElement("article");
        sectionEl.appendChild(articleEl);

        let titleEl = document.createElement("h3");
        titleEl.textContent = upcomingMovie.original_title;
        articleEl.appendChild(titleEl);

        let linkEl = document.createElement("a");
        
        const movieId = upcomingMovie.id;

        linkEl.href = `movie.html?movie=${movieId}`;

        const imageEl = document.createElement("img");
        imageEl.src = "https://image.tmdb.org/t/p/w300/" + upcomingMovie.poster_path;
        linkEl.appendChild(imageEl);

        articleEl.appendChild(linkEl);
        
        const releaseDateEl = document.createElement("p");
        releaseDateEl.textContent = upcomingMovie.release_date;
        articleEl.appendChild(releaseDateEl);


        const movieDetails = await getDetailsMovie(api_key, movieId);

        const movieGenresParentEl = document.createElement("ul");
        articleEl.appendChild(movieGenresParentEl);
        
        for (const genre of movieDetails.genres) {
            const movieGenreEl = document.createElement("li");
            movieGenreEl.textContent = genre.name;
            movieGenresParentEl.appendChild(movieGenreEl);
        }

        const movieRuntimeEl = document.createElement("p");
        movieRuntimeEl.textContent = "Durée : " + movieDetails.runtime + " minutes";
        articleEl.appendChild(movieRuntimeEl);        
    }
}

async function getUpcomingMovies(api_key) {

    const upcomingMovies = 
        // fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=fr&page=1&region=fr&language=fr`)
        //fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_adult=false&include_video=false&language=fr-FR&page=1&primary_release_date.gte=2026-02-04&region=fr-FR&sort_by=primary_release_date.asc&with_runtime.gte=60`)
        fetch(`https://api.themoviedb.org/3/discover/movie
  ?api_key=YOUR_API_KEY
  &language=fr-FR
  &region=FR
  &sort_by=release_date.asc
  &with_runtime.gte=60
  &release_date.gte=2026-02-06
`)
        .then(response => response.json())
        .then(response => response.results);  

    return upcomingMovies;
}

