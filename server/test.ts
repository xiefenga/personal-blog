import { plainToClass } from "class-transformer";
import { validate } from "class-validator"
import Article from "./models/Article"
import gatherValidationError from "./utils/validateError";

const plain = {
  title: 'aaa',
  content: 'bbbb',
  words: 0,
  post: 'ssssss',
  aaaa: 'aaaaaaaa',
  views: 10000
}

const article = plainToClass(
  Article,
  plain,
  // 去除 plain-object 中额外的属性
  { excludeExtraneousValues: true }
);

console.log(article);

// console.log(article.get());

setTimeout(() => {
  Article.create(article.get()).then(res => {
    console.log(res.get())
  })
}, 10000);


validate(article).then(errs => {
  console.log(gatherValidationError(errs));
})


