import gql from 'graphql-tag';
import React, {Component} from 'react';
import {Query, Mutation} from 'react-apollo';
import EditMode from './EditMode';
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
								<EditMode isEditMode={isEditMode}/>
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
												<Mutation mutation={UPDATE_POST}
														  variables={{
															  id   : post.id,
															  check: !post.check
														  }}
														  optimisticResponse={{
															  __typename: 'Mutation',
															  updatePost: {
																  __typename: 'Post',
																  check     : !post.check
															  }
														  }}
														  update={(cache, { data: { updatePost } }) => {
															  const data = cache.readQuery({
																							   query    : POST_QUERY,
																							   variables: { id: post.id }
																						   });

															  data.post.check = updatePost.check;
															  cache.writeQuery({
																				   query: POST_QUERY,
																				   data : {
																					   ...data, post: data.post
																				   }
																			   });
														  }}
												>
													{updatePost => (
														<input type="checkbox"
															   style={{ height: '100px' }}
															   onChange={updatePost}
															   checked={post.check}/>
													)}
												</Mutation>
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
    check
  }
  isEditMode @client
}
`;

const UPDATE_POST = gql`
mutation updatePost($id: ID!, $check: Boolean) {
	updatePost(where: {id: $id}, data: {check: $check}) {
		check
	}
}
`
;