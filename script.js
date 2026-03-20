// Select the dropdown from the page
const breedSelect = document.querySelector('#breed-select');
const gallery = document.querySelector('#gallery');

// Show one option per breed in the select menu
const renderBreedOptions = (breeds) => {
	breeds.forEach((breed) => {
		const option = document.createElement('option');
		option.value = breed;
		option.textContent = `${breed}`;
		breedSelect.append(option);
	});
};

// Show a message in the select if breed loading fails
const showBreedLoadError = () => {
	const option = document.createElement('option');
	option.value = '';
	option.textContent = 'Could not load breeds';
	breedSelect.append(option);
};

// Show image cards in the gallery
const renderGalleryImages = (imageUrls, selectedBreed) => {
	gallery.innerHTML = '';

	imageUrls.forEach((imageUrl) => {
		const galleryItem = document.createElement('div');
		galleryItem.className = 'gallery-item';

		const img = document.createElement('img');
		img.src = imageUrl;
		img.alt = `${selectedBreed} dog`;

		galleryItem.append(img);
		gallery.append(galleryItem);
	});
};

// Show a message in the gallery if image loading fails
const showImageLoadError = () => {
	gallery.innerHTML = '<p>Could not load dog images.</p>';
};

// Load all dog breeds from the Dog API
const loadBreeds = async () => {
	const response = await fetch('https://dog.ceo/api/breeds/list/all');
	const data = await response.json();
	const breeds = Object.keys(data.message);
	renderBreedOptions(breeds);
};

// Load 9 images for the selected breed
const loadBreedImages = async (selectedBreed) => {
	const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/9`);
	const data = await response.json();
	renderGalleryImages(data.message, selectedBreed);
};

// Fetch all dog breeds from the Dog API
loadBreeds().catch(showBreedLoadError);

// When a breed is selected, fetch 9 random images for that breed
breedSelect.addEventListener('change', () => {
	const selectedBreed = breedSelect.value;

	// Clear the gallery if no breed is selected
	if (!selectedBreed) {
		gallery.innerHTML = '';
		return;
	}

	loadBreedImages(selectedBreed).catch(showImageLoadError);
});
