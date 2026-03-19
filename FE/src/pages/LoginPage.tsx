import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Typography, Card, Space, App } from 'antd'
import { MailOutlined, LockOutlined, FileTextOutlined } from '@ant-design/icons'
import { useAuthStore } from '../stores/authStore'

const { Title, Text } = Typography

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const login = useAuthStore((s) => s.login)
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true)
    try {
      await login(values.email, values.password)
      message.success('Login successful!')
      navigate('/dashboard')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      message.error(
        err.response?.data?.message || 'Login failed. Please check your credentials.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <Card className="auth-card" variant="borderless">
        <Space
          orientation="vertical"
          size="middle"
          style={{ width: '100%', textAlign: 'center', marginBottom: 24 }}
        >
          <FileTextOutlined style={{ fontSize: 48, color: '#1677ff' }} />
          <Title level={2} style={{ margin: 0 }}>
            Welcome Back
          </Title>
          <Text type="secondary">Sign in to your Resume Builder account</Text>
        </Space>

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email address" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 12 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary">
            Don't have an account?{' '}
            <Link to="/register">Create one now</Link>
          </Text>
        </div>
      </Card>
    </div>
  )
}

export default LoginPage
