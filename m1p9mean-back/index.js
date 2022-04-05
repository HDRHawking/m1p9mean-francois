const express = require('express');
const app = express();

// const AdministrateurController = require('./controllers/AdminstrateurController');
// const ClientController =  require('./controllers/ClientController');
// const LivreurController = require('./controllers/LivreurController');
// const FournisseurController = require('./controllers/FournisseurController');
// const ProduitController = require('./controllers/ProduitController');
const CategorieController = require('./controllers/CategorieController');

const hostname = '127.0.0.1';
const port = 3000;

// let administrateurController = new AdministrateurController();
// let clientController = new ClientController();
// let livreurController = new LivreurController();
// let fournisseurController = new FournisseurController();
// let produitController = new ProduitController();
let categorieController = new CategorieController();

// app.get('/ajout_admin',async function(req, res){
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'application/json');
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	await administrateurController.insert(req,res);
// });

// app.get('/ajout_client',async function(req, res){
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'application/json');
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	await clientController.insert(req,res);
// });

// app.get('/ajout_fournisseur',async function(req, res){
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'application/json');
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	await fournisseurController.insert(req,res);
// });

// app.get('/ajout_livreur',async function(req, res){
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'application/json');
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	await livreurController.insert(req,res);
// });

// app.get('/',async function(req, res){
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'application/json');
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	await clientController.select(req,res);
// });

// app.get('/login',async function(req, res){
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'application/json');
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	$identifiant = req.query.identifiant;
// 	$mdp = req.query.motdepasse;
// 	$table = req.query.table;
// 	var value = await administrateurController.login($identifiant,$mdp,$table,res);
// });

// app.get('/liste-produit',async function(req, res){
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'application/json');
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	await produitController.select(req,res);
// });

// app.get('/liste-recherche',async function(req, res){
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'application/json');
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	await produitController.select_recherche_simple(req,res);
// });

// app.get('/liste-recherche-offres',async function(req, res){
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'application/json');
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	await produitController.select_recherche_simple_offres(req,res);
// });

// app.get('/liste-offres',async function(req, res){
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'application/json');
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	await produitController.select_offres(req,res);
// });

app.get('/liste-categorie',async function(req, res){
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	await categorieController.select(req,res);
});

app.listen(port, function(req, res){
  console.log(`Server running at http://${hostname}:${port}/`);
});