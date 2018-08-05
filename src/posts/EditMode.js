/**
 * Created by Juergen Pichler on 05.08.2018
 * WhiteArrow GmbH, DE-85405 Nandlstadt
 */
import React, {Component} from 'react';
import {ApolloConsumer} from 'react-apollo';

class EditMode extends Component {
	render()
	{
		const { isEditMode } = this.props;

		return (
			<ApolloConsumer>
				{client => (
					<button onClick={() => {
						client.writeData({ data: { isEditMode: !isEditMode } });
					}}>Toggle edit mode</button>
				)}
			</ApolloConsumer>
		);
	}
}

export default EditMode;
