// function add(a,b){
//     return a+b;
// }

// var add = function(a,b){
//     return (a+b)
// }

// var add = (a,b) => {return a+b}

// var add = (a,b) => a+b;

// var result = add(9,2)
// console.log(result);

// (function(){
//     console.log("Sparsh")
// })();

// function callback(){
//     console.log("Task Done");
// }

// const add = function(a , b , callback){
//     const result = (a +b);
//     console.log("Sum :", result);
//     callback();
// }

// add(11,19,callback);

// add(12,14, function(){
//     console.log("Task Done")
// })

// add(14,15 , ()=>console.log("Task Done"))

// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile('greeting.txt' , 'Hi ' + user.username + '!\n' , ()=>{
//     console.log('File is created')
// });

// const notes = require('./notes')
// console.log('this is server page')

// var age = notes.age;
// console.log(age)

// const result = notes.sum(age, 10)
// console.log(result)

// var _ = require('lodash')

// var data = ["sparsh" , "vithal" , "navneet" , 19 , 1 ,1 , 1 , 1 ,2 , 'sparsh']

// console.log(_.uniq(data));
// console.log(_.isString(data));
// console.log(_.isArray(data));
// console.log(_.add(23, 32))
// console.log(_.filter(data)) ;


const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser'); 
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Welcome to Hotel!! ')
});

//Import Routes files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

//Use router
app.use('/person', personRoutes);
app.use('/menu',menuRoutes);

const PORT = process.env.PORT || 3000 ;

app.listen(3000 , ()=>{
  console.log('listening in port 3000')
});