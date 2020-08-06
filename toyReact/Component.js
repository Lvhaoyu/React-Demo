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
		this.update();
	}
	update() {
		let placeHolder = document.createComment('placeHolder');
		let range = document.createRange();
		range.setStart(this.range.endContainer, this.range.endOffset);
		range.setEnd(this.range.endContainer, this.range.endOffset);
		range.insertNode(placeHolder);
		this.range.deleteContents();
		let vdom = this.render();
		vdom.mountTo(this.range);
		// placeHolder.parentNode.removeChild(placeHolder);
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
		this.update();
		console.log(this.state);
	}
}
