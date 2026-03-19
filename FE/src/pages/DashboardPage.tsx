import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Layout,
  Typography,
  Button,
  Card,
  Row,
  Col,
  Space,
  Modal,
  Input,
  Select,
  Spin,
  Empty,
  App,
} from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
  DownloadOutlined,
  LogoutOutlined,
  FileTextOutlined,
  ExportOutlined,
  ImportOutlined,
} from '@ant-design/icons'
import { useAuthStore } from '../stores/authStore'
import { resumeService } from '../services/resumeService'
import type { ResumeListItem, ResumeData } from '../services/resumeService'

const { Header, Content } = Layout
const { Title, Text } = Typography

const emptyResumeData: ResumeData = {
  basics: {
    name: '',
    label: '',
    email: '',
    phone: '',
    summary: '',
    location: '',
  },
  work: [],
  education: [],
  skills: [],
  projects: [],
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const { message, modal } = App.useApp()
  const { user, logout } = useAuthStore()
  const [resumes, setResumes] = useState<ResumeListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newTemplate, setNewTemplate] = useState('cabernet')
  const [creating, setCreating] = useState(false)

  const fetchResumes = async () => {
    try {
      const response = await resumeService.getAll()
      setResumes(response.data)
    } catch {
      message.error('Failed to load resumes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResumes()
  }, [])

  const handleCreate = async () => {
    if (!newTitle.trim()) {
      message.warning('Please enter a title')
      return
    }
    setCreating(true)
    try {
      const response = await resumeService.create({
        title: newTitle,
        template: newTemplate,
        resumeData: emptyResumeData,
      })
      message.success('Resume created!')
      setCreateModalOpen(false)
      setNewTitle('')
      navigate(`/editor/${response.data.id}`)
    } catch {
      message.error('Failed to create resume')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = (id: string, title: string) => {
    modal.confirm({
      title: 'Delete Resume',
      content: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      onOk: async () => {
        try {
          await resumeService.delete(id)
          message.success('Resume deleted')
          setResumes((prev) => prev.filter((r) => r.id !== id))
        } catch {
          message.error('Failed to delete resume')
        }
      },
    })
  }

  const handleDownloadPdf = async (id: string, _title: string) => {
    try {
      navigate(`/editor/${id}?pdf=1`)
      message.success('PDF downloaded!')
    } catch {
      message.error('Failed to download PDF')
    }
  }

  const handleExportJson = async (id: string, title: string) => {
    try {
      const response = await resumeService.exportJson(id)
      const blob = new Blob([JSON.stringify(response.data, null, 2)], {
        type: 'application/json',
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${title}.json`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      message.success('JSON exported!')
    } catch {
      message.error('Failed to export JSON')
    }
  }

  const handleImportJson = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      try {
        const text = await file.text()
        const parsed = JSON.parse(text)
        const fileName = file.name.replace('.json', '')
        const resumeData = parsed.data ? (typeof parsed.data === 'string' ? parsed.data : JSON.stringify(parsed.data)) : text
        await resumeService.importJson({
          title: parsed.title || fileName || 'Imported Resume',
          templateName: parsed.templateName || 'azurill',
          data: resumeData,
        })
        message.success('Resume imported!')
        fetchResumes()
      } catch {
        message.error('Failed to import JSON. Check the file format.')
      }
    }
    input.click()
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Layout className="dashboard-layout">
      <Header className="dashboard-header">
        <div className="header-left">
          <FileTextOutlined style={{ fontSize: 24, color: '#1677ff' }} />
          <Title level={4} style={{ margin: 0, color: '#fff' }}>
            Resume Builder
          </Title>
        </div>
        <div className="header-right">
          <Text style={{ color: 'rgba(255,255,255,0.85)', marginRight: 16 }}>
            {user?.fullName}
          </Text>
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            type="text"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Logout
          </Button>
        </div>
      </Header>

      <Content className="dashboard-content">
        {/* Welcome banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1677ff 0%, #4096ff 50%, #69b1ff 100%)',
          borderRadius: 16,
          padding: '28px 36px',
          marginBottom: 36,
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>
              Welcome back, {user?.fullName || 'User'}
            </div>
            <div style={{ fontSize: 14, opacity: 0.85 }}>
              {resumes.length === 0
                ? 'Create your first resume and land your dream job.'
                : `You have ${resumes.length} resume${resumes.length > 1 ? 's' : ''}. Keep them updated.`}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button
              icon={<ImportOutlined />}
              onClick={handleImportJson}
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 8, height: 40, fontWeight: 500 }}
            >
              Import JSON
            </Button>
            <Button
              icon={<PlusOutlined />}
              onClick={() => setCreateModalOpen(true)}
              style={{ background: '#fff', color: '#1677ff', border: 'none', borderRadius: 8, height: 40, fontWeight: 600, paddingInline: 20 }}
            >
              New Resume
            </Button>
          </div>
        </div>

        <div className="dashboard-toolbar">
          <Title level={4} style={{ margin: 0, color: '#374151' }}>
            My Resumes ({resumes.length})
          </Title>
        </div>

        {loading ? (
          <div className="center-spin">
            <Spin size="large" />
          </div>
        ) : resumes.length === 0 ? (
          <div className="center-spin">
            <Empty
              description="No resumes yet. Create your first one!"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setCreateModalOpen(true)}
              >
                Create Resume
              </Button>
            </Empty>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {resumes.map((resume) => (
              <Col xs={24} sm={12} lg={8} key={resume.id}>
                <Card
                  hoverable
                  className="resume-card"
                  onClick={() => navigate(`/editor/${resume.id}`)}
                  style={{ cursor: 'pointer' }}
                  actions={[
                    <Button
                      type="link"
                      icon={<DownloadOutlined />}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownloadPdf(resume.id, resume.title)
                      }}
                      key="download"
                    >
                      PDF
                    </Button>,
                    <Button
                      type="link"
                      icon={<ExportOutlined />}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleExportJson(resume.id, resume.title)
                      }}
                      key="export"
                    >
                      Export JSON
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0 }}>{resume.title}</span>
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined style={{ fontSize: 18 }} />}
                          size="middle"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(resume.id, resume.title)
                          }}
                        />
                      </div>
                    }
                    description={
                      <div style={{ marginTop: 4 }}>
                        <span style={{
                          display: 'inline-block',
                          fontSize: 11,
                          fontWeight: 500,
                          color: '#1677ff',
                          background: '#e6f4ff',
                          padding: '2px 8px 2px 0',
                          borderRadius: 12,
                          marginBottom: 6,
                          textTransform: 'capitalize',
                        }}>
                          {resume.templateName}
                        </span>
                        <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>
                          Updated {formatDate(resume.updatedAt)}
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Content>

      <Modal
        title="Create New Resume"
        open={createModalOpen}
        onOk={handleCreate}
        onCancel={() => {
          setCreateModalOpen(false)
          setNewTitle('')
        }}
        confirmLoading={creating}
        okText="Create"
      >
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>
              Resume Title
            </Text>
            <Input
              placeholder="e.g., Software Engineer Resume"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onPressEnter={handleCreate}
            />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>
              Template
            </Text>
            <Select
              value={newTemplate}
              onChange={setNewTemplate}
              style={{ width: '100%' }}
              options={[
                { label: '── Classic Collection ──', options: [
                  { value: 'riesling', label: 'Riesling' },
                  { value: 'barolo', label: 'Barolo' },
                  { value: 'sauvignon', label: 'Sauvignon' },
                  { value: 'malbec', label: 'Malbec' },
                  { value: 'champagne', label: 'Champagne' },
                  { value: 'bordeaux', label: 'Bordeaux' },
                  { value: 'pinot-grigio', label: 'Pinot Grigio' },
                  { value: 'cabernet', label: 'Cabernet' },
                  { value: 'prosecco', label: 'Prosecco' },
                ]},
                { label: '── Tech Collection ──', options: [
                  { value: 'absinthe', label: 'Absinthe' },
                  { value: 'hennessy', label: 'Hennessy' },
                  { value: 'tanqueray', label: 'Tanqueray' },
                  { value: 'belvedere', label: 'Belvedere' },
                  { value: 'lagavulin', label: 'Lagavulin' },
                  { value: 'macallan', label: 'Macallan' },
                  { value: 'aperol', label: 'Aperol' },
                  { value: 'chartreuse', label: 'Chartreuse' },
                  { value: 'glenfiddich', label: 'Glenfiddich' },
                  { value: 'courvoisier', label: 'Courvoisier' },
                ]},
                { label: '── Premium Collection ──', options: [
                  { value: 'dom-perignon', label: 'Dom Pérignon' },
                  { value: 'veuve-clicquot', label: 'Veuve Clicquot' },
                  { value: 'armagnac', label: 'Armagnac' },
                  { value: 'amarone', label: 'Amarone' },
                  { value: 'opus-one', label: 'Opus One' },
                ]},
              ]}
            />
          </div>
        </Space>
      </Modal>
    </Layout>
  )
}

export default DashboardPage
