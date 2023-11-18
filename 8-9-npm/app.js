const validator = require('validator');
const chalk = require('chalk');
const log = console.log;
// console.log(validator.isEmail('foo@bar.com'));
// console.log(validator.isMobilePhone('08222938931', 'id-ID'));
// console.log(validator.isNumeric('080429293893'));
// Combine styled and normal strings
// log(chalk.blue('Hello') + ' World' + chalk.red('!'));

// // Compose multiple styles using the chainable API
// log(chalk.blue.bgRed.bold('Hello world!'));

// // Pass in multiple arguments
// log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

// // Nest styles
// log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

// // Nest styles of the same type even (color, underline, background)
// log(chalk.green('I am a green line ' + chalk.blue.underline.bold('with a blue substring') + ' that becomes green again!'));

// // ES2015 template literal
// log(`
// CPU: ${chalk.red('90%')}
// RAM: ${chalk.green('40%')}
// DISK: ${chalk.yellow('70%')}
// `);

// Use RGB colors in terminal emulators that support it.
log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
log(chalk.hex('#DEADED').bold('Bold gray!'));

const error = chalk.bold.red;
const warning = chalk.hex('#FFA500'); // Orange color

log(error('Error!'));
log(warning('Warning!'));

const nama = 'Dimas Aldi Sallam';
const pesan = chalk`Lorem ipsum dolor {bgBlue.black sit amet} consectetur {bgGreen.italic.black adipisicing} elit. Nama saya adalah {hex('#DEADED').bold ${nama}}!`;

console.log(pesan);
