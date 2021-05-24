import { Button, Popover } from 'antd'
import { useCallback, useState } from 'react'
import { usePostArtilce } from '@/hooks/http'
import TagsChecker from '@/components/TagsChecker'
import CategoriesChecker from '@/components/CategoriesChecker'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import './index.css'



function ArticlePublish() {
  const [visible, setVisible] = useState(false);
  const postArticle = usePostArtilce();
  const [loading, setLoading] = useState(false);

  const hideOrShow = useCallback(
    () => setVisible(!visible),
    [visible]
  );

  const onClick = useCallback(
    async () => {
      setLoading(true);
      const success = await postArticle();
      setLoading(false);
      success && setVisible(false);
    },
    [postArticle]
  );

  return (
    <div className="article-publish">
      <Popover
        placement="bottom"
        trigger="click"
        title="发布文章"
        content={
          <div className="belong-selects">
            <p className="title">文章类目</p>
            <CategoriesChecker />
            <p className="title">文章标签</p>
            <TagsChecker />
            <p className="submit">
              <Button type="primary" size="small" loading={loading} onClick={onClick}>
                提交
              </Button>
            </p>
          </div>
        }
        visible={visible}
        onVisibleChange={hideOrShow}
      >
        <Button type="dashed" >
          发布文章{visible ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </Button>
      </Popover>
    </div>
  )
}


export default ArticlePublish

