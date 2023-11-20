const fs = require("fs");

// membuat forder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
// membuat file contact.json jika belum ada
const dataPath = "data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf8");
}

//ambil semua data kontak
const loadContact = () => {
  const fileContacts = fs.readFileSync(dataPath, "utf8");
  let contacts = JSON.parse(fileContacts);
  return contacts;
};

// ambil data kontak sesuai nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (val) => val.nama.toLowerCase() === nama.toLowerCase()
  );
  return contact;
};

// menuliskan/menimpa file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// simpan data kontak baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// cek nama duplikat
const checkDuplicate = (nama)=>{
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama === nama);
}
module.exports = { loadContact, findContact, addContact, checkDuplicate };
