/**
 * Created by Juergen Pichler on 05.08.2018
 * WhiteArrow GmbH, DE-85405 Nandlstadt
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PostForm extends Component {

	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		post    : PropTypes.object
	};

	static defaultProps = {
		post: {}
	};

	state = {
		title: this.props.post.title || '',
		body : this.props.post.body || '',
		id   : this.props.post.id || ''
	};

	handleInput = e => {

		const formData = {};

		formData[e.target.name] = e.target.value;
		this.setState({ ...formData });
	};

	render()
	{
		const { onSubmit } = this.props;
		const { title, body, id } = this.state;

		return (
			<form onSubmit={(e) => {
				e.preventDefault();
				onSubmit(
					{
						variables: { title, body, id }
					})
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
				<button className="button">Submit</button>
			</form>
		);
	}
}

export default PostForm;
