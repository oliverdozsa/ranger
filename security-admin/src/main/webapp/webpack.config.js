const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')

const rangerDistJs=path.resolve(__dirname,'target/dist/js')
const rangerJsDir=path.resolve(__dirname,'scripts')
const templatesDir=path.resolve(__dirname,'templates')
const bowerModules=path.resolve(__dirname,'libs/bower')
const otherModules=path.resolve(__dirname,'libs/other')
const fsOverriderModules=path.resolve(__dirname,'libs/fsOverrides')
const nodeModules=path.resolve(__dirname,'libs/fsOverrides')

module.exports = {
  bail: true, // TODO: remove this!
  mode: 'production',
  entry: './index.ts',
  plugins: [
    new webpack.IgnorePlugin(/validationEngine.*|gblMessages/),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('index.html'),
      templateParameters: {
        bust: new Date().getTime()
      }
    }),
    new webpack.ProvidePlugin({
      /**
       * There is legacy code that forgets to import a dependency, but uses
       * $, _, Marionette, etc from the global scope.
       */
      jQuery: 'jquery',
      Marionette: 'marionette',
      $: 'jquery',
      Backgrid: 'backgrid',
      _: 'underscore',
      Globalize: 'globalize'
    }),
  ],
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            /**
             * A value of false makes troubles with HtmlWebpackPlugin
             */
            transpileOnly: true
          }
        },
        exclude: /node_modules/,
      },
      {
        /**
         * this is now unused, as the legacy code uses hbs: prefix
         * (see resolveLoader below)
         */
        test: /ttemplates\/.*\.html$/,
        use: {
          loader: 'handlebars-loader',
          options: {
            runtime: 'handlebars'
          }
        }
      },
//      {
//        test: /underscore/,
//        use: {
//          loader: 'exports?_'
//        }
//      },
//      {
//        test: /backbone/,
//        use: {
//          loader: 'exports?Backbone!imports?underscore,jquery'
//        }
//      }
    ],
  },
  optimization:{
    splitChunks: {
      maxSize: 300000,
      chunks: 'all'
    }
  },
  resolveLoader: {
    alias: {
      'hbs': 'handlebars-loader?runtime=handlebars',
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.html'],
    alias: {
      //'backbone': path.resolve(bowerModules,'backbone/js/backbone'),
      //'jquery': path.resolve(bowerModules,'jquery/js/jquery-3.4.1.min.js'),
      //'underscore': path.resolve(bowerModules,'underscore/underscore/js'),
      'Backbone.BootstrapModal': path.resolve(bowerModules, 'backbone.bootstrap-modal/js'),
      'backbone.marionette': path.resolve(bowerModules, 'backbone.marionette/js/backbone.marionette'),
      'jquery-toggles': path.resolve(bowerModules, 'jquery-toggles/js/toggles.min'),
      'backbone-forms': path.resolve(bowerModules, 'backbone-forms/js/backbone-forms'),
      'bootstrap-notify': path.resolve(bowerModules, 'bootstrap-notify/js/bootstrap-notify'),
      'moment': path.resolve(bowerModules, 'moment/js/moment-with-locales.min'),
      'momentTz': path.resolve(bowerModules, 'moment/js/moment-timezone-with-data.min'),
      underscore: path.resolve(bowerModules, 'underscore-amd/js/underscore'),
      'select2': path.resolve(bowerModules, 'select2/select2'),
      'globalize': path.resolve(bowerModules, 'globalize/lib/globalize'),
      'backbone.wreqr': path.resolve(bowerModules, 'backbone.wreqr/js/backbone.wreqr'),
      'backbone.babysitter': path.resolve(bowerModules, 'backbone.babysitter/js/backbone.babysitter'),
      'backgrid-filter': path.resolve(bowerModules, 'backgrid-filter/js/backgrid-filter'),
      'bootbox': path.resolve(bowerModules, 'bootbox/js/bootbox'),
      'backgrid-paginator': path.resolve(bowerModules, 'backgrid-paginator/js/backgrid-paginator'),
      'Backbone.BootstrapModal': path.resolve(bowerModules, 'backbone.bootstrap-modal/js/backbone.bootstrap-modal'),
      'backbone-forms.templates': path.resolve(bowerModules, 'backbone-forms/js/bootstrap'),
      'backbone-forms.list': path.resolve(bowerModules, 'backbone-forms/js/list'),
      'tag-it': path.resolve(bowerModules, 'tag-it/js/tag-it.min'),
      'backbone-pageable': path.resolve(bowerModules, 'backbone-pageable/js/backbone-pageable'),
      'bootstrap-editable': path.resolve(bowerModules, 'x-editable/js/bootstrap-editable'),
      'esprima': path.resolve(bowerModules, 'esprima/esprima'),

      'bootstrap-datepicker': path.resolve(otherModules, 'datepicker/js/bootstrap-datepicker'),
      'visualsearch': path.resolve(otherModules, 'visualsearch/js/visualsearch'),
      'jquery.cookie': path.resolve(otherModules, 'jquery-cookie/js/jquery.cookie'),
      'backbone-fetch-cache': path.resolve(otherModules, 'backbone.fetch-cache'),
      backgrid: path.resolve(otherModules, 'backgrid/backgrid'),
      'jquery-ui': path.resolve(otherModules, 'jquery-ui/js/jquery-ui.min'),
      'bootstrap-datetimepicker': path.resolve(otherModules, 'bootstrap-datetimepicker/js/bootstrap-datetimepicker.min'),

      'backbone-forms.XAOverrides': path.resolve(fsOverriderModules, 'BBFOverrides'),

      /**
       * These correspond to the old RequireJS path configs:
       */
      App: path.resolve(rangerJsDir, 'App'),
      communicator: path.resolve(rangerJsDir, 'communicator'),
      Init: path.resolve(rangerJsDir, 'Init'),
      Main: path.resolve(rangerJsDir, 'Main'),
      RegionManager: path.resolve(rangerJsDir, 'RegionManager'),
      collection_bases: path.resolve(rangerJsDir, 'collection_bases/'),
      collections: path.resolve(rangerJsDir, 'collections/'),
      controllers: path.resolve(rangerJsDir, 'controllers/'),
      models: path.resolve(rangerJsDir, 'models/'),
      modules: path.resolve(rangerJsDir, 'modules/'),
      routers: path.resolve(rangerJsDir, 'routers/'),
      utils: path.resolve(rangerJsDir, 'utils/'),
      views: path.resolve(rangerJsDir, 'views/'),
      mgrs: path.resolve(rangerJsDir, 'mgrs/'),
      model_bases: path.resolve(rangerJsDir, 'model_bases/'),

      tmpl: path.resolve(templatesDir),

      'marionette': 'backbone.marionette'
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
};
