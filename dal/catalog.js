const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

//Connection URL and Database settings
const url = process.env.ATLAS_CONNECTION;
const settings = {useUnifiedTopology: true};

//Database and Collection Names
const dbName = 'learners_catalog';
const colName = 'terms';

//READ functions
const getCatalog = () =>{
    const myPromise = new Promise((resolve, reject) =>{
        MongoClient.connect(url, settings, function(err, client){
            if(err){
                reject(err);
            }else{
                console.log("Connected to DB for READ");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.find({}).toArray(function(err, docs){
                    if(err){
                        reject(err);
                    }else{
                        console.log("Found the Catalog of Terms");
                        resolve(docs);
                        client.close();
                    }
                });
            }
        });
    });
    return myPromise;
};
const getTermByID = (id) =>{
    const myPromise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client) {
            if(err){
                reject(err);
            }else{
                console.log("Connected to DB for READ by ID");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                try{
                    const _id = new ObjectID(id);
                    const result = await collection.findOne({_id});
                    if(result){
                        resolve(result);
                    }else{
                        reject({error: "ID not found in database"});
                    }
                    client.close();
                }catch(err){
                    reject({error: "ID must be in ObjectID format"});
                }
            }
        })
    });
    return myPromise;
};
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
    getCatalog,
    getTermByID
}