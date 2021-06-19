import { message } from 'antd'
import { getConfig } from '@/api/oss'
import { isEmpty } from '@/utils/helper'
import { useParams } from 'react-router-dom'
import TagsSelect from '@/components/TagsSelect'
import ImageUpload from '@/components/ImageUpload'
import { useArticle, useClearArticle } from './store'
import { useCallback, useState, useMemo } from 'react'
import CategoriesSelect from '@/components/CategoriesSelect'
import { SUCCESS, ARTICLE_LIST_PAGE_SIZE } from '@/utils/constants'
import { postArticle, updateArticle, deleteArticle, getArticles } from '@/api/article'


export const useGetOSSCongig = () => {
  return useCallback(
    async () => {
      const { status, data } = await getConfig();
      if (status === SUCCESS) {
        window.localStorage.setItem('oss-config', JSON.stringify(data));
      }
    },
    []
  );
}


export const useDeleteArticle = () => {
  return useCallback(
    async id => {
      const { status } = await deleteArticle(id);
      if (status === SUCCESS) {
        message.success('删除成功');
        return true;
      }
      return false;
    },
    []
  );
}

export const useAddArticle = () => {
  const article = useArticle();
  return useCallback(
    async () => {
      const {
        title = '',
        content = '',
        categories = [],
        tags = []
      } = article;

      if (isEmpty(title)) {
        message.error('文章标题为空');
      } else if (isEmpty(content)) {
        message.error('文章内容为空');
      } else if (isEmpty(categories)) {
        message.error('文章类目为空');
      } else if (isEmpty(tags)) {
        message.error('文章标签为空');
      } else {
        const { status } = await postArticle(article);
        return status === SUCCESS;
      }
      return false;
    },
    [article]
  )
}

export const useUpdateArticle = () => {
  const article = useArticle();
  return useCallback(
    async id => {
      const {
        title = '',
        content = '',
        categories = [],
        tags = []
      } = article;

      if (isEmpty(title)) {
        message.error('文章标题为空');
      } else if (isEmpty(content)) {
        message.error('文章内容为空');
      } else if (isEmpty(categories)) {
        message.error('文章类目为空');
      } else if (isEmpty(tags)) {
        message.error('文章标签为空');
      } else {
        const { status } = await updateArticle(id, article);
        return status === SUCCESS;
      }
      return false;
    },
    [article]
  );
}

export const usePostArtilce = () => {
  const addArticle = useAddArticle();
  const updateArticle = useUpdateArticle();
  const clear = useClearArticle();
  const { id } = useParams();
  return useCallback(
    async () => {
      const success = id
        ? await updateArticle(id)
        : await addArticle();
      if (success) {
        message.success('发布成功');
        clear();
      }
      return success;
    },
    [id, addArticle, updateArticle, clear]
  );
}

export const useGetArticleList = () => {
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [articleList, setArticleList] = useState([]);

  const [total, setTotal] = useState(0);

  const getList = useCallback(
    async () => {
      setLoading(true);
      const { status, data, count } = await getArticles(page, ARTICLE_LIST_PAGE_SIZE);
      setLoading(false);
      if (status === SUCCESS) {
        setArticleList(data);
        setTotal(count);
        return true;
      }
      return false;
    },
    [page]
  );

  return {
    page,
    total,
    toPage: setPage,
    getArticleList: getList,
    loading,
    articleList
  }
}

export const useEditModal = () => {

  const deleteArticle = useDeleteArticle();

  // articleId
  const [id, setId] = useState(0);

  const [title, setTitle] = useState('');

  const [tags, setTags] = useState([]);

  const [cover, setCover] = useState('');

  const urls = useMemo(() => cover ? [cover] : [], [cover]);

  const [categories, setCategories] = useState([]);

  const [confirmLoading, setConfirmLoading] = useState(false);

  // 1 -> cover 2 -> tags  3 -> categories 4 -> delete
  // 0 -> 隐藏 modal
  const [editType, setEditType] = useState(0);

  const hideModal = useCallback(() => setEditType(0), []);

  const visible = useMemo(() => !!editType, [editType]);

  const content = useMemo(
    () => {
      switch (editType) {
        case 1:
          return (
            <ImageUpload
              urls={urls}
              onSuccess={({ resp }) => setCover(resp)}
              limit={1}
            />
          )
        case 2:
          return (
            <TagsSelect
              selected={tags}
              setSelected={setTags}
            />
          )
        case 3:
          return (
            <CategoriesSelect
              selected={categories}
              setSelected={setCategories}
            />
          )
        case 4:
          return (
            <p>确认删除文章：<b>{title}</b> ？</p>
          )
        default:
          return null;
      }
    },
    [editType, urls, tags, categories, title]
  );

  const modalTitle = useMemo(
    () => {
      switch (editType) {
        case 1:
          return '修改封面';
        case 2:
          return '修改标签';
        case 3:
          return '修改类目';
        case 4:
          return '删除文章';
        default:
          return null;
      }
    },
    [editType]
  );

  const onOk = useCallback(
    async () => {
      setConfirmLoading(true);
      if (editType === 4) {
        const success = await deleteArticle(id);
        hideModal();
        setConfirmLoading(false)
        return success;
      } else {
        const { status } = await updateArticle(id,
          editType === 0
            ? {}
            : editType === 1
              ? { cover }
              : editType === 2
                ? { tags }
                : { categories }
        );
        if (status === SUCCESS) {
          message.success('修改成功');
          hideModal();
          setConfirmLoading(false)
          return true;
        }
        setConfirmLoading(false)
        return false;
      }
    },
    [editType, cover, tags, categories, id, hideModal, deleteArticle]
  );

  const showDeleteModal = useCallback(
    ({ id, title }) => {
      setId(id);
      setTitle(title);
      setEditType(4);
    },
    []
  );

  const showTagModal = useCallback(
    ({ id, tags }) => {
      setId(id);
      setTags(tags);
      setEditType(2);
    },
    []
  );

  const showCategoryModal = useCallback(
    ({ id, categories }) => {
      setId(id);
      setCategories(categories);
      setEditType(3);
    },
    []
  );

  const showCoverModal = useCallback(
    ({ id, cover }) => {
      setId(id);
      setCover(cover);
      setEditType(1);
    },
    []
  );

  const showModal = useCallback(
    (type, info) => {
      switch (type) {
        case 1:
          return showCoverModal(info);
        case 2:
          return showTagModal(info);
        case 3:
          return showCategoryModal(info);
        case 4:
          return showDeleteModal(info);
        default:
          return;
      }
    },
    [showCoverModal, showCategoryModal, showTagModal, showDeleteModal]
  );

  return {
    onOk,
    title: modalTitle,
    content,
    visible,
    hideModal,
    showModal,
    showCoverModal,
    showTagModal,
    showCategoryModal,
    confirmLoading
  }
}


