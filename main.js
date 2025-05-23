const api = axios.create({
    baseURL: 'https://api.thedogapi.com/v1/',
    //si ocupamos axios, baseURL guardara la url principal para no estar
    //cambiandola dependiendo del metodo http
});
api.defaults.headers.common['X-API-KEY'] = '28395ef1-601a-475d-9561-5532a98eacbc'; //el header del metodo ya se guarda aqui, asi q si usamos axios ya no hara falta llamarlo

const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2'; //limit es el atributo que nos indica el limite de imagenes, para ponerlo debes poner antes un '?'
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;
const spanError = document.getElementById('error');
const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload';

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
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');

        img1.src = data[0].url;
        img1.width = 150
        img2.src = data[1].url;
        img2.width = 150

        btn1.onclick = () => saveFavouriteDog(data[0].id);
        btn2.onclick = () => saveFavouriteDog(data[1].id);
    }

}

const loadFavouritesDogs = async () => {
    const response = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': '28395ef1-601a-475d-9561-5532a98eacbc'
        }
    });
    const data = await response.json();
    console.log(data);
    
    if(response.status !== 200){
        spanError.innerHTML = 'Hubo un error: ' + response.status + data.message; 
    } else {
        const section = document.getElementById('favoriteDogs')
        section.innerHTML = '';
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Perritos favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(perrito => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');            
            const btnText = document.createTextNode('Sacar al perrito de favoritos');            

            img.src = perrito.image.url;
            img.width = 150;
            btn.appendChild(btnText); //append child hace que btnText sea su hijo 
            btn.onclick = () => deleteFavouriteDog(perrito.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

const saveFavouriteDog = async (id) => {
    const {data, status} = await api.post('favourites', {
        image_id: id, //no hace falta ocupar JSON.stringify
    }); //solo agregamos lo que le falta (favourites) a la url porque ya esta guardado en la linea 1
    // const response = await fetch(API_URL_FAVORITES, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-API-KEY': '28395ef1-601a-475d-9561-5532a98eacbc'
    //     },
    //     body: JSON.stringify({
    //         image_id: id
    //     }),
    // });

    // const data = await response.json();
    // console.log(response);

    if(status !== 200){
        spanError.innerHTML = 'Hubo un error: ' + status + data.message; 
    } else {
        console.log('Guardado.');
        loadFavouritesDogs();
    }
}

const deleteFavouriteDog = async (id) => {
    const response = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': '28395ef1-601a-475d-9561-5532a98eacbc'
        }
    });

    const data = await response.json();
    console.log(response);

    if(response.status !== 200){
        spanError.innerHTML = 'Hubo un error: ' + response.status + data.message; 
    } else {
        console.log('Eliminado.');
        loadFavouritesDogs();
    }
}

const uploadDogPhoto = async () => {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);
    console.log(formData.get('file'));

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/formData',
            'X-API-KEY': '28395ef1-601a-475d-9561-5532a98eacbc',
        },
        body: formData,
    });

    const data = await res.json();

    if(res.status !== 200){
        spanError.innerHTML = 'Hubo un error: ' + res.status + data.message; 
    } else {
        console.log('Foto subido.');
        console.log({data})
        console.log(data.url)
        saveFavouriteDog(data.id);
    }
}

const boton = document.getElementById('random');
loadRandomDogs();
boton.onclick = loadRandomDogs;
loadFavouritesDogs();