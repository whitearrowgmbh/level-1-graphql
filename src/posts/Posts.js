/**
 * Created by Juergen Pichler on 03.08.2018
 * WhiteArrow GmbH, DE-85405 Nandlstadt
 */
import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';

class Posts extends Component {
	render()
	{
		return (
			<div>
				<Link to={'/post/new'}
					  className="button">New Post</Link>

				<ul className="posts-listing">
					<Query query={POSTS_QUERY}>
						{
							({ loading, data }) => {
								if (loading)
								{
									return 'loading...';
								}

								const { posts } = data;
								return posts.map(post =>
													 <li key={post.id}>
														 <Link to={`/post/${post.id}`}>
															 {post.title}
														 </Link>
													 </li>);
							}
						}
					</Query>
				</ul>
			</div>
		);
	}
}

const POSTS_QUERY = gql`
query allPosts {
  posts {
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

