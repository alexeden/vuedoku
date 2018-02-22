const chalk = require('chalk');
const compiler = require('vue-template-compiler');
// import * as Compiler from 'vue-template-compiler';


module.exports = function(content) {
  console.log('content: ', content);
  // console.log(compiler.parseComponent(content, { pad: 'line' }));
  return content;
};


const splitRequestString = reqString => reqString.split('!').map(req => req.replace(process.cwd(), '-\t~'));

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  const remaining = splitRequestString(remainingRequest);
  const preceding = splitRequestString(precedingRequest);
  console.log(chalk.blue('Pitch - preceding requests:\n') + preceding.join('\n') + '\n');
  console.log(chalk.blue('Pitch - remaining requests:\n') + remaining.join('\n') + '\n');
  console.log(chalk.green('Pitch - data:\n' + JSON.stringify(data, null, 2)));
  // data.value = 42;
};
