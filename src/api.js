const express = require("express");
const serverless = require("serverless-http");
const session = require('express-session');
const layouts = require('express-ejs-layouts');
const moment = require("moment");
const fetch = require('node-fetch');
const config = require('../config')
const app = express();
const router = express.Router();

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(session(config.settings.session))
//app.use(expressLayouts);
//app.use(express.static(path.join(__dirname,'public')))

app.get('/v2', async (req, res, next) =>  {
 // getHome.run(req, res, next)

  res.render('page/Home', { 
    req: req,
    app: false, 
    url_scope: '/',
    title: 'My Express App',
    page_name: 'Home'
  });
});



router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
