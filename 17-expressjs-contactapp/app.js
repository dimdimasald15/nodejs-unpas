const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {loadContact, findContact} = require('./utils/contact');

const app = express();
const port = 3000;

//gunakan ejs
app.set('view engine', 'ejs');

// Third party middleware
app.use(expressLayouts);
// Built-in middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
  const mhs = [
    {
      nama: 'Dimas Aldi Sallam',
      email: 'dimdim@mail.com',
    },
    {
      nama: 'Mario Fernando',
      email: 'mario@mail.com',
    },
    {
      nama: 'Ananta Eka Saputra',
      email: 'taka@mail.com',
    },
  ];
  res.render('index', {layout:'layouts/main', title: 'Home', mhs });
});
app.get('/about', (req, res) => {
  res.render('about', {layout:'layouts/main', title: 'About'});
});
app.get('/contact', (req, res) => {
  const contacts = loadContact();
  res.render('contact', {layout:'layouts/main', title: 'Contact', contacts});
});
app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('detail', {layout:'layouts/main', title: 'Halaman Detail Contact', contact});
});

app.use('/', (req, res) => {
  res.status(404);
  res.send('<h1>404</h1>');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
