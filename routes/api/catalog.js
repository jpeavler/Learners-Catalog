const express = require('express');
const router = express.Router();
const {
    getCatalog,
    getTermByID,
    getTermByName,
    addTerm
} = require('../../dal/catalog');

//Get Routers
router.get('/', async function(req, res){
    try{
        const catalog = await getCatalog();
        res.send(catalog);
    }catch(err) {
        console.log(err);
        res.status(500).send('Internal server issue, check logs');
    }
});
router.get('/:id', async function(req, res) {
    try{
        const term = await getTermByID(req.params.id);
        res.send(term);
    }catch(err) {
        if(err.error) {
            res.status(400).send(err);
        }else{
            console.log(err);
            res.status(500).send('Internal server issue, check logs');
        }
    }
});
router.get('/name/:name', async function(req, res) {
    try{
        const termName = req.params.name.replace(/_/g, " ");
        const term = await getTermByName(termName);
        res.send(term);
    }catch(err) {
        if(err.error) {
            res.status(400).send(err);
        }else{
            console.log(err);
            res.status(500).send('Internal server issue, check logs');
        }
    }
});

//Post router
router.post('/', async function(req,res) {
    try{
        const newTerm = await addTerm(req.body);
        res.send(newTerm);
    }catch(err) {
        if(err.error) {
            res.status(400).send(err);
        }else{
            console.log(err);
            res.status(500).send('Internal server issue, check logs');
        }
    }
})
module.exports = router;