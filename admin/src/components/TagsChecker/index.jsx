import { Tag } from 'antd'
import { useArticleTags, useTags } from '@/hooks/store'
import './index.css'

const { CheckableTag } = Tag;

function TagsChecker() {
  const [tags] = useTags();
  const [checkedTags, setCheckedTags] = useArticleTags();
  return (
    <div className="tags-checker">
      {tags.map(tag => (
        <CheckableTag
          key={tag.id}
          checked={checkedTags.includes(tag.id)}
          onChange={checked => {
            if (checked) {
              setCheckedTags([...checkedTags, tag.id]);
            } else {
              setCheckedTags(checkedTags.filter(id => id !== tag.id));
            }
          }}
        >
          {tag.name}
        </CheckableTag>
      ))}
    </div>
  )
}

export default TagsChecker

