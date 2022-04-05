const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://m1p9mean:DGSVXslIBq1pGFxP@cluster0.iv9ke.mongodb.net/mean_v1?retryWrites=true&w=majority";

const client = new MongoClient(uri);

module.exports = {
	connexion : function(){
    client.connect(function(err) {
      if (err) throw err;
      console.log("connected");
    });
    return client;
	}
}