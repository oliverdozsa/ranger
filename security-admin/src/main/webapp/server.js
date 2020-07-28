const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
var proxy = require('express-http-proxy');
var url = require('url')
const process = require('process')

const app = express();
const config = require('./webpack.config-dev.js');
const compiler = webpack(config);

var devMode = false
if(process.argv[2]=='--dev'){
  devMode = true
}

console.log(`devMode is ${devMode}`)

if(devMode){
  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
}
else{
  app.use(config.output.publicPath, express.static('dist'))
}

// TODO: correct this to ranger API address
const RANGER_BACKEND=process.env['RANGER_BACKEND'] || 'localhost:4343'
console.log(`RANGER_BACKEND is ${RANGER_BACKEND}`)

app.use('/api', proxy(RANGER_BACKEND,{
    proxyReqPathResolver: function (req) {
        return '/api'+url.parse(req.url).path
      }
}))


app.use('/styles',express.static('styles'))
app.use('/images',express.static('images'))
app.use('/fonts',express.static('fonts'))

app.get('/js/libs/requirejs/require.js',(req,res)=>{
  res.send('console.log("requirejs intercepted")')
});

app.use('/libs/bower',express.static('libs/bower'))
app.use('/libs/other',express.static('libs/other'))
app.use('/libs/fsOverrides',express.static('libs/fsOverrides'))
app.use('/scripts',express.static('scripts'))
app.use('/templates',express.static('templates'))


//login handling
app.use('/login.jsp', express.static('atlas/webapp/src/main/webapp/login.html.template',{
    setHeaders: res => res.set('content-type', 'text/html')
}))
app.use('/js/modules/atlasLogin.js', express.static('atlas/dashboardv2/target/dist/js/modules/atlasLogin.js'))
app.use('/j_spring_security_check', proxy(RANGER_BACKEND,{
    proxyReqPathResolver: function (req) {
        return '/j_spring_security_check'
    }
}))
app.use('/logout.html', proxy(RANGER_BACKEND,{
    proxyReqPathResolver: function (req) {
        return '/logout.html'
    }
}))

const port = 3030
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!\n`);
});