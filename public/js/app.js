//this file is linked to fetch the Forcast

console.log('Client side javascript message is loaded')

// fetch('http://localhost:3000/weather?address=Chengdu').then((response) => {//fetch is async
//     response.json().then((data)=>{//this callback function will be runned when the Json data is arrived and parsed
//         if(data.error){
//             console.log(data.error)

//         }
//         else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm=document.querySelector('form')//return a javascript version of the selected content

const search=document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{//this callback run everytime an event(submitted) is occured
    //e is short for event
    e.preventDefault()//prevent browser's refresh everytime we submmit
    
    const location=search.value
    message1.textContent = 'Loading message...'
    message2.textContent = ''
    //console.log(location)
    fetch('/weather?address='+encodeURIComponent(location)).then((response) => {//fetch is async
    response.json().then((data)=>{//this callback function will be runned when the Json data is arrived and parsed
        if(data.error){
            message1.textContent =data.error

        }
        else{
            // console.log(data.location)
            // console.log(data.forecast)

            message1.textContent=data.location
            message2.textContent=data.forecast
        }
    })
})
})
// fetch('http://puzzle.mead.io/puzzle').then((response) => {//fetch is async
//     response.json().then((data)=>{//this callback function will be runned when the Json data is arrived and parsed
//         console.log(data)
//     })
// })
// const url_add='http://api.positionstack.com/v1/forward?access_key=0213931f7227d32ffc815edfcee9e8a6&query='+encodeURIComponent('Boston')+'&limit=1'
// fetch(url_add).then((response) => {//fetch is async
//     response.json().then((dataa)=>{//this callback function will be runned when the Json data is arrived and parsed
//         console.log(dataa.data[0])
//         const latitude=dataa.data[0].latitude
//         const longtitude=dataa.data[0].longtitude
//         const label=dataa.data[0].label

//         const url_weather='http://api.weatherstack.com/current?access_key=b208b62967a75f79421bc25b6a3bef69&query='+latitude+','+longtitude+'&units=f'

//             fetch(url_weather).then((response2) =>{
//                 response2.json().then((data2)=>{
//                     console.log(data2.current)

//                 })
//             })
//     })
// })