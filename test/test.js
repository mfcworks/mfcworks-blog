const fs = require('node:fs');
const fm = require('front-matter');
const marked = require('marked');

const content = fs.readFileSync('../posts/test1.md').toString();


const result = fm(content);

console.log(content);
console.log('********************');
console.log(result.attributes);
console.log('********************');
console.log(marked.parse(result.body));
