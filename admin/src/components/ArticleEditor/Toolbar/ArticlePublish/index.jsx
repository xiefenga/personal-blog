import { Button, Popover } from 'antd'
import { useCallback, useState } from 'react'
import { usePostArtilce } from '@/hooks/http'
import TagsSelect from '@/components/TagsSelect'
import CategoriesSelect from '@/components/CategoriesSelect'
import { useArticleCategories, useArticleTags } from '@/hooks/store'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import './index.css'



function ArticlePublish() {
  const [visible, setVisible] = useState(false);
  const postArticle = usePostArtilce();
  const [loading, setLoading] = useState(false);

  const onClick = useCallback(
    async () => {
      setLoading(true);
      const success = await postArticle();
      setLoading(false);
      success && setVisible(false);
    },
    [postArticle]
  );

  const [tags, setTags] = useArticleTags();

  const [categories, setCategories] = useArticleCategories();

  return (
    <div className="article-publish">
      <Popover
        placement="bottom"
        trigger="click"
        title="发布文章"
        content={
          <div className="belong-selects">
            <p className="title">文章类目</p>
            <CategoriesSelect
              selected={categories}
              setSelected={setCategories}
            />
            <p className="title">文章标签</p>
            <TagsSelect
              selected={tags}
              setSelected={setTags}
            />
            <p className="submit">
              <Button
                type="primary"
                size="small"
                loading={loading}
                onClick={onClick}
              >
                提交
              </Button>
            </p>
          </div>
        }
        visible={visible}
        onVisibleChange={setVisible}
      >
        <Button type="dashed" >
          发布文章{visible ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </Button>
      </Popover>
    </div>
  )
}


export default ArticlePublish

