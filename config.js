module.exports = {

    settings:{
      port: 3000,
      url: '',
      session: {secret: `${Date.now()}AboudVirus`, saveUninitialized: false, resave: false}
    },
  
    scriptsURL:[
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js',
      'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js',
      'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
      'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
      'https://www.google.com/recaptcha/enterprise.js?render=6Lc2G_siAAAAAAgONrAAhOe2NaC-_qQQe7IwU1zL',
      'https://www.google.com/recaptcha/api.js',
      'https://unpkg.com/scrollreveal',
    ]
  }