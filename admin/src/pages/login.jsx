import { useState } from 'react'
import Footer from '@/layout/Footer'
import { useLogin } from '@/hooks/routes'
import { Form, Input, Button, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './login.css'


const { Title } = Typography;

const rules = [{ required: true }];

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

const btnLayout = { offset: 4, span: 16 };

function Login() {
  const [loading, setLoading] = useState(false);
  const onFinish = useLogin(setLoading);

  return (
    <div className="login-box">
      <Title>登录</Title>
      <Form
        className="login-form"
        {...formLayout}
        size="large"
        onFinish={onFinish}
      >
        <Form.Item name="username" label="用户名" rules={rules}>
          <Input
            prefix={<UserOutlined />}
            placeholder="请输入用户名"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={rules}>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="请输入密码"
          />
        </Form.Item>

        <Form.Item wrapperCol={btnLayout}>
          <Button loading={loading} type="primary" htmlType="submit" block >登录</Button>
        </Form.Item>
      </Form >
      <Footer />
    </div>
  )
}


export default Login
