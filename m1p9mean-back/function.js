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

    insert : async function($listeChamp,$listeValues,$table,$column_unique = 'id'){
        var sqlChamp = "insert into "+$table+"( ";
        var sqlValue = "values ( ";
        for($i = 0;$i<$listeChamp.length;$i++){
            if($listeChamp[$i] == $column_unique){
                sqlChamp += ""+$listeChamp[$i]+" ,";
                sqlValue += ""+$listeValues[$i]+" ,";               
            } else if($i==$listeChamp.length-1){
                sqlChamp += ""+$listeChamp[$i]+" )";
                sqlValue += "'"+$listeValues[$i]+"' )";
            } else {
                sqlChamp += ""+$listeChamp[$i]+" ,";
                sqlValue += "'"+$listeValues[$i]+"' ,";
            } 
        }
        var sql = sqlChamp+sqlValue;
        let result = await con.query(sql);
        return result.rowCount;
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

    update : async function($listeChamp,$listeValues,$table,$condition){
        var sql =  "update "+$table +" set ";
        for($i = 0;$i<$listeChamp.length;$i++){
            if($i==$listeChamp.length-1){
                sql += ""+$listeChamp[$i]+" = '"+$listeValues[$i]+"' where ";
            } else {
                sql += ""+$listeChamp[$i]+" = '"+$listeValues[$i]+"',";
            } 
        }
        sql += $condition;
        console.log(sql);
        let result = await con.query(sql);
        return result.rowCount;
    }
}