



var admin = require("firebase-admin");

var serviceAccount = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://disitalwatch-default-rtdb.firebaseio.com"
});
let db=admin.database()



async function getData(ref){
    let dada= await new Promise((da,err)=>{
        ref.once('value',(data)=>{
            da(data)
        })
    })
    return dada;
}




exports.update=async(bpm,sp02,bodytemp)=>{
    sendMsg(bpm,sp02,bodytemp)
    db.ref('data').set({
        'bpm':bpm,'sp02':sp02,'bodytemp':bodytemp
    })
}
exports.getdata=async()=>{
    let re=db.ref('data')
    let da=await getData(re)
    return da.val()
}


exports.signupsub=async(data)=>{
    let p=db.ref('user').push()
    p.set(data)
}

exports.loginsub=async (email,pass)=>{
    let p=db.ref('user')
    
    let data=await getData(p)
    let da=data.val()
    let keys=Object.keys(da)
    
    for(let k of keys){
        console.log(k)
        if(da[k].email==email&&da[k].psw==pass){
            return true;
        }
    }
    return false;
}







function sendMsg(bpm,sp02,bodytemp){
    
}
