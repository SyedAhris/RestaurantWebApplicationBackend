var express = require('express');
var app = express();
var db = require('./db_con');
var cors = require('cors');

app.use(cors());
app.use(express.json());

//simple route or default route 
app.get("/", (req,res) => {
    res.json({messege: "Welcome to Nodejs application."});
});

app.listen('3001' , () =>{
    console.log("Server started on port 3001");
});

app.post('/setOrderStatus', (req, res)=> {
    const orderID = req.body.ordID;
    const status = req.body.status;

    db.query(
        "UPDATE `onlineorders` SET `oo_status` = ? WHERE `onlineorders`.`oo_id` = ?",
        [status,orderID],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else {
                res.send(result);
            }
        }
    );
});


app.post('/login', (req, res)=> {
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

    db.query(
        "Select * from customers where cust_email = ? AND cust_password = ?",
        [userEmail,userPassword],
        (err, result) => {
            if (err) {
                res.send({err:err})
            }
            if (result.length>0){
                console.log(result.length);

                res.send(result);
            } else {
                res.send({message: "Wrong Username/password combination or The user doesnt exist"});
            }
        }
    );
});

app.post('/addorderhasemployees', (req, res)=> {
    const orderID = req.body.orderID;
    const empID = req.body.empID;

    db.query(
        "INSERT INTO `orders_has_employees` (`order_ID`, `emp_ID`) VALUES (?, ?);",
        [orderID,empID],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else {
                res.send(result);
            }
        }
    );
});

app.post('/addonlineorderhasemployees', (req, res)=> {
    const orderID = req.body.orderID;
    const empID = req.body.empID;

    db.query(
        "INSERT INTO `onlineorder_has_employees` (`onlineorder_id`, `employee_id`) VALUES (?, ?);",
        [orderID,empID],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else {
                res.send(result);
            }
        }
    );
});

app.post('/deleteorderhasemployees', (req, res)=> {
    const orderID = req.body.orderID;
    const empID = req.body.empID;

    db.query(
        "DELETE FROM `orders_has_employees` where `order_ID` = ? AND `emp_ID` = ? ;",
        [orderID,empID],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else {
                res.send(result);
            }
        }
    );
});

app.post('/deleteonlineorderhasemployees', (req, res)=> {
    const orderID = req.body.orderID;
    const empID = req.body.empID;

    db.query(
        "DELETE FROM `onlineorder_has_employees` where `onlineorder_id` = ? AND `employee_id` = ? ;",
        [orderID,empID],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else {
                res.send(result);
            }
        }
    );
});

app.post('/deleteonlineorder', (req, res)=> {
    const orderID = req.body.orderID;

    db.query(
        "DELETE FROM `onlineorder_has_employees` where `onlineorder_id` = ?;",
        [orderID],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else {
                db.query(
                    "DELETE FROM `onlineorder_has_dishes` where `o.order_ID` = ?;",
                    [orderID],
                    (err, result) => {
                        if (err) {
                            res.send({err:err})
                        } else {
                            db.query(
                                "DELETE FROM `onlineorders` where `oo_id` = ?;",
                                [orderID],
                                (err, result) => {
                                    if (err) {
                                        res.send({err:err})
                                    } else {
                                        res.send(result);
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
    
});

app.post('/deleteOrderDishes', (req, res)=> {
    const orderID = req.body.orderID;
    const dishID = req.body.dishID;
    const qty = req.body.qty;
    db.query(
        "DELETE FROM `order_has_dishes` where `o_ID` = ? AND `d_ID` = ? AND `qty` = ?;",
        [orderID,dishID, qty],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else {
                res.send(result);
            }
        }
    );
});

app.post('/decreaseorderqty', (req, res)=> {
    const orderID = req.body.orderID;
    const dishID = req.body.dishID;
    const oldQty = req.body.qty;
    const qty = req.body.qty -1;
    db.query(
        "UPDATE `order_has_dishes` SET `qty` = ? WHERE `order_has_dishes`.`d_ID` = ? AND `order_has_dishes`.`o_ID` = ? AND `order_has_dishes`.`qty` = ?",
        [qty,dishID, orderID, oldQty],
        (err, result) => {
            if (err) {
                res.send({err:err})
                console.log({err:err})
            } else {
                res.send(result);
                console.log(result);
            }
        }
    );
});
app.post('/decreaseorderprice', (req, res)=> {
    const orderID = req.body.orderID;
    db.query(
        "UPDATE `orders` SET `order_price` = ? WHERE `orders`.`order_id` = ? ",
        [orderID],
        (err, result) => {
            if (err) {
                res.send({err:err})
                console.log({err:err})
            } else {
                res.send(result);
                console.log(result);
            }
        }
    );
});

app.post('/deleteorderandemployees', (req, res)=> {
    const orderID = req.body.orderID;
    
    db.query(
        "DELETE FROM `orders_has_employees` where `order_ID` = ?;",
        [orderID],
        (err, result) => {
            if (err) {
                res.send({err:err})
                console.log({err:err})
            } else {
                console.log('delete emp works')
                db.query(
                    "DELETE FROM `orders` where `order_id` = ?;",
                    [orderID],
                    (err, result) => {
                        if (err) {
                            res.send({err:err})
                            console.log({err:err});
                        } else {
                            console.log('delete order works')
                            res.send(result);
                        }
                    }
                );
            }
        }
    );
    
});

app.post('/emplogin', (req, res)=> {
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

    db.query(
        "Select * from employees where emp_email = ? AND emp_password = ?",
        [userEmail,userPassword],
        (err, result) => {
            if (err) {
                res.send({err:err})
            }
            if (result.length>0){
                console.log(result.length);

                res.send(result);
            } else {
                res.send({message: "Wrong Username/password comination"});
            }
        }
    );
});


app.post('/addOnlineOrder', (req, res)=> {
    const custID = req.body.custID;
    const price = req.body.totalPrice;
    const number = req.body.number;
    const address = req.body.address;

    db.query(
        "INSERT INTO `onlineorders` (`oo_id`, `oo_cust_id`, `oo_date`, `oo_time`, `oo_price`, `oo_status`, `oo_phnumber`, `oo_address`) VALUES (NULL, ?, CURRENT_DATE(), CURRENT_TIME(), ?, 'OrderPlaced', ? , ?);",
        [custID,price, number, address],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else if (result){
                res.send(result);
            }
        }
    );
});
app.post('/addDishes', (req, res)=> {
    const dishName = req.body.dishName;
    const dishDescription = req.body.dishDescription;
    const dishPrice = req.body.dishPrice;

    db.query(
        "INSERT INTO `dishes` ( `dish_id` ,`dish_name`, `dish_desc`, `dish_price`) VALUES (NULL, ?,?,?);",
        [dishName,dishDescription, dishPrice],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else if (result){
                res.send(result);
            }
        }
    );
});

app.post('/addEmployees', (req, res)=> {
    const empName=  req.body.empName;
    const empCatID= req.body.empCatID;
    const hireDate= req.body.hireDate;
    const cnic= req.body.cnic;
    const number= req.body.number;
    const salary= req.body.salary;
    const email= req.body.email;
    const password= req.body.password;
    console.log(cnic);
    db.query(
        "INSERT INTO `employees` ( `emp_id` ,`empcat_id`, `emp_name`, `hire_date`, `CNIC_no`, `emp_phone_no`, `salary`, `emp_email`, `emp_password`) VALUES (NULL, ?,?,?,?,?,?,?,?);",
        [empCatID,empName, hireDate, cnic, number, salary, email, password],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else if (result){
                res.send(result);
            }
        }
    );
});

app.post('/updateEmployees', (req, res)=> {
    const empID = req.body.empID;
    const empName=  req.body.empName;
    const empCatID= req.body.empCatID;
    const hireDate= req.body.hireDate;
    const cnic= req.body.cnic;
    console.log(cnic);
    const number= req.body.number;
    const salary= req.body.salary;
    const email= req.body.email;
    const password= req.body.password;

    db.query(
        "UPDATE `employees` SET `empcat_id` = ?, `emp_name` = ?, `hire_date` = ?, `CNIC_no` = ?, `emp_phone_no` = ?, `salary` = ?, `emp_email` = ?, `emp_password` = ? WHERE `employees`.`emp_id` = ?;",
        [empCatID,empName, hireDate, cnic, number, salary, email, password, empID],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else if (result){
                res.send(result);
            }
        }
    );
});

app.post('/updateDishes', (req, res)=> {
    const dishID = req.body.dishID;
    const dishName = req.body.dishName;
    const dishDescription = req.body.dishDescription;
    const dishPrice = req.body.dishPrice;

    db.query(
        "UPDATE `dishes` SET `dish_name` = ?, `dish_desc` = ?, `dish_price` = ? WHERE `dishes`.`dish_id` =? ",
        [dishName,dishDescription, dishPrice, dishID],
        (err, result) => {
            if (err) {
                res.send({err:err})
                console.log()
            } else if (result){
                res.send(result);
            }
        }
    );
});

app.post('/addOrder', (req, res)=> {
    const price = req.body.totalPrice;
    db.query(
        "INSERT INTO `orders` (`order_id`, `order_price`, `order_date`, `order_time`) VALUES (NULL, ?, CURRENT_DATE(), CURRENT_TIME);",
        [price],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else if (result){
                res.send(result);
            }
        }
    );
});

app.post('/addOnlineOrderDishes', (req, res)=> {
    const dishID = req.body.dishID;
    const custID = req.body.custID;
    const qty = req.body.qty;
    var oo_id;
    db.query(
        "SELECT oo_id FROM onlineorders WHERE oo_cust_id = ? ORDER BY oo_id DESC LIMIT 1;",
        [custID],
        (err, result) => {
            if (err) {
               console.log(error)
            } else if (result){
                oo_id = result[0].oo_id;
                db.query(
                    "INSERT INTO `onlineorder_has_dishes` (`dishes_ID`, `o.order_ID`, `o_qty`) VALUES (?, ?, ?);",
                    [dishID, oo_id, qty],
                    (err, result) => {
                        if (err) {
                            res.send({err:err})
                        } else if (result){
                            console.log(result);
                            res.send(result);
                        }
                    }
                );
            }
        }
    );
});

app.post('/addOrderDishes', (req, res)=> {
    const dishID = req.body.dishID;
    const qty = req.body.qty;
    var oo_id;
    db.query(
        "SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1;",
        
        (err, result) => {
            if (err) {
               console.log(error)
            } else if (result){
                oo_id = result[0].order_id;
                db.query(
                    "INSERT INTO `order_has_dishes` (`d_ID`, `o_ID`, `qty`) VALUES (?, ?, ?);",
                    [dishID, oo_id, qty],
                    (err, result) => {
                        if (err) {
                            res.send({err:err})
                        } else if (result){
                            console.log(result);
                            res.send(result);
                        }
                    }
                );
            }
        }
    );
});
app.post('/addOrderEmployee', (req, res)=> {
    const empID = req.body.empID;
    var oo_id;
    db.query(
        "SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1;",
        
        (err, result) => {
            if (err) {
               console.log(error)
            } else if (result){
                oo_id = result[0].order_id;
                db.query(
                    "INSERT INTO `orders_has_employees` (`order_id`, `emp_id`) VALUES (?, ?);",
                    [oo_id, empID],
                    (err, result) => {
                        if (err) {
                            res.send({err:err})
                        } else if (result){
                            console.log(result);
                            res.send(result);
                        }
                    }
                );
            }
        }
    );
});
app.post('/signup', (req, res)=> {
    const userName = req.body.userName;
    const userNumber = req.body.userNumber;
    const userAddress = req.body.userAddress;
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    db.query(
        "INSERT INTO `customers` (`cust_id`, `cust_name`, `cust_number`, `cust_address`, `cust_email`, `cust_password`) VALUES (NULL, ?, ?, ?, ?, ?);",
        [userName, userNumber, userAddress, userEmail,userPassword],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else if (result){
                res.send(result);
            }
        }
    );
});

app.get('/getdishes', (req,res)=>{
    let sql = "select * from dishes;";
    db.query(sql, (err, result)=>{
        if (err){
            throw err;
        }
        console.log(result);
        res.json(result);
    });
});



app.get('/getChef', (req,res)=>{
    let sql = "select emp_id, emp_name from employees where empcat_id = 4;";
    db.query(sql, (err, result)=>{
        if (err){
            throw err;
        }
        console.log(result);
        res.json(result);
    });
});

app.get('/getCashier', (req,res)=>{
    let sql = "select emp_id, emp_name from employees where empcat_id = 2;";
    db.query(sql, (err, result)=>{
        if (err){
            throw err;
        }
        console.log(result);
        res.json(result);
    });
});

app.get('/getOnlineCashier', (req,res)=>{
    let sql = "select emp_id, emp_name from employees where empcat_id = 3;";
    db.query(sql, (err, result)=>{
        if (err){
            throw err;
        }
        console.log(result);
        res.json(result);
    });
});

app.get('/getWaiter', (req,res)=>{
    let sql = "select emp_id, emp_name from employees where empcat_id = 5;";
    db.query(sql, (err, result)=>{
        if (err){
            throw err;
        }
        console.log(result);
        res.json(result);
    });
});

app.get('/getRider', (req,res)=>{
    let sql = "select emp_id, emp_name from employees where empcat_id = 6;";
    db.query(sql, (err, result)=>{
        if (err){
            throw err;
        }
        console.log(result);
        res.json(result);
    });
});

app.get('/getemployees', (req,res)=>{
    let sql = "select * from employeeview;";
    db.query(sql, (err, result)=>{
        if (err){
            throw err;
        }
        console.log(result);
        res.json(result);
    });
});

app.get('/getemployeesorderview', (req,res)=>{
    let sql = "select * from employeeorderview order by order_id;";
    db.query(sql, (err, result)=>{
        if (err){
            throw err;
        }
        console.log(result);
        res.json(result);
    });
});

app.get('/getemployeesonlineorderview', (req,res)=>{
    let sql = "select * from employeeonlineorderview order by onlineorder_id;";
    db.query(sql, (err, result)=>{
        if (err){
            throw err;
        }
        console.log(result);
        res.json(result);
    });
});


app.get('/getcustomers', (req,res)=>{
    let sql = "select cust_id, cust_name, cust_email, cust_address, cust_number from customers;";
    db.query(sql, (err, result)=>{
        if (err){
            throw err;
        }
        console.log(result);
        res.json(result);
    });
});

app.post('/getOnlineOrders', (req, res)=> {
    const custID = req.body.custID;

    db.query(
        "select * from onlineorders where oo_cust_id = ?",
        [custID],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else if (result){
                res.send(result);
            }
        }
    );
});

app.post('/getorderhasdishes', (req,res)=>{
    const ordID = req.body.ordID;
    console.log("order id " + ordID)
    db.query(
        "select * from order_has_dishes where `o_ID` = ?;",
        [ordID],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else if (result){
                console.log(result);
                res.send(result);
            }
        }
    );
});

app.post('/getOnlineOrderView', (req, res)=> {
    const custID = req.body.custID;

    db.query(
        "select * from onlineorderview where oo_cust_id = ? order by oo_id",
        [custID],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else if (result){
                res.send(result);
            }
        }
    );
});
app.get('/getorderview', (req, res)=> {

    db.query(
        "select * from orderview order by order_id",
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else if (result){
                res.send(result);
            }
        }
    );
});

app.post('/getCustomersWithID', (req, res)=> {
    const custID = req.body.custID;
    console.log(custID);
    db.query(
        "select * from customers where cust_id = ?",
        [custID],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else if (result){
                res.send(result);
            }
        }
    );
});

app.post('/getOnlineOrderViewAll', (req, res)=> {

    db.query(
        "select * from onlineorderview order by oo_id",
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else if (result){
                res.send(result);
            }
        }
    );
});
app.post('/getOnlineOrderViewAll', (req, res)=> {

    db.query(
        "select * from orderview by order_id",
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else if (result){
                res.send(result);
            }
        }
    );
});
app.post('/getOnlineOrderDishes', (req, res)=> {
    const orderID = req.body.orderID;

    db.query(
        "select * from onlineorder_has_dishes where order_ID = ?",
        [orderID],
        (err, result) => {
            if (err) {
                res.send({err:err})
            } else if (result){
                res.send(result);
            }
        }
    );
});


module.exports = app;