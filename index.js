fetch('./env')
    .then(response => response.text()) 
    .then(response => response.split('=').pop())
    .then(api_key => {console.log("API Key : ", api_key)})
    .then(main)

async function main(api_key) {
    
}