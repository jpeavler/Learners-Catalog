const express = require('express');
const router = express.Router();
const {
    getCatalog
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

module.exports = router;