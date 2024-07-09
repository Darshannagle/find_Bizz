const express = require('express');
const business = require('../model/business');
const service = require('../service/service');
const sequelize = require('../config/config');
const route_business = express.Router();
route_business.post('/',async (req,res)=>{
    
    try {
       console.log(req.body);
       const data = req.body
       const coord = await service.geoCode(data.location);
       data.latitude = await coord[0].latitude;
       data.longitude = await coord[0].longitude;
       console.log('data:',data);
        const b = await business.create(data);
        if (b) {
            res.status(201).send(b)
        } else {
            res.status(400).send("can't add")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)

    }
})

route_business.get('/',async (req,res)=>{
    
    try {
        const b = await business.findAll();
        if (b) {
            res.status(201).send(b)
        } else {
            res.status(400).send("can't get")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)

    }
})
route_business.get('/getList/:lat,:long-:dist', async (req, res) => {
    try {
      const { dist,lat,long } = req.params;
  if (!lat ||!long || !dist) {
    return res.status(400).send('City and distance are required')
  }
// const cityCord = await service.geoCode(city);
// if (!cityCord || !cityCord[0]) {
//   return res.status(404).send('City not found')
// }
// const {latitude:lat,longitude:long} = cityCord[0];
console.log("lat:",lat,"long : ",long);
const earthRadius = 6371;
const bussList = await sequelize.query(`select *,
  (${earthRadius}*acos(cos(radians(:lat))*cos(radians(latitude))*cos(radians(longitude)-radians(:lon))+sin(radians(:lat))*sin(radians(latitude)))) As distance from sample.businesses having distance<=:dist order by distance`,{
    replacements:{lat,lon:long,dist:parseFloat(dist)},
    type:sequelize.QueryTypes.SELECT
  })
  res.status(200).send(bussList)
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('An error occurred while processing your request');
    }
  });
  
  

module.exports = route_business