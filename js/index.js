const searchInput = document.getElementById("search-input");
const sortButton = document.getElementById("sort-button");
const submitButton = document.getElementById('submit-button');
const countButton = document.getElementById('count-button');
const asideItems = document.getElementById('aside');
const backButton = document.getElementById('back-button');
const secondBackButton = document.getElementById('second-back-button');
const totalPrice = document.getElementById('total-price');

let medicine = [];
let renderedMedicine = [];

const addMedicine = () => {
    let i = 1;
    while (document.getElementById(`${i}-med`)) {
        let medPrice = document.getElementById(`${i}-med`).children[3].textContent;
        let medTitle = document.getElementById(`${i}-med`).children[1].textContent;
        const med = {
            medPrice,
            medTitle
        }
        medicine.push(med);
        i += 1;
    }
    renderedMedicine = medicine;
}
addMedicine();

sortButton.addEventListener('click', (event) => {
    event.preventDefault();
    let sortedMedicine = [];
    for (let med of medicine) {
        sortedMedicine.push(med);
    }
    sortedMedicine.sort(function (a, b) { return b.medPrice - a.medPrice });
    renderMedicine(sortedMedicine);
    totalPrice.innerHTML = '';
});

backButton.addEventListener('click', (event) => {
    event.preventDefault();
    renderMedicine(medicine);
    totalPrice.innerHTML = '';
});

const countTotalPrice = (medicine) => {
    const totalMedPrice = medicine.reduce(function (totalMedPrice, a) {
        return totalMedPrice + parseInt(a.medPrice);
    }, 0);
    totalPrice.insertAdjacentHTML('beforeend', totalPriceTemplate(totalMedPrice));
}

const totalPriceTemplate = (totalMedPrice) => `${totalMedPrice}`;

countButton.addEventListener('click', (event) => {
    totalPrice.innerHTML = '';
    event.preventDefault();
    console.log(renderedMedicine);
    countTotalPrice(renderedMedicine);
});

const itemTemplate = (item, id) => `
<div class="block" id="${id}-med">
    <img src="medicine.jpeg" alt="med" class="med-photo">
    <div class=med "${id}-med-name">${item.medTitle}</div>
    <div class="med-price">Medicine price in dollars:</div>
    <div class="med-price" id="${id}-med-price">${item.medPrice}</div>
</div>`

const insertItem = (item, id) => {
    asideItems.insertAdjacentHTML('beforeend', itemTemplate(item, id))
}

const renderMedicine = (items) => {
    asideItems.innerHTML = '';
    for (const item of items) {
        insertItem(item, item.id)
    }
}