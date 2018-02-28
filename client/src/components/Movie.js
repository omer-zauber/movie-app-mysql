import React from 'react';

const Movie = ({ name, year, averageRating }) => (
	<div className="jumbotron">
		<h2>
			{name} <span style={{ fontSize: '1.6rem' }}>({year})</span>
		</h2>
		<div>
			Users' rating: <span style={{ fontSize: '1.6rem' }}>{averageRating.toFixed(1)}</span>
		</div>
	</div>
);

export default Movie;
