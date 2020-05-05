const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

//Connection URL and Database settings
const url = process.env.ATLAS_CONNECTION;
const settings = {useUnifiedTopology: true};

//Database and Collection Names
const dbName = 'learners_catalog';
const colName = 'terms';

//READ functions
const getCatalog = () =>{};
const getTermByID = (id) =>{};
const getTermByName = (name) =>{};

//CREATE function
const addTerm = (term) =>{};

//UPDATE: Put function
const updateTerm = (id, term) =>{};

//UPDATE: Patch function, will be used to archive/restore terms
const updateTermValues = (id, term) =>{};

//DELETE (archive) function. Should update boolean
const deleteTerm = (id) =>{};

module.exports = {
    getCatalog
}