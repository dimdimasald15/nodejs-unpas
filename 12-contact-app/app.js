//mengambil argumen dari terminal
const yargs = require('yargs');

const contacts = require('./contacts');

yargs
  .command({
    command: 'add',
    describe: 'Menambahkan data baru',
    builder: {
      nama: {
        describe: 'Nama Lengkap',
        demandOption: true,
        type: 'string',
      },
      email: {
        describe: 'Email',
        demandOption: false,
        type: 'string',
      },
      noHp: {
        describe: 'Nomor Handphone',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.nama, argv.email, argv.noHp);
    },
  })
  .demandCommand();

//menampilkan daftar semua nama dan no hp
yargs.command({
  command: 'list',
  describe: 'Menampilkan data contact',
  handler() {
    contacts.listContact();
  },
});
//menampilkan detail contact
yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail contact base on nama',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});
//Hapus contact base on nama
yargs.command({
  command: 'delete',
  describe: 'Menghapus contact base on nama',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});

yargs.parse();
