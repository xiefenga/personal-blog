# 接口文档

api 起始地址都是以 `/api` 开头，例如：关于文章的接口 URL 为 `/api/article`，后面都省略 `/api` 

## 实体

接口中涉及到的数据相对应的类型定义都在 `/types/models` 文件中，都是以接口类型定义。

## 文章

### 获取文章（分页）

- URL：`/article`
- method：`POST`

query 列表：

| 字段 | 类型 | 是否必须 |           备注           |
| :--: | :--: | :------: | :----------------------: |
| page | int  |    否    | 分页获取的页码，默认为 1 |
| size | int  |    否    | 每一页的大小，默认为 10  |

响应消息：

|  字段  |    类型     | 是否必须 |                备注                |
| :----: | :---------: | :------: | :--------------------------------: |
| status |   string    |    是    | 响应状态，值为 `success` 或 `fail` |
| error  |   string    |    否    |      错误消息，有错误时才会有      |
|  data  | IArticles[] |    否    |      响应的数据，有错误时没有      |
| count  |     int     |    否    |     总的文章数量，有错误时没有     |

### 获取文章（按标题/id)

- URL：`/article/:id`
- method：`GET`

id 可以是文章 id 也可以是文章标题

响应消息：

|  字段  |   类型    | 是否必须 |                备注                |
| :----: | :-------: | :------: | :--------------------------------: |
| status |  string   |    是    | 响应状态，值为 `success` 或 `fail` |
| error  |  string   |    否    |      错误消息，有错误时才会有      |
|  data  | IArticles |    否    |       响应数据，有错误时没有       |

### 添加文章

- URL：`/article`

- method：`POST`

参数列表：

|    字段    |  类型  | 是否必须 |      备注      |
| :--------: | :----: | :------: | :------------: |
|   title    | string |    是    |    文章标题    |
|  content   | string |    是    |   文章的内容   |
| categories | int[]  |    是    | 文章所属的类目 |
|    tags    | int[]  |    是    | 文章所属的标签 |
|    post    | string |    否    |   文章的封面   |

响应消息：

|  字段  |   类型    | 是否必须 |                备注                |
| :----: | :-------: | :------: | :--------------------------------: |
| status |  string   |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string[]  |    否    |      错误消息，有错误时才会有      |
|  data  | IArticles |    否    |       响应数据，有错误时没有       |

### 修改文章

- URL：`/article/:id`
- method：`PUT`

参数列表：

|    字段    |  类型  | 是否必须 |      备注      |
| :--------: | :----: | :------: | :------------: |
|   title    | string |    否    |    文章标题    |
|  content   | string |    否    |   文章的内容   |
| categories | int[]  |    否    | 文章所属的类目 |
|    tags    | int[]  |    否    | 文章所属的标签 |
|    post    | string |    否    |   文章的封面   |

响应消息：

|  字段  |   类型    | 是否必须 |                备注                |
| :----: | :-------: | :------: | :--------------------------------: |
| status |  string   |    是    | 响应状态，值为 `success` 或 `fail` |
| error  |  string   |    否    |      错误消息，有错误时才会有      |
|  data  | IArticles |    否    |       修改之后文章的详细信息       |

### 删除文章

- URL：`/article/:id`
- method：`DELETE`

响应消息：

|  字段  |  类型  | 是否必须 |         备注         |
| :----: | :----: | :------: | :------------------: |
| status | string |    是    | 响应状态， `success` |
|  data  |  null  |    是    |     响应数据，无     |

## 类目

### 获取所有类目

- URL：`/category`
- method：`GET`

响应消息：

|  字段  |     类型      | 是否必须 |         备注         |
| :----: | :-----------: | :------: | :------------------: |
| status |    string     |    是    | 响应状态， `success` |
|  data  | ICategories[] |    是    |    所有的类目信息    |
| count  |    number     |    是    |     总类目的数量     |

### 添加类目

- URL：`/category`
- method：`POST`

参数列表：

|   字段   |     类型     | 是否必须 |           备注            |
| :------: | :----------: | :------: | :-----------------------: |
|   name   |    string    |    是    |        类目的名称         |
|  cover   |    string    |    否    |      类目对应的封面       |
| parentId | number\|null |    否    | 如果是子类目，父类目的 id |

响应消息：

|  字段  |   类型    | 是否必须 |                备注                |
| :----: | :-------: | :------: | :--------------------------------: |
| status |  string   |    是    | 响应状态，值为 `success` 或 `fail` |
| error  |  string   |    否    |      错误消息，有错误时才会有      |
|  data  | ICategory |    否    |          新添加的类目信息          |

### 修改类目

- URL：`/category/:id`
- method：`PUT`

参数列表：

|   字段   |     类型     | 是否必须 |           备注            |
| :------: | :----------: | :------: | :-----------------------: |
|   name   |    string    |    否    |        类目的名称         |
|  cover   |    string    |    否    |      类目对应的封面       |
| parentId | number\|null |    否    | 如果是子类目，父类目的 id |

响应消息：

|  字段  |   类型    | 是否必须 |                备注                |
| :----: | :-------: | :------: | :--------------------------------: |
| status |  string   |    是    | 响应状态，值为 `success` 或 `fail` |
| error  |  string   |    否    |      错误消息，有错误时才会有      |
|  data  | ICategory |    否    |         修改之后的类目信息         |

### 删除类目

- URL：`/category/:id`
- method：`DELETE`

响应消息：

|  字段  |  类型  | 是否必须 |                备注                |
| :----: | :----: | :------: | :--------------------------------: |
| status | string |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string |    否    |      错误消息，有错误时才会有      |
|  data  |  null  |    否    |                                    |

### 获取文章

- URL：`/category/:id`
- method：`GET`

响应消息：

|  字段  |    类型     | 是否必须 |                备注                |
| :----: | :---------: | :------: | :--------------------------------: |
| status |   string    |    是    | 响应状态，值为 `success` 或 `fail` |
| error  |   string    |    否    |      错误消息，有错误时才会有      |
|  data  | IArticles[] |    否    |                                    |
| count  |   number    |    否    |                                    |

## 标签

### 获取所有标签

- URL：`/tag`
- method：`GET`

响应消息：

|  字段  |  类型  |      备注      |
| :----: | :----: | :------------: |
| status | string |   `success`    |
|  data  | ITag[] | 所有的标签数据 |
| count  | number |    标签数量    |

### 添加标签

- URL：`/tag`
- method：`POST`

参数列表：

| 字段  |  类型  | 是否必须 |      备注      |
| :---: | :----: | :------: | :------------: |
| name  | string |    是    |     标签名     |
| cover | string |    否    | 标签对应的封面 |

响应消息：

|  字段  |  类型  | 是否必须 |                备注                |
| :----: | :----: | :------: | :--------------------------------: |
| status | string |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string |    否    |      错误消息，有错误时才会有      |
|  data  |  ITag  |    否    |           添加的标签数据           |

### 修改标签

- URL：`/tag/:id`
- method：`POST`

参数列表：

| 字段  |  类型  | 是否必须 |      备注      |
| :---: | :----: | :------: | :------------: |
| name  | string |    否    |     标签名     |
| cover | string |    否    | 标签对应的封面 |

响应消息：

|  字段  |  类型  | 是否必须 |                备注                |
| :----: | :----: | :------: | :--------------------------------: |
| status | string |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string |    否    |      错误消息，有错误时才会有      |
|  data  |  ITag  |    否    |         修改之后的标签数据         |

### 删除标签

- URL：`/tag/:id`
- method：`POST`

响应消息：

|  字段  |  类型  | 是否必须 |                备注                |
| :----: | :----: | :------: | :--------------------------------: |
| status | string |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string |    否    |      错误消息，有错误时才会有      |
|  data  |  null  |    否    |                                    |

### 获取文章

- URL：`/tag/:id`
- method：`GET`

响应消息：

|  字段  |    类型     | 是否必须 |                备注                |
| :----: | :---------: | :------: | :--------------------------------: |
| status |   string    |    是    | 响应状态，值为 `success` 或 `fail` |
| error  |   string    |    否    |      错误消息，有错误时才会有      |
|  data  | IArticles[] |    否    |                                    |
| count  |   number    |    否    |                                    |

## 站点信息

### 获取站点信息

- URL：`/site`
- method：`GET`

响应消息：

|  字段  |   类型    | 是否必须 |     备注     |
| :----: | :-------: | :------: | :----------: |
| status |  string   |    是    |  `success`   |
|  data  | ISiteInfo |    是    | 站点配置信息 |

### 修改站点信息

- URL：`/site`
- method：`POST`

参数列表：

|     字段     |  类型  | 是否必须 |    备注    |
| :----------: | :----: | :------: | :--------: |
|    author    | string |    否    |  站点作者  |
|    github    | string |    否    | github地址 |
|     mail     | string |    否    |  邮箱地址  |
|    avatar    | string |    否    |    头像    |
|   siteName   | string |    否    |  站点名称  |
|   aboutMe    | string |    否    |   关于我   |
|    beian     | string |    否    |   备案号   |
| defaultCover | string |    否    |  默认封面  |

响应消息：

|  字段  |  类型  | 是否必须 |                备注                |
| :----: | :----: | :------: | :--------------------------------: |
| status | string |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string |    否    |      错误消息，有错误时才会有      |
|  data  |  null  |    否    |                                    |

## OSS配置

### 获取OSS配置

- URL：`/oss`
- method：`GET`

响应消息：

|  字段  |  类型  | 是否必须 |     备注     |
| :----: | :----: | :------: | :----------: |
| status | string |    是    |  `success`   |
|  data  |  IOSS  |    是    | 站点配置信息 |

## 每日一句

- URL：`/daily/quote`
- method：`GET`

响应消息：

|  字段  |  类型  | 是否必须 |     备注     |
| :----: | :----: | :------: | :----------: |
| status | string |    是    |  `success`   |
|  data  | IQuote |    是    | 站点配置信息 |
