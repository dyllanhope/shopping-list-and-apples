const ShoppingListManager = () => {
    let budget = 0;
    let topic = '';
    let grandTotal = 0;
    let errorMessage = '';
    let listMap = {};
    let itemCounts = {};

    const setBudget = (num) => { budget = num; };

    const returnBudget = () => { return budget; };

    const addItem = (price, description) => {
        errorMessage = '';
        if (topic === '') {
            if (listMap[description] === undefined) {
                listMap[description] = price;
                itemCounts[description] = 1;
            } else {
                listMap[description] += price;
                itemCounts[description] ++;
            }
            totalList();
        } else if (testTopic(description)) {
            if (listMap[description] === undefined) {
                listMap[description] = price;
                itemCounts[description] = 1;
            } else {
                listMap[description] += price;
                itemCounts[description] ++;
            }
            totalList();
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
        if (grandTotal > budget) {
            errorMessage = 'Your total has gone over your set budget!';
        } else if (errorMessage === 'Your total has gone over your set budget!'){
            errorMessage = '';
        };
    };

    const errorDisplay = () => { return errorMessage; };

    const setTopic = (item) => { topic = item; };

    const returnTopic = () => { return topic; };

    const listDisplay = () => {
        let displayList = [];
        let counts = Object.values(itemCounts);
        let descriptionList = Object.keys(listMap);
        let priceList = Object.values(listMap);
        for (var x = 0; x < descriptionList.length; x++) {
            displayList.push({ description: descriptionList[x], cost: priceList[x].toFixed(2), qty: counts[x] });
        };

        return displayList;
    };

    const totalList = () => {
        grandTotal = 0;
        let costs = Object.values(listMap);
        let num;
        for (num of costs) {
            grandTotal += Number(num);
        };
    };

    const returnTotal = () => {
        return grandTotal.toFixed(2);
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
        returnTotal
    };
};