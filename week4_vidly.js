const Joi = require('joi');
const express= require ('express');
const app= express();
// app has 4 methods{get,post,put,del}.

app.use(express.json());

const genres= [
    { id: 1, name: 'Fantasy' },  
    { id: 2, name: 'Crime' },  
    { id: 3, name: 'Animation' }, 
    { id: 4, name: 'Documentary' }, 
    { id: 5, name: 'Biography' }, 
    { id: 6, name: 'History' }, 
    { id: 7, name: 'Action' }, 
    { id: 8, name: 'Romance' }, 
    { id: 9, name: 'comedy' }, 
];

//incoming Request
app.get('/api/Vidly', (req ,res) => {
    res.send('Hello in Vidly');
});

app.get('/api/Vidly/genres', (req ,res) => {
    res.send(genres);
});

app.get('/api/vidly/genres/:id', (req, res) =>{
    //res.send(req.query);
    const genre = genres.find(c => c.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('the genre with the given id was not found');
    res.send(genre);
 });

app.post('/api/vidly/genres', (req, res) => {
    const {error} =validateGenre(req.body); //error=result.error
    if (error) return res.status(400).send(error.details[0].message);

    //create new genre in genres
    const genre={id: genres.length+1, 
                 name:req.body.name};
    genres.push(genre);  
    res.send(genre)
});

app.put('/api/vidly/genres/:id', (req, res) =>{
//look up the genre
 //if not existing, return 404
 const genre = genres.find(c => c.id===parseInt(req.params.id));
 if(!genre) return res.status(404).send('the genre with the given id was not found');
    //validate?
    //if not validate, return 400 -bad request
    const {error} =validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //update
    genre.name=req.body.name;
    //return the updated genre.
    res.send(genre);
});

function validateGenre(genre){
    const schema ={
        name:Joi.string().min(2).required()
     };
    return Joi.validate(genre, schema);
}

app.delete('/api/vidly/genres/:id', (req, res) =>{
    //look up the genre
    //not existing, return 404
    const genre = genres.find(c => c.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('the genre with the given id was not found');

    //delete
    const index = genres.indexOf(genre);
    courses.splice(index,4);
    res.send(genre);
});

const port=process.env.port||7000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
