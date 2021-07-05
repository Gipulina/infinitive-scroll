const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

//Unsplash API
const count = 10;
const apiKey= 'vcwlr2oKagB-8DUvHPuwKAj7VrfSDtpaQqg0WFPbY3s'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper Fuction to Set Attrubutes on DOM elements
function setAttribues(element,attributes) {
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}
//Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
    //Ru functions for each object 
    photosArray.forEach((photo) => {
        //create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href:photo.links.html,
            target:'_blank',
        });
        // item.setAttribute('href', photos.links.html);
        // item.setAttribute('target','_blank');
        //create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('scr', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //put <img> inside <a>, then put both inside imageContaier elemet
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//get Photos from unspalsh Api//
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json(); 
        displayPhotos();
    }catch(error){
        //catch error here
    }
}

//on load
getPhotos();