

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mysql = require('mysql');
const login = require('./serverhandles/login');
const handleaddemp = require('./serverhandles/handleaddemp');
const handlehome = require('./serverhandles/handlehome');
const searchproduct = require('./serverhandles/searchproduct');
const getItems = require('./serverhandles/getItems');
const handlepayment = require('./serverhandles/handlepayment');
const handlegetemp = require('./serverhandles/handlegetemp');
const handlermemp = require('./serverhandles/handlermemp');
const handlesales = require('./serverhandles/handlesales');
const md5   = require("blueimp-md5");
const path = require('path');



const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../')));

var connection = mysql.createConnection({
  host : 'localhost',
  port  : 3306,
  user     : 'root',
  password : '#fisheyeB233',
  database : 'supermarket',
  insecureAuth : true
});

connection.connect(function(err) {
  if(err)console.log(err);
  
  console.log("Database connected");

app.post('/login',  login.handlelogin(connection))

app.post('/home', handlehome.handlehome(connection))

app.post('/addemp', handleaddemp.addemp(connection))

app.post('/searchproduct', searchproduct.search(connection))

app.post('/getItems', getItems.getItems(connection))

app.post('/getemp', handlegetemp.getemp(connection))

app.post('/rmemp', handlermemp.rmemp(connection))

app.post('/payment', handlepayment.pay(connection))

app.post('/getSales', handlesales.getSales(connection))

// // Function to execute the sales trends report procedure
// const getSalesTrendsReport = (startDate, endDate, connection) => {
//   return new Promise((resolve, reject) => {
//       const sql = 'CALL generate_sales_trends_report(?, ?)';
//       connection.query(sql, [startDate, endDate], (error, results) => {
//           if (error) {
//               reject(error);
//           } else {
//               resolve(results[0]);
//           }
//       });
//   });
// };
// // Route to handle generating the sales trends report
// app.post('/generateSalesTrendsReport', async (req, res) => {


//   const startDate = req.body.start_date;
//   const endDate = req.body.end_date;

//       const sql = 'CALL generate_sales_trends_report(?, ?)';
//       connection.query(sql, [startDate, endDate], (error, results) => {
//           if (error) {
//               console.error('Error occurred while generating the report:', error);
//               res.status(500).json({ status: 0, message: 'Error occurred while generating the report' });
//           } else {
             
//               const salesData = results[0];
//               res.json(salesData);
//           }
//       });
//    } 
 
// );

const generateSalesTrendsReport = async (startDate, endDate) => {
  try {
      const sql = 'CALL generate_sales_trends_report(?, ?)';
      const [results] = await connection.query(sql, [startDate, endDate]);
      return results;
  } catch (error) {
      throw error;
  }
};


console.log('Before /generateSalesTrendsReport route definition');

// Route to handle generating the sales trends report
app.post('/generateSalesTrendsReport', async (req, res) => {
  const startDate = req.body.start_date;
  const endDate = req.body.end_date;

  try {
    console.log('Generating sales trends report from', startDate, 'to', endDate);
    if (!connection || !connection.state || connection.state !== 'authenticated') {
      console.error('Database connection is not established');
      return res.status(500).json({ message: 'Error occurred while generating the report' });
    }


    const sql = 'CALL generate_sales_trends_report(?, ?)';
    console.log('Executing SQL query:', sql, [startDate, endDate]);
    const [results] = await connection.query(sql, [startDate, endDate]);
    console.log('Quer executed successfully. Result:', results);

    if (results.length > 0) {
      console.log('Sales trends report generated successfully');
      res.json(results);
    } else {
      console.log('No data available for the selected period');
      res.status(404).json({ message: 'No data available for the selected period.' });
    }
    } 
    catch (error) {
     console.error('Error occurred while generating the report:', error);
     res.status(500).json({ message: 'Error occurred while generating the report' });
  }
});

console.log('After /generateSalesTrendsReport route definition');


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});


app.listen(3000, ()=>{console.log("running on 3000");})


});

