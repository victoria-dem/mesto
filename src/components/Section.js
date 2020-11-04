export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(items, profileName) {
    items.forEach((item) => this._renderer(item, profileName));
  }

  addItem(element) {
    this._container.append(element);
  }

  addItemFirst(element) {
    this._container.prepend(element);
  }
}
