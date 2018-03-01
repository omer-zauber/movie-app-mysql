const keys = require('../config/keys');
const mysql = require('mysql');
const { calculateAverage } = require('../utils/calculateAverage');

const mySqlCon = mysql.createConnection(keys.mysql);

module.exports = app => {
	app.post('/api/addMovie', (req, res) => {
		const { name, genre, year, averageRating } = req.body;

		const addMovieQuery = `INSERT INTO movies (name, genre, year, average_rating) VALUES ("${name}", "${genre}", ${year}, ${averageRating})`;
		mySqlCon.query(addMovieQuery, (err, result) => {
			if (err) return res.status(400).send(err);

			res.status(200).send(result);
		});
	});

	app.post('/api/searchMovies', (req, res) => {
		const { genre, start, end } = req.body;
		const searchMoviesQuery = `SELECT name,year,average_rating FROM movies WHERE genre = "${genre}" AND year>=${start} AND year<=${end}`;

		mySqlCon.query(searchMoviesQuery, (err, movies) => {
			if (err) return res.status(400).send(err);

			res.status(200).send({ movies });
		});
	});

	app.patch('/api/rateMovie', (req, res) => {
		const { name, rating } = req.body;
		if (rating < 0 || rating > 10) res.status(422).send('the rating is an invalid number');
		const getMovieQuery = `SELECT average_rating, number_of_ratings FROM movies WHERE name = "${name}"`;

		mySqlCon.query(getMovieQuery, (err, result) => {
			if (err) return res.status(400).send(err);
			if (!result[0]) return res.status(422).send('unable to find movie');
			const { average_rating: averageRating, number_of_ratings: numberOfRatings } = result[0];
			const updatedRating = calculateAverage(rating, averageRating, numberOfRatings);
			const updateMovieQuesry = `UPDATE movies SET average_rating = ${updatedRating}, number_of_ratings = ${numberOfRatings +
				1}  WHERE name = "${name}"`;
			mySqlCon.query(updateMovieQuesry, (err, result) => {
				if (err) return res.status(400).send(err);

				res.status(200).send(result);
			});
		});

	});
};
