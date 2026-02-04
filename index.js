fetch('.env')
    .then(response => response.text())
    .then(response => response.split('=').pop())
    .then(main)

async function main(api_key) {
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

