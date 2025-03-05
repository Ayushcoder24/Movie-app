document.getElementById("searchForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent page reload

    let searchBox = document.getElementById("searchBox").value.trim();
    if (!searchBox) {
        alert("Please enter a movie name");
        return;
    }

    await fetchMovie(searchBox);
});

async function fetchMovie(movieSearch) {
    const url = `https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(movieSearch)}`;

    try {
        let response = await fetch(url);

        let data = await response.json();
        console.log(data.description); 

        if (data.description) {
            displayMovies(data.description);
        } else {
            document.getElementById("movieContainer").innerHTML = `<p>No movies found</p>`;
        }
    } catch (err) {
        console.error(err);
        document.getElementById("movieContainer").innerHTML = `<p>Error fetching movie data</p>`;
    }
}

function displayMovies(movies) {
    const movieContainer = document.getElementById("movieContainer");
    movieContainer.innerHTML = movies
        .map((movie) => `
            <div class="movie-card">
                <img src="${movie['#IMG_POSTER']}">
                <div class="movie-details">
                    <h2>${movie['#TITLE'] || "Unknown Title"}</h2>
                    <p><strong>Year:</strong> ${movie['#YEAR'] || "N/A"}</p>
                    <p><strong>Actors:</strong> ${movie['#ACTORS'] || "Not available"}</p>
                    <a href="${movie['#IMDB_URL']}" target="_blank">View on IMDb</a>
                </div>
            </div>
        `)
        .join(""); 
}
