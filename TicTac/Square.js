import { Component } from '../toyReact/Component';
import { ToyReact } from '../toyReact/ToyReact.js';


export class Square extends Component {
	render() {
		return (
			<button className='square' onClick={this.props.onClick}>
				{this.props.value}
			</button>
		);
	}
}
