export class DOM {
  query(selector) {
    return document.querySelector(selector);
  }
  create(type, textContent, ...classNames) {
    const item = document.createElement(type);
    item.textContent = textContent;
    //   item.classList.add(...classNames);
    //или можно еще написать так
    classNames.length && (item.className = classNames.join(" "));
    return item;
  }
}
