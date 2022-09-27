const search = document.querySelector(".search");
const countries = document.querySelector('.countries');
let apiReturnedBody;

fetch('https://restcountries.com/v3.1/all').then(response => {
    const answer = response.json();
    answer.then(body => {
        console.log(body);
        apiReturnedBody = body;
        createCards(body);
    })
});

function createCountryCard(element) {
    const countryCard = document.createElement('div');
    countryCard.classList.add('countryCard');

    const flag = document.createElement('img');
    flag.src = element.flags.svg;

    const name = document.createElement('h2');
    name.textContent = element.name.common;

    const container = document.createElement('div');
    container.classList.add('container-information');

    const region = document.createElement('span');
    region.textContent = `Region: ${element.region}`

    const capital = document.createElement('span');
    capital.textContent = `Capital: ${element.capital}`;

    const population = document.createElement('p');
    population.textContent = `Population: ${element.population.toLocaleString('de-DE')}`;

    container.append(population, capital, region);
    countryCard.append(flag, name, container);
    countries.append(countryCard);
}

function createCards(array) {
    array.forEach(element => {
        createCountryCard(element);
    })
}

search.addEventListener('keyup', (event) => {
    const contriesAll = document.querySelectorAll('.countryCard')
    console.log(contriesAll)
    contriesAll.forEach(country => {
        const countryName = country.querySelector('h2').textContent.toLowerCase();
        countryName.includes(search.value.trim().toLowerCase()) ?
            country.classList.remove('hidden') : country.classList.add('hidden');
    })
})