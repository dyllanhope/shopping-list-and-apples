
function totalNumberSold(applesSoldList) {
	let count = 0;
	let item;
	for (item of applesSoldList) {
		count += item.qty;
	}
	return count;
}

function totalIncome(applesSoldList) {
	let total = 0.00;
	let item;
	for (item of applesSoldList) {
		let costOfQty = item.qty * item.price;
		total += costOfQty;
	};

	return total.toFixed(2);
}

function totalIncomeGreenApples(applesSoldList) {
	let total = 0.00;
	let item;
	for (item of applesSoldList) {
		if (item.color === 'green') {
			let costOfQty = item.qty * item.price;
			total += costOfQty;
		}
	};

	return total.toFixed(2);
}

function totalProfit(applesSoldList, applePriceMap) {
	let expense = 0.00;
	let income = totalIncome(applesSoldList);
	let profit = 0.00;
	for (var i = 0; i < applesSoldList.length; i++) {
		let costPrice = applePriceMap[applesSoldList[i].color];
		expense += costPrice * applesSoldList[i].qty
	};
	profit = income - expense;

	return profit.toFixed(2);
}

// -- extra functions...

function totalPerColorSold(apples, color) {
	let count = 0;
	let item;
	for (item of apples) {
		if (color === item.color) {
			count += item.qty;
		};
	};
	return count;
}

function totalIncomePerColor(apples, color) {
	let total = 0.00;
	let item;
	for (item of apples) {
		if (color === item.color) {
			let costByQty = item.qty * item.price
			total += costByQty;
		};
	};
	return total.toFixed(2);
}

function totalProfitPerColor(apples, color, costMap) {
	let expense = 0.00;
	let income = totalIncomePerColor(apples, color);
	let profit = 0.00;
	for (var i = 0; i < apples.length; i++) {
		if (color === apples[i].color) {
			let costPrice = costMap[apples[i].color];
			expense += costPrice * apples[i].qty
		};
	};
	profit = income - expense;

	return profit.toFixed(2);
}

function mostProfitableColor(apples, costMap) {
	let profitMap = {};
	let mostProfitCol='';
	let item;
	for(item of apples){
		if (profitMap[item.color] === undefined) {
			profitMap[item.color] = totalProfitPerColor(apples, item.color, costMap);
		};
	};
	let colorList = Object.keys(costMap);
	let color;
	let profit = 0.00;
	for (color of colorList){
		if (Number(profitMap[color]) > profit) {
			mostProfitCol = color;
			profit = Number(profitMap[color]);
		};
	};
	return mostProfitCol;
}