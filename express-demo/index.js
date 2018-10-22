const express = require('express')
const app=express()
const Joi= require('joi')

app.use(express.json())
const courses=[
{id:1, name:"courses 1"},
{id:2, name:'courses 2'}
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

	const schema={
		name:Joi.string().min(3).require()

	}
	const result=Joi.validate(req.body,schema)
	

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



//PORT
const port=process.env.PORT || 3000;
app.listen(port,()=>
	console.log(`Listening on ${port}`)
)

