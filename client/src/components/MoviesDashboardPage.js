import React from 'react';
import axios from 'axios';
import { Button, Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import Movie from './Movie';

export default class MovieDashboardPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			genre: '',
			start: '',
			end: '',
			message: '',
			movies: [],
		};
	}

	onGenreChange = e => {
		const genre = e.target.value;
		this.setState(() => ({ genre }));
	};

	onStartChange = e => {
		const currentYear = new Date().getFullYear();
		const start = e.target.value;
		if (!start || (start > 0 && start <= currentYear && start.match(/^\d{1,4}$/))) this.setState(() => ({ start }));
	};

	onEndChange = e => {
		const currentYear = new Date().getFullYear();
		const end = e.target.value;
		if (!end || (end > 0 && end <= currentYear && end.match(/^\d{1,4}$/))) this.setState(() => ({ end }));
	};

	onSubmit = async e => {
		e.preventDefault();

		const { genre, start, end } = this.state;

		if (genre === '') return this.setState({ message: 'Please enter a genre for the movie.' });
		if (start < 1898 || start > end)
			return this.setState({ message: 'Please enter a valid starting year for the movie search.' });
		if (end < 1898) return this.setState({ message: 'Please enter a valid ending year for the movie search.' });
		try {
			const response = await axios.post('/api/searchMovies', { genre, start, end });
			this.setState({ movies: response.data.movies });
		} catch (error) {
			this.setState({ message: "We're sorry, an unknown error has occurred." });
		}
	};

	render() {
		return <div>
				<Form onSubmit={this.onSubmit} inline>
					<FormGroup>
						<div>
							<ControlLabel>Search for movies:</ControlLabel>
						</div>
						<FormControl componentClass="select" value={this.state.genre} onChange={this.onGenreChange}>
							<option value="" disabled>
								Genre
							</option>
							<option value="Action">Action</option>
							<option value="Animated">Animated</option>
							<option value="Comedy">Comedy</option>
							<option value="Drama">Drama</option>
							<option value="Fantasy">Fantasy</option>
							<option value="Horror">Horror</option>
							<option value="Sci-Fi">Sci-Fi</option>
							<option value="Thriller">Thriller</option>
						</FormControl>

						<FormControl type="number" name="start" value={this.state.value} placeholder="From" onChange={this.onStartChange} />
						<FormControl type="number" name="end" value={this.state.value} placeholder="To" onChange={this.onEndChange} />
						<FormControl.Feedback />

						<Button type="submit">Search Movie</Button>

						{this.state.message && <HelpBlock bsStyle="warning">{this.state.message} </HelpBlock>}
					</FormGroup>
				</Form>
				<Grid>
					<Row style={{ marginTop: '20px' }}>
						{this.state.movies.length === 0 && <Col sm={7} className="jumbotron ">
								Please pick a genre and years range to search for movies!
							</Col>}
						{this.state.movies.map(movie => <Col sm={6} key={movie._id}>
								<Movie name={movie.name} year={movie.year} averageRating={movie.averageRating} />
							</Col>)}
					</Row>
				</Grid>
			</div>;
	}
}
