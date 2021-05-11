import { addArticle } from "./services/article";
const plain = {
  title: 'lalala',
  content: 'JavaScript 是基于对象的，函数也是一个对象。JavaScript 中的每一个函数/类都有一个 prototype 属性，它定义了构造函数制造出的对象的公共祖先。在它上面定义的属性和方法可以被对象实例共享。',
  // words: 0,
  post: 'http://baidu.com/a',
  aaaa: 'aaaaaaaa',
  views: 10000,
  categories: [[1]],
  tags: [1]
}
// 

setTimeout(() => {
  addArticle(plain).then(res => console.log(res)).catch(err => console.log(err.message))
}, 5000);




