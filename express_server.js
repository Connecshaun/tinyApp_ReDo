const express = require('express');
const app = express();
const PORT = 8080; 
app.set("view engine", "ejs");


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//templateVars must always be an object so that the data can be properly accessed by our ejs templates... which can access the value of keys
app.get('/', (req, res) => {
  res.send("Hello!");
});

//renders all urls along with their shortened form
app.get('/urls', (req, res) => {
  const templateVars = { urls: urlDatabase }
  res.render('urls_index', templateVars)
})

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

//server side html
app.get('/hello', (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
})

app.listen(PORT, () =>{
  console.log(`TinyApp running on port ${PORT}!`)
});