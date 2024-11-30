/**
 * Build styles
 */
const {i18n} = require("./i18n/index");

require('./index.css').toString();

const CSS_OBJ = Object.freeze({
  colors: {
    yellow: 'rgb(223, 171, 1)',
    blue: 'rgb(11, 110, 153)',
    orange: 'rgb(217, 115, 13)',
    red: 'rgb(224, 62, 62)',
    green: 'rgb(15, 123, 108)',
    brown: 'rgb(100, 71, 58)',
    purple: 'rgb(105, 64, 165)',
  }
});

/**
 * TextColor Tool for the Editor.js
 *
 * Allows to wrap inline fragment and style it somehow.
 */
class TextColor {
  static get isInline() {
    return true;
  }

  static get shortcut() {
    return 'CMD+J';
  }

  static get sanitize() {
    return {
      span: {
        class: [
            "cdx-color",
          "cdx-color__yellow", "cdx-color__blue", "cdx-color__orange", "cdx-color__red", "cdx-color__green", "cdx-color__brown", "cdx-color__purple"
        ],
        style: {
          color: true,
        },
      },
    };
  }

  get toolboxIcon() {
    return require('./../assets/icon.svg').default;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;

    this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
  }

  constructor({api}) {
    this.api = api;
    this.button = null;
    this._state = false;
    this.actions = null;
    this.currentRange = null;
    this.currentWrapper = null;
    this.tag = 'SPAN';
    this.class = "cdx-color"
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = this.toolboxIcon;
    this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }

  // when button is pressed Editor calls surround method of the tool with Range object as an argument:
  surround(range) {
    this.currentWrapper = this.api.selection.findParentTag(this.tag, this.class);
    this.currentRange = range;
  }

  // 현재 플러그인 태그가 있는지 여부로, button 을 on/off 하기 위함
  // When user selects some text Editor calls checkState method of each Inline Tool with current Selection to update the state if selected text contains some of the inline markup
  checkState() {
    const colorSpan = this.api.selection.findParentTag(this.tag, this.class);
    this.state = !!colorSpan;
  }

  // 한번 그려두고 숨겨가면서 사용하는 픽커 영역
  renderActions() {
    this.actions = this.make("div", ["block", "w-full", "h-full", "flex-col"]);
    const picker = this.buildColorPicker("white", null);
    picker.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      if (this.currentWrapper) {
        this.unwrap(this.currentRange, this.currentWrapper)
      }
    }
    this.actions.append(picker);

    Object.keys(CSS_OBJ.colors).forEach(key => {
      const color = CSS_OBJ.colors[key];
      const picker = this.buildColorPicker(key, color);
      picker.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        if (this.currentRange) {
          this.unwrapAllWrappers(this.currentRange);
        }

        this.wrap(this.currentRange, color);
      }
      this.actions.append(picker);
    });

    return this.actions;
  }

  clear() {
    console.log("clear!");
  }

  buildColorPicker(name, color) {
    const picker = this.make("div", ["flex", "cursor-pointer", "hover:bg-stone-200", "dark:bg-stone-800", "dark:hover:bg-stone-600", "space-x-2"])

    const colorElement = this.make("div", ["w-8", "h-8", "flex", "items-center", "justify-center"]);
    const letterElement =this. make("div", ["text-base"], {innerText: "가"});
    if (color) {
      letterElement.style.color = color;
    }
    colorElement.appendChild(letterElement);
    const nameElement = this.make("div", ["text-base", "flex-1", "flex", "items-center", "justify-start"], {innerText: i18n(name)});
    picker.append(colorElement, nameElement);

    return picker
  }

  wrap(range, color) {
    if (!range || range.collapsed) { // range가 없거나 collapsed 상태라면 wrap 수행 안 함
      console.warn("Invalid range for wrapping");
      return;
    }

    console.log("Wrap range", range.toString())

    const selectedText = range.extractContents();
    const span = document.createElement(this.tag);
    span.classList.add(this.class);
    span.style.color = color;
    span.appendChild(selectedText);
    console.log("Wrap span", span)
    range.insertNode(span);

    this.api.selection.expandToTag(span);
  }

  unwrapAllWrappers(range) {
    const sel = window.getSelection();

    // Range와 겹치는 모든 wrapper를 검색
    const nodes = Array.from(range.extractContents().childNodes); // Range 내 모든 노드 복사
    const fragment = document.createDocumentFragment(); // 최종 Fragment 생성

    nodes.forEach(node => {
      if (
          node.nodeType === Node.ELEMENT_NODE && // Check if the node is an element
          node.tagName === this.tag.toUpperCase() && // Check if it matches the specified tag
          node.classList.contains(this.class) // Check if it has the specified class
      ) {
        // Handle the wrapper element
        const wrapperRange = document.createRange();
        wrapperRange.selectNodeContents(node);
        const wrapperContent = wrapperRange.extractContents();
        fragment.appendChild(wrapperContent); // Append the wrapper's contents to the fragment

        // Remove the empty wrapper node
        node.remove();
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Handle non-wrapper element nodes
        const nonWrapperRange = document.createRange();
        nonWrapperRange.selectNodeContents(node);
        const nonWrapperContent = nonWrapperRange.extractContents();
        fragment.appendChild(nonWrapperContent); // Append the element's contents to the fragment

        // Remove the non-wrapper node
        node.remove();
      } else {
        // Handle text or other nodes
        fragment.appendChild(node); // Append the node itself to the fragment
      }
    });

    // Insert the final fragment at the range's start position
    const container = range.startContainer;
    range.deleteContents(); // Clear the current range contents
    range.insertNode(fragment); // Insert the final fragment into the DOM

    // Cleanup: Remove any empty elements in the container
    if (container.nodeType === Node.ELEMENT_NODE) {
      const emptyElements = Array.from(container.querySelectorAll('*')).filter(el => el.innerHTML.trim() === '');
      emptyElements.forEach(el => el.remove());
    }

    // Selection을 유지
    sel.removeAllRanges();
    sel.addRange(range);
  }


  make(tagName, classNames = null, attributes = {}) {
    const el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (const attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }
}

module.exports = TextColor;
