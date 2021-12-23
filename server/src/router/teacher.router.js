const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();

const teacherSchema = require('../../schemas/teacher.schemas');
const TeacherDB = mongoose.model('Teacher', teacherSchema);

router.get('/', async (req, res) => {
    let data = await TeacherDB.find();
    res.send({data:data})
})
router.get('/:id', async (req, res) => {
    let teacherId  = req.params.id;
    let data = await TeacherDB.findById(teacherId);
    res.send({data:data})
})

router.post('/', async (req, res) => {
    let { teacher } = req.body;
    const result = new TeacherDB(teacher);
    await result.save();
    res.send({data:result});
})
router.put('/:id', async (req, res) => {
    let { teacher } = req.body;
    let teacherId  = req.params.id;
    let result = await TeacherDB.findByIdAndUpdate(teacherId,teacher);
    res.send({data:result});
})

router.delete('/:id', async (req, res) => {
    let teacherId  = req.params.id;
    let result = await TeacherDB.findByIdAndRemove(teacherId);
    res.send({data:result});
})

module.exports = router;