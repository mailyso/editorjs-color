
// TODO
//  selective i18n
const {korean: lang} = require("./korean");

export const i18n = (key) => {
  if(lang[key] !== undefined)
    return lang[key];
  return key;
}