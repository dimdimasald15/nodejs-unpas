const express = require("express");
const expressLayouts = require("express-ejs-layouts");

// const { check, body, validationResult } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

//gunakan ejs
app.set("view engine", "ejs");

// Third party middleware
app.use(expressLayouts);
// Built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  const mhs = [
    {
      nama: "Dimas Aldi Sallam",
      email: "dimdim@mail.com",
    },
    {
      nama: "Mario Fernando",
      email: "mario@mail.com",
    },
    {
      nama: "Ananta Eka Saputra",
      email: "taka@mail.com",
    },
  ];
  res.render("index", { layout: "layouts/main", title: "Home", mhs });
});

app.get("/about", (req, res) => {
  res.render("about", { layout: "layouts/main", title: "About" });
});
app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();
  res.render("contact", {
    layout: "layouts/main",
    title: "Contact",
    contacts,
    msg: req.flash("msg"),
  });
});

// halaman detail data kontak
app.get("/contact/:id", async (req, res) => {
  // const contact = findContact(req.params.nama);
  const contact = await Contact.findById(req.params.id);
  console.log(contact);

  res.render("detail", {
    layout: "layouts/main",
    title: "Detail Contact Page",
    contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
