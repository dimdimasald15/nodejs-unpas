const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  checkDuplicate,
  deleteContact,
  updateContact
} = require("./utils/contact");
const { check, body, validationResult } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

//setup ejs
app.set("view engine", "ejs");
app.use(expressLayouts);
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
app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    layout: "layouts/main",
    title: "Contact",
    contacts,
    msg: req.flash("msg"),
  });
});
// halaman form tambah data kontak
app.get("/contact/add", (req, res) => {
  res.render("formcontact", { layout: "layouts/main", title: "Add Contact", contact:false, action:"/contact" });
});
//create data contact
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplicate = checkDuplicate(value);
      if (duplicate) {
        throw new Error(
          "Maaf terjadi duplikasi data nama, silahkan masukkan nama yang berbeda"
        );
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("nohp", "No Handphone tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("formcontact", {
        layout: "layouts/main",
        title: "Add Contact",
        errors: errors.array(),
        contact:false,
        action:"/contact"
      });
    } else {
      addContact(req.body);
      // Kirim flash message
      req.flash("msg", "data kontak berhasil ditambahkan!");
      res.redirect("/contact");
    }
  }
);

// proses delete contact
app.get("/contact/delete/:nama", (req, res) => {
  let nama = req.params.nama;
  const contact = findContact(nama);

  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    deleteContact(nama);
    // kirim flash msg
    req.flash("msg", `data kontak ${nama} berhasil dihapus!`);
    res.redirect("/contact");
  }

  res.render("detail", {
    layout: "layouts/main",
    title: "Detail Contact Page",
    contact,
  });
});

// tampilkan form ubah data 
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("formcontact", { layout: "layouts/main", title: "Edit Contact", action:"/contact/update" , contact });
});
// proses ubah data
app.post(
  "/contact/update",
  [
    body("nama").custom((value, {req}) => {
      const duplicate = checkDuplicate(value);
      if (value !== req.body.oldNama && duplicate) {
        throw new Error(
          "Maaf terjadi duplikasi data nama, silahkan masukkan nama yang berbeda"
        );
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("nohp", "No Handphone tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("formcontact", {
        layout: "layouts/main",
        title: "Edit Contact",
        errors: errors.array(),
        contact:req.body,
        action:"/contact/update"
      });
    } else {
      updateContact(req.body);
      // Kirim flash message
      req.flash("msg", "data kontak berhasil diubah!");
      res.redirect("/contact");
    }
  }
);

// halaman detail data kontak
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
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
