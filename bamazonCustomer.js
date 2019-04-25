// require mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");
// create connection for SQL server 
// USE GITIGNORE/.ENV?? TO KEEP MY PASSWORD SECRET
// var connection = mysql.createConnection({
//     host: "localhost",

//     // Your port;
//     port: 3375,

//     // Your username
//     user: "root",

//     // Your password **FIX!!!!!!**
//     password: "",
//     database: "top_songsDB"
// });
// ------------------------------------------
// immediately display all items for sale(the table, basically)

// ------------------------------------------
function userPurchase() {
    // prompt user: (INQUIRER)
    inquirer
        .prompt({
            name: item_id,
            type: 'input',
            // Ask about ID of desired product
            message: "What is the ID of the Item you wish to purchase?"
        })
        // Ask how many units

        .then(function (answer) {
                // how to grab itemID? 
                var selectedItem = answer.item_id;
                var quantity = answer.quantity;
                // WHICH ONE??????
                // var query = 'SELECT * FROM products WHERE ?';
                // **********OR********
                // var query = "SELECT item_ID, product_name, department_name, price, stock_quantity FROM products WHERE ?";
                connection.query(query, {
                    item_id: selectedItem
                }, function (err, res) {
                    if (err) throw err;
                    // COMPLETE: and if it's not an error??
                });
                // DON'T FORGET: create a way to make sure the user only enters valid ID
                //              IF NOT: "That is not a valid ID, please check the product list and try again"
            }
            // ------------------------------------------
            // Customer selects

            // if selection greater than/equal to amount in inventory: 
            //      fulfill order: UPDATE sql database (subtract req amnt from current amnt)
            //                     show customer total cost of purchase

            // else "Insufficient Quantity" and stop order

            // ------------------------------------------
            // exit
            // **********************Review/Extras********************************
            // NOTE: Call functions!!!
            // OPTIONAL: prompt for another purchase or to exit 
            //              HOW: update original "on-load" and run that function after purchase.