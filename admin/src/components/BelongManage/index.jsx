import React from 'react'
import TagManage from '../TagManage'
import CategoryManage from '../CategoryManage'
import './index.css'

function ArticleBelong(props) {
  return (
    <div className="belong-manage">
      <CategoryManage />
      <TagManage />
    </div>
  )
}

export default ArticleBelong

