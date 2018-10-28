const startupDebugger=require('debug')('app:startup')//debugger
const dbDebugger=require('debug')('app:db')
const config=require('config');
const express = require('express')
const Joi = require('joi')
const app = express()
const logger= require('./middleware/logger')
const auth=require('./auth')
const helmet=require('helmet')
const morgan=require('morgan')
const courses=require('./routes/courses')
const home=require('./routes/home')

//setting pug as our view engine


app.set('view engine', 'pug')
app.set('views','./views') //default






// -4 test
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(function(req,res,next){
	console.log('Logging')
	next();
})
//environment variable
// console.log(`NODE_ENV ${process.env.NODE_ENV}`) //undefined
// console.log(`app: ${app.get('env')}`)
app.use(auth)
app.use(express.static('public'))

app.use('/api/courses',courses)//use courses router
app.use('/',home) // route with / use home router

//if dev env then enable morgan otherwise dont
app.use(helmet())

//Configuration
console.log(`App name: ${config.get('name')}`)
console.log(`Mail Server: ${config.get('mail.host')}`)
console.log(`Mail password: ${config.get('mail.password')}`)








if (app.get('env')==='development'){
	app.use(morgan('tiny'))
	startupDebugger('Morgan enabled')
}

//db work
dbDebugger('Coonnected to the database')


app.use(logger)





// app.get('/', home(req,res))



//PORT
const port = process.env.PORT || 3000;
app.listen(port, () =>
	console.log(`Listening on ${port}`)
)