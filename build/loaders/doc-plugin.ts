import * as webpack from 'webpack';


export class DocPlugin implements webpack.Plugin {
  constructor(
    options: any
  ) {
    // super();
  }

  apply(compiler) {
    console.log(compiler);
  }
}
