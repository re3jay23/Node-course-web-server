const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

// adding a note;

var app = express();

// hbs.registerPartials : handlebarsjs function to use partials to add HTML tags dynamically.
hbs.registerPartials(__dirname +'/views/partials');

//hbs.registerHelper : handlebarsjs function to create a function that can be use in HTML to dynamically do something.
hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
})


// app.set : express set function to set name to a value. See Express > app.set in API document.
app.set('view engine','hbs');



// app.use: express/app function that mount middleware function at the specified path.
// this next code is a server logger
app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log +'\n',(err)=>{
		if(err){
			console.log('unable to append to server.log');
		}
	});
	next();
});

// this next code should stop the app from moving on to the .get function. next() is omitted.
// app.use((req,res,next)=>{
	// res.render('maintenance.hbs',{
		// pageTitle:'Maintenance Page'
	// });
// }) // challenge

// this next code is to use 'use' function to load a static HTML script/code inside /public directory.
// app.use(express.static(__dirname+'/public'));
app.use(express.static('./public'));

app.get('/',(req,res)=>{
	//res.send('<h1>Hello Express!</h1>');
	res.render('home.hbs',{
		pageTitle:'Home Page',
		welcomeMessage:'Welcome to my website'
		//currentYear:new Date().getFullYear()
	});
});
app.get('/about', (req, res)=>{
	//res.send('about page');
	res.render('about.hbs',{
		pageTitle:'About page'
		//currentYear:new Date().getFullYear()
	});
});

// /bad - send back JSON with error message

app.get('/bad',(req,res)=>{
	res.send({
		errorMessage: 'error'
	});
});

app.listen(port ,()=>{
	console.log(`Server is up on port ${port}`);
});