/**
 * Created by Juergen Pichler on 05.08.2018
 * WhiteArrow GmbH, DE-85405 Nandlstadt
 */
import React, {Component} from 'react';
import PostForm from './PostForm';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

class InsertPost extends Component {

	render()
	{

		return (
			<div>
				<h1>New Post</h1>
				<Mutation
					mutation={NEW_POST}
				>
					{createPost => (
						<PostForm onSubmit={createPost}/>
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
