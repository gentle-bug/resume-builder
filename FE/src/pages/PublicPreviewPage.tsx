import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Layout, Typography, Button, Spin, Result, Space } from 'antd'
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons'
import { resumeService } from '../services/resumeService'
import type { ResumeData } from '../services/resumeService'
import ResumePreview from '../components/ResumePreview'

const { Header, Content } = Layout
const { Title } = Typography

const PublicPreviewPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [resumeTitle, setResumeTitle] = useState('')
  const [resumeTemplate, setResumeTemplate] = useState('modern')
  const [resumeId, setResumeId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchResume = async () => {
      if (!slug) return
      try {
        const response = await resumeService.getBySlug(slug)
        setResumeData(response.data.resumeData)
        setResumeTitle(response.data.title)
        setResumeTemplate(response.data.template)
        setResumeId(response.data.id)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchResume()
  }, [slug])

  const handleDownloadPdf = async () => {
    if (!resumeId) return
    try {
      const response = await resumeService.downloadPdf(resumeId)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${resumeTitle}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch {
      // PDF download not available for public view
    }
  }

  if (loading) {
    return (
      <div className="center-spin" style={{ height: '100vh' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (error || !resumeData) {
    return (
      <div
        className="center-spin"
        style={{ height: '100vh' }}
      >
        <Result
          status="404"
          title="Resume Not Found"
          subTitle="This resume may have been removed or the link is invalid."
        />
      </div>
    )
  }

  return (
    <Layout className="public-preview-layout">
      <Header className="public-preview-header">
        <div className="header-left">
          <FileTextOutlined style={{ fontSize: 24, color: '#1677ff' }} />
          <Title level={4} style={{ margin: 0, color: '#fff' }}>
            {resumeTitle}
          </Title>
        </div>
        <div className="header-right">
          <Space>
            <Button
              icon={<DownloadOutlined />}
              onClick={handleDownloadPdf}
              type="primary"
            >
              Download PDF
            </Button>
          </Space>
        </div>
      </Header>

      <Content className="public-preview-content">
        <div className="preview-container public">
          <ResumePreview data={resumeData} template={resumeTemplate} />
        </div>
      </Content>
    </Layout>
  )
}

export default PublicPreviewPage
