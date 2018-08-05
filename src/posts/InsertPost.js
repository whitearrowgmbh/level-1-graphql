/**
 * Created by Juergen Pichler on 05.08.2018
 * WhiteArrow GmbH, DE-85405 Nandlstadt
 */
import React, {Component} from 'react';

class InsertPost extends Component {
	render()
	{
		return (
			<form>
				<input type="text"
					   placeholder="title"/>
				<br/>
				<textarea type="text"
						  placeholder="body"/>
				<br/>
				<button>Submit</button>
			</form>
		);
	}
}

export default InsertPost;
