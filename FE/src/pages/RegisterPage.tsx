import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Typography, Card, Space, App } from 'antd'
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { useAuthStore } from '../stores/authStore'

const { Title, Text } = Typography

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const register = useAuthStore((s) => s.register)
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: {
    fullName: string
    email: string
    password: string
  }) => {
    setLoading(true)
    try {
      await register(values.fullName, values.email, values.password)
      message.success('Registration successful!')
      navigate('/dashboard')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      message.error(
        err.response?.data?.message || 'Registration failed. Please try again.',
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
            Create Account
          </Title>
          <Text type="secondary">
            Get started with Resume Builder for free
          </Text>
        </Space>

        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: 'Please enter your full name' },
              { min: 2, message: 'Name must be at least 2 characters' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Full name" />
          </Form.Item>

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
            rules={[
              { required: true, message: 'Please enter a password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match'))
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 12 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary">
            Already have an account? <Link to="/login">Sign in</Link>
          </Text>
        </div>
      </Card>
    </div>
  )
}

export default RegisterPage
