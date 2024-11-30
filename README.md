![](https://badgen.net/badge/Editor.js/v2.0/blue)

# TextColor Tool

TextColor Tool for color text-fragments for the [Editor.js](https://editorjs.io).

## Installation

### Install via YARN

Get the package

```shell
yarn add https://github.com/mailyso/editorjs-color
```

Include module at your application

```javascript
import TextColor from "editorjs-color";
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```text
var editor = EditorJS({
  ...
  
  tools: {
    ...
    TextColor: {
      class: TextColor, 
      config: {
        tag: "SPAN"
      }
    }
  },
  
  ...
});
```

## Config Params

This Tool has no config params

## Output data

Colored text will be wrapped with a `span` tag with an `cdx-color` class.

```json
{
    "type" : "text",
    "data" : {
        "text" : "Create a directory for your module, enter it and run <span class=\"cdx-color\">npm init</span> command."
    }
}
```

