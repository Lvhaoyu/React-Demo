let childrenSymbol = Symbol('children');
export default class ElementWrapper {
	constructor(type) {
		this.type = type;
		this.props = Object.create(null);
		this.children = [];
		this[childrenSymbol] = [];
	}
	setAttribute(name, value) {
		this.props[name] = value;
	}
	appendChild(vchild) {
		this[childrenSymbol].push(vchild);
		this.children.push(vchild.vdom);
	}
	get vdom() {
		return this;
	}
	mountTo(range) {
		this.range = range;
		let placeHolder = document.createElement('placeholder');
		let endRange = document.createRange();
		endRange.setStart(range.endContainer, range.endOffset);
		endRange.setEnd(range.endContainer, range.endOffset);
		endRange.insertNode(placeHolder);
		range.deleteContents();
		let element = document.createElement(this.type);
		for (let name in this.props) {
			let value = this.props[name];
			if (name.match(/^on([\s\S]+)$/)) {
				let eventName = RegExp.$1.replace(/^[\s\S]/, (s) => s.toLowerCase());
				element.addEventListener(eventName, value);
			}
			if (name === 'className') {
				name = 'class';
			}
			element.setAttribute(name, value);
		}
		for (let child of this.children) {
			let range = document.createRange();
			if (element.children.length) {
				range.setStartAfter(element.lastChild);
				range.setEndAfter(element.lastChild);
			} else {
				range.setStart(element, 0);
				range.setEnd(element, 0);
			}
			child.mountTo(range);
		}
		range.insertNode(element);
	}
}
