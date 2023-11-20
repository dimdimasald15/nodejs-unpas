const fs = require('fs');

// membuat forder data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}
// membuat file contact.json jika belum ada
const dataPath = 'data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf8');
}

//ambil semua data kontak
const loadContact = () => {
    const fileContacts = fs.readFileSync(dataPath, 'utf8');
    let contacts = JSON.parse(fileContacts);
    return contacts;
};

// ambil data kontak sesuai nama
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((val) => val.nama.toLowerCase() === nama.toLowerCase());
    return contact;
};


module.exports = { loadContact, findContact };