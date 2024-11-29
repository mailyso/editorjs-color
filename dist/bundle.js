!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Marker=e():t.Marker=e()}(window,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=0)}([function(t,e,n){function r(t){return function(t){if(Array.isArray(t))return o(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}var c=n(1).i18n;n(3).toString();var s=Object.freeze({colors:{yellow:"rgb(223, 171, 1)",blue:"rgb(11, 110, 153)",orange:"rgb(217, 115, 13)",red:"rgb(224, 62, 62)",green:"rgb(15, 123, 108)",brown:"rgb(100, 71, 58)",purple:"rgb(105, 64, 165)"}}),l=function(){function t(e){var n=e.api;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.api=n,this.button=null,this._state=!1,this.actions=null,this.currentRange=null,this.currentWrapper=null,this.tag="SPAN",this.class="cdx-color"}return a(t,[{key:"toolboxIcon",get:function(){return n(8).default}},{key:"state",get:function(){return this._state},set:function(t){this._state=t,this.button.classList.toggle(this.api.styles.inlineToolButtonActive,t)}}],[{key:"isInline",get:function(){return!0}},{key:"shortcut",get:function(){return"CMD+J"}},{key:"sanitize",get:function(){return{span:{class:["cdx-color","cdx-color__yellow","cdx-color__blue","cdx-color__orange","cdx-color__red","cdx-color__green","cdx-color__brown","cdx-color__purple"],style:{color:!0}}}}}]),a(t,[{key:"render",value:function(){return this.button=document.createElement("button"),this.button.type="button",this.button.innerHTML=this.toolboxIcon,this.button.classList.add(this.api.styles.inlineToolButton),this.button}},{key:"surround",value:function(t){this.currentWrapper=this.api.selection.findParentTag(this.tag,this.class),this.currentRange=t}},{key:"checkState",value:function(){var t=this.api.selection.findParentTag(this.tag,this.class);this.state=!!t}},{key:"renderActions",value:function(){var t=this;this.actions=this.make("div",["block","w-full","h-full","flex-col"]);var e=this.buildColorPicker("white",null);return e.onclick=function(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),t.currentWrapper&&t.unwrap(t.currentWrapper)},this.actions.append(e),Object.keys(s.colors).forEach((function(e){var n=s.colors[e],r=t.buildColorPicker(e,n);r.onclick=function(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),t.currentWrapper&&t.unwrap(t.currentWrapper),t.wrap(t.currentRange,n)},t.actions.append(r)})),this.actions}},{key:"clear",value:function(){console.log("clear!")}},{key:"buildColorPicker",value:function(t,e){var n=this.make("div",["flex","cursor-pointer","hover:bg-stone-200","dark:bg-stone-800","dark:hover:bg-stone-600","space-x-2"]),r=this.make("div",["w-8","h-8","flex","items-center","justify-center"]),o=this.make("div",["text-base"],{innerText:"가"});e&&(o.style.color=e),r.appendChild(o);var i=this.make("div",["text-base","flex-1","flex","items-center","justify-start"],{innerText:c(t)});return n.append(r,i),n}},{key:"wrap",value:function(t,e){if(t){var n=t.extractContents(),r=document.createElement(this.tag);r.classList.add(this.class),r.appendChild(n),r.style.color=e,r.innerHTML=r.textContent||"",t.insertNode(r),this.api.selection.expandToTag(r)}}},{key:"unwrap",value:function(t){var e=t.extractContents();t.remove(),this.currentRange.insertNode(e);var n=window.getSelection();n.removeAllRanges(),n.addRange(this.currentRange)}},{key:"make",value:function(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=document.createElement(t);Array.isArray(n)?(e=i.classList).add.apply(e,r(n)):n&&i.classList.add(n);for(var a in o)i[a]=o[a];return i}}]),t}();t.exports=l},function(t,e,n){"use strict";n.r(e),n.d(e,"i18n",(function(){return o}));var r=n(2).korean,o=function(t){return void 0!==r[t]?r[t]:t}},function(t,e,n){"use strict";n.r(e),n.d(e,"korean",(function(){return r}));var r=Object.freeze({blue:"파랑색",red:"빨강색",green:"초록색",brown:"갈색",purple:"보라색",white:"기본색",yellow:"노란색",orange:"주황색"})},function(t,e,n){var r=n(4);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(6)(r,o);r.locals&&(t.exports=r.locals)},function(t,e,n){(t.exports=n(5)(!1)).push([t.i,"/*=========colors=========*/\n.cdx-color { /*default - yellow*/\n\tcolor: #374151;\n}\n\n.cdx-color__grey {\n  color: rgba(55, 53, 47, 0.6);\n}\n\n.cdx-color__yellow {\n  color: rgb(223, 171, 1);\n}\n\n.cdx-color__red {\n  color: rgb(224, 62, 62);\n}\n\n.cdx-color__green {\n\tcolor: rgb(15, 123, 108);\n}\n\n.cdx-color__blue {\n\tcolor: rgb(11, 110, 153);\n}\n\n.cdx-color__brown {\n\tcolor: rgb(100, 71, 58);\n}\n\n.cdx-color__purple {\n\tcolor: rgb(105, 64, 165);\n}\n\n.cdx-color__orange {\n  color: rgb(217, 115, 13);\n}\n\n/*=========colors=========*/\n\n\n\n\n/*========pallette=======*/\n.cdx-color-button {\n\tposition: relative;\n}\n\n.cdx-color-hide {\n\tdisplay: none !important;\n}\n\n.cdx-color-pallette {\n\tdisplay: block;\n\theight: 100%;\n}\n\n.cdx-color-pallette > div {\n\tmin-width: 240px;\n\tmax-width: calc(100vw - 24px);\n\theight: 28px;\n\n\tcursor: pointer;\n\tmargin: 0;\n\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: flex-start;\n\ttransition: background 20ms ease-in 0s;\n}\n\n.cdx-color-pallette > div:hover {\n\tbackground: rgba(55, 53, 47, 0.08);\n}\n\n.cdx-color-pallette > div > .cdx-color-pallette-color {\n\tmargin-left: 14px;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n.cdx-color-pallette > div > .cdx-color-pallette-color > div {\n\twidth: 22px;\n\theight: 22px;\n\n\tdisplay: inline-flex;\n\talign-items: center;\n\tjustify-content: center;\n\ttext-align: center;\n\tfont-size: 16px;\n\tborder-radius: 3px;\n\tfont-weight: 500;\n\tbox-shadow: rgba(15, 15, 15, 0.1) 0 0 0 1px inset;\n\tpadding: 0 !important;\n}\n\n.cdx-color-pallette > div > .cdx-color-pallette-name {\n\tmargin: 0 14px 0 8px;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n\n\tcolor: black !important;\n\tfont-size: 14px;\n\ttext-transform: capitalize;\n}",""])},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var o=(a=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=r.sources.map((function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"}));return[n].concat(i).concat([o]).join("\n")}var a;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n})).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<t.length;o++){var a=t[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){var r,o,i={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),c=function(t){return document.querySelector(t)},s=function(t){var e={};return function(t){if("function"==typeof t)return t();if(void 0===e[t]){var n=c.call(this,t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}}(),l=null,u=0,f=[],p=n(7);function d(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=i[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(m(r.parts[a],e))}else{var c=[];for(a=0;a<r.parts.length;a++)c.push(m(r.parts[a],e));i[r.id]={id:r.id,refs:1,parts:c}}}}function h(t,e){for(var n=[],r={},o=0;o<t.length;o++){var i=t[o],a=e.base?i[0]+e.base:i[0],c={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(c):n.push(r[a]={id:a,parts:[c]})}return n}function b(t,e){var n=s(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=f[f.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),f.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=s(t.insertInto+" "+t.insertAt.before);n.insertBefore(e,o)}}function v(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=f.indexOf(t);e>=0&&f.splice(e,1)}function g(t){var e=document.createElement("style");return void 0===t.attrs.type&&(t.attrs.type="text/css"),y(e,t.attrs),b(t,e),e}function y(t,e){Object.keys(e).forEach((function(n){t.setAttribute(n,e[n])}))}function m(t,e){var n,r,o,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var a=u++;n=l||(l=g(e)),r=k.bind(null,n,a,!1),o=k.bind(null,n,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",y(e,t.attrs),b(t,e),e}(e),r=_.bind(null,n,e),o=function(){v(n),n.href&&URL.revokeObjectURL(n.href)}):(n=g(e),r=j.bind(null,n),o=function(){v(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=h(t,e);return d(n,e),function(t){for(var r=[],o=0;o<n.length;o++){var a=n[o];(c=i[a.id]).refs--,r.push(c)}t&&d(h(t,e),e);for(o=0;o<r.length;o++){var c;if(0===(c=r[o]).refs){for(var s=0;s<c.parts.length;s++)c.parts[s]();delete i[c.id]}}}};var x,w=(x=[],function(t,e){return x[t]=e,x.filter(Boolean).join("\n")});function k(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=w(e,o);else{var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function j(t,e){var n=e.css,r=e.media;if(r&&t.setAttribute("media",r),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function _(t,e,n){var r=n.css,o=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||i)&&(r=p(r)),o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),c=t.href;t.href=URL.createObjectURL(a),c&&URL.revokeObjectURL(c)}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(t,e){var o,i=e.trim().replace(/^"(.*)"$/,(function(t,e){return e})).replace(/^'(.*)'$/,(function(t,e){return e}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")}))}},function(t,e,n){"use strict";n.r(e),e.default='<svg fill="none" width="18" height="18" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n  <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"></path>\n</svg>'}])}));