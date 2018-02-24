import { RawSourceMap } from 'source-map';
import * as webpack from 'webpack';
import * as path from 'path';
import chalk from 'chalk';
import * as compiler from 'vue-template-compiler';
import * as babylon from 'babylon';

import {
  DocuVueTemplateAnalyzer
} from './lib/template-analyzer';

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

const templateAnalyzer = new DocuVueTemplateAnalyzer();

const DocuVueLoader: webpack.loader.Loader = function(
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

  const slots = templateAnalyzer.getSlots(parts.template.content);
  console.log(slots);
  return source;
};

DocuVueLoader.pitch = function(this: webpack.loader.LoaderContext, remainingRequest, precedingRequest, data) {
};

module.exports = DocuVueLoader;
