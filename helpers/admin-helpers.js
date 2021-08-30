var db =require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
module.exports={

    faqAdder:(faqData)=>{
        return new  Promise((resolve,reject)=>{ 
            let tofaqcollection=null
            if(faqData.select=='1')
            {
                tofaqcollection=collection.FAQ_WEBDESIGN_COLLECTION
            }else if(faqData.select=='2')
            {
                tofaqcollection=collection.FAQ_ECOMMERCE_COLLECTION
            }else{
                tofaqcollection=collection.FAQ_SEO_COLLECTION
            }
            db.get().collection(`${tofaqcollection}`).insertOne(faqData).then((data)=>{
                console.log('faq DATA stored to database.');
                resolve(data)
            })
        })

           
            } ,
            
        
    faqLoader:(serviceOptions)=>{
        return new Promise(async(resolve,reject)=>{
            let faqcollection=null
            if(serviceOptions=='web design')
            {
               faqcollection=collection.FAQ_WEBDESIGN_COLLECTION
            }else if(serviceOptions=='e commerce')
            {
               faqcollection=collection.FAQ_ECOMMERCE_COLLECTION
            }else{
               faqcollection=collection.FAQ_SEO_COLLECTION
            }
            let faqItems=await db.get().collection(`${faqcollection}`).find().toArray()
            resolve(faqItems)
        })

    },
    doSignup:(userData)=>{
        return new  Promise(async(resolve,reject)=>{
            console.log('encrypting the password......');  
           userData.Password=await bcrypt.hash(userData.Password,10)
           console.log('encrypted successfully.....');
            db.get().collection(collection.ADMIN_COLLECTION).insertOne(userData).then((data)=>{
                console.log('user signup details stored to database.');
                resolve(data.ops[0])
            })
        })
    },

    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            console.log('comparing e mail  with the database e mail....');
            let user=await db.get().collection(collection.ADMIN_COLLECTION).findOne({Email:userData.Email})
            if(user){
                console.log('decrypting the password....');
                console.log('comparing with database password.....');
               bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status)
                    {
                        console.log("login success.....");
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("login failed....");
                        resolve({status:false})
                    }
                    
                })
            }else{
                console.log("login failed....");
                resolve({status:false})
           }
        })
    },
    contactFormSubmission:(contactData)=>{

        return new Promise((resolve,reject)=>{
        db.get().collection(collection.CONTACT_COLLECTION).insertOne(contactData).then((data)=>{
            console.log("contact form stored to DB");
            resolve(data.ops)
        })

        })
    },
    enquiresCollector:()=>{
        return new Promise(async(resolve,reject)=>{
            let enquires= await db.get().collection(collection.CONTACT_COLLECTION).find().toArray()
            resolve(enquires)
          
        })
    }
    
  
    
    // priceAdder:(priceData)=>{

    //     let topricecollection=null
    //         if(priceData.select=='1')
    //         {
    //             topricecollection=collection.PRICE_WEBDESIGN_COLLECTION
    //         }else if(priceData.select=='2')
    //         {
    //             topricecollection=collection.PRICE_ECOMMERCE_COLLECTION
    //         }else{
    //             topricecollection=collection.PRICE_SEO_COLLECTION
    //         }
    //         db.get().collection(`${topricecollection}`).insertOne(priceData)
    //             console.log('Price and other DATA stored to database.');
               
          

    // },
    // priceLoader:(serviceOptions)=>{
    //     return new Promise(async(resolve,reject)=>{
    //         let pricecollection=null
    //         if(serviceOptions=='web design')
    //         {
    //             pricecollection=collection.PRICE_WEBDESIGN_COLLECTION
    //         }else if(serviceOptions=='e commerce')
    //         {
    //             pricecollection=collection.FAQ_ECOMMERCE_COLLECTION
    //         }else{
    //             pricecollection=collection.FAQ_SEO_COLLECTION
    //         }
    //         let priceItems=await db.get().collection(`${pricecollection}`).find().toArray()
    //         resolve(priceItems[0])
    //     })

    // },
        }