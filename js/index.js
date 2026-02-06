getApiKey().then(main)

async function main(api_key) {
    const sectionEl = document.querySelector(".movies");

    const upcomingMovies = await getUpcomingMovies(api_key);
    console.log(upcomingMovies);

    for (const upcomingMovie of upcomingMovies) {
        const articleEl = document.createElement("article");
        articleEl.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${upcomingMovie.poster_path}')`;
        sectionEl.appendChild(articleEl);

        let linkEl = document.createElement("a");
        const movieId = upcomingMovie.id;
        linkEl.href = `movie.html?movie=${movieId}`;
        articleEl.appendChild(linkEl);

        let titleEl = document.createElement("h3");
        titleEl.textContent = upcomingMovie.original_title;
        linkEl.appendChild(titleEl);
        
        const releaseDateEl = document.createElement("p");
        releaseDateEl.textContent = upcomingMovie.release_date;
        linkEl.appendChild(releaseDateEl);

        const movieDetails = await getDetailsMovie(api_key, movieId);

        const movieRuntimeEl = document.createElement("p");
        movieRuntimeEl.textContent = "Durée : " + movieDetails.runtime + " minutes";
        linkEl.appendChild(movieRuntimeEl);

        const movieGenresParentEl = document.createElement("ul");
        linkEl.appendChild(movieGenresParentEl);
        
        for (const genre of movieDetails.genres) {
            const movieGenreEl = document.createElement("li");
            movieGenreEl.textContent = genre.name;
            movieGenresParentEl.appendChild(movieGenreEl);
        };

    };
};

async function getUpcomingMovies(api_key) {

    const upcomingMovies = 
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_release_type=3&include_adult=false&include_video=false&language=fr-FR&page=1&region=FR&release_date.gte=2026-02-04&sort_by=release_date.asc&with_runtime.gte=60`)
        .then(response => response.json())
        .then(response => response.results);  

    return upcomingMovies;
};