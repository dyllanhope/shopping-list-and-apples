describe('Shopping list tests', () => {
    describe('Settings tests', () => {
        it('Should return correct budget setting', () => {
            let instance = ShoppingListManager();
            instance.setBudget(10);
            assert.equal(instance.returnBudget(), 10);
        });
        it('Should return correct topic setting', () => {
            let instance = ShoppingListManager();
            instance.setTopic('test');
            assert.equal(instance.returnTopic(), 'test');
        });
    });
    describe('Adding items testing', () => {
        it('Should return list of newly added items (only 1 item)', () => {
            let instance = ShoppingListManager();
            instance.addItem(2, 'green apple');
            assert.deepEqual(instance.listDisplay(), [{ description: 'green apple', cost: 2, qty: 1 }]);
        });
        it('Should return list of newly added items (2 items)', () => {
            let instance = ShoppingListManager();
            instance.addItem(2, 'green apple');
            instance.addItem(5, 'yellow apple');

            assert.deepEqual(instance.listDisplay(), [
                { description: 'green apple', cost: 2, qty: 1 },
                { description: 'yellow apple', cost: 5, qty: 1 }
            ]);
        });
        it('Should return list of newly added items (2 items but green apples qty increased)', () => {
            let instance = ShoppingListManager();
            instance.addItem(2, 'green apple');
            instance.addItem(5, 'yellow apple');
            instance.addItem(2, 'green apple');

            assert.deepEqual(instance.listDisplay(), [
                { description: 'green apple', cost: 4, qty: 2 },
                { description: 'yellow apple', cost: 5, qty: 1 }
            ]);
        });
        it('Should return empty list as description does not match the topic', () => {
            let instance = ShoppingListManager();
            instance.setTopic('shoes');
            instance.addItem(2, 'green apple');
            instance.addItem(5, 'yellow apple');
            instance.addItem(2, 'green apple');

            assert.deepEqual(instance.listDisplay(), []);
        });
    });
    describe('Error message tests', () => {
        it('Should return a message for topic not matching', () => {
            let instance = ShoppingListManager();
            instance.setTopic('shoes');

            instance.addItem(2, 'green apples');
            assert.equal(instance.errorDisplay(), "This item doesn't contain the keyword 'shoes'");
        });
        it('Should return no message as topic is matching', () => {
            let instance = ShoppingListManager();
            instance.setTopic('shoes');

            instance.addItem(2, 'green shoes');
            assert.equal(instance.errorDisplay(), "");
        });
        it('Should return a message for total being over-budget', () => {
            let instance = ShoppingListManager();
            instance.setBudget(6);

            instance.addItem(8, 'green apples');
            instance.returnTotal();
            instance.overBudgetCheck();
            assert.equal(instance.errorDisplay(), "Your total has gone over your set budget!");
        });
        it('Should return no message as the total is lower than the budget', () => {
            let instance = ShoppingListManager();
            instance.setBudget(6);

            instance.addItem(5, 'green apples');
            instance.returnTotal();
            instance.overBudgetCheck();
            assert.equal(instance.errorDisplay(), "");
        });
    });
    describe('Testing totalling', ()=>{
        it('Should return a total of 5 from the list', ()=>{
            let instance = ShoppingListManager();

            instance.addItem(2, 'green apples');
            instance.addItem(3, 'red apples');

            assert.equal(instance.returnTotal(), 5);
        });
        it('Should return a total of 0 from the list when nothing is added', ()=>{
            let instance = ShoppingListManager();

            assert.equal(instance.returnTotal(), 0);
        });
    });
});