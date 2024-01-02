/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data 
    for (const game of games) {

        // create a new div element, which will become the game card
        let gameDiv = document.createElement("div");

        // add the class game-card to the list
        gameDiv.classList.add("game-card");
        // set the inner HTML using a template literal to display some info 
        // about each game
        gameDiv.innerHTML = 
            `<h3>${game.name}</h3>
             <img src=${game.img} class="game-img" />
             <h4>${game.description}</h4>
             <h4>Backers: ${game.backers.toLocaleString()}
            `;
                    
        // append the game to the games-container
        gamesContainer.append(gameDiv);
    }

}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card paragraph element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
// should be 19,187
const totalContributions = GAMES_JSON.reduce(
    (tally, game) => {
        return tally + game.backers;
    }, 0
);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString('en-US')}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce(
    (tally, game) => {
        return tally + game.pledged;
    }, 0
);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length.toLocaleString('en-US')}`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    // gamesContainer held all games before, so delete them to start fresh.
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter( (game) => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged >= game.goal;
        }
    );

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfunded = GAMES_JSON.filter( (game) => (game.pledged < game.goal) ).length
const numFunded = GAMES_JSON.length - numUnfunded


// create a string that explains the number of unfunded games using the ternary operator

const unfundedSingle = `${numUnfunded} game is`

const unfundedSeveral = `${numUnfunded} games are`

// create a new DOM element containing the template string and append it to the description container
const summary = document.createElement("p");
summary.innerHTML = `
    Our supporters have raised $${totalRaised.toLocaleString('en-US')} to fund ${numFunded} games thus far. But ${numUnfunded == 1 ? unfundedSingle : unfundedSeveral} still unfunded. Help us to complete the funding for all of these wonderful games!`

descriptionContainer.append(summary);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
    let [game1, game2, ...losers] = sortedGames;
    
// create a new element to hold the name of the top pledge game, then append it to the correct element
    const game1Name = document.createElement("p")
    game1Name.innerHTML = `${game1.name}`;
    firstGameContainer.append(game1Name);

// do the same for the runner up item
    const game2Name = document.createElement("p")
    game2Name.innerHTML = `${game2.name}`;
    secondGameContainer.append(game2Name);
