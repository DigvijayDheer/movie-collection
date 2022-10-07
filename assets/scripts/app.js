const addMovieModal = document.getElementById("add-modal");
// const addMovieModal = document.querySelector("#add-modal");
// const addMovieModal = document.body.children[1];

const startAddMovieButton = document.querySelector("header button");
// const startAddMovieButton = document.querySelector("header").lastElementChild;

const backdrop = document.getElementById("backdrop");
// const backdrop = document.body.firstElementChild;

const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;

const userInputs = addMovieModal.querySelectorAll("input");
// const userInputs = addMovieModal.getElementsByTagName("input");

const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");
const movies = [];

const toggleBackdrop = () => {
	backdrop.classList.toggle("visible");
};

const updateUI = () => {
	if (movies.length === 0) {
		entryTextSection.style.display = "block";
	} else {
		entryTextSection.style.display = "none";
	}
};

const closeMovieDeletionModal = () => {
	toggleBackdrop();
	deleteMovieModal.classList.remove("visible");
};

const deleteMovieHandler = (movieId) => {
	let movieIndex = 0;
	for (const movie of movies) {
		if (movie.id === movieId) {
			break;
		}
		movieIndex++;
	}
	movies.splice(movieIndex, 1);
	const rootList = document.getElementById("movie-list");
	rootList.children[movieIndex].remove();
	// rootList.removeChild(rootList.children[movieIndex]);
	closeMovieDeletionModal();
	updateUI();
};

const startDeleteMovieHandler = (movieId) => {
	deleteMovieModal.classList.add("visible");
	toggleBackdrop();

	const cancelDeletionButton =
		deleteMovieModal.querySelector(".btn--passive");
	let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

	confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

	confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

	cancelDeletionButton.removeEventListener("click", closeMovieDeletionModal);

	cancelDeletionButton.addEventListener("click", closeMovieDeletionModal);
	confirmDeletionButton.addEventListener(
		"click",
		deleteMovieHandler.bind(null, movieId)
	);
};

const renderNewMovie = (id, title, image, rating) => {
	const newMovieElement = document.createElement("li");
	newMovieElement.className = "movie-element";
	newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${image}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 ⭐</p>
        </div>
    `;
	newMovieElement.addEventListener(
		"click",
		startDeleteMovieHandler.bind(null, id)
	);
	const rootList = document.getElementById("movie-list");
	rootList.append(newMovieElement);
};

const closeMovieModal = () => {
	addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
	addMovieModal.classList.add("visible");
	toggleBackdrop();
};

const clearMovieInputs = () => {
	for (const inputs of userInputs) {
		inputs.value = "";
	}
};

const cancelAddMovieHandler = () => {
	closeMovieModal();
	toggleBackdrop();
	clearMovieInputs();
};

const addMovieHandler = () => {
	const titleValue = userInputs[0].value;
	const ImageUrlValue = userInputs[1].value;
	const ratingValue = userInputs[2].value;

	if (
		titleValue.trim() === "" ||
		ImageUrlValue.trim() === "" ||
		ratingValue.trim() === "" ||
		+ratingValue < 1 ||
		ratingValue > 5
	) {
		alert("Please enter valid value between 1 to 5.");
		return;
	}

	const newMovie = {
		id: Math.random().toString(),
		title: titleValue,
		image: ImageUrlValue,
		rating: ratingValue,
	};

	movies.push(newMovie);
	console.log(movies);
	closeMovieModal();
	toggleBackdrop();
	clearMovieInputs();
	renderNewMovie(
		newMovie.id,
		newMovie.title,
		newMovie.image,
		newMovie.rating
	);
	updateUI();
};

const backdropClickHandler = () => {
	closeMovieModal();
	closeMovieDeletionModal();
	clearMovieInputs();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
