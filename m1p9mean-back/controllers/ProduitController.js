var functions = require('../function');

module.exports = class CategorieController{

    async select(req,res){
        var data = await functions.select("produit");
        var status = "OK";
        res.json({
            meta : { 
                status : status,
                message : "liste produit"
            },
		    data : data
        });
    }
}