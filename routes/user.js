
var express = require('express');
const { faqLoader } = require('../helpers/admin-helpers');
var router = express.Router();
const adminHelpers=require('../helpers/admin-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  let pagetitle='Kerala Web Design, E Commerce | SEO Company‎ '
  res.render('index',{admin:false,pagetitle});
});

router.get('/faq',(req,res)=>{
  adminHelpers.faqLoader().then((faqItems)=>{
    res.render('faq',{faqItems})
  })
  
  
});
router.get('/web-design-pricing',(req,res)=>{
  adminHelpers.faqLoader('web design').then((faqItems)=>{
    let pageheading='Best Web Design Pricing and More'
    let pagetitle='#1 Web Design Kerala | Top Web Designers in India'
    res.render('price-webdesign',{faqItems,pageheading,pagetitle})
  })
 
});
router.get('/e-commerce-pricing',(req,res)=>{
  adminHelpers.faqLoader('e commerce').then((faqItems)=>{
    let pageheading='Best E Commerce Pricing and More'
    let pagetitle='Best Ecommerce Website Development Company'
    res.render('price-ecommerce',{faqItems,pageheading,pagetitle})
  })
});
router.get('/seo-pricing',(req,res)=>{
  adminHelpers.faqLoader('seo').then((faqItems)=>{
    let pageheading='Best SEO agency in kerala'
    res.render('price-seo',{faqItems,pageheading})
  })
});

router.post('/form',(req,res)=>{
  console.log(req.body);
  adminHelpers.contactFormSubmission(req.body).then((data)=>{
    console.log("success");
    console.log(data);
    res.redirect('/')

 
  })
  
  
});




module.exports = router;
