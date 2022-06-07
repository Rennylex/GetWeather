// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })

const request=require('request')

const forecast=(latitude, longtitude,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=b208b62967a75f79421bc25b6a3bef69&query='+latitude+','+longtitude+'&units=f'
    request({url:url,json:true},(error,{body})=>{//用{body}替换response，因为后面只用到了response.body
        if(error){
            callback('Unable to connect in ',undefined)

        }
        else if(body.error==0){

            callback('unable to find the location!',undefined)
        }
        else(
            callback(undefined,"it's currently "+body.current.temperature + " degrees,"+" it feels like " + body.current.feelslike+ " degrees.\n\n "+"Wind speed: "+body.current.wind_speed+", wind degree: "+ body.current.wind_degree+". The weather is "+body.current.weather_descriptions[0]+", UV Index is "+body.current.uv_index+", the chance of rain is "+body.current.precip+", the humidity is "+body.current.humidity+"%.")
        )



    })


}

module.exports=forecast