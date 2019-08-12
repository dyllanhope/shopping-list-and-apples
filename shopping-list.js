const ShoppingListManager = (list) => {
    let budget = 0;
    let topic = '';
    let grandTotal = 0;
    let errorMessage = '';
    let listMap = list || [];

    const setBudget = (num) => { budget = num; };

    const returnBudget = () => { return budget; };

    const addItem = (costPrice, description) => {
        let found = false;
        let price = Number(costPrice);
        errorMessage = '';
        if (topic === '') {
            for (var i = 0; i < listMap.length; i++) {
                if (listMap[i].description === description) {
                    listMap[i].qty++;
                    let newCost = Number(listMap[i].cost) + price;
                    listMap[i].cost = newCost;
                    found = true;
                };
            };
            if (!found) {
                listMap.push({ description: description, cost: price, qty: 1 });
            };
        } else if (testTopic(description)) {
            for (var i = 0; i < listMap.length; i++) {
                if (listMap[i].description === description) {
                    listMap[i].qty++;
                    let newCost = Number(listMap[i].cost) + price;
                    listMap[i].cost = newCost;
                    found = true;
                };
            };
            if (!found) {
                listMap.push({ description: description, cost: price, qty: 1 });
            };
        } else {
            errorMessage = "This item doesn't contain the keyword '" + topic + "'";
        }
    };

    const testTopic = (description) => {
        let sentenceArr = description.split(' ');
        let word;
        for (word of sentenceArr) {
            if (word === topic) {
                return true;
            };
        };
        return false;
    };

    const overBudgetCheck = () => {
        totalList();
        if (grandTotal > budget) {
            errorMessage = 'Your total has gone over your set budget!';
        } else if (errorMessage === 'Your total has gone over your set budget!') {
            errorMessage = '';
        };
    };

    const errorDisplay = () => { return errorMessage; };

    const setTopic = (item) => { topic = item; };

    const returnTopic = () => { return topic; };

    const listDisplay = () => { return listMap; };

    const totalList = () => {
        grandTotal = 0;
        for (var x = 0; x < listMap.length; x++) {
            grandTotal += listMap[x].cost;
        };
    };

    const returnTotal = () => {
        totalList();
        return Number(grandTotal).toFixed(2);
    };

    const clear = () => {
        listMap = [];
        grandTotal = 0;
        errorMessage = '';
    };

    const deleteItem = (description) => {
        for (var i = 0; i < listMap.length; i++) {
            if (listMap[i].description === description) {
                listMap.splice(i,1);
            };
        };
    };

    return {
        setBudget,
        returnBudget,
        overBudgetCheck,
        errorDisplay,
        setTopic,
        returnTopic,
        addItem,
        listDisplay,
        returnTotal,
        clear,
        deleteItem
    };
};