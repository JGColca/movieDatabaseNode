const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')

let movies = []

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('images'))
app.get('/', function(req, res) {
    
    res.render('index', {movies : movies})
    
})

app.post('/add-movie', function (req, res) {

    let movieInfo = req.body
    console.log(movieInfo)

    movies.push(movieInfo)
    //console.log(movies)
    
    res.redirect('/')

    })

    
app.get('/movies/:genre/:year', function (req, res) {
    let searchmovies = []
    console.log(req.query.genre)
    
    
    searchmovies = movies.filter(function (movie) {

        if (movie.movieGenre == req.query.genre && req.query.year == "") {
            return movie.movieGenre == req.query.genre }
        else if (req.query.genre == "" && movie.movieYear == req.query.year){
            return movie.movieYear == req.query.year
        } else if (movie.movieGenre == req.query.genre && movie.movieYear == req.query.year){
            return (movie.movieGenre == req.query.genre && movie.movieYear == req.query.year)
        }
    })
    //res.send(res.render('search', { movies: searchmovies }))
    res.render('search', { searchmovies: searchmovies })
})




app.post('/delete-movie', function(req, res) {

    
    let movieToDelete = req.body
    
    
    movies = movies.filter(function(movie) {
        
        if (movie.movieTitle != movieToDelete.movieTitle){
        return movie.movieTitle != movieToDelete.movieTitle
        } else if (movie.movieYear != movieToDelete.movieYear){
          return movie.movieYear != movieToDelete.movieYear
        }
        })
    
    res.redirect('/')
})


app.listen(port, function(){

 console.log(`Server Running...`)
})