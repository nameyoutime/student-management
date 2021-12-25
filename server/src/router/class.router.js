const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();

const classSchema = require('../../schemas/class.schemas');
const ClassDB = mongoose.model('Class', classSchema);

const studentSchema = require('../../schemas/student.schemas');
const StudentDB = mongoose.model('Student', studentSchema);

router.get('/', async (req, res) => {
    let data = await ClassDB.find();
    res.send({ data: data })
})
router.get('/:id', async (req, res) => {
    let classId = req.params.id;
    let data = await ClassDB.findById(classId);
    res.send({ data: data })
})
router.get('/keyword/:keyword', async (req, res) => {
    let keyword = req.params.keyword;
    let result = await ClassDB.find({Room : { $regex: keyword, $options: 'i' }})
    res.send({ data: result })
})

router.post('/', async (req, res) => {
    let { classes } = req.body;
    let last = await ClassDB.find().sort({ _id: -1 }).limit(1).select('Room');
    let count = await ClassDB.countDocuments();
    if (count == 0) {
        classes = {
            Room: 1,
            ...classes
        }
    } else {
        classes = {
            Room: last[0].Room + 1,
            ...classes
        }
    }
    const result = new ClassDB(classes);
    await result.save();
    res.send({ data: result });
})
router.put('/:id', async (req, res) => {
    let { classes } = req.body;
    let classId = req.params.id;
    let result = await ClassDB.findByIdAndUpdate(classId, classes);
    res.send({ data: result });
})

router.delete('/:id', async (req, res) => {
    let classId = req.params.id;
    let result = await ClassDB.findByIdAndRemove(classId);
    await StudentDB.updateMany({Class:[
        classId
    ]},{$unset:{Class:[classId]}});
    res.send({ data: result });
})

module.exports = router;
