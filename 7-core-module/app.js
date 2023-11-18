const fs = require('fs');
const { stringify } = require('querystring');
// let text = 'Hello World, belajar filesystems synchronous di node js';
let data = 'Hello World, belajar penulisan ashynchronous filesystems di node js';

// menuliskan string ke file (synchronous)
// try {
//   fs.writeFileSync('data/text.txt', text);
// } catch (e) {
//   console.log(e);
// }
// menuliskan string ke file (asynchronous)
// fs.writeFile('data/message.txt', data, (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });

// membaca file (synchronous)
// const baca = fs.readFileSync('data/text.txt', 'utf8');

// console.log(baca);

// membaca file (asynchronous)
// const baca = 'data/message.txt';
// fs.readFile(baca, 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// belajar readline
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Masukkan nama anda: ', (nama) => {
  rl.question('Masukkan nomor HP: ', (noHP) => {
    // TODO: Log the answer in a database
    const filename = 'data/contacts.json';
    const newContact = { nama, noHP };
    const fileContacts = fs.readFileSync(filename, 'utf8');
    let contacts = JSON.parse(fileContacts);
    contacts.push(newContact);

    fs.writeFile(filename, JSON.stringify(contacts), (err) => {
      if (err) throw err;
      console.log('The new contact has been saved!');
    });

    rl.close();
  });
});
