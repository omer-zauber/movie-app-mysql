import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';


export default () => (
	<div>
		<Navbar inverse>
			<Navbar.Header>
				<Navbar.Brand>
					<Link exact={true} to="/">
						MovieApp.
					</Link>
				</Navbar.Brand>
			</Navbar.Header>
			<Nav pullRight style={{ marginRight: '20px' }}>
				<LinkContainer to="/create">
					<NavItem eventKey={1}>Add a Movie</NavItem>
				</LinkContainer>
				<LinkContainer to="/rate">
					<NavItem eventKey={2}>Rate a Movie</NavItem>
				</LinkContainer>
				<LinkContainer exact={true} to="/">
					<NavItem eventKey={3}>Search Movies</NavItem>
				</LinkContainer>
			</Nav>
		</Navbar>
	</div>
);

