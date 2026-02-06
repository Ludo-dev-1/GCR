async function getDetailsMovie(api_key, movieId) {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=fr-FR`
    );

    const movieDetails = await response.json();
    return movieDetails;
}



async function getApiKey() {
  return fetch('.env')
     .then(response => response.text()) 
     .then(response => response.split('=').pop())
}