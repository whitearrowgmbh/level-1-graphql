/**
 * Created by Juergen Pichler on 03.08.2018
 * WhiteArrow GmbH, DE-85405 Nandlstadt
 */
import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';
import POSTS_QUERY from './posts.graphql';

class Posts extends Component {
	render()
	{
		return (
			<div>
				<Link to={'/post/new'}
					  className="button">New Post</Link>

				<ol className="posts-listing">
					<Query query={POSTS_QUERY}>
						{
							({ loading, data, fetchMore }) => {
								if (loading)
								{
									return 'loading...';
								}

								const { posts } = data;
								return (
									<React.Fragment>
										{
											posts.map(post =>
														  <li key={post.id}>
															  <Link to={`/post/${post.id}`}>
																  {post.title}
															  </Link>
														  </li>)

										}
										<li>
											<button onClick={() => fetchMore({
																				 variables  : {
																					 skip: posts.length
																				 },
																				 updateQuery: (prev, { fetchMoreResult }) => {
																					 if (!fetchMoreResult)
																					 {
																						 return prev;
																					 }

																					 return Object.assign({}, prev, {
																						 posts: [...prev.posts, ...fetchMoreResult.posts]
																					 });
																				 }
																			 })}>
												Load more...
											</button>
										</li>
									</React.Fragment>
								);
							}
						}
					</Query>
				</ol>
			</div>
		);
	}
}

const POSTS_QUERY = gql`
query allPosts($skip: Int) {
  posts(orderBy: createdAt_ASC, first: 10, skip: $skip) {
    id
    status
    createdAt
    updatedAt
    body
    title
  }
}
`;

export default Posts;

