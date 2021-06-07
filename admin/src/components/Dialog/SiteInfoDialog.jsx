import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { useSiteInfo, useUpdateSiteInfo } from '@/hooks/store'
import { Form, Input, Typography, Drawer, Button, message } from 'antd'
import { MAIL_VALIDATION_REGEXP, URL_VALIDATION_REGEXP } from '@/utils/constants'

const { Title } = Typography;

const { TextArea } = Input;

const title = <Title level={3}>修改站点信息</Title>;

const labelCol = { span: 6 };

const wrapperCol = { span: 15 };

const requiredRule = [{ required: true }];
const mailRule = [{ required: true, pattern: MAIL_VALIDATION_REGEXP }];
const urlRule = [{ required: true, pattern: URL_VALIDATION_REGEXP }];

function SiteInfoDailog(props) {
  const { visible, onClose } = props;
  const { author, mail, github, siteName, beian, defaultCover, aboutMe } = useSiteInfo();

  const updateSiteInfo = useUpdateSiteInfo();

  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(
    async value => {
      setLoading(true);
      const success = await updateSiteInfo(value);
      if (success) {
        message.success('修改成功');
        setLoading(false);
        onClose();
      }
    },
    [updateSiteInfo, onClose]
  );

  return (
    <Drawer width={700} title={title} visible={visible} onClose={onClose}>
      <Form labelCol={labelCol} wrapperCol={wrapperCol} onFinish={onFinish} >
        <Form.Item
          label="作者"
          name="author"
          initialValue={author}
          rules={requiredRule}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="mail"
          initialValue={mail}
          rules={mailRule}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="github"
          name="github"
          initialValue={github}
          rules={urlRule}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="站点名"
          name="siteName"
          initialValue={siteName}
          rules={requiredRule}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="备案号"
          name="beian"
          initialValue={beian}
          rules={requiredRule}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="默认封面"
          name="defaultCover"
          initialValue={defaultCover}
          rules={urlRule}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="关于我"
          name="aboutMe"
          initialValue={aboutMe}
          rules={requiredRule}
        >
          <TextArea rows={6} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            提交
        </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

SiteInfoDailog.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
}

SiteInfoDailog.defaultProps = {
  visible: true,
  onClose: () => { }
}

export default SiteInfoDailog

