import { RawSourceMap } from 'source-map';
import * as webpack from 'webpack';
import * as path from 'path';
import chalk from 'chalk';
// import * as columnify from 'columnify';
// import * as htmlParser from 'htmlparser2';
import * as compiler from 'vue-template-compiler';
import * as babylon from 'babylon';
// import * as loaderUtils from 'loader-utils';
// const splitRequestString = (reqString: string) => reqString.split('!').map(req => req.replace(process.cwd(), '~'));
// import {
//   VueLoaderHelpers
//   // HelperUtils
// } from './helpers';

// const parse: typeof compiler.parseComponent = require(HelperUtils.getVueLoaderParserPath());



const emptySfcBlock: compiler.SFCBlock = {
  type: 'customBlocks',
  content: '',
  attrs: {},
  start: 0,
  end: 0
};

const emptySfcDescriptor: Required<compiler.SFCDescriptor> = {
  template: emptySfcBlock,
  script: emptySfcBlock,
  styles: [],
  customBlocks: []
};

const filesSeen: string[] = [];

const DocLoader1: webpack.loader.Loader = function(
  this: webpack.loader.LoaderContext,
  source: string,
  sourceMap?: RawSourceMap
) {
  // const callback = this.async();
  const filePath = this.resourcePath;
  // if (filesSeen.includes(filePath)) {
  //   // console.log(chalk.red(`${filePath} has already been seen!`));
  //   return source;
  // }
  // filesSeen.push(filePath);
  const fileName = path.basename(filePath);
  // const context = this.options && this.options.context || process.cwd();

  // const shortFilePath = path.relative(context, filePath).replace(/^(\.\.[\\\/])+/, '');
  // const moduleId = `docs/${shortFilePath}`;

  const parts = {
    ...emptySfcDescriptor,
    ...compiler.parseComponent(source)
  };

  // console.log(parts.script.content);
  const scriptContent = parts.script.content;
  const parsed = babylon.parse(scriptContent, {
    sourceType: 'module',
    plugins: [
      'asyncGenerators',
      'classProperties',
      'decorators',
      'objectRestSpread',
      'typescript'
    ] as any
  });

  this.emitFile(this.resource.split('/').reverse()[0] + '.json', JSON.stringify(parsed, null, 2), '');


  // console.log(parsed);
  // const helpers = new VueLoaderHelpers(
  //   this,
  //   {},
  //   moduleId
  // );
  // console.log(helpers);
  // const scriptPath = helpers.getRequestString('script', parts.script);
  // // this.addDependency(scriptPath);
  // // this.loadM
  // console.log(chalk.blue(columnify({
  //   context: this.context.split('!'),
  //   request: scriptPath,
  //   fileName: fileName,
  //   shortFilePath: shortFilePath,
  //   moduleId: moduleId
  // })));

  // const resolution = this.resolveSync(this.context, scriptPath);

  // callback!(
  //   null,
  //   source,
  //   sourceMap
  // );

  if (fileName === 'remaining-value-counts.vue') {
    // const srcPath = '!!ts-loader!../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./remaining-value-counts.vue';
    // const srcPath = '!!ts-loader!../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./cell.vue';
    // this.resolve(__dirname, srcPath, (err, result) => {
    // this['loadModule'](scriptPath, (err, result) => {
    //   if (err) {
    //     console.error(chalk.red(err.message), err);
    //   }
    //   else {
    //     console.log(chalk.magenta(result));
    //     callback!(
    //       null,
    //       source,
    //       sourceMap
    //     );
    //   }
    // });
  }
  else {
  }
  // this.callback!(
  //   null,
  //   `module.exports = function(Component) {
  //     // Component.options.__docs = (Component.options.__docs || []).concat(${source});
  //     console.log(Component.options);
  //   }`,
  //   sourceMap
  // );
  return source;


  // helpers.g


  // // console.log(source);
  // const parsed = babylon.parse(source, {
  //   sourceType: 'module'
  // });
  // this.emitFile(this.resource.split('/').reverse()[0], JSON.stringify(parsed, null, 2), '');
  // console.log(parsed);
  // console.log(compiler.parseComponent(source));
  // const formattedSource = source.replace(/\n/g, '');
  // console.log(chalk.magentaBright(`request:\n${splitRequestString(this.request).join('\n')}`));
  // console.log(chalk.magentaBright(`resource: ${this.resource}`));
  // console.log(chalk.magentaBright(`resourcePath: ${this.resourcePath}`));
  // console.log(chalk.magentaBright(`resourceQuery: ${this.resourceQuery}`));
  // console.log(chalk.magentaBright(`inputValue: ${this.inputValue}`));
  // console.log(chalk.magentaBright(`context: ${this.context}`));
  // console.log('loaders: ', this.loaders);
  //
  // this.callback(
  //   null,
  //   `module.exports = function(Component) {
  //     console.log('What's the point of this?');
  //   }`,
  //   sourceMap
  // );

  // this.callback(
  //   null,
  //   `module.exports = function(Component) {
  //     Component.options.__docs = (Component.options.__docs || []).concat(${JSON.stringify(formattedSource)})
  //     console.log(Component.options);
  //     console.log('exports: ', exports);
  //   }`,
  //   sourceMap
  // );
};

DocLoader1.pitch = function(this: webpack.loader.LoaderContext, remainingRequest, precedingRequest, data) {
  // console.log(compiler);

  // const remaining = splitRequestString(remainingRequest);
  // const preceding = splitRequestString(precedingRequest);
  // console.log(chalk.magentaBright(`\n\n--- START PITCH -------------------------------------------------`));
  // console.log(chalk.magentaBright(`request:\n${splitRequestString(this.request).join('\n')}`));
  // console.log(chalk.magentaBright(`resource: ${this.resource}`));
  // console.log(chalk.magentaBright(`resourcePath: ${this.resourcePath}`));
  // console.log(chalk.magentaBright(`resourceQuery: ${this.resourceQuery}`));
  // console.log(chalk.magentaBright(`inputValue: ${this.inputValue}`));
  // console.log(chalk.magentaBright(`context: ${this.context}`));
  // // console.log('loaders: ', this.loaders);
  // //
  // console.log(chalk.blue('Pitch - preceding requests:\n') + preceding.join('\n'));
  // console.log(chalk.blue('Pitch - remaining requests:\n') + remaining.join('\n'));
  // console.log(chalk.magentaBright(`--- END PITCH -------------------------------------------------\n\n`));

  // console.log(chalk.green('Pitch - data:\n' + JSON.stringify(data, null, 2)));
};

module.exports = DocLoader1;
