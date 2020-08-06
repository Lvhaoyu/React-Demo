export default class TextWrapper {
	constructor(content) {
		this.root = document.createTextNode(content);
	}
	mountTo(range) {
		range.deleteContents();
		range.insertNode(this.root);
	}
}
