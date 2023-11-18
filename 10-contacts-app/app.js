const { tulisPertanyaan, simpanContact } = require('./contacts');

const main = async () => {
  const nama = await tulisPertanyaan('Masukkan Nama Anda: ');
  const email = await tulisPertanyaan('Masukkan Email Anda: ');
  const noHp = await tulisPertanyaan('Masukkan No Hp Anda: ');

  simpanContact(nama, email, noHp);
};

main();
