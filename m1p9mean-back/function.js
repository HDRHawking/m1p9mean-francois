const connection = require('./connexion');
var crypto = require('crypto');
const client = connection.connexion();

module.exports = {
    select : async function($table) {
        const collection = await client.db("mean_v1").collection($table).find().toArray();
        console.log(collection);
        return ;
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
        return await client.db("mean_v1").collection($table).insertOne($object);
    },

    delete : async function($condition,$table){
        var sql = "delete from "+$table+" where "+$condition;
        console.log(sql);
        // con.query(sql, function (err, result) {
        //     if (err) throw err;
        //     return 1;
        // });
        let result = await con.query(sql);
        return result.rowCount;
    },

    update : async function($objectupdate,$table,$condition){
        return await client.db("mean_v1").collection($table).updateOne($condition,$objectupdate);
    }
}