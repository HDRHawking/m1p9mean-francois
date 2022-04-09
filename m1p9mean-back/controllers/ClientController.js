var functions = require('../function');

module.exports = class ClientController{

    async select(req,res){
        var data = await functions.select("client");
        var status = "OK";
        res.json({
            meta : { 
                status : status,
                message : "liste commande"
            },
		    data : data
        });
    }

    async insert(req,res){
        var body = JSON.stringify({
            'nom' : req.query.nom,
            'prenom' : req.query.prenom,
            'identifiant' : req.query.identifiant,
            'motdepasse' : functions.hash(req.query.motdepasse),
            'email' : req.query.email,
            'contact' : req.query.contact,
            'adresse' : req.query.adresse
          });
        var insert =  await functions.insert("client",body);
        
        var status = " NOT OK";
        if(insert.acknowledged===true){
            status = 'OK'
        }
        res.json({
            meta : { 
                status : status,
                message : "insert commande"
            },
		    data : insert.insertedId
        });
    }

    async login(req,res){
        var client = {
            'identifiant': req.query.identifiant,
            'motdepasse': functions.hash(req.query.motdepasse)
        }
        var data = await functions.select("client",client);
        var status = " NOT OK";
        var message = "Identifiant ou mot de passe incorrect";
        var id_select = 0;
        if(data.length!=0){
            status = 'OK';
            message = "Identification correct";
            id_select = data[0]._id;
        }
        res.json({
            meta : { 
                status : status,
                message : message
            },
            data :  id_select
        });
    }

    async search(req,res){
        var search = {
            'libelle': new RegExp(req.query.key,'i')
        }
        // console.log(search);
        var data = await functions.select("produit",search);
        var status = " NOT OK";
        var message = "Pas de resultat";
        // console.log(data);
        if(data.length!=0){
            status = 'OK';
            message = "Liste Resultat ";
        }
        res.json({
            meta : { 
                status : status,
                message : message
            },
            data :  data
        });
    }
}