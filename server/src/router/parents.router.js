const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();

const parentsSchema = require('../../schemas/parents.schemas');
const ParentsDB = mongoose.model('Parents', parentsSchema);

const studentSchema = require('../../schemas/student.schemas');
const StudentDB = mongoose.model('Student', studentSchema);


router.get('/', async (req, res) => {
    let data = await ParentsDB.find();
    res.send({ data: data })
})
router.get('/:id', async (req, res) => {
    let parentsId = req.params.id;
    let data = await ParentsDB.findById(parentsId);
    res.send({ data: data })
})
router.get('/keyword/:keyword', async (req, res) => {
    let keyword = req.params.keyword;
    let result = await ParentsDB.find({
        $or: [
            { DadName: { $regex: keyword, $options: 'i' } },
            { MomName: { $regex: keyword, $options: 'i' } }
        ]
    })
    res.send({ data: result })
})

router.post('/', async (req, res) => {
    let { parents } = req.body;
    const result = new ParentsDB(parents);
    await result.save();
    res.send({ data: result });
})
router.put('/:id', async (req, res) => {
    let { parents } = req.body;
    let parentsId = req.params.id;
    let result = await ParentsDB.findByIdAndUpdate(parentsId, parents);
    res.send({ data: result });
})

router.delete('/:id', async (req, res) => {
    let parentsId = req.params.id;
    let result = await ParentsDB.findByIdAndRemove(parentsId);
    await StudentDB.updateMany({
        Parents: [
            parentsId
        ]
    }, { $unset: { Parents: [parentsId] } });
    res.send({ data: result });
})

module.exports = router;