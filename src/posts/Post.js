import gql from 'graphql-tag';
import React, {Component} from 'react';
import {Query} from 'react-apollo';
import UpdatePost from './UpdatePost';

class Post extends Component {
	render()
	{
		console.log('Post - render(): this.props = ', this.props);
		const { match } = this.props;
		return (
			<Query query={POST_QUERY}
				   variables={{ id: match.params.id }}>
				{
					({ data, loading }) => {
						if (loading)
						{
							return <h1>Loading...</h1>;
						}

						const { post, isEditMode } = data;
						return (
							<div>
								{isEditMode ? (
										<section>
											<h1>
												Edit Post
												<UpdatePost post={post}/>
											</h1>
										</section>
									) :
									(
										<section>
											<h1>
												{post.id}: {post.title}
											</h1>
											<br/>
											{post.body}
										</section>
									)}

							</div>
						);
					}
				}
			</Query>
		);
	}
}

export default Post;


const POST_QUERY = gql`
query post($id: ID!) {
  post(where: {id: $id}) {
    id
    title
    createdAt
  }
  isEditMode @client
}
`;
