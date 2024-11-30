/**
 * Build styles
 */
const {i18n} = require("./i18n/index");
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
          "cdx-color__yellow", "cdx-color__blue", "cdx-color__orange", "cdx-color__red", "cdx-color__green", "cdx-color__brown", "cdx-color__purple" // support legacy
        ],
        style: {
          color: true
        }
      }
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

  constructor({api, config}) {
    this.api = api;
    this.config = config;

    this.button = null;
    this._state = false;
    this.actions = null;
    this.currentRange = null;
    this.currentWrapper = null;
    this.tag = this.config.tag || 'SPAN';
    this.class = "cdx-color"
  }

  render() {
    this.button = this.make(
        "button",
        [this.api.styles.inlineToolButton],
        {
          type: "button",
          innerHTML: this.toolboxIcon
        }
    )

    return this.button;
  }

  // when button is pressed Editor calls surround method of the tool with Range object as an argument:
  surround(range) {
    this.currentWrapper = this.api.selection.findParentTag(this.tag, this.class);
    this.currentRange = range;
  }

  // When user selects some text Editor calls checkState method of each Inline Tool with current Selection to update the state if selected text contains some of the inline markup
  checkState() {
    const colorSpan = this.api.selection.findParentTag(this.tag, this.class);
    this.state = !!colorSpan;
  }

  renderActions() {
    this.actions = this.make(
        "div",
        "block w-full h-full flex-col"
    );
    const picker = this.buildColorPicker("white", null);
    picker.onclick = (_e) => {
      if (this.currentWrapper) {
        this.unwrap(this.currentWrapper)
      }
    }

    this.actions.append(picker);

    Object.keys(CSS_OBJ.colors).forEach(key => {
      const color = CSS_OBJ.colors[key];
      const picker = this.buildColorPicker(key, color);

      picker.onclick = (_e) => {
        if (this.currentWrapper) {
          this.unwrap(this.currentWrapper);
        }

        this.wrap(this.currentRange, color);
      }

      this.actions.append(picker);
    });

    return this.actions;
  }

  buildColorPicker(name, color) {
    const picker = this.make(
        "div",
        "flex cursor-pointer hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-600 space-x-2"
    );

    const colorElement = this.make(
        "div",
        "w-8 h-8 flex items-center justify-center"
    );

    const letterElement = this.make(
        "div",
        "text-base px-1 border border-stone-200 dark:border-stone-600 rounded",
        { innerText: i18n("preview_text") }
    );

    if (color) {
      letterElement.style.color = color;
    }

    colorElement.appendChild(letterElement);

    const nameElement = this.make(
        "div",
        "text-base flex-1 flex items-center justify-start",
        { innerText: i18n(name) }
    );

    picker.append(colorElement, nameElement);

    return picker;
  }


  wrap(range, color) {
    if (!range || range.collapsed) {
      console.warn("Invalid range for wrapping", range);
      return;
    }

    const selectedText = range.extractContents();
    const span = this.make(this.tag, [this.class])
    span.style.color = color;

    span.appendChild(selectedText);
    range.insertNode(span);

    this.api.selection.expandToTag(span);
  }

  unwrap(termWrapper) {
    this.api.selection.expandToTag(termWrapper)

    const sel = window.getSelection()
    this.currentRange = sel.getRangeAt(0)

    const unwrappedContent = this.currentRange.extractContents()

    termWrapper.parentNode.removeChild(termWrapper)
    this.currentRange.insertNode(unwrappedContent)

    sel.removeAllRanges()
    sel.addRange(this.currentRange)
  }

  // clear() {
  //
  // }

  make(tagName, classNames = null, attributes = {}) {
    const el = document.createElement(tagName);

    if (typeof classNames === "string") {
      el.classList.add(...classNames.split(/\s+/).filter(Boolean));
    } else if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    }

    for (const attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }
}

module.exports = TextColor;
