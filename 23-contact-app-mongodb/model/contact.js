const mongoose = require("mongoose");
// Schema Contact
const Contact = mongoose.model("Contact", {
  nama: {
    type: String,
    required: true,
  },
  nohp: {
    type: String,
    required: true,
  },
  email: String,
});


module.exports = Contact;