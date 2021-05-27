import { TreeSelect } from 'antd'
import PropTypes from 'prop-types'
import { useCallback, useMemo } from 'react'
import { useCategories } from '@/hooks/store'
import { treeDateTransform, findIDIndex } from '@/utils/helper'


const style = { width: '100%' };

function CategoriesSelect(props) {
  const {
    selected: selectedCategories,
    setSelected: setSelectedCategories
  } = props;
  const [categories] = useCategories();
  const treeData = useMemo(
    () => categories.map(
      c => treeDateTransform(
        c,
        c => ({ value: c.id, title: c.name })
      )
    ),
    [categories]
  );

  const onChange = useCallback(
    (value, _, extra) => {
      const { triggerValue, selected } = extra;
      if (selected) {
        const [i, j] = findIDIndex(triggerValue, categories);
        // 选中的是二级类目，需要看看是否已经选中父类目
        if (j !== -1) {
          const p = categories[i].id;
          setSelectedCategories(
            [
              ...selectedCategories.filter(id => id !== p),
              triggerValue
            ]
          );
        } else {  // 选中的是一级类目，查看是否有子类目，有的话就不用选中该一级类目
          const children = categories[i].children.map(c => c.id);
          if (!selectedCategories.find(id => children.includes(id))) {
            setSelectedCategories(
              [...selectedCategories, triggerValue]
            );
          }
        }
      } else {
        setSelectedCategories(value)
      }
    },
    [categories, selectedCategories, setSelectedCategories]
  );


  return (
    <div className="categories-checker">
      <TreeSelect
        multiple
        allowClear
        treeData={treeData}
        value={selectedCategories}
        onChange={onChange}
        placeholder="请选择类目"
        style={style}
      >
      </TreeSelect>
    </div>
  )
}

CategoriesSelect.propTypes = {
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired
}


export default CategoriesSelect

