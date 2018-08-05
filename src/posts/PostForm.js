/**
 * Created by Juergen Pichler on 05.08.2018
 * WhiteArrow GmbH, DE-85405 Nandlstadt
 */
import React, {Component} from 'react';

class PostForm extends Component {
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
		const { onSubmit } = this.props;
		const { title, body } = this.state;

		return (
			<form onSubmit={(e) => {
				e.preventDefault();
				onSubmit(
					{
						variables: { title, body }
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
				<button>Submit</button>
			</form>
		);
	}
}

export default PostForm;
