/// <reference types="webpack" />
import { RawSourceMap } from 'source-map';
import * as webpack from 'webpack';
import chalk from 'chalk';

const DocLoader: webpack.loader.Loader = function(
  this: webpack.loader.LoaderContext,
  content: string | Buffer,
  sourceMap?: RawSourceMap
): string | Buffer | void | undefined {

  return content;
};

DocLoader.pitch = function(remainingRequest, precedingRequest, data) {
  const splitRequestString = reqString => reqString.split('!').map(req => req.replace(process.cwd(), '-\t~'));
  const remaining = splitRequestString(remainingRequest);
  const preceding = splitRequestString(precedingRequest);
  console.log(chalk.blue('Pitch - preceding requests:\n') + preceding.join('\n') + '\n');
  console.log(chalk.blue('Pitch - remaining requests:\n') + remaining.join('\n') + '\n');
  console.log(chalk.green('Pitch - data:\n' + JSON.stringify(data, null, 2)));
};

module.exports = DocLoader;
