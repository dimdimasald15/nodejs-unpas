const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

// async await dengan promises
const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (nama) => {
      resolve(nama);
    });
  });
};

const simpanContact = (nama, email, noHp) => {
  const newContact = { nama, email, noHp };
  const fileContacts = fs.readFileSync(dataPath, 'utf8');
  let contacts = JSON.parse(fileContacts);
  contacts.push(newContact);

  fs.writeFile(dataPath, JSON.stringify(contacts), (err) => {
    if (err) throw err;
    console.log('Kontak baru telah tersimpan!');
  });

  rl.close();
};

module.exports = { tulisPertanyaan, simpanContact };
