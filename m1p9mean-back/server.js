const express = require('express');
const app = express();

// const AdministrateurController = require('./controllers/AdminstrateurController');
const ClientController =  require('./controllers/ClientController');
const RestaurantController = require('./controllers/RestaurantController');
const CommandeController = require('./controllers/CommandeController');
const ProduitController = require('./controllers/ProduitController');
const CategorieController = require('./controllers/CategorieController');

const hostname = 'https://e-kalymada.herokuapp.com';
const port = process.env.PORT

// let administrateurController = new AdministrateurController();
let clientController = new ClientController();
let restaurantController = new RestaurantController();
let commandeController = new CommandeController();
let produitController = new ProduitController();
let categorieController = new CategorieController();

app.get('/liste-categorie',async function(req, res){
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	await categorieController.select(req,res);
});

app.get('/liste-restaurant',async function(req, res){
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	await restaurantController.select(req,res);
});

app.get('/liste-produit-restaurant',async function(req, res){
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	await restaurantController.select_produit(req,res);
});

app.get('/liste-produit',async function(req, res){
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log("testst");
	await produitController.select(req,res);
});

app.get('/inscription',async function(req, res){
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	await clientController.insert(req,res);
});


app.get('/commander',async function(req, res){
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	await commandeController.commander(req,res);
});


app.get('/login',async function(req, res){
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	await clientController.login(req,res);
});

app.get('/search',async function(req, res){
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	await clientController.search(req,res);
});

app.listen(port, function(req, res){
  console.log(`Server running at http://${hostname}:${port}/`);
});