import { useHistory } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { List, Button, Tag, Image, Modal } from 'antd'
import { useEffect, useCallback, useMemo } from 'react'
import { useGetArticleList, useEditModal } from '@/hooks/http'
import { ARTICLE_LIST_PAGE_SIZE, IMG_LOAD_ERROR_FALLBACK } from '@/utils/constants'
import './index.css'


function ArticleList() {

  const history = useHistory();

  const {
    loading,
    articleList,
    toPage,
    total,
    getArticleList
  } = useGetArticleList();

  const {
    onOk,
    visible,
    content,
    title,
    hideModal,
    showModal,
    confirmLoading
  } = useEditModal();

  useEffect(getArticleList, [getArticleList]);

  const ok = useCallback(
    async () => {
      const success = await onOk();
      success && getArticleList();
    },
    [onOk, getArticleList]
  );

  const pagination = useMemo(
    () => ({
      onChange: n => toPage(n),
      pageSize: ARTICLE_LIST_PAGE_SIZE,
      total: total
    }),
    [toPage, total]
  );

  const loadingConfig = useMemo(
    () => ({
      spinning: loading,
      indicator: <LoadingOutlined />
    }),
    [loading]
  );

  const renderItem = useCallback(
    item => (
      <List.Item
        key={item.id}
        actions={[
          <Button type="link" onClick={
            () => showModal(4, {
              id: item.id,
              title: item.title
            })
          }> 删除文章</Button >,
          <Button type="link" onClick={
            () => showModal(1, {
              id: item.id,
              cover: item.cover
            })
          }>修改封面</Button>,
          <Button type="link" onClick={
            () => showModal(2, {
              id: item.id,
              tags: item.tags.map(t => t.id)
            })
          }>修改标签</Button>,
          <Button type="link" onClick={
            () => showModal(3, {
              id: item.id,
              categories: item.categories.map(([p, c]) => (c ?? p).id)
            })
          }>修改类目</Button>,
          <Button type="link" onClick={
            () => history.push('/article/edit/' + item.id)
          }>编辑内容</Button>
        ]}
      >
        <List.Item.Meta
          avatar={
            <Image
              preview={false}
              src={item.cover}
              fallback={IMG_LOAD_ERROR_FALLBACK}
            />
          }
          title={item.title}
          description={
            <div className="article-info">
              <div className="categories">
                {item.categories.map(([p, c]) => (
                  c
                    ? <span className="item" key={c.id}> {p.name} &gt; {c.name} </span>
                    : <span className="item" key={p.id}> {p.name} </span>
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
              <div className="times">
                <span className="post-time">发布时间：{new Date(item.createdAt).toLocaleString()}</span>
                <span className="update-time">更新时间：{new Date(item.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          }
        />
      </List.Item >
    ),
    [history, showModal]
  );


  return (
    <div className="article-list">
      <List
        size="small"
        itemLayout="horizontal"
        loading={loadingConfig}
        pagination={pagination}
        dataSource={articleList}
        renderItem={renderItem}
      />
      <Modal
        onOk={ok}
        title={title}
        destroyOnClose
        closable={false}
        visible={visible}
        onCancel={hideModal}
        confirmLoading={confirmLoading}
      >
        {content}
      </Modal>
    </div>
  )
}


export default ArticleList
