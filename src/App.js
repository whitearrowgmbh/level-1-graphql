import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Post from './posts/Post';
import Posts from './posts/Posts';


const client = new ApolloClient(
	{
		uri: 'https://api-euwest.graphcms.com/v1/cjkcqrlqq2dmv01gmyk7r9hhn/master'
	}
);


//client.query({
//    query
//}).then(res => console.log(res));

class App extends Component {
	render()
	{
		return (
			<ApolloProvider client={client}>
				<Router>
					<div className="App">}
						<header className="App-header">
							<img src={logo}
								 className="App-logo"
								 alt="logo"/>
							<h1 className="App-title">Welcome to React</h1>
						</header>

						<Switch>
							<Route path="/post/:id"
								   component={Post}/>
						</Switch>
						<Posts/>
					</div>
				</Router>
			</ApolloProvider>
		);
	}
}

export default App;
