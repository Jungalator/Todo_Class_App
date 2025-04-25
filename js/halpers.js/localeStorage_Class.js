export class LocaleStorage {
  #keyName;
  constructor(keyName) {
    this.#keyName = keyName;
  }
  GetItem() {
    const items = localStorage.getItem(this.#keyName);
    return items ? JSON.parse(items) : [];
  }

  SetItem(itemsList) {
    localStorage.setItem(this.#keyName, JSON.stringify(itemsList));
  }
}
