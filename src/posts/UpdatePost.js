/**
 * Created by Juergen Pichler on 05.08.2018
 * WhiteArrow GmbH, DE-85405 Nandlstadt
 */
import React, {Component} from 'react';
import PostForm from './PostForm';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

class UpdatePost extends Component {

	render()
	{

		const { post } = this.props;

		return (
			<div>
				<Mutation
					mutation={UPDATE_POST}
				>
					{(updatePost, result) => {
						console.log('UpdatePost - result(): ', result);

						const onSuccess = () => {
							console.log('UpdatePost - onSuccess(): running...');
							result.client.writeData({ data: { isEditMode: false } });
						};

						return <PostForm onSubmit={updatePost}
										 onSuccess={onSuccess}
										 post={post}/>;
					}
					}
				</Mutation>
			</div>
		);
	}
}

const UPDATE_POST = gql`
mutation updatePost($id: ID!, $title: String, $body: String) {
  updatePost(where: {id: $id}, data: {status: PUBLISHED, title: $title, body: $body}) {
    id
    title
    body
  }
}
`
;

export default UpdatePost;
