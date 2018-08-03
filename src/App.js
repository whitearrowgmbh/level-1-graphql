import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import {ApolloProvider, Query} from 'react-apollo';
import gql from 'graphql-tag';


const client = new ApolloClient(
	{
		uri: 'https://api-euwest.graphcms.com/v1/cjkcqrlqq2dmv01gmyk7r9hhn/master'
	}
);

const POSTS_QUERY = gql`
query allPosts {
  posts{
    id
    status
    createdAt
    updatedAt
    body
    title
  }
}
`;


//client.query({
//    query
//}).then(res => console.log(res));

class App extends Component {
	render()
	{
		return (
			<ApolloProvider client={client}>
				<div className="App">}
					<header className="App-header">
						<img src={logo}
							 className="App-logo"
							 alt="logo"/>
						<h1 className="App-title">Welcome to React</h1>
					</header>
					<Query query={POSTS_QUERY}>
						{
							({ loading, data }) => {
								if (loading)
								{
									return 'loading...';
								}

								const { posts } = data;
								return posts.map(post => <h1>{post.title}</h1>);
							}
						}
					</Query>
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
