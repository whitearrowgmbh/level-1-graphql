import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {persistCache} from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';


const defaultState = {
	isEditMode: false
};


const cache = new InMemoryCache();

persistCache({
				 cache,
				 storage: window.localStorage
			 })
	.then(() => {
		const client = new ApolloClient(
			{
				cache,
				uri        : 'https://api-euwest.graphcms.com/v1/cjkcqrlqq2dmv01gmyk7r9hhn/master',
				clientState: {
					defaults : defaultState,
					resolvers: {}
				}
			}
		);

		ReactDOM.render(
			<ApolloProvider client={client}>
				<App/>
			</ApolloProvider>, document.getElementById('root'));
		registerServiceWorker();
	});
