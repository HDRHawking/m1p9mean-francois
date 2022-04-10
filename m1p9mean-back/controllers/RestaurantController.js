var functions = require('../function');
var nodemailer = require('nodemailer');
var mongo = require('mongodb');

module.exports = class CommandeController{

    async select(req,res){
        var data = await functions.select("restaurant");
        var status = "OK";
        res.json({
            meta : { 
                status : status,
                message : "liste restaurant"
            },
		    data : data
        });
    }

    async select_produit(req,res){
        var data = await functions.select("produit", { code_restaurant : req.query.code});
        var status = "OK";
        res.json({
            meta : { 
                status : status,
                message : "liste restaurant"
            },
		    data : data
        });
    }
}