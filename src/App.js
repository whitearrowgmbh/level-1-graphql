import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import InsertPost from './posts/InsertPost';
import Post from './posts/Post';
import Posts from './posts/Posts';



//client.query({
//    query
//}).then(res => console.log(res));

class App extends Component {
	render()
	{
		return (
				<Router>
					<div className="App">
						<header className="App-header">
							<img src={logo}
								 className="App-logo"
								 alt="logo"/>
							<br/>
							<Link to={'/'}
								  className="App-title">Welcome to React</Link>
						</header>


						<main>
							<Switch>
								<Route exact
									   path='/'
									   component={Posts}/>
								<Route exact
									   path='/post/new'
									   component={InsertPost}/>
								<Route path="/post/:id"
									   component={Post}/>
							</Switch>
						</main>
					</div>
				</Router>
		);
	}
}

export default App;
