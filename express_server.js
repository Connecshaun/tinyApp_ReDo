const express = require('express');
const res = require('express/lib/response');
const app = express();
const PORT = 8080; 
app.set('view engine', 'ejs');

//bodyParser makes data readable when making POST requests. Converts data to a string and adds data to 'req' under key 'body'
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//this function will be used to generate a unique shortURL
const generateRandomString = () => {
  return Math.random().toString(36).slice(0, 6);
};

//templateVars must always be an object so that the data can be properly accessed by our ejs templates... the template can then access the value of keys
app.get('/', (req, res) => {
  res.send("Hello!");
});

//renders all urls along with their shortened form
app.get('/urls', (req, res) => {
  const templateVars = { urls: urlDatabase }
  res.render('urls_index', templateVars)
})

//renders form to user to "Create Tiny URL". We also need a POST route for this to handle the form submission.
app.get('/urls/new', (req, res) => {
  res.render('urls_new')
})

app.post('/urls', (req, res) => {
  console.log(req.body)
  res.send("ok")
})

//the endpoint having ':'before the id indicates that the id ('shortURL' or whatever we input) is a route parameter. This means that the value in this part of the url will be available in the req.params object. 
app.get('/urls/:shortURL', (req, res) => {
  const short = req.params.shortURL
  const long = urlDatabase[req.params.shortURL]
  const templateVars = {shortURL: short, longURL: long}
  res.render('urls_show', templateVars)
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