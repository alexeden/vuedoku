import * as webpack from 'webpack';
import * as loaderUtils from 'loader-utils';
import * as compiler from 'vue-template-compiler';
import * as querystring from 'querystring';

interface VueLoaderOptions extends compiler.CompilerOptions {
  preLoaders?: { [lang: string]: string };
  postLoaders?: { [lang: string]: string };
  loaders?: { [lang: string]: string | Object | Array<any> };
  postcss?: object | object[] | Function;
  cssSourceMap?: boolean;
  esModule?: boolean;
  extractCSS?: boolean | Function;
  preserveWhitespace?: boolean;
  cssModules?: {};
  excludedPreLoaders?: RegExp;
}

export class HelperUtils {
  static rewriterInjectRE = /\b(css(?:-loader)?(?:\?[^!]+)?)(?:!|$)/;

  static defaultLang = {
    template: 'html',
    styles: 'css',
    script: 'js'
  };

  static postcssExtensions = [
    'postcss', 'pcss', 'sugarss', 'sss'
  ];

  static getTemplateCompilerPath() {
    return require.resolve('vue-template-compiler');
  }
  static getStyleLoaderPath() {
    return require.resolve('vue-style-loader');
  }
  static getVueLoaderSelectorPath() {
    return require.resolve('vue-loader/lib/selector');
  }
  static getVueLoaderParserPath() {
    return require.resolve('vue-loader/lib/parser');
  }
  static getVueStyleCompilerPath() {
    return require.resolve('vue-loader/lib/style-compiler');
  }
  static getVueTemplatePreprocessorPath() {
    return require.resolve('vue-loader/lib/template-compiler/preprocessor');
  }


  // When extracting parts from the source vue file, we want to apply the
  // loaders chained before vue-loader, but exclude some loaders that simply
  // produces side effects such as linting.
  static getRawRequest (
    { resource, loaderIndex, loaders },
    excludedPreLoaders = /eslint-loader/
  ) {
    return loaderUtils.getRemainingRequest({
      resource: resource,
      loaderIndex: loaderIndex,
      loaders: loaders.filter(loader => !excludedPreLoaders.test(loader.path))
    });
  }

  // sass => sass-loader
  // sass-loader => sass-loader
  // sass?indentedSyntax!css => sass-loader?indentedSyntax!css-loader
  static ensureLoader (lang) {
    return lang
      .split('!')
      .map(loader =>
        loader.replace(/^([\w-]+)(\?.*)?/, (_, name, query) =>
          (/-loader$/.test(name) ? name : name + '-loader') + (query || '')
        )
      )
      .join('!');
  }

  static ensureBang (loader: string) {
    if (loader.charAt(loader.length - 1) !== '!') {
      return loader + '!';
    } else {
      return loader;
    }
  }

  static buildCustomBlockLoaderString (attrs: any) {
    const noSrcAttrs = Object.assign({}, attrs);
    delete noSrcAttrs.src;
    const qs = querystring.stringify(noSrcAttrs);
    return qs ? '?' + qs : qs;
  }


  // stringify an Array of loader objects
  static stringifyLoaders (loaders) {
    return loaders
      .map(
        obj =>
          obj && typeof obj === 'object' && typeof obj.loader === 'string'
            ? obj.loader +
              (obj.options ? '?' + JSON.stringify(obj.options) : '')
            : obj
      )
      .join('!');
  }

  static getLangString (type, { lang }: compiler.SFCBlock) {
    if (type === 'script' || type === 'template' || type === 'styles') {
      return lang || HelperUtils.defaultLang[type];
    } else {
      return type;
    }
  }

  static getSelectorString (type, index) {
    return (
      HelperUtils.getVueLoaderSelectorPath() +
      '?type=' +
      (type === 'script' || type === 'template' || type === 'styles'
        ? type
        : 'customBlocks') +
      '&index=' + index +
      '!'
    );
  }
}

export class VueLoaderResolver {
  readonly defaultLoaders: any;
  readonly cssLoaderOptions: string;

  constructor(
    private options: VueLoaderOptions,
    private moduleId: string,
    private isProduction = false,
    private hasScoped = false,
    private hasComment = false,
    private needCssSourceMap = false
  ) {
    this.cssLoaderOptions = '';
    if (this.needCssSourceMap) {
      this.cssLoaderOptions += '?sourceMap';
    }
    if (this.isProduction) {
      this.cssLoaderOptions += (this.cssLoaderOptions ? '&' : '?') + 'minimize';
    }

    const templateCompilerOptions =
      '?' +
      JSON.stringify({
        id: this.moduleId,
        hasScoped: this.hasScoped,
        hasComment: this.hasComment
      });

    this.defaultLoaders = {
      html: HelperUtils.getTemplateCompilerPath() + templateCompilerOptions,
      css: this.options.extractCSS
        ? this.getCSSExtractLoader()
        : HelperUtils.getStyleLoaderPath() + '!css-loader' + this.cssLoaderOptions,
      js: 'babel-loader'
    };
  }

  getCSSExtractLoader (lang?: string) {
    // extractCSS option is an instance of ExtractTextPlugin
    let extractor = typeof this.options.extractCSS === 'function'
      ? this.options.extractCSS
      : require('extract-text-webpack-plugin');

    const langLoader = lang ? HelperUtils.ensureBang(HelperUtils.ensureLoader(lang)) : '';
    return extractor.extract({
      use: 'css-loader' + this.cssLoaderOptions + '!' + langLoader,
      fallback: 'vue-style-loader'
    });
  }

  resolve() {
    return {
      defaultLoaders: this.defaultLoaders,
      loaders: { ...this.defaultLoaders, ...this.options.loaders },
      preLoaders: this.options.preLoaders || {},
      postLoaders: this.options.postLoaders || {}
    };
  }
}

export class VueLoaderHelpers {
  readonly loaderResolver: VueLoaderResolver;
  readonly rawRequest: string;

  constructor(
    private readonly loaderContext: webpack.loader.LoaderContext,
    private readonly options: VueLoaderOptions,
    private readonly moduleId: string,
    private readonly isProduction = false,
    private readonly hasScoped = false,
    private readonly hasComment = false,
    private readonly needCssSourceMap = false
  ) {
    this.loaderResolver = new VueLoaderResolver(
      this.options,
      this.moduleId,
      this.isProduction,
      this.hasScoped,
      this.hasComment,
      this.needCssSourceMap
    );

    this.rawRequest = HelperUtils.getRawRequest(
      loaderContext,
      this.options.excludedPreLoaders
    );
  }

  getRequire (type, part: compiler.SFCBlock, index = 0, scoped = false) {
    return 'require(' + this.getRequestString(type, part, index, scoped) + ')';
  }

  getImport (type, part: compiler.SFCBlock, index = 0, scoped = false) {
    return (
      'import __vue_' + type + '__ from ' +
      this.getRequestString(type, part, index, scoped)
    );
  }

  getNamedExports (type, part: compiler.SFCBlock, index = 0, scoped = false) {
    return (
      'export * from ' +
      this.getRequestString(type, part, index, scoped)
    );
  }

  getRequestString (type, part: compiler.SFCBlock, index = 0, scoped = false) {
    return loaderUtils.stringifyRequest(
      this.loaderContext,
      // disable all configuration loaders
      '!!' +
        // get loader string for pre-processors
        this.getLoaderString(type, part, index, scoped) +
        // select the corresponding part from the vue file
        HelperUtils.getSelectorString(type, index || 0) +
        // the url to the actual vue file, including remaining requests
        this.rawRequest
    );
  }

  getRequireForSrc (type, impt, scoped) {
    return 'require(' + this.getSrcRequestString(type, impt, scoped) + ')';
  }

  getImportForSrc (type, impt, scoped) {
    return (
      'import __vue_' + type + '__ from ' +
      this.getSrcRequestString(type, impt, scoped)
    );
  }

  getNamedExportsForSrc (type, impt, scoped) {
    return (
      'export * from ' +
      this.getSrcRequestString(type, impt, scoped)
    );
  }

  getSrcRequestString (type, impt, scoped) {
    return loaderUtils.stringifyRequest(
      this.loaderContext,
      '!!' + this.getLoaderString(type, impt, -1, scoped) + impt.src
    );
  }


  addCssModulesToLoader (loader, part, index) {
    if (!part.module) return loader;
    const option = this.options.cssModules || {};
    const DEFAULT_OPTIONS = {
      modules: true
    };
    const OPTIONS = {
      localIdentName: '[hash:base64]',
      importLoaders: 1
    };
    return loader.replace(/((?:^|!)css(?:-loader)?)(\?[^!]*)?/, (m, $1, $2) => {
      // $1: !css-loader
      // $2: ?a=b
      const query = loaderUtils.parseQuery($2 || '?');
      Object.assign(query, OPTIONS, option, DEFAULT_OPTIONS);
      if (index !== -1) {
        // Note:
        //   Class name is generated according to its filename.
        //   Different <style> tags in the same .vue file may generate same names.
        //   Append `_[index]` to class name to avoid this.
        query.localIdentName += '_' + index;
      }
      return $1 + '?' + JSON.stringify(query);
    });
  }

  getLoaderString (type, part: compiler.SFCBlock, index = 0, scoped = false) {
    let loader = this.getRawLoaderString(type, part, index, scoped);
    const lang = HelperUtils.getLangString(type, part);
    const { preLoaders, postLoaders } = this.loaderResolver.resolve();
    if (preLoaders[lang]) {
      loader = loader + HelperUtils.ensureBang(preLoaders[lang]);
    }
    if (postLoaders[lang]) {
      loader = HelperUtils.ensureBang(postLoaders[lang]) + loader;
    }
    return loader;
  }

  getRawLoaderString (type, part: compiler.SFCBlock, index = 0, scoped = false) {
    let lang = part.lang || HelperUtils.defaultLang[type];
    const { loaders, defaultLoaders } = this.loaderResolver.resolve();
    console.log(`${type} loaders: `, loaders);
    let styleCompiler = '';
    if (type === 'styles') {
      // style compiler that needs to be applied for all styles
      const styleCompilerPath = HelperUtils.getVueStyleCompilerPath();
      const styleCompilerDataString = JSON.stringify({
        // a marker for vue-style-loader to know that this is an import from a vue file
        vue: true,
        id: this.moduleId,
        scoped: !!scoped,
        sourceMap: this.needCssSourceMap
      });
      styleCompiler = `${styleCompilerPath}?${styleCompilerDataString}!`;
      // normalize scss/sass/postcss if no specific loaders have been provided
      if (!loaders[lang]) {
        if (HelperUtils.postcssExtensions.indexOf(lang) !== -1) {
          lang = 'css';
        }
        else if (lang === 'sass') {
          lang = 'sass?indentedSyntax';
        }
        else if (lang === 'scss') {
          lang = 'sass';
        }
      }
    }

    let loader =
      this.options.extractCSS && type === 'styles'
        ? loaders[lang] || this.loaderResolver.getCSSExtractLoader(lang)
        : loaders[lang];

    if (loader != null) { // tslint:disable-line
      if (Array.isArray(loader)) {
        loader = HelperUtils.stringifyLoaders(loader);
      } else if (typeof loader === 'object') {
        loader = HelperUtils.stringifyLoaders([loader]);
      }
      if (type === 'styles') {
        // add css modules
        loader = this.addCssModulesToLoader(loader, part, index);
        // inject rewriter before css loader for extractTextPlugin use cases
        if (HelperUtils.rewriterInjectRE.test(loader)) {
          loader = loader.replace(
            HelperUtils.rewriterInjectRE,
            (m, $1) => HelperUtils.ensureBang($1) + styleCompiler
          );
        } else {
          loader = HelperUtils.ensureBang(loader) + styleCompiler;
        }
      }
      // if user defines custom loaders for html, add template compiler to it
      if (type === 'template' && loader.indexOf(defaultLoaders.html) < 0) {
        loader = defaultLoaders.html + '!' + loader;
      }

      return HelperUtils.ensureBang(loader);
    } else {
      // unknown lang, infer the loader to be used
      switch (type) {
        case 'template':
          return (
            defaultLoaders.html +
            '!' +
            HelperUtils.getVueTemplatePreprocessorPath() +
            '?engine=' +
            lang +
            '!'
          );
        case 'styles':
          loader = this.addCssModulesToLoader(defaultLoaders.css, part, index);
          return loader + '!' + styleCompiler + HelperUtils.ensureBang(HelperUtils.ensureLoader(lang));
        case 'script':
          return HelperUtils.ensureBang(HelperUtils.ensureLoader(lang));
        default:
          loader = loaders[type];
          if (Array.isArray(loader)) {
            loader = HelperUtils.stringifyLoaders(loader);
          }
          return HelperUtils.ensureBang(loader + HelperUtils.buildCustomBlockLoaderString(part.attrs));
      }
    }
  }

}
