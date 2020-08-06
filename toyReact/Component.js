export class Component {
	constructor() {
		this.children = [];
		this.props = Object.create(null);
	}
	setAttribute(name, value) {
		this.props[name] = value;
		this[name] = value;
	}
	mountTo(range) {
		this.range = range;
		this.udpate();
	}
	udpate() {
		this.range.deleteContents();
		let vdom = this.render();
		vdom.mountTo(this.range);
	}
	appendChild(vchild) {
		this.children.push(vchild);
	}
	setState(state) {
		let merge = (oldState, newState) => {
			for (let p in newState) {
				if (typeof newState[p] === 'object') {
					if (typeof oldState[p] !== 'object') {
						oldState[p] = {};
					}
					merge(oldState[p], newState[p]);
				} else {
					oldState[p] = newState[p];
				}
			}
		};
		if (!this.state && state) {
			this.state = {};
		}
		merge(this.state, state);
		console.log(this.state);
	}
}