const startupDebugger=require('debug')('app:startup')//debugger
const dbDebugger=require('debug')('app:db')
const config=require('config');
const express = require('express')
const Joi = require('joi')
const app = express()
const logger= require('./logger')
const auth=require('./auth')
const helmet=require('helmet')
const morgan=require('morgan')

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


const courses = [{
		id: 1,
		name: "courses 1"
	},
	{
		id: 2,
		name: 'courses 2'
	},
	{
		id: 3,
		name: 'courses 3 '
	}
]



app.get('/', (req, res) => {
	res.send('Hello there!!!')
})

app.get('/api/courses', (req, res) => {
	res.send(courses)
})
// /api/course/id
app.get('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id))
	if (!course) return res.status(404).send('not found')
	res.send(course)
})

app.post('/api/courses', (req, res) => {
	const result = validateCourse(req.body)
	if (result.error) {
		res.status(400).send(result.error.details[0].message)
		return
	}
	const course = {
		id: courses.length + 1,
		name: req.body.name
	}
	courses.push(course)
	res.send(course)

})




app.put('/api/courses/:id', (req, res) => {

	//lookup the courses
	//if doesnt exist, return 404
	//validate
	//if invalid. return 400- bad request
	const course = courses.find(c => c.id === parseInt(req.params.id))
	if (!course) {
		res.status(404).send('not found')
		return
	}

	const result = validateCourse(req.body)
	if (result.error) {
		res.status(400).send(result.error.details[0].message)
		return
	}
	//update courses
	course.name = req.body.name
	//return updated course
	res.send(course)

})

function validateCourse(course) {

	const schema = {
		name: Joi.string().min(3).required()

	}
	return Joi.validate(course, schema)
}

app.delete('/api/courses/:id', (req, res) => {

	//lookup the course
	const course = courses.find(c => c.id === parseInt(req.params.id))
	if (!course) return res.status(404).send(`The course with id- ${req.params.id} was not found. Try again later`)
	const index = courses.indexOf(course)
	courses.splice(index, 1)
	res.send(course)




})

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () =>
	console.log(`Listening on ${port}`)
)