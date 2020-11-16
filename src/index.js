// DOM selectors
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add the money value

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first}` `${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

// Double every users money
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: money.user * 2}
    });
    updateDOM();
}

// Sort users by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    
    updateDOM();
}

function showMillionaires() {
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

function addData(obj) {
    data.push(obj); // add the obj to the data array
    
    updateDOM(); // update the DOM with the new data
}

function updateDOM(providedData = data) {
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney()}`
    });
    main.appendChild(element);
}


function formatMoney() {
    return `$` + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, `#&,`)
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);