const connection = require('./connexion');
var crypto = require('crypto');
const client = connection.connexion();

module.exports = {
    select : async function($table) {
        const collection = await client.db("mean_v1").collection($table).find().toArray();
        // console.log(collection);
        return collection;
    },

    select : async function($table,$where) {
        const collection = await client.db("mean_v1").collection($table).find($where).toArray();
        // console.log(collection);
        return collection;
    },

    hash: function($pwd){
        var hash = crypto.createHash('sha256').update($pwd).digest('base64');
        return hash;
    },

    login : async function($table,$identifiant, $motdepasse) {
        var sql = "select count(*) as nb from "+$table + " where motdepasse = '"+this.hash($motdepasse)+"' and (email = '"+$identifiant+"' or identifiant = '"+$identifiant+"')";
        const res = await con.query(sql);
        return res.rows[0].nb;
    },

    insert : async function($table,$object){
        console.log($object);
        return await client.db("mean_v1").collection($table).insertOne(JSON.parse($object));
    },

    delete : async function($condition,$table){
        return await client.db("mean_v1").collection($table).deleteOne($condition);
    },

    update : async function($objectupdate,$table,$condition){
        console.log($object);
        return await client.db("mean_v1").collection($table).updateOne($condition,$objectupdate);
    }
}