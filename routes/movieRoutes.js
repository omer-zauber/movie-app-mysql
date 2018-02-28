const mongoose = require('mongoose');
const keys = require('../config/keys');

const Movie = mongoose.model('movies');
const { calculateAverage } = require('../utils/calculateAverage');

module.exports = app => {
	app.post('/api/addMovie', async (req, res) => {
		const { name, genre, year, averageRating, numberOfRatings } = req.body;
		const movie = new Movie({
			name,
			genre,
			year,
			averageRating,
			numberOfRatings,
		});

		try {
			await movie.save();
			res.status(200).send(movie);
		} catch (err) {
			res.status(422).send(err);
		}
	});

	app.post('/api/searchMovies', async (req, res) => {
		const { genre, start, end } = req.body;

		try {
			const movies = await Movie.find({
				genre,
				year: {
					$gte: start,
					$lte: end,
				},
			});
			res.status(200).send({ movies });
		} catch (e) {
			res.status(400).send(e);
		}
	});

	app.patch('/api/rateMovie', async (req, res) => {
		const { name, rating } = req.body;
		if (rating < 0 || rating > 10) res.status(422).send('the rating is an invalid number');
		try {
			const movie = await Movie.findOne({ name });
			const { averageRating, numberOfRatings } = movie;
			const updatedAverageRating = calculateAverage(rating, averageRating, numberOfRatings);
			const result = await Movie.findOneAndUpdate(
				{ name },
				{
					$set: {
						averageRating: updatedAverageRating,
					},
					$inc: {
						numberOfRatings: 1,
					},
				},
				{ new: true }
			).exec();
			res.status(200).send(result);
		} catch (err) {
			res.status(400).send(err);
		}
	});
};
