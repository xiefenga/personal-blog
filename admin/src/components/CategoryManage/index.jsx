import EditBox from '../EditBox'
import { treeDateTransform } from '@/utils/helper'
import { Tree, Input, message, Empty, Modal } from 'antd'
import React, { useEffect, useMemo, useState, useCallback, Fragment, } from 'react'
import { DeleteOutlined, PlusOutlined, EditOutlined, QuestionCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useAddCategory, useCategories, useDeleteCategory, useUpdateCategory } from '@/hooks/store'
import './index.css'

function CategoryManage() {
  const categories = useCategories();
  const addCategory = useAddCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const [focueKey, setFocueKey] = useState(null);
  const [selectKey, setSelectKey] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [addVisible, setAddVisible] = useState(false);
  const [addValue, setAddValue] = useState('');


  useEffect(
    () => setExpandedKeys(categories.map(c => c.id)),
    [categories]
  );

  const treeData = useMemo(
    () => categories.map(
      c => treeDateTransform(
        c,
        c => ({ key: c.id, title: c.name, top: c.parentId === null, draggable: c.parentId !== null })
      )
    ),
    [categories]
  );

  const titleRender = useCallback(
    ({ key, title, draggable }) => (
      focueKey !== key
        ? (
          <Fragment>
            <span className="category-title">{title}</span>
            <span className="category-tool" onClick={e => {
              e.stopPropagation();
              setFocueKey(key);
              setEditValue(title);
            }}><EditOutlined /></span>
            { !draggable &&
              <span className="category-tool" onClick={e => {
                e.stopPropagation();
                setAddVisible(true);
                setSelectKey(key);
              }}>
                <PlusOutlined />
              </span>
            }
            <span className="category-tool" onClick={
              async e => {
                e.stopPropagation();
                Modal.confirm({
                  title: '????????????',
                  icon: <QuestionCircleOutlined />,
                  content: `?????????????????? ${title}???`,
                  onOk: async () => {
                    const success = await deleteCategory(key);
                    if (success) {
                      message.success('????????????');
                      setFocueKey(null);
                    }
                  },
                  maskClosable: true
                })

              }
            }><DeleteOutlined /></span>
          </Fragment>
        ) : (
          <Input
            size="small"
            autoFocus
            onBlur={() => setFocueKey(null)}
            onKeyDown={e => e.keyCode === 27 && setFocueKey(null)}
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onPressEnter={async () => {
              if (editValue === '') {
                message.error('???????????????');
                return;
              }
              const success = await updateCategory(focueKey, { name: editValue });
              if (success) {
                message.success('????????????');
                setFocueKey(null);
                setEditValue('');
              }
            }}
          />
        )
    ),
    [deleteCategory, updateCategory, editValue, focueKey]
  );

  const draggable = useCallback(node => node.draggable, []);

  const onExpand = useCallback(ks => setExpandedKeys(ks), []);

  const hide = useCallback(() => setAddVisible(false), []);

  const show = useCallback(() => setAddVisible(true), []);

  const ESC = useCallback(e => e.keyCode === 27 && hide(), [hide]);

  const onChange = useCallback(e => setAddValue(e.target.value), []);

  const onPressEnter = useCallback(
    async () => {
      if (addValue === '') {
        message.error('???????????????');
        return;
      }
      const success = await addCategory({ name: addValue, parentId: selectKey });
      if (success === true) {
        message.success('????????????');
        if (!expandedKeys.includes(selectKey)) {
          setExpandedKeys([...expandedKeys, selectKey]);
        }
        setAddValue('');
        setSelectKey(null);
        setAddVisible(false);
      }
    },
    [addValue, selectKey, addCategory, expandedKeys]
  );

  return (
    <div className="category-manage">
      <h1>????????????</h1>
      <div className="category-list">
        {categories.length
          ? <Tree
            showLine
            draggable
            blockNode
            treeData={treeData}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            draggable={draggable}
            titleRender={titleRender}
            expandedKeys={expandedKeys}
            onExpand={onExpand}
          />
          : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
      </div>
      <div className="add-btn" onClick={show}>
        <PlusCircleOutlined />
        <span className="title">????????????</span>
      </div>
      {
        addVisible && (
          <EditBox
            placeholder="?????????????????????"
            value={addValue}
            onKeyDown={ESC}
            onBlur={hide}
            onChange={onChange}
            onPressEnter={onPressEnter}
          />
        )
      }
    </div >
  )
}

export default CategoryManage