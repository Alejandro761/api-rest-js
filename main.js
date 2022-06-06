const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2&api_key=28395ef1-601a-475d-9561-5532a98eacbc'; //limit es el atributo que nos indica el limite de imagenes, para ponerlo debes poner antes un '?'
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites?limit=2&api_key=28395ef1-601a-475d-9561-5532a98eacbc';

const spanError = document.getElementById('error');

// const URLmaterial = 'https://api.mpds.io/v0/download/p?q=P50042118-3&fmt=json&sid=null&ed=0';

/* fetch(URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    }); */

const loadRandomDogs = async () => {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();
    console.log(data);

    if(response.status !== 200){
        spanError.innerHTML = 'Hubo un error: ' + response.status; 
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
    
        img1.src = data[0].url;
        img2.src = data[1].url;
    }
}

const loadFavouritesDogs = async () => {
    const response = await fetch(API_URL_FAVORITES);
    const data = await response.json();
    console.log(data);
    
    if(response.status !== 200){
        spanError.innerHTML = 'Hubo un error: ' + response.status + data.message; 
    }
}

const saveFavouritesDogs = async () => {
    const response = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id : '12'
        })
    });

    console.log(response);
}

const boton = document.getElementById('random');
loadRandomDogs();
boton.onclick = loadRandomDogs;
loadFavouritesDogs();