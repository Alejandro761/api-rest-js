const URL = 'https://api.thedogapi.com/v1/images/search?limit=3'; //limit es el atributo que nos indica el limite de imagenes, para ponerlo debes poner antes un '?'

// const URLmaterial = 'https://api.mpds.io/v0/download/p?q=P50042118-3&fmt=json&sid=null&ed=0';

/* fetch(URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    }); */

const asyncFunction = async () => {
    const response = await fetch(URL);
    const data = await response.json();

    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
}

const boton = document.querySelector('button');
asyncFunction();
boton.onclick = asyncFunction;