const { response } = require('express');
var express = require('express');
var router = express.Router();
const adminHelpers=require('../helpers/admin-helpers')


/* GET users listing. */


const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }
  else{
    res.redirect('/admin/login')
  }
}
/*_________ROUTS_________*/
router.get('/',verifyLogin, function(req, res, next) {
    res.render('adminintro',{admin:true})
  
  });
  router.get('/signup', function(req, res, next) {
    res.render('signup',{admin:true})
  
  });
  router.post('/signup', function(req, res, next) {
    console.log(req.body);
    adminHelpers.doSignup(req.body).then((response)=>{
      console.log(response);
    })
    res.render('adminlogin',{admin:true})
    
    
    });
  router.get('/login', function(req, res, next) {
    res.render('adminlogin',{admin:true})
  
  });
  router.post('/login', function(req, res, next) {
  console.log(req.body);
  adminHelpers.doLogin(req.body).then((response)=>{
    console.log(response);
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/admin/add-faq')
    }else{
      req.session.loginErr="Invalied Username or Password"
      res.redirect('/admin/login')
    }
  })
  
  
  
  });
  router.get('/enquires',verifyLogin,(req, res)=> {
    adminHelpers.enquiresCollector().then((enquires)=>{
      console.log(enquires);
 
    res.render('enquires',{admin:true,enquires})
  })
  });


router.get('/add-faq',verifyLogin,(req,res)=>{
  res.render('faqadmin',{admin:true})
   });
 router.post('/add-faq',(req,res)=>{
 console.log(req.body);

 adminHelpers.faqAdder(req.body).then((response)=>{
  console.log('Response from the DB:'+response);
  res.redirect('/admin/add-faq')
  
 })

})
// router.get('/add-prices',(req,res)=>{
//   res.render('priceadmin',{admin:true})
// })
// router.post('/add-prices',(req,res)=>{
// console.log(req.body);
// adminHelpers.priceAdder(req.body)
// res.redirect('/admin/add-prices')
// })
 
 
module.exports = router;
