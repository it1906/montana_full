const path = require("path");
const http = require("http");
const express = require("express");
const fsPromises = require("fs").promises;

async function readJSON(path) {
  const data = await fsPromises
    .readFile(path, 'utf-8')
    .catch(err => console.error("Failed to read file", err));
  return JSON.parse(data.toString());
}

async function writeJSON(path, data) {
    data = JSON.stringify(data);
    await fsPromises
      .writeFile(path, data, 'utf-8')
      .catch(err => console.error("Failed to write file", err));
    return data;
}

/*
readJSON('data/events.json')
 .then(data => console.log(data))
 .catch(err => console.error('Failed to read file', err));
*/

const app = express();
const server = http.createServer(app);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/events", (req, res) => {
    readJSON('public/historie/data/events.json')
    .then(data => res.send(data))
    .catch(err => res.send('Soubor nebylo možné načíst', err));       
});

app.get("/api/events/:index", (req, res) => {
    readJSON('public/historie/data/events.json')
    .then(data => {
        res.send(data[req.params.index])
    })
    .catch(err => res.send('Soubor nebylo možné načíst', err));       
});

app.get("/api/events/year/:year", (req, res) => {
    readJSON('public/historie/data/events.json')
    .then(data => {
        const result = data.find(({year}) => year == req.params.year);
        res.send(result);
    })
    .catch(err => res.send('Soubor nebylo možné načíst', err));       
});


app.get("/api/events/detail/:str", (req, res) => {   
    readJSON('public/historie/data/events.json')
    .then(data => {
        console.log(req.query['find']);
        const result = data.filter(obj => obj.detail.includes(req.query['find']));
        res.send(result);
    })
    .catch(err => res.send('Soubor nebylo možné načíst', err));       
});

app.get("/api/events/search", (req, res) => {    
    readJSON('public/historie/data/events.json')
    .then(data => {
        console.log(req.query['find']);       
        const result = data.filter(obj => obj.detail.includes(req.query['find']));
        res.send(result);
    })
    .catch(err => res.send('Soubor nebylo možné načíst', err));       
});

app.get("/api/heroes", (req, res) => {
    readJSON('public/historie/data/heroes.json')
    .then(data => res.send(data))
    .catch(err => res.send('Soubor nebylo možné načíst', err));       
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
