const request=require('request')
//mapbox换用positionstack, api key=0213931f7227d32ffc815edfcee9e8a6
//http://api.positionstack.com/v1/forward?access_key=0213931f7227d32ffc815edfcee9e8a6&query=Chengdu&limit=1
const geocode=(address, callback)=>{
    const url='http://api.positionstack.com/v1/forward?access_key=0213931f7227d32ffc815edfcee9e8a6&query='+encodeURIComponent(address)+'&limit=1'
    const url2='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN&limit=1'
                                //encodeURIComponent() 可以将‘？’转化为‘%3F’，这样就不容易崩溃
    request({url, json:true},(error, {body}) => {
        if(error){
            callback('Unable to connect :(', undefined)//如果error有值了，那undefined是第二个值response默认返回的，这里也可以手动设置
        }
        else if(body.data.length===0){
        //else if(body.features.length===0){
            callback('Unable to find this location! :(',undefined)
        }
        else{//可以访问，则返回指定网页数据
            console.log(body.data[0].latitude+''+body.data[0].longitude)
            callback(undefined, {//返回一个object
                // latitude:body.features[0].center[1],
                // longtitude:body.features[0].center[0],
                // location: body.features[0].place_name

                latitude:body.data[0].latitude,
                longitude:body.data[0].longitude,
                location: body.data[0].label
                
            })

        }

    })
}



module.exports = geocode