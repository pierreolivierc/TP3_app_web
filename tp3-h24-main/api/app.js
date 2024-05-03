"use strict";

const express = require("express");
const mongoose = require("mongoose");
var hateoasLinker = require("express-hateoas-links");

const app = express();

// parse application/json
app.use(express.json());  

// remplace le res.json standard avec la nouvelle version
// qui prend en charge les liens HATEOAS
app.use(hateoasLinker); 


app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"OPTIONS, GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	
	if (req.method === "OPTIONS") {
		res.status(200).end();
		return;
	}
	else{
		next();
	}

});


// Importe les routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const areaRoutes = require("./routes/area");
const routeRoutes = require("./routes/route");

// Utilisation des routes en tant que middleware
app.use(authRoutes);
app.use(userRoutes);
app.use(areaRoutes);
app.use(routeRoutes);

// Gestion des erreurs
// "Attrappe" les erreurs envoyé par "throw"
app.use(function (err, req, res, next) {
	
	console.log("err", err);
	if (!err.statusCode){
		err.statusCode = 500;
	} 

	res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
});	


mongoose
	.connect(process.env.DATA_BASE)
	.then(() => {
		app.listen(3000, () => {
			console.log("Node.js est à l'écoute sur http://localhost:%s ", process.env.PORT);
		});
	})
	.catch(err => console.log(err));

module.exports = app;