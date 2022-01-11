const movieModel = require('../models/movies');

module.exports = {
    create: function(req, res, next) {
        movieModel.create({ name: req.body.name, released_on: req.body.released_on}, (err, result) =>{
            if (err){
                next(err);
            }
            else{
                res.json({status: "Success", message: "Successfully added the movie", data: null});
            }
        });
    },
    getAll: function(req, res, next){
        let moviesList = [];

        movieModel.find({}, (err, movies) => {
            if (err){
                next(err);
            }
            else{
                for (let movie of movies) {
                    moviesList.push({id: movie._id, name: movie.name, released_on: movie.released_on});
                }
                res.json({status: "success", message: "Found the list of movies", daata: {movies: moviesList}});
            }
        });
    },
    getById: function(req, res, next){
        console.log(req.body);
        movieModel.findById(req.params.movieId, (err, movieInfo) => {
            if(err){
                next(err);
            }
            else{
                res.json({status: "success", message: "Found the movie", data: {movies: movieInfo}});
            }
        });
    },
    updateById: (req, res) => {
        movieModel.findOneAndUpdate({_id: req.params.movieId}, req.body, {new: true, context: 'query'})
        .then(updateMovie => res.json({ movie: updateMovie}))
        .catch(err => res.json({message: "Something went wrong updating this movie", error: err}));
    },
    deleteById: function(req, res, next){
        movieModel.findByIdAndRemove(req.params.movieId, (err, movieInfo) => {
            if(err){
                next(err);
            }
            else{
                res.json({status: "success", message: "Successfully deleted the movie", data: null});
            }
        });
    }
}