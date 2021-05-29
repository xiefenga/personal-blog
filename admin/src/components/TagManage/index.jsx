import EditBox from '../EditBox'
import { randomColor } from '@/utils/helper'
import { useState, useCallback } from 'react'
import { useCorrectDoubleClick } from '@/hooks/helper'
import { Empty, Tag, Input, message, Modal } from 'antd'
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useTags, useAddTag, useUpdateTag, useDeleteTag } from '@/hooks/store'
import './index.css'


function TagManage() {
  const [tags] = useTags();
  const addTag = useAddTag();
  const updateTag = useUpdateTag();
  const deleteTag = useDeleteTag();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [addValue, setAddValue] = useState('');
  const [editValue, setEditValue] = useState('');
  const [editId, setEditId] = useState(null);
  // 添加标签的 input 的隐藏 和 显示
  const hideAddInput = useCallback(() => setAddVisible(false), []);
  const showAddInput = useCallback(() => setAddVisible(true), []);

  // 修改标签的 input 的隐藏 和 显示
  const hideEditInput = useCallback(() => setEditVisible(false), []);
  const showEditInput = useCallback(tag => {
    setEditId(tag.id);
    setEditValue(tag.name);
    setEditVisible(true);
  }, []);

  //  input 按下 esc 也隐藏
  const addESC = useCallback(e => e.keyCode === 27 && hideAddInput(), [hideAddInput]);
  const editESC = useCallback(e => e.keyCode === 27 && hideEditInput(), [hideEditInput]);

  // input 的双向绑定
  const onAddChange = useCallback(e => setAddValue(e.target.value), []);
  const onEditChange = useCallback(e => setEditValue(e.target.value), []);

  const onAddPress = useCallback(
    async () => {
      if (addValue === '') {
        message.error('标签名不能为空');
        return;
      }
      const success = await addTag(addValue);
      if (success) {
        setAddVisible(false);
        setAddValue('');
        message.success('添加成功');
      }
    },
    [addValue, addTag]
  );

  const onEditPress = useCallback(
    async () => {
      if (editValue === '') {
        message.error('标签名为空');
        return;
      }
      const success = await updateTag(editId, editValue);
      if (success) {
        setEditVisible(false);
        setEditValue('');
        message.success('修改成功');
      }
    },
    [editId, editValue, updateTag]
  );

  const confirmDelete = useCallback(
    tag => Modal.confirm({
      title: '确认删除',
      icon: <QuestionCircleOutlined />,
      content: `确定删除标签 ${tag.name}？`,
      onOk: async () => {
        const success = await deleteTag(tag.id);
        if (success) {
          message.success('删除成功');
        }
      },
      maskClosable: true
    }),
    [deleteTag]
  );

  const [onClick, onDouleClick] = useCorrectDoubleClick(
    confirmDelete,
    showEditInput
  );

  // todo 
  // 1. 增加 loading 
  // 2. 增加 加载时退出,取消请求


  return (
    <div className="tag-manage">
      <div className="tag-list">
        {tags.length
          ? tags.map(tag => (
            <Tag
              key={tag.id}
              color={randomColor(tag.id)}
              onClick={() => onClick(tag)}
              onDoubleClick={() => onDouleClick(tag)}
            >
              {tag.name}
            </Tag>
          ))
          : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
      </div>
      <div className="tag-add">
        {addVisible
          ? (
            <Input
              size="small"
              autoFocus
              value={addValue}
              onKeyDown={addESC}
              onBlur={hideAddInput}
              onChange={onAddChange}
              onPressEnter={onAddPress}
            />
          ) : (
            <Tag onClick={showAddInput}>
              <PlusOutlined /> 添加标签
            </Tag>
          )
        }
      </div>
      {editVisible && (
        <EditBox
          placeholder="请输入标签名称"
          value={editValue}
          onKeyDown={editESC}
          onBlur={hideEditInput}
          onChange={onEditChange}
          onPressEnter={onEditPress}
        />
      )}
    </div>
  )
}

export default TagManage

