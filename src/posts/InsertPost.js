/**
 * Created by Juergen Pichler on 05.08.2018
 * WhiteArrow GmbH, DE-85405 Nandlstadt
 */
import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

class InsertPost extends Component {

	state = {
		title: '',
		body : ''
	};

	handleInput = e => {

		const formData = {};

		formData[e.target.name] = e.target.value;
		this.setState({ ...formData });
	};

	render()
	{
		const { title, body } = this.state;

		return (
			<div>
				<h1>New Post</h1>
				<Mutation
					variables={{
						title,
						body
					}}
					mutation={NEW_POST}
				>
					{createPost => (
						<form onSubmit={(e) => {
							e.preventDefault();
							createPost()
								.then(() => {
									this.setState({ title: '', body: '' });
								})
								.catch((err) => console.log('InsertPost - exception(): ', err));
						}}>
							<input type='text'
								   value={title}
								   name="title"
								   onChange={this.handleInput}
								   placeholder='title'/>
							<br/>
							<textarea type='text'
									  value={body}
									  name="body"
									  onChange={this.handleInput}
									  placeholder='body'/>
							<br/>
							<button>Submit</button>
						</form>
					)}
				</Mutation>
			</div>
		);
	}
}

export default InsertPost;

const NEW_POST = gql`
mutation createPost($title: String!, $body: String!) {
  createPost(data: {status: PUBLISHED, title: $title, body: $body}) {
    id
    title
    body
  }
}

`
;
