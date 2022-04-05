var functions = require('../function');

module.exports = class CategorieController{

    async select(req,res){
        return await functions.select("categorie");
        
    }
}