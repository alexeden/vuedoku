import { RawSourceMap } from 'source-map';
import * as webpack from 'webpack';
import * as path from 'path';
import chalk from 'chalk';
import * as compiler from 'vue-template-compiler';
import * as babylon from 'babylon';

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


const DocLoader1: webpack.loader.Loader = function(
  this: webpack.loader.LoaderContext,
  source: string,
  sourceMap?: RawSourceMap
) {
  this.cacheable();

  const parts = { ...emptySfcDescriptor, ...compiler.parseComponent(source) };
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
  return source;
};

DocLoader1.pitch = function(this: webpack.loader.LoaderContext, remainingRequest, precedingRequest, data) {
};

module.exports = DocLoader1;
