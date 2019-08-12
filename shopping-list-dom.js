let listTemplateSource = document.querySelector('.listTemplate').innerHTML;

let budgetInput = document.querySelector('.budget');
let topicInput = document.querySelector('.topic');
let updateSettings = document.querySelector('.updateSettings');
let errorDisplay = document.querySelector('.error');
let itemPrice = document.querySelector('.price');
let itemDescription = document.querySelector('.description');
let addBtn = document.querySelector('.addItem');
let listData = document.querySelector('.listData');
let clearBtn = document.querySelector('.clearBtn');

let listTemplate = Handlebars.compile(listTemplateSource);

if(localStorage['list']){
    var oldList = JSON.parse(localStorage['list']);
} else {
    oldList = [];
};

let shopInstance = ShoppingListManager(oldList);

window.onload = () => {
    buildList();
    errorDisplay.style.display = 'none';
};

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    shopInstance.clear();
    buildList();
    displayError();
});

updateSettings.addEventListener('click', () => {
    errorDisplay.innerHTML = '';
    errorDisplay.style.display = 'none';
    let budget = Number(budgetInput.value);
    shopInstance.setBudget(budget);
    shopInstance.setTopic((topicInput.value).toLowerCase());
    shopInstance.overBudgetCheck();
    displayError();
});

addBtn.addEventListener('click', () => {
    errorDisplay.innerHTML = '';
    errorDisplay.style.display = 'none';
    if(itemDescription.value && itemPrice.value){
        let descriptionItem = (itemDescription.value).toLowerCase();
        shopInstance.addItem(Number(itemPrice.value), descriptionItem.trim());
        shopInstance.overBudgetCheck();
        displayError();
        buildList();
        localStorage['list'] = JSON.stringify(shopInstance.listDisplay());
    } else {
        errorDisplay.style.display = 'unset';
        errorDisplay.innerHTML = 'Please fill out all of the below fields';
    }
});

window.onclick = (event) => {
    let item = event.target.id;
    if(item){
        shopInstance.deleteItem(item.trim());
    };
    localStorage['list'] = JSON.stringify(shopInstance.listDisplay()); 
    buildList();
};

const displayError = () => {
    if (shopInstance.errorDisplay()) {  
        errorDisplay.style.display = 'unset';
        errorDisplay.innerHTML = shopInstance.errorDisplay();
    } else {
        errorDisplay.style.display = 'none';        
    };
};

const buildList = () => {
    let data = {
        items: shopInstance.listDisplay(),
        total: shopInstance.returnTotal()
    };
    let listHTML = listTemplate(data);
    listData.innerHTML = listHTML;
};