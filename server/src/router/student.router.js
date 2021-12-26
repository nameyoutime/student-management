const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();

const studentSchema = require('../../schemas/student.schemas');
const StudentDB = mongoose.model('Student', studentSchema);

router.get('/', async (req, res) => {
    let data = await StudentDB.find();
    res.send({ data: data })
})
router.get('/:id', async (req, res) => {
    let studentId = req.params.id;
    let data = await StudentDB.findById(studentId).populate("Parents").populate("Teacher").populate("Class");
    res.send({ data: data })
})

router.get('/keyword/:keyword', async (req, res) => {
    let keyword = req.params.keyword;
    let result = await StudentDB.find({ Name: { $regex: keyword, $options: 'i' } })
    res.send({ data: result })
})


// api/student/sort/Yob?sort=asc
router.get('/sort/:field', async (req, res) => {
    let field = req.params.field;
    let { sort } = req.query;
    let data;
    if (field == "Name") {
        if (sort == "asc") {
            data = await StudentDB.find().sort({ Name: 1 });
        } else if (sort == "dsc") {
            data = await StudentDB.find().sort({ Name: -1 });
        }
    }else if(field=="Age"){
        if (sort == "asc") {
            data = await StudentDB.find().sort({ Age: 1 });
        } else if (sort == "dsc") {
            data = await StudentDB.find().sort({ Age: -1 });
        }
    } else if(field == "Yob"){
        if (sort == "asc") {
            data = await StudentDB.find().sort({ Yob: 1 });
        } else if (sort == "dsc") {
            data = await StudentDB.find().sort({ Yob: -1 });
        }
    } else {
        data = await StudentDB.find();
    }
    res.send({ data: data })
})
router.post('/', async (req, res) => {
    let { student } = req.body;
    const result = new StudentDB(student);
    await result.save();
    res.send({ data: result });
})
router.put('/:id', async (req, res) => {
    let { student } = req.body;
    let studentId = req.params.id;
    let result = await StudentDB.findByIdAndUpdate(studentId, student);
    res.send({ data: result });
})

router.delete('/:id', async (req, res) => {
    let studentId = req.params.id;
    let result = await StudentDB.findByIdAndRemove(studentId);

    res.send({ data: result });
})

module.exports = router;