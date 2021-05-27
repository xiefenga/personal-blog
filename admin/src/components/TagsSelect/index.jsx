import { Tag } from 'antd'
import PropTypes from 'prop-types'
import { useTags } from '@/hooks/store'
import './index.css'

const { CheckableTag } = Tag;


function TagsSelect(props) {
  const {
    selected: checkedTags,
    setSelected: setCheckedTags
  } = props;
  const [tags] = useTags();
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

TagsSelect.propTypes = {
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired
}

export default TagsSelect

