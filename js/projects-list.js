document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.getElementById('loading');
    const gameList = document.getElementById('game-list');

    // Function to fetch the game list from the external HTML file
    function fetchGameList() {
        return fetch('list.html')
            .then(response => response.text())
            .catch(error => {
                console.error('Error fetching game list:', error);
                return '';
            });
    }

    // Function to create game items from the fetched HTML
    function createGameItems(html) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const cards = tempDiv.querySelectorAll('.card');

        cards.forEach(card => {
            const link = card.querySelector('a');
            const gameName = link.textContent;
            const gameUrl = link.href;
            let thumbnail;

            if (gameUrl.includes('?game=')) {
                // Flash game
                const gameParam = new URL(gameUrl).searchParams.get('game');
                thumbnail = `https://projectassets.teacherease.net/flash/images/${gameParam}.png`;
            } else {
                // HTML5 game
                const gameLink = new URL(gameUrl).searchParams.get('url');
                thumbnail = gameLink.replace('index.html', 'cover.png');
            }

            const gameItem = document.createElement('div');
            gameItem.classList.add('game-item');

            const gameImage = document.createElement('img');
            gameImage.src = thumbnail;
            gameImage.alt = gameName;

            const gameTitle = document.createElement('h3');
            gameTitle.textContent = gameName;

            gameItem.appendChild(gameImage);
            gameItem.appendChild(gameTitle);
            gameItem.onclick = () => {
                window.location.href = link.href;
            };

            gameList.appendChild(gameItem);
        });
    }

    // Fetch and load the game list
    fetchGameList().then(html => {
        // Hide loading indicator
        loadingIndicator.style.display = 'none';

        // Create game items
        createGameItems(html);
    });
});

//Search Bar

var allElements = [];
var num = 760;
for (let i = 0; i < num; i++) {
    allElements.push('<div class="game-item">' + document.querySelector('.game-item').innerHTML + '</div>');
    document.querySelector('.game-item').remove();
}
//document.querySelector('#game-list').innerHTML = allElements;
function writeAll() {
    for (let i = 0; i < allElements.length; i++) {
        document.querySelector('#game-list').innerHTML += allElements[i];
    }
}
var elements = [];
var elementsNew = [];
function writeNew() {
    for (let i = 0; i < elementsNew.length; i++) {
        document.querySelector('#game-list').innerHTML += elementsNew[i];
    }
}
writeAll();
function search() {
    document.querySelector('#game-list-list').innerHTML = '';
    writeAll();
    value = document.getElementById('search').value;
    elements = [];
    elementsNew = [];
    console.log(document.querySelector('.game-item').textContent);
    if (!(value == '')) {
        for (let i = 0; i < num; i++) {
            console.log(document.querySelector('.game-item').textContent.toLowerCase().includes(value.toLowerCase()));
            if (document.querySelector('.game-item').textContent.toLowerCase().includes(value.toLowerCase())) {
                //document.querySelector('.game-item').style.display = 'block';
                elementsNew.push('<div class="game-item">' + document.querySelector('.game-item').innerHTML + '</div>');
                document.querySelector('.game-item').remove();
            } else {
                //document.querySelector('.game-item').style.display = 'none';
                elements.push('<div class="game-item">' + document.querySelector('.game-item').innerHTML + '</div>');
                document.querySelector('.game-item').remove();
            }
        }
        //document.querySelector('#game-list').innerHTML = elementsNew;
        document.querySelector('#game-list').innerHTML = '';
        writeNew();
    } else {
        //document.querySelector('#game-list').innerHTML = allElements;
        document.querySelector('#game-list').innerHTML = '';
        writeAll();
    }
}

//Random Button

function random() {
    var game = Math.floor(Math.random() * allElements.length);
    document.querySelector('#game-list').innerHTML = '';
    document.querySelector('#game-list').innerHTML += allElements[game];
} 
