var functions = require('../function');

module.exports = class CategorieController{

    async select(req,res){
        var data = await functions.select("categorie");
        var status = "OK";
        res.json({
            meta : { 
                status : status,
                message : "liste categorie"
            },
		    data : data
        });
    }
}