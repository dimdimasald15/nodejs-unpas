const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const { check, body, validationResult } = require("express-validator");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const methodOverride = require("method-override");

require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

// setup method override
app.use(methodOverride("_method"));

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

// halaman form tambah data kontak
app.get("/contact/add", (req, res) => {
  res.render("formcontact", {
    layout: "layouts/main",
    title: "Add Contact",
    contact: false,
    action: "/contact",
  });
});

//create data contact
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      // const duplicate = checkDuplicate(value);
      const duplicate = await Contact.findOne({ nama: value });
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
        contact: false,
        action: "/contact",
      });
    } else {
      Contact.insertMany(req.body)
        .then((result) => {
          // Kirim flash message
          req.flash("msg", "data kontak berhasil ditambahkan!");
          res.redirect("/contact");
        })
        .catch((error) => {
          // Tangani error jika diperlukan
          console.error(error);
          // Tambahkan logika penanganan error lainnya sesuai kebutuhan Anda
          res.status(500).send("Terjadi kesalahan saat menyimpan data kontak");
        });
    }
  }
);

// proses delete contact
app.delete('/contact', async (req,res)=>{
  let nama = req.body.nama;
  try{
    const contact = await Contact.findByIdAndDelete(req.body.id);
    req.flash("msg", `data kontak ${nama} berhasil dihapus!`);
    res.redirect("/contact");
  }catch(e){
    console.error(error);
    // Tambahkan logika penanganan error lainnya sesuai kebutuhan Anda
    res.status(500).send(`Terjadi kesalahan saat menghapus data kontak ${nama}`);
  }
})

// tampilkan form ubah data 
app.get("/contact/edit/:id", async(req, res) => {
  // const contact = findContact(req.params.id);
  const contact = await Contact.findById(req.params.id);
  res.render("formcontact", { layout: "layouts/main", title: "Edit Contact", action:"/contact?_method=PUT" , contact });
});

// proses ubah data
app.put(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplicate = await Contact.findOne({ nama: value });
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
        title: "Edit Contact",
        errors: errors.array(),
        contact:req.body,
        action:"/contact/update"
      });
    } else {
      Contact.findByIdAndUpdate(req.body.id, req.body)
      .then((result) => {
        // Kirim flash message
        req.flash("msg", "data kontak berhasil diubah!");
        res.redirect("/contact");
      })
      .catch((error) => {
        // Tangani error jika diperlukan
        console.error(error);
        // Tambahkan logika penanganan error lainnya sesuai kebutuhan Anda
        res.status(500).send("Terjadi kesalahan saat menyimpan data kontak");
      });
    }
  }
);

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
