const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

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

const loadContact = () => {
  const fileContacts = fs.readFileSync(dataPath, 'utf8');
  let contacts = JSON.parse(fileContacts);
  return contacts;
};

const simpanContact = (nama, email, noHp) => {
  const newContact = { nama, email, noHp };
  const contacts = loadContact();
  const duplicate = contacts.find((contact) => contact.nama == nama);
  if (duplicate) {
    console.log(chalk`{red.bold.inverse Maaf terjadi duplikasi data nama, silahkan masukkan nama yang berbeda}`);
    return false;
  }

  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk`{red.bold.inverse Email tidak valid}`);
      return false;
    }
  }
  if (noHp) {
    if (!validator.isMobilePhone(noHp, 'id-ID')) {
      console.log(chalk`{red.bold.inverse Nomor Handphone tidak valid}`);
      return false;
    }
  }

  contacts.push(newContact);

  fs.writeFile(dataPath, JSON.stringify(contacts), (err) => {
    if (err) throw err;
    console.log(chalk`{green.bold.inverse Kontak baru telah tersimpan}`);
  });
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk`{cyan.inverse.bold Daftar Kontak}`);
  contacts.forEach((val, i) => {
    console.log(`${i + 1}. ${val.nama} - ${val.noHp}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((val) => val.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.log(chalk`{red.bold.inverse Data ${nama} tidak ditemukan}`);

    return false;
  }

  console.log(chalk`{cyan.inverse.bold ${contact.nama}}`);
  console.log(contact.noHp);
  if (contact.email) {
    console.log(contact.email);
  }
};
const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter((val) => val.nama.toLowerCase() !== nama.toLowerCase());

  if (contacts.length === newContacts.length) {
    console.log(chalk`{red.bold.inverse Data ${nama} tidak ditemukan}`);

    return false;
  }

  fs.writeFile(dataPath, JSON.stringify(newContacts), (err) => {
    if (err) throw err;
    console.log(chalk`{green.bold.inverse Data contact ${nama} berhasil terhapus}`);
  });
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
