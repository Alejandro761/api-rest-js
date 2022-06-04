const URL = 'https://api.thedogapi.com/v1/images/search';
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
    const img = document.querySelector('img');
    img.src = data[0].url;
}

const boton = document.querySelector('button');
asyncFunction();
boton.onclick = asyncFunction;