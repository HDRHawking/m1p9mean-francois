var functions = require('../function');
var nodemailer = require('nodemailer');
var mongo = require('mongodb');

module.exports = class CommandeController{

    async select(req,res){
        var data = await functions.select("commande");
        var status = "OK";
        res.json({
            meta : { 
                status : status,
                message : "liste commande"
            },
		    data : data
        });
    }

    async commander(req,res){
        var body_fille = [];
        var body = JSON.stringify({
            'code_client' : req.query.user,
            'etat' : 0,
            'code_livreur' : 0,
          });
        body_fille = JSON.parse(req.query.json_commande+"");
        console.log(body_fille);
        var commande =  await functions.insert("commande",body);
        var html = "<p>Bonjour,</p><br>"
                    +"<p>Votre commande a été bien envoyé</p>"
                    +"<table border=1>"
                    +"<tr>"
                    +"<th>Nom produit</th>"
                    +"<th>Quantite</th>"
                    +"<th>Prix</th>"
                    +"<th>Total</th>"
                    +"</tr>";
        var total = 0;
        body_fille.forEach(element => {
            html += "<tr><td>"+element.libelle+"</td>"
                 + "<td>"+element.qte+"</td>"
                 + "<td>"+element.prix+"</td>"
                 + "<td>"+element.prix*element.qte+"</tr>";
                total+=element.prix*element.qte;
            var commande_fille = JSON.stringify({
                'code_produit': element.code_produit,
                'code_commande': commande.insertedId,
                'libelle': element.libelle,
                'qte': element.qte,
                'prix': element.prix
            })
            var c_fille =  functions.insert("commandefille",commande_fille); 
        });
        var email = await functions.select('client',{'_id' : new mongo.ObjectID(req.query.user)})
        console.log(email);
        console.log(req.query.user);
        html += "<td></td><td></td><td>Total</td><td>"+total+"</td></table>"
        this.send_mail(email[0]['email'],html);
        console.log('mail bien envoyé')
        var status = "OK";
        res.json({
            meta : { 
                status : status,
                message : "insert commande"
            },
		    data : commande.insertedId
        });
    }


    send_mail ($destinataire,$body){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'francois@supermarche.mg',
              pass: 'francoisnomena'
            }
          });
          
          var mailOptions = {
            from: 'francois@gmail.com',
            to: $destinataire,
            subject: 'Votre commande chez E-kaly',
            html: $body
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          return;
    }
}