async function getDetailsMovie(api_key, movieId) {
    const movieDetails = fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`)
        .then(response => response.json());
    
    return movieDetails; 
}

async function getApiKey() {
  return fetch('.env')
     .then(response => response.text()) 
     .then(response => response.split('=').pop())
}