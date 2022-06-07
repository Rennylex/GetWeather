const path=require('path')
const express=require('express')
const hbs=require('hbs')
const request=require('request')
const forecast=require('../util/forecast')
const geocode=require('../util/geocode')
const app=express()//store the express application
//
console.log(__dirname)//D:\NODE_js_RZA\web-server\src
console.log(path.join(__dirname,'../public'))//D:\NODE_js_RZA\web-server\src\app.js

//define paths for Express config
const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')
//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialspath)//指出partial在哪

//setup static directory to serve
app.use(express.static(publicDirectory))//customize ur server,static means assets in this directory are static

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Lex'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Lex'
    })



})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name:'Lex',
        helpText: 'In case you got any question'
    })
})
// app.get('',(req, res)=>{
//     res.send('hello express!')
// })

// app.get('/help',(req,res)=>{//access via "localhost:3000/help"

//     res.send('<h1>Help</h1>')

// })

//app.get('/about',(req,res)=>{//access via "localhost:3000/about"

    //     res.send('<h1>About</h1>')
    
    // })

app.get('/weather',(req,res)=>{//access via "localhost:3000/weather"
    //eg:   http://localhost:3000/weather?address=Chengdu
    if(!req.query.address) {
        return res.send({
             error:"Please provide an address!"
         })
    }

    console.log(req.query.address)
    const address=req.query.address

    geocode(address, (error, {latitude,longtitude,location}={})=>{//default params ={}

        if(error){
            console.log(error)
            return res.send({error})
        }
    
        //console.log('Error',error)
        //console.log('Data',data)
    
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error) {
                console.log(error)
                return res.send({error})
            }
            
            console.log(location)
            console.log(forecastData)

            res.send({
                city: 'dummy Chengdu',
                address:address,
                location,//shorthand
                forecast:forecastData})
    
        })
    
    })




})

app.get('/help/*',(req,res)=>{

    res.render('404',{
        title:'Error:404',
        text:'Help article not found',
        name:'Lex'

    })


})

app.get('/products',(res,req)=>{
    if(!req.query.search) {
       return res.send({
            error:"Please provide a search term!"
        })

    }
    console.log(req.query)
    
    res.send({
        products:[]
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title:'Error:404',
        text:'Page not found',
        name:'Lex'


    })


})


////starting server is async
app.listen(3000,()=>{//access via "localhost:3000"
    console.log('server is up on port 3000')

})//(port,),3000是local port