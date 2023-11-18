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

const simpanContact = (nama, email, noHp) => {
  const newContact = { nama, email, noHp };
  const fileContacts = fs.readFileSync(dataPath, 'utf8');
  let contacts = JSON.parse(fileContacts);

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

module.exports = { simpanContact };
