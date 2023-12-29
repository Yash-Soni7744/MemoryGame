const imageArr = [
    { "name": 'html', "img": "./assets/html.jpg" },
    { "name": 'BMW', "img": "./assets/bmw.jpg" },
    { "name": 'robot1', "img": "./assets/robot1.jpg" },
    { "name": 'mango', "img": "./assets/mango.jpg" },
    { "name": 'cycle', "img": "./assets/cycle.jpg" },
    { "name": 'mangoshake', "img": "./assets/mangoshake.jpg" },
    { "name": 'apple', "img": "./assets/apple.jpg" },
    { "name": 'xbox', "img": "./assets/xbox.jpg" },
    { "name": 'json', "img": "./assets/json.jpg" },
    { "name": 'python', "img": "./assets/python.jpg" }
];

for (let index = 0; index < document.getElementsByTagName('main')[0].children.length; index++) {
    console.log(document.getElementsByTagName('main')[0].children[index]);
};
const sectionDiv = document.querySelector('.grid-section');
let newArr;
document.addEventListener('DOMContentLoaded', () => {
    let easy = document.getElementById('easy')
    let inter = document.getElementById('inter')
    let hard = document.getElementById('hard')
    let clickCount = 0;
    let clicked = false
    let currentDifficulty = ''

    easy.onclick = function () {
        if (currentDifficulty !== 'easy') {

            newArr = []
            sectionDiv.innerHTML = ''
            
            currentDifficulty = 'easy';
            clicked = false;
            clickCount = 0;
            newArr = imageArr.slice(0,4);
            load();
            sectionDiv.style.gridTemplateColumns = 'repeat(4, 1fr)';
        }
        clickCount++;
        if (clickCount >= 2) {
            shuffle(imageArr);
            clickCount = 0;
            clicked = true;
        }
    };

    inter.onclick = function () {
        if (currentDifficulty !== 'inter') {
            newArr = []
            sectionDiv.innerHTML = ''

            currentDifficulty = 'inter';
            clicked = false;
            clickCount = 0;
            newArr = imageArr.slice(0,8);
            load();
            sectionDiv.style.gridTemplateColumns = 'repeat(5, 1fr)';
        }
        
        clickCount++;
        if (clickCount >= 2) {
            shuffle(imageArr);
            clickCount = 0;
            clicked = true;
        }
    };

    hard.onclick = function () {
        if (currentDifficulty !== 'hard') {
            newArr = []
            sectionDiv.innerHTML = ''
           
            currentDifficulty = 'hard';
            clicked = false;
            clickCount = 0;
            newArr = imageArr.slice(); 
            load();
            sectionDiv.style.gridTemplateColumns = 'repeat(5, 1fr)';
        }
        clickCount++;
        if (clickCount >= 2) {
            shuffle(imageArr);
            clickCount = 0;
            clicked = true;
        }
    };
})

function preloadImages(images) {
    images.forEach((image) => {
        const img = new Image();
        img.src = image.img;
    });
}

// Call the function to preload images
preloadImages(imageArr);

function shuffle(array) {
    let usedIndexes = [];
    let shuffledArr = [];

    let i = 0;
    while (i < array.length) {
        let rand = Math.floor(Math.random() * array.length);
        if (!usedIndexes.includes(rand)) {
            shuffledArr.push(array[rand]);
            usedIndexes.push(rand);
            i++;
        }
    }

    return shuffledArr;
}

let usedCards = [];

let shuffledArray
function load() {
    shuffledArray = shuffle(newArr);
    console.log(shuffledArray)

    for (let i = 0; i < shuffledArray.length * 2; i++) {
        const div = document.createElement('div');
        div.classList.add('card');
        div.style.backgroundColor = 'yellow';
        div.dataset.index = i % shuffledArray.length;
        sectionDiv.appendChild(div);
        
    }
        cardShuffle(shuffledArray)

    reveal();
}
var cardShuffle = ()=>{
    for (let i = sectionDiv.children.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        sectionDiv.appendChild(sectionDiv.children[j])
      }
}
function reveal() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            setTimeout(() => {
                card.style.backgroundImage = `url(${shuffledArray[Number(card.dataset.index)].img})`;

            }, 500)
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
        });
    });

    const cardArr = Array.from(cards);
    cardArr.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains('flip')) {
                card.classList.add('flip');
                usedCards.push(card);

                if (usedCards.length === 2) {
                    if (usedCards[0].dataset.index == usedCards[1].dataset.index) {
                        usedCards.forEach((usedcard) => {
                            setTimeout(function () {
                                usedcard.style.backgroundColor = 'black';
                                usedcard.style.backgroundImage = 'none';
                                usedcard.style.transition = '1s ease-in-out';
                            }, 1000);
                        });
                    } else {
                        usedCards.forEach((usedcard) => {
                            setTimeout(function () {
                                usedcard.classList.add('flip2');
                                usedcard.style.backgroundColor = 'yellow';
                                usedcard.style.backgroundImage = 'none';
                                usedcard.style.transition = '1s ease-out';
                            }, 1600);

                            setTimeout(function () {
                                usedcard.classList.remove('flip', 'flip2');
                            }, 2700);
                        });
                    }

                    usedCards = [];
                }
            }
        });
    });
}
