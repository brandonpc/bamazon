// require mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");
// create connection for SQL server 
// *****DON'T PUSH UNTIL AFTER:*******
// a) Making the grade-able video
// b) deleting my password
// UNTIL THEN: Do all work on my local comp. 
// *********************************************
// *********************************************
var connection = mysql.createConnection({
    host: "localhost",

    // Your port;
    port: 3306,

    // Your username
    user: "root",

    // My password *emptied for security*
    password: "",
    database: "bamazon"

});
// display connection
// q for self : how the heck was it working b4?????
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

// ------------------------------------------
// immediately display all items for sale(the table, basically)
function storeFront() {
    query = 'SELECT * FROM products';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Welcome to Brandon's Bizarre Bazaar");
        console.log("We've got everything for your adventuring needs!\n");
        console.log("****************************************\n");
        console.log("Current Items: \n");
        var storeTable = '';

        for (var i = 0; i < res.length; i++) {
            // Empty(to be filled below in console.log)
            storeTable = '';
            storeTable += 'Item ID: ' + res[i].item_ID + ' || ';
            storeTable += 'Product: ' + res[i].product_name + ' || ';
            storeTable += 'Department: ' + res[i].department_name + ' || ';
            storeTable += 'Price: ' + res[i].price + ' rupees || ';
            storeTable += 'Left in Stock: ' + res[i].stock_quantity + ' \n';

            console.log(storeTable);
        }
        console.log("****************************************");
        userPurchase();
    })
}

// ------------------------------------------
function userPurchase() {
    // prompt user: (INQUIRER)
    inquirer
        .prompt([{
            name: "item_ID",
            type: 'input',
            // Ask about ID of desired product
            message: "What is the ID of the Item you wish to purchase?",
            validate: validateINT,
            filter: Number
        }, {
            name: 'quantity',
            type: 'input',
            message: "How many would you like?",
            validate: validateINT,
            filter: Number
        }])
        // Ask how many units

        .then(function (answer) {
            // how to grab itemID? 
            var selectedItem = answer["item_ID"];
            var howMany = answer.quantity;
            var query = 'SELECT * FROM products WHERE ?';
            connection.query(query, {
                item_ID: selectedItem
            }, function (err, res) {
                if (err) throw err;

                var selectedProduct = res[0];
                // console.log("Look here stupid");
                // console.log(selectedItem);

                // **SOMETHING HERE IS BREAKING DOWN**
                // selectedProduct: Working
                // console.log("SELECTED PRODUCT");
                // console.log(selectedProduct);
                // // howMany: UNDEFINED (prompt not working)
                // console.log("HOW MANY");
                // console.log(howMany);
                if (howMany <= selectedProduct.stock_quantity) {
                    console.log("Good choice! I'll get it from the back");
                    var updateQuantity = 'UPDATE products SET stock_quantity = ' + (selectedProduct.stock_quantity - howMany) + ' WHERE item_ID = ' + selectedItem;

                    // BELOW: automatically running: need "else"
                    connection.query(updateQuantity, function (err, res) {
                        if (err) throw err;
                        console.log("Your total is: " + selectedProduct.price * howMany + " rupees!");
                        console.log("Happy Adventuring! Come again!!");
                        console.log("\n************************************************************************\n");
                        console.log("\n************************************************************************\n");
                        console.log("Don't tell anyone about the discounts I gave you: it's a secret to everybody.");
                        console.log("\n************************************************************************\n");
                    })

                } else {
                    console.log("We don't have enough of those unfortunately, check how many we have in stock and try again.");
                    console.log("\n************************************************************************\n");
                    connection.end();

                }

            })
            // DON'T FORGET: create a way to make sure the user only enters valid ID
            //              IF NOT: "That is not a valid ID, please check the product list and try again"
        });
}
// function to replace doing multiple functions to validate
function validateINT(value) {
    var integer = Number.isInteger(parseFloat(value));

    if (integer > 0) {
        return true;
    } else {
        return 'No can do, genius. It needs to be a number above zero! Try again.';
    }
}
// ------------------------------------------
// Customer selects

// if selection greater than/equal to amount in inventory: 
//      fulfill order: UPDATE sql database (subtract req amnt from current amnt)
//                     show customer total cost of purchase

// else "Insufficient Quantity" and stop order

// ------------------------------------------
// START APP
// function initBamazon() {
storeFront();

// initBamazon();
// **********************Review/Extras********************************
// NOTE: Call functions!!!
// OPTIONAL: prompt for another purchase or to exit 
//              HOW: update original "on-load" and run that function after purchase.