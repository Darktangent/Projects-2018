const express= require('express')
const router=express.Router()

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




router.get('/', (req, res) => {
	res.send(courses)
})
// /api/course/id
router.get('/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id))
	if (!course) return res.status(404).send('not found')
	res.send(course)
})

router.post('/', (req, res) => {
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




router.put('/:id', (req, res) => {

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

router.delete('/:id', (req, res) => {

	//lookup the course
	const course = courses.find(c => c.id === parseInt(req.params.id))
	if (!course) return res.status(404).send(`The course with id- ${req.params.id} was not found. Try again later`)
	const index = courses.indexOf(course)
	courses.splice(index, 1)
	res.send(course)




})

module.exports=router;