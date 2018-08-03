import gql from 'graphql-tag';
import React, {Component} from 'react';
import {Query} from 'react-apollo';


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

						const { post } = data;
						return (<h1>
								{post.title}
							</h1>
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
}
`;
