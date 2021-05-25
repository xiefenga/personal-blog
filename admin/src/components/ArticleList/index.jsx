import { getArticles } from '@/api/article'
import { List, Button, Tag, Image } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useEffect, useCallback, useState } from 'react'
import { ARTICLE_LIST_PAGE_SIZE as size } from '@/utils/constants'
import './index.css'

function ArticleList() {

  const [loading, setLoading] = useState(true);

  const [articleList, setArticleList] = useState([]);

  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    getArticles(page, size).then(res => {
      setArticleList(res.data);
      setTotal(res.count);
      setLoading(false);
    });
  }, [page]);

  const renderItem = useCallback(
    item => (
      <List.Item
        key={item.id}
        actions={[
          <Button type="link">删除文章</Button>,
          <Button type="link">修改封面</Button>,
          <Button type="link">修改标签</Button>,
          <Button type="link">修改类目</Button>,
          <Button type="link" >编辑内容</Button>
        ]}
      >
        <List.Item.Meta
          avatar={<Image src={item.cover} />}
          title={item.title}
          description={
            <div className="article-info">
              <div className="categories">
                {item.categories.map(([p, c]) => (
                  c
                    ? <span key={c.id}> {p.name} &gt; {c.name} </span>
                    : <span key={p.id}> {p.name} </span>
                ))}
              </div>
              <div className="tags">
                {item.tags.map(tag => (
                  <Tag
                    key={tag.id}
                    color="success"
                  >
                    {tag.name}
                  </Tag>
                ))}
              </div>
              <div className="time">
                <span>发布时间：{new Date(item.createdAt).toLocaleString()}</span>
                <span>更新时间：{new Date(item.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          }
        />
      </List.Item>
    ),
    []
  );


  return (
    <div className="article-list">
      <List
        loading={{ spinning: loading, indicator: <LoadingOutlined /> }}
        itemLayout="horizontal"
        size="small"
        pagination={{
          onChange: n => setPage(n),
          pageSize: size,
          total: total
        }}
        dataSource={articleList}
        renderItem={renderItem}
      />
    </div>
  )
}


export default ArticleList
