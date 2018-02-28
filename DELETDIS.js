var mysql = require('mysql');

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'omerZauber',
	database: 'mydb',
});

con.connect(function(err) {
	if (err) throw err;

	//-----INITIAL DB
	// var sql = 'INSERT INTO movies (name, genre, year, average_rating, number_of_ratings) VALUES ?';
	// var values = [
	// 	['Die Hard', 'Action', 1988, 9.5, 2],
	// 	['Star Wars', 'Sci-Fi', 1977, 9.5, 22],
	// 	['The Shawshank Redemption', 'Drama', 1994, 10, 25],
	// 	['Pulp Fiction', 'Action', 1994, 7, 2],
	// 	['Forrest Gump', 'Drama', 1994, 8, 2],
	// 	['The Dark Knight', 'Action', 2008, 8, 22],
	// 	['Goodfellas', 'Drama', 1990, 10, 25],
	// 	['Raiders of The Lost Ark', 'Action', 1981, 9, 83],
	// 	['Back to The Future', 'Sci-Fi', 1985, 9.5, 24],
	// 	['Lord of The Rings', 'Fantasy', 2001, 6, 22],
	// ];
	// con.query(sql, [values], function(err, result) {
	// 	if (err) throw err;
	// 	console.log('Number of records inserted: ' + result.affectedRows);
	// });

	//-----SEARCH MOVIES QUERY
	con.query(
		'SELECT name,year,average_rating FROM movies WHERE genre = "Sci-Fi" AND year>=1990 AND year<=2007',
		function(err, result, fields) {
			if (err) throw err;
			console.log(result);
		}
	);

	//-----ADD A MOVIE QUERY
	var sql = "INSERT INTO movies (name, genre, year, average_rating) VALUES ('The Matrix', 'Sci-Fi', 1999, 8)";
	con.query(sql, function(err, result) {
		if (err) throw err;
		console.log('1 record inserted');
	});

	const calculateAverage = (newRating, averageRating, numberOfRatings) =>
		(newRating + averageRating * numberOfRatings) / (numberOfRatings + 1);

	//-----RATE A MOVIE QUERY

	con.query('SELECT average_rating, number_of_ratings FROM movies WHERE name = "The Matrix"', function(err, result) {
		if (err) throw err;
		const { average_rating: averageRating, number_of_ratings: numberOfRatings } = result[0];
		const updatedRating = calculateAverage((newRating = 8), averageRating, numberOfRatings);
		//console.log(updatedRating);
		con.query(
			`UPDATE movies SET average_rating = ${updatedRating}, number_of_ratings = ${numberOfRatings +
				1}  WHERE name = "The Matrix"`,
			(err, result) => {
				if (err) console.log(err);
			}
		);
	});
});
