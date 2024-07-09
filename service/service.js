const geocoder = require("../config/geocoder")
const geolib = require('geolib')

class service{}

service.geoCode=async (address)=>{
 var ans;
      await geocoder.geocode(address,(err,res)=>{
        if (err) {
            throw err;
        } else {
            console.log("res:",res);
             ans= res;
            
        }
    })
    console.log("ans=>",ans);
    return ans;
}
service.getC=async (address)=>{
    var ans={};
        await geocoder.geocode(address,(err,res)=>{
           if (err) {
               throw err;
           } else {
               console.log("res:",res);
               ans.longitude = res[0].longitude
                ans.latitude =  res[0].latitude
                
           }
       })
       console.log("ans=>",ans);
       return ans;
   }




service.revGeoCode =async (latlong)=>{
    var ans;
await    geocoder.reverse(latlong,(err,res)=>{
        if (err) {
            throw err;
        } else {
            console.log("res:",res);
            ans = res;
            
        }
    })
return ans;}
service.getDistance=async (start,end)=>{
 
    try {
        console.log("start=",start,"end=",end);
var distance =await geolib.getDistance(start,end);
console.log(distance);
return distance;
    
} catch (error) {console.log(error);
    return error.message
}
}






module.exports = service