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
            // Ask about ID of desired product
            message: "What is the ID of the Item you wish to purchase?"
        })
        // Ask how many units

        .then(function (answer) {
                // how to grab itemID? 
                var query = "SELECT item_ID, product_name, department_name, price, stock_quantity FROM products WHERE ?";
                connection.query(query, {
                    artist: answer.artist
                }, function (err, res) {
                    // from top5000 activity
                    // for (var i = 0; i < res.length; i++) {
                    //     console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
                    // }
                    // runSearch();
                });
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