const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

//gunakan ejs
app.set('view engine', 'ejs');

// Third party middleware
app.use(expressLayouts);
app.use(morgan('dev'));
// Built-in middleware
app.use(express.static('public'));


// Application-level middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

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
  res.render('contact', {layout:'layouts/main', title: 'Contact'});
});

app.use('/', (req, res) => {
  res.status(404);
  res.send('<h1>404</h1>');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
