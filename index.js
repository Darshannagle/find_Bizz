const express = require('express');
const service = require('./service/service');
const route_business = require('./routes/routes_business');
const sequelize = require('./config/config');
const app = express()
const cors = require('cors')
const port = 3000
// sequelize.sync({ force: false }).then(() => console.log("done")).catch((e) => { console.error(e); })
app.use(express.json())
app.use(express.urlencoded())
app.use('/business',route_business)
app.get("/:address", async (req,res)=>{
    try {
    const address = req.params.address;
    const ans =await service.geoCode(address);
    res.status(200).send(ans);
    
} catch (error) {console.log(error);
    res.status(500).send(error.message)
}


})
app.get('/dist/:start-:end',async (req,res)=>{

    try {
        const [start, end] = await Promise.all([
          service.geoCode(req.params.start),
          service.geoCode(req.params.end)
        ]);
      
        const { latitude: startLat, longitude: startLon } = start[0];
        const { latitude: endLat, longitude: endLon } = end[0];
      
        const dist = await service.getDistance(
          { latitude: startLat, longitude: startLon },
          { latitude: endLat, longitude: endLon }
        );
      
        res.status(200).json({ dist: dist / 1000 });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))