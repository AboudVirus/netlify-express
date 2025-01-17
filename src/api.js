const express = require("express");
const serverless = require("serverless-http");
const session = require('express-session');
const layouts = require('express-ejs-layouts');
const moment = require("moment");
const fs = require('fs');
const fetch = require('node-fetch');
const config = require('../config')
const app = express();
const router = express.Router();
 const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(session(config.settings.session))
//app.use(expressLayouts);
//app.use(express.static(path.join(__dirname,'public')))

app.get('/v2', async (req, res, next) =>  {
 // getHome.run(req, res, next)
const v1 = fs.readFileSync(__dirname+'views/page/Home.ejs', 'utf-8');
const template = ejs.compile(v1)//('<h1>Hello, <%= name %>!</h1>');
const data = { name: 'John' };
const html = template(data);

// قم بعرض النموذج النهائي في الاستجابة الخاصة بك
res.send(html);
/*

  */
});



router.get("/", (req, res) => {
 // res.json({hello: "hi!"});
 const v1 = fs.readFileSync(__dirname+'views/page/Home.ejs', 'utf-8');
 const template = ejs.compile(`
 <!DOCTYPE html>
 <html lang="ar">
 <head>
 <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet">
 <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
   <meta name="twitter:title" content="FirstHelper - <%=page_name%>"/>
   <meta property="og:title" content="FirstHelper - <%=page_name%>"/>
   <title>FirstHelper - <%=page_name%></title>
     
   <style>
     #map { height: 180px;}
     </style>
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>  
 </head>
 
 <body onload="downLoad()" style="background-image: url(/images/icon-loding.gif);
 background-repeat: no-repeat;
 background-position-x: center;
 background-color: rgb(19, 27, 33);
 background-position-y: 200px;
 ">
    <% if (req.session.user) {
      //var nav = include('./../cdn/nav').replaceAll('{{USER_NAME}}', req.session.user.firstname)
      var buttons = ''
    }else{
      //var nav = include('./../cdn/nav-login')
      var buttons = '<a class="btn btn-dark" style="font-weight: bold;" onclick="window.location.assign('/account?p=l')"> تسجيل دخول </a> <a class="btn btn-dark" style="font-weight: bold;" onclick="window.location.assign('/account?p=r')"> انشاء حساب </a>'
    }
      %>
 
  <div id="layer2" class="layer2_class">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid container">
    <a class="navbar-brand" href="/">
      <img src="/images/icons/icon.png" alt="" width="50" class="rounded-circle"> &nbsp; <span>FirstHelper</span>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/"><i class="fa-solid fa-house fa-lg"></i> Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/ZainCash"><i class="fa-solid fa-comments-dollar fa-lg"></i> ZainCash</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/obstruction"><i class="fa-solid fa-person-military-pointing fa-lg"></i> Obstruction</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/fuel-filling"><i class="fa-solid fa-gas-pump fa-lg"></i> FuelFilling</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/contribution"><i class="fa-solid fa-handshake-angle fa-lg"></i> Contribution</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/support"><i class="fa-solid fa-headset fa-lg"></i> support</a>
        </li>
      </ul>

      <div class="d-flex ml-auto" id="headerlogin">

        <% if (req.session.user) { %>

            <% if (req.session.user.isAdmin) {%>
              <li class="nav-item dropdown" style="list-style: none;">
                <a class="nav-link btn btn-outline-secondary login" href="/dashboard/"><i class="fa-solid fa-panel-ews"></i> Panel</a>
              </li>
            <%}else{%>
          <li class="nav-item dropdown" style="list-style: none;">
            <a class="nav-link btn btn-outline-secondary login"><i class="fa-solid fa-bell"></i></a>
          </li>
          <%}%>

          <li class="nav-item dropdown" style="list-style: none;">
              <a class="nav-link btn btn-outline-secondary login" href="/account/me">
                <i class="fa-solid fa-user"></i> <%= req.session.user.firstname%>
              </a>
          </li>


       <% }else{ %>
        
        <li class="nav-item" style="list-style: none;">
          <a class="nav-link btn btn-outline-secondary login" href="/account">Login</a>
        </li>

        <%}%>

      </div>
    </div>
  </div>
</nav>
     <div class="jumbotron text-center bg-transparent">
         <div class="text-center">
       <h3 class="wh">ماهو <span class="Hbot">المساعد الأول</span> ؟</h3>
     </div>
     <h5 class="text-center textt">تطبيق المساعد الأول يساعد سائقي التوصيل (الدلفري) في معرفة أقرب منفذ ايداع زين كاش بدون اخذ عمولة التحول
          او يساعدك في تجنب الحجز المروري عن طريق التبلغ من قبل احد السائقين
         او معرفة اقرب محطة تعبئة بالوقود متوفرة في الوقت الفعلي</h5>
     <%- buttons %>
   </div>
   
   <div class="bg-dark">
 
 
 
     <div class="card-columns cardds">
       <div class="card text-white bg-dark mb-3" style="max-width: 18rem;
       background-image: url(https://fitsmallbusiness.com/wp-content/uploads/2021/08/FeatureImage_how_to_pay_employees_cash_legally.jpg);
       background-size: cover;
       background-repeat: no-repeat;
       background-blend-mode: overlay;">
         <div class="card-header text-center"><p style="font-size: 19px;">زين كاش</p></div>
         <div class="card-body">
           <p class="card-text" style="font-size: 17px;">
             يمكنك العثور على اقرب مراكز ايداع زين كاش حسب مكان تواجدك
           </p>
         </div>
       </div>
 
       <div class="card text-white bg-dark mb-3" style="max-width: 18rem;
       background-image: url(https://assets.nst.com.my/images/articles/KLsumm010123sp_NSTfield_image_socialmedia.var_1672550429.jpg);
       background-size: cover;
       background-repeat: no-repeat;
       background-blend-mode: overlay;">
         <div class="card-header text-center"><p style="font-size: 19px;">الحجز المروري</p></div>
         <div class="card-body">
           <p class="card-text" style="font-size: 17px;">
             يمكنك معرفة اماكن الحجز المروري وتجنبها ويمكنك المساهمة في البلاغ عن اماكن الحجز لمساعدة الأخرين
           </p>
         </div>
       </div>
       <div class="card text-white bg-dark mb-3" style="max-width: 18rem;
       background-image: url(https://f.nordiskemedier.dk/2m7rdn9156ktv0wb.jpg);
       background-size: cover;
       background-repeat: no-repeat;
       background-blend-mode: overlay;">
         <div class="card-header text-center"><p style="font-size: 19px;">تعبئة بالوقود</p></div>
         <div class="card-body">
           <p class="card-text" style="font-size: 17px;">
           يمكنك معرفة اقرب محطة تعبئة للوقود متوفرة حسب مكان توجدك وفي الوقت الفعلي
           </p>
         </div>
       </div>
     </div>

 <h1>Hello, <%= name %>!</h1>
 `);
 const data = { name: 'John', req: req,page_name: "H" };
 const html = template(data);
 
 res.send(html);
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
