fetch('.env')
    .then(response => response.text()) 
    .then(response => response.split('=').pop())
    .then(main)

async function main(api_key) {
    const sectionEl = document.querySelector(".movies");

    const upcomingMovies = await getUpcomingMovies(api_key);
    console.log(upcomingMovies);

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

        const movieId = upcomingMovie.id;

        const movieDetails = await getMovieDetails(api_key, movieId);

        const movieGenresParentEl = document.createElement("ul");
        sectionEl.appendChild(movieGenresParentEl);
        
        for (const genre of movieDetails.genres) {
            const movieGenreEl = document.createElement("li");
            movieGenreEl.textContent = genre.name;
            movieGenresParentEl.appendChild(movieGenreEl);
        }

        const movieRuntimeEl = document.createElement("p");
        movieRuntimeEl.textContent = "Durée : " + movieDetails.runtime + " minutes";
        sectionEl.appendChild(movieRuntimeEl);        
    }
}

async function getUpcomingMovies(api_key) {

    const upcomingMovies = fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`)
        .then(response => response.json())
        .then(response => response.results);  

    return upcomingMovies;
}

async function getMovieDetails(api_key, movieId) {
    const movieDetails = fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`)
        .then(response => response.json());
    
    return movieDetails; 
}
    const movieId = new URL(window.location.href).searchParams.get('movie')
    console.log(movieId)

    const theMovie = await getDetailsMovie(api_key, movieId);
    console.log(theMovie);
    

    const titleMovie = document.querySelector("#title")
    titleMovie.textContent = theMovie.title;

    const overviewMovie = document.querySelector("#overviewContent")
    overviewMovie.textContent = theMovie.overview

    console.log(theMovie.genres);       
    
    for (const tag of theMovie.genres ){
    
        const tagEl = document.querySelector("#tagList")
        const tagList = document.createElement("li")
        tagList.textContent = tag.name
        console.log(tag.name);

        tagEl.appendChild(tagList)
    }

    const Picutre = theMovie.poster_path
    const pictureFilmEl = document.querySelector('.movie-img')
    console.log(pictureFilmEl);
    
    pictureFilmEl.src = `https://image.tmdb.org/t/p/w500${Picutre}`

    const releaseEl = document.querySelector('#release_date') 
    const releaseDat = new Date (theMovie.release_date)
    const dateConvert = releaseDat.toLocaleDateString("fr")
    releaseEl.textContent= "Sortie le " + dateConvert

    const runtimeEl = document.querySelector('#run-time')
    runtimeEl.textContent = "Durée du film : " + theMovie.runtime + " minutes"
        
    
}

async function getDetailsMovie(api_key, movieId) {

    const options = { method: 'GET', headers: { accept: 'application/json' } };

    const movie = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`, options)
        .then(res => res.json())
        .catch(err => console.error(err))
    return movie;
}

