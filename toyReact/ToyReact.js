import ElementWrapper from './ElementWrapper';
import TextWrapper from './TextWrapper';
import { Component } from './Component';

export let ToyReact = {
	createElement(type, attributes, ...children) {
		let element;
		if (typeof type === 'string') {
			element = new ElementWrapper(type);
		} else {
			element = new type();
		}
		for (let name in attributes) {
			element.setAttribute(name, attributes[name]);
		}
		let insertNode = (children) => {
			for (let child of children) {
				if (typeof child === 'object' && child instanceof Array) {
					insertNode(child);
				} else {
					if (
						!(child instanceof Component) &&
						!(child instanceof ElementWrapper) &&
						!(child instanceof TextWrapper)
					) {
						child = String(child);
					}
					if (typeof child === 'string') {
						child = new TextWrapper(child);
					}
					element.appendChild(child);
				}
			}
		};
		insertNode(children);
		return element;
	},

	render(vdom, element) {
		let range = document.createRange();
		if (element.children.length) {
			range.setStartAfter(element.lastChild);
			range.setEndAfter(element.lastChild);
		} else {
			range.setStart(element, 0);
			range.setEnd(element, 0);
		}
		vdom.mountTo(range);
	},
};
