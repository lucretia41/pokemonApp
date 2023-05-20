console.log("running scripts")

// const logBtn = document.getElementById('enter');
// logBtn.addEventListener('click', fetchData);

// async function fetchData() {

//     const response = await fetch('http://localhost:3000/artdata');
//     const data = await response.json();


//     // const renderCards = (data) => {
//     //     console.log(data);
//     //     data.array.forEach(cardData => {
//     //         console.log(cardData.image)
//     //     });
//     //     renderCards()
//     // }

//     data.forEach(obj => {
//         Object.entries(obj).forEach(([image, value]) => {
//             (`${image} ${value}`);
//             console.log(image)
//         });
//         // const renderCards = (data) => {
//         //     // console.log(data);
//         //     data.array.forEach(cardData => {
//         //         console.log(cardData.image)
//         //     });

//         // }
//     });
// }
// fetch("http://localhost:3000/artdata")
//     .then(response => response.json())
//     .then(data => console.log(data));

document.addEventListener('DOMContentLoaded', () => {
    displayArtists();
    addSubmitListener();

})
function displayArtists() {
    fetch("http://localhost:3000/artdata")
        .then(res => res.json())
        .then(artists => {
            artists.forEach(artist => renderOneArtist(artist))
            // console.log(artists)
            showArtistDetails(artists[0])
        });
}

function addSubmitListener() {
    const artistForm = document.getElementById("new-artist");

    artistForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewArtist()
        artistForm.reset();
    })
}

function renderOneArtist(artist) {
    const artistImg = document.createElement('img');
    const artistDiv = document.createElement('div');
    const artistMenu = document.getElementById("artist-menu");
    artistImg.src = artist.image;


    artistMenu.append(artistDiv);
    artistDiv.append(artistImg);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.className = "delet-btn";
    artistDiv.append(deleteButton);

    deleteButton.addEventListener("click", () => deleteArtist(artist.id, artistDiv))


}

function showArtistDetails(artist) {
    const detailImage = document.getElementById("detail-image");
    const detailName = document.getElementById("detail-name");
    // const detailRestaurant = document.getElementById("detail-restaurant");
    const detailDate = document.getElementById("detail-date");
    const detailTitle = document.getElementById("detail-title");


    detailImage.src = artist.image;
    detailName.textContent = artist.name;
    // detailRestaurant.textContent = ramen.restaurant;
    detailDate.textContent = artist.date;
    detailTitle.textContent = artist.title;


}

function addNewArtist() {
    const newName = document.getElementById("new-name").value;
    // const newRestaurant = document.getElementById("new-restaurant").value;
    const newImage = document.getElementById("new-image").value;
    const newDate = document.getElementById("new-date").value;
    const newTitle = document.getElementById("new-title").value;

    const newArtist = {
        "name": newName,
        // "restaurant": newRestaurant,
        "image": newImage,
        "date": newDate,
        "title": newTitle
    }
    fetch("http://localhost:3000/artdata", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArtist)
    })

    renderOneArtist(newArtist);

    // display the details of the new ramen (nifty!)
    showArtistDetails(newArtist);
}


function deleteArtist(id, artistDiv) {
    // delete ramen from database
    fetch(`http://localhost:3000/artists/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    // delete corresponding ramen image from menu
    artistDiv.remove();

    // reset the displayed ramen info
    const placeholderInfo = {
        "name": "Click an Artist!",
        // "restaurant": ":3",
        "image": "",
        "date": "Select a artist to display!",
        "title": "Same deal."
    }

    showArtistDetails(placeholderInfo);
}