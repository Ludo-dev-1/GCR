fetch('.env')
    .then(response => response.text()) 
    .then(response => response.split('=').pop())
    .then(main)

async function main(api_key) {
    const sectionEl = document.querySelector(".movies");

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`)
        .then(response => response.json())
        .then(response => console.log(response))

}

