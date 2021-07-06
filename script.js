const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let topicSelected = "random";

let ready = false;
let imagesLoaded = 0;
let totalImages = 10;
let photosArray = [];

//Unsplash API
const count = 10;
const apiKey = 'vcwlr2oKagB-8DUvHPuwKAj7VrfSDtpaQqg0WFPbY3s';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${topicSelected}`;


function selecTopic(){
    let topicSelected = this.value;
    console.log(topicSelected);
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${topicSelected}`;
    document.getElementById('image-container').innerHTML='';
    getPhotos();
}

//check if all images were loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

//Helper Fuction to Set Attrubutes on DOM elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

//Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
	imagesLoaded = 0;
	// totalImages = photosArray.length;
	//Ru functions for each object 
	photosArray.forEach((photo) => {
		//create <a> to link to Unsplash
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});
		//create <img> for photo
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		//Event Listener, check when each is finished loading
		img.addEventListener('load', imageLoaded);
		//put <img> inside <a>, then put both inside imageContaier elemet
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}
//get Photos from unspalsh Api//
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
        console.log(error);
		//catch error here
	}
}

//Check to see if scrolling iss near bottom of the page
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

document.getElementById("travel").addEventListener("click", selecTopic);
document.getElementById("nature").addEventListener("click", selecTopic);
document.getElementById("animal").addEventListener("click", selecTopic);

//on load
getPhotos();