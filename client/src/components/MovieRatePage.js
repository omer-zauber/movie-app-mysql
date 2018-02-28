import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default class MovieRatePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			rating: '',
			message: '',
		};
	}

	onNameChange = e => {
		const name = e.target.value;
		this.setState(() => ({ name }));
	};

	onRatingChange = e => {
		const rating = e.target.value;
		if (!rating || (rating > 0 && rating < 11 && rating.match(/^\d{1,2}$/))) this.setState(() => ({ rating }));
	};

	onSubmit = e => {
		e.preventDefault();

		if (this.state.name.trim() === '') return this.setState({ message: 'Please enter a name of a movie.' });
		if (this.state.rating === '') return this.setState({ message: 'Please rate this movie 1-10.' });

		axios
			.patch('/api/rateMovie', { name: this.state.name, rating: parseInt(this.state.rating, 10) })
			.then(response => {
				if (response.status === 200) {
					this.setState({ message: 'Movie Rated succesfully!', name: '', rating: '' });
				}
			})
			.catch(error => {
				if (error.response.data === 'unable to find movie')
					this.setState({
						message: 'Could not find a movie with this name! feel free to add it in the Movie Create Page.',
					});
				else this.setState({ message: "We're sorry, an unknown error has occurred." });
			});
	};

	render() {
		return (
			<div>
				<Form onSubmit={this.onSubmit} inline>
					<FormGroup >
						<div>
							<ControlLabel>Rate a movie:</ControlLabel>
						</div>

						<FormControl
							type="text"
							name="name"
							placeholder="Movie name"
							autoFocus
							value={this.state.name}
							onChange={this.onNameChange}
						/>
						<FormControl
							type="number"
							name="rating"
							placeholder="1-10"
							value={this.state.rating}
							onChange={this.onRatingChange}
						/>

						<Button type="submit">Rate Movie</Button>

						{this.state.message && <HelpBlock bsStyle="warning">{this.state.message} </HelpBlock>}
					</FormGroup>
				</Form>
			</div>
		);
	}
}
