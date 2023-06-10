const request= require('request')


const forecast = (latitude,longitude,callback) => {
    

    const url='http://api.weatherstack.com/current?access_key=01ac49a18bbd6eaec4f173c8490e2007&query='+latitude+','+longitude
    
    request({url, json: true},(error,{body})=>{
        
        if(error){
          
            callback('Unable to connect to weather service',undefined)

        } else if(body.error){
       
            callback('Unable to find location',undefined)

        }else{
             
            console.log(body.current)
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+ " degrees out. It feels like "+body.current.feelslike+" degrees out. The humadity is "+body.current.humidity+"%.")
        }

    })


}

module.exports=forecast