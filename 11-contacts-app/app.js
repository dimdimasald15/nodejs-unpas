//mengambil argumen dari terminal
const yargs = require('yargs');

const { simpanContact } = require('./contacts');

yargs.command({
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
    simpanContact(argv.nama, argv.email, argv.noHp);
  },
});

yargs.parse();
