const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();

const studentSchema = require('../../schemas/student.schemas');
const StudentDB = mongoose.model('Student', studentSchema);

router.get('/', async (req, res) => {
    let data = await StudentDB.find();
    res.send({data:data})
})
router.get('/:id', async (req, res) => {
    let studentId  = req.params.id;
    let data = await StudentDB.findById(studentId);
    res.send({data:data})
})

router.post('/', async (req, res) => {
    let { student } = req.body;
    const result = new StudentDB(student);
    await result.save();
    res.send({data:result});
})
router.put('/:id', async (req, res) => {
    let { student } = req.body;
    let studentId  = req.params.id;
    let result = await StudentDB.findByIdAndUpdate(studentId,student);
    res.send({data:result});
})

router.delete('/:id', async (req, res) => {
    let studentId  = req.params.id;
    let result = await StudentDB.findByIdAndRemove(studentId);
    res.send({data:result});
})

module.exports = router;