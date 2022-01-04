const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();

const teacherSchema = require('../../schemas/teacher.schemas');
const TeacherDB = mongoose.model('Teacher', teacherSchema);

const studentSchema = require('../../schemas/student.schemas');
const StudentDB = mongoose.model('Student', studentSchema);

router.get('/', async (req, res) => {
    let data = await TeacherDB.find().populate("Subject");
    res.send({ data: data })
})
router.get('/:id', async (req, res) => {
    let teacherId = req.params.id;
    let data = await TeacherDB.findById(teacherId).populate("Subject");
    res.send({ data: data })
})


router.get('/sort/:field', async (req, res) => {
    let field = req.params.field;
    let { sort } = req.query;
    let data = [];
    if (field == "Name") {
        if (sort == "asc") {
            data = await TeacherDB.find().populate('Subject').sort({ Name: 1 });
        } else if (sort == "dsc") {
            data = await TeacherDB.find().populate('Subject').sort({ Name: -1 });
        }
    } else if (field == "Age") {
        if (sort == "asc") {
            data = await TeacherDB.find().populate('Subject').sort({ Age: 1 });
        } else if (sort == "dsc") {
            data = await TeacherDB.find().populate('Subject').sort({ Age: -1 });
        }
    } else {
        data = await TeacherDB.find().populate('Subject');
    }
    res.send({ data: data })
})

router.get('/keyword/:keyword', async (req, res) => {
    let keyword = req.params.keyword;
    let result = await TeacherDB.find({ Name: { $regex: keyword, $options: 'i' } }).populate("Subject");
    res.send({ data: result })
})

router.post('/', async (req, res) => {
    let { teacher } = req.body;
    const result = new TeacherDB(teacher);
    await result.save();
    res.send({ data: result });
})
router.put('/:id', async (req, res) => {
    let { teacher } = req.body;
    let teacherId = req.params.id;
    if (teacher.Subject.length <= 1) {
        delete teacher.Subject;
    }
    let result = await TeacherDB.findByIdAndUpdate(teacherId, teacher);
    res.send({ data: result });
})

router.delete('/:id', async (req, res) => {
    let teacherId = req.params.id;
    let result = await TeacherDB.findByIdAndRemove(teacherId);
    await StudentDB.updateMany({
        Teacher: [
            teacherId
        ]
    }, { $unset: { Teacher: [teacherId] } });
    res.send({ data: result });
})

module.exports = router;