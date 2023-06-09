const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()


//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)



//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name : 'Ahasan Kabir'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name : 'Ahasan Kabir'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This page is for help',
        title: 'Help',
        name : 'Ahasan Kabir'
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,locations} = {})=>{
          
           if(error)
           {
             return res.send({ error })
           }

           forecast(latitude,longitude,(error,forecastData)=>{
               if(error)
               {
                  return res.send({error})
               }

               res.send({
                 forecast: forecastData,
                 location : locations.place_name,
                 address: req.query.address
               })
           })

    })

    
    // res.send({
    //     forecast : 'It is snowing',
    //     location : 'Philadelphia',
    //     address :  req.query.address
    // })
})




app.get('/products',(req,res)=>{
    
    
    if(!req.query.search){
       
        return res.send({

            error: 'You must provide a search term'

        })
 
    }

    console.log(req.query.search)

    res.send({
        products: []
    })

})

app.get('/help/*',(req,res)=>{
   
    res.render('404',{
        title: '404',
        name : 'Ahasan Kabir',
        errorMessage: 'Help article not found'
    })

})

app.get('*',(req,res)=>{
    
    res.render('404',{
        title : '404',
        name : 'Andrew Mead',
        errorMessage: 'Page not found.'
    })

})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})





