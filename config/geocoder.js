const NodeGeocoder = require('node-geocoder')
var geocoder = NodeGeocoder({
    provider:'opencage',
    apiKey:'8ad607b0275c4e23b6cc544b40dc674b'
})
module.exports= geocoder