/**
 * Build styles
 */
const {i18n} = require("./i18n/index");

require('./index.css').toString();


const CSS_OBJ = Object.freeze({
  colors: {
    yellow: 'cdx-color__yellow',
    blue: 'cdx-color__blue',
    orange: 'cdx-color__orange',
    red: 'cdx-color__red',
    green: 'cdx-color__green',
    brown: 'cdx-color__brown',
    purple: 'cdx-color__purple',
  },
  hide: 'cdx-color-hide',
  container: 'cdx-color-pallette',
  button: 'cdx-color-button',
});

const CSS_ARR = Object.freeze(Object.keys(CSS_OBJ.colors).map(v => CSS_OBJ.colors[v]));


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
        class: "cdx-color"
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

  constructor({api}) {
    this.api = api;
    this.button = null;
    this._state = false;
    this.actions = null;
    this.currentRange = null;
    this.tag = 'SPAN';
    this.class = "cdx-color"
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = this.toolboxIcon;

    return this.button;
  }

  // when button is pressed Editor calls surround method of the tool with Range object as an argument:
  surround(range) {
    console.log("surround!")
    if (!range) {
      return;
    }

    this.currentRange = range;
  }

  // 현재 플러그인 태그가 있는지 여부로, button 을 on/off 하기 위함
  // When user selects some text Editor calls checkState method of each Inline Tool with current Selection to update the state if selected text contains some of the inline markup
  checkState() {
    const colorSpan = this.api.selection.findParentTag(this.tag, this.class);
    console.log("checkState!", colorSpan)
    this.state = !!colorSpan;
  }

  // 한번 그려두고 숨겨가면서 사용하는 픽커 영역
  renderActions() {
    console.log("renderActions!")
    this.actions = document.createElement("div");
    const color = document.createElement('div');

    color.style.width = '30px';
    color.style.height = '30px';
    color.style.cursor = 'pointer';
    color.style.backgroundColor = "#4efeee";
    color.onclick = (e) => {
      this.unwrap(this.api.selection.findParentTag(this.tag, this.class))
          .then(() => {
            this.wrap(this.currentRange, "#4efeee");
          })
    }
    this.actions.append(color);

    return this.actions;
  }

  // toggleActions() {
  //   if(this.actionsOpen) {
  //     this.hideActions();
  //   } else {
  //     this.showActions();
  //   }
  // }
  //
  // showActions(colorSpan) {
  //   console.log("showActions!")
  //   this.actions.style.display = "block";
  //   this.actionsOpen = true;
  // }
  //
  // hideActions() {
  //   console.log("hideAction!")
  //   this.actions.style.display = "none";
  //   this.actionsOpen = false;
  // }

  clear() {
    console.log("clear!");
  }

  wrap(range, color) {
    console.log("wrap!", range);
    if (!range) {
      return;
    }

    const selectedText = range.extractContents();
    const span = document.createElement(this.tag);

    span.classList.add(this.class);
    span.style.color = color;
    span.appendChild(selectedText);
    range.insertNode(span);

    this.api.selection.expandToTag(span);
  }

  unwrap(termWrapper) {
    return new Promise((res, rej) => {
      if(!termWrapper) {
        return res("done");
      }

      /**
       * Expand selection to all term-tag
       */
      console.log(termWrapper)
      this.api.selection.expandToTag(termWrapper);
      let sel = window.getSelection();
      let range = sel.getRangeAt(0);

      let unwrappedContent = range.extractContents();

      /**
       * Remove empty term-tag
       */
      termWrapper.parentNode.removeChild(termWrapper);

      /**
       * Insert extracted content
       */
      range.insertNode(unwrappedContent);

      /**
       * Restore selection
       */
      sel.removeAllRanges();
      sel.addRange(range);
      res("done");
    })
  }

}

module.exports = TextColor;
