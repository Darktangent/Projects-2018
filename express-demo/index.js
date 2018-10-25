const express = require('express')
const Joi= require('joi')
const app=express()

// -4 test
app.use(express.json())

const courses=[
{id:1, name:"courses 1"},
{id:2, name:'courses 2'},
{id:3,name:'courses 3 '}
]
app.get('/',(req,res)=>{
	res.send('Hello there!!!')
})

app.get('/api/courses',(req,res)=>{
	res.send(courses)
})
// /api/course/id
app.get('/api/courses/:id',(req,res)=>{
	const course=courses.find(c=>c.id===parseInt(req.params.id))
	if (!course) res.status(404).send('not found')
	res.send(course)
})
app.post('/api/courses',(req,res)=>{

	const result=validateCourse(req.body)
	if(result.error){
		res.status(400).send(result.error.details[0].message)
		return
	}
	const course={
		id:courses.length+1,
		name: req.body.name
	}
	courses.push(course)
	res.send(course)

})
app.put('/api/courses/:id',(req,res)=>{

	//lookup the courses
	//if doesnt exist, return 404
	//validate
	//if invalid. return 400- bad request
	const course=courses.find(c=>c.id===parseInt(req.params.id))
	if (!course) res.status(404).send('not found')

	const result=validateCourse(req.body)
	if(result.error){
		res.status(400).send(result.error.details[0].message)
		return
	}
	//update courses
course.name=req.body.name
	//return updated course
	res.send(course)

})
function validateCourse(course){

	const schema={
		name:Joi.string().min(3).required()

	}
	return Joi.validate(course,schema)
}

//PORT
const port=process.env.PORT || 3000;
app.listen(port,()=>
	console.log(`Listening on ${port}`)
)
