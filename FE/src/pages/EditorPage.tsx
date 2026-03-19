import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Layout,
  Typography,
  Button,
  Input,
  Select,
  Form,
  Collapse,
  Space,
  Spin,
  Divider,
  App,
  ColorPicker,
  Tooltip,
} from 'antd'
import {
  ArrowLeftOutlined,
  SaveOutlined,
  DownloadOutlined,
  PlusOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  UploadOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import { Upload } from 'antd'
import { resumeService } from '../services/resumeService'
import type {
  Resume,
  ResumeData,
  WorkExperience,
  Education,
  Skill,
  Project,
} from '../services/resumeService'
import ResumePreview from '../components/ResumePreview'

const { Header, Sider, Content } = Layout
const { Text } = Typography
const { TextArea } = Input

const TEMPLATE_DEFAULTS: Record<string, { color: string; font: string }> = {
  // Classic Collection — muted professional colors, 1 font each
  'riesling':       { color: '#2B6F8A', font: "'Inter', sans-serif" },          // Sidebar left, timeline — muted teal
  'barolo':         { color: '#2D2926', font: "Georgia, serif" },               // Grid classic — warm dark brown
  'sauvignon':      { color: '#1B7A4E', font: "'Lato', sans-serif" },           // Colored right sidebar — dark green
  'malbec':         { color: '#5B21B6', font: "'Raleway', sans-serif" },         // Bold sidebar — deep purple
  'champagne':      { color: '#8B6F5E', font: "Georgia, serif" },               // Center-aligned — warm bronze
  'bordeaux':       { color: '#0F766E', font: "'Lato', sans-serif" },            // Card sections — dark teal
  'pinot-grigio':   { color: '#4A7C59', font: "'Lato', sans-serif" },            // Two-tone header — sage green
  'cabernet':       { color: '#0F172A', font: "'Roboto', sans-serif" },          // Clean default — near black
  'prosecco':       { color: '#B45309', font: "'Roboto', sans-serif" },          // Header card — dark amber
  // Tech Collection — professional tech colors, readable fonts only
  'absinthe':       { color: '#059669', font: "'Roboto', sans-serif" },          // Dark sidebar — dark emerald
  'hennessy':       { color: '#1E3A5F', font: "'Lato', sans-serif" },            // Single-col ATS — navy
  'tanqueray':      { color: '#0369A1', font: "'Inter', sans-serif" },           // Dark header — deep blue
  'belvedere':      { color: '#1C1C1E', font: "'Inter', sans-serif" },           // Apple minimal — carbon black
  'lagavulin':      { color: '#475569', font: "'Inter', sans-serif" },           // Dark theme — slate gray
  'macallan':       { color: '#155E75', font: "'Roboto', sans-serif" },          // Bar charts — dark cyan
  'aperol':         { color: '#BE123C', font: "'DM Sans', sans-serif" },         // Gradient header — dark rose
  'chartreuse':     { color: '#15803D', font: "'Roboto', sans-serif" },          // Banded — forest green
  'glenfiddich':    { color: '#3730A3', font: "'DM Sans', sans-serif" },         // Timeline — deep indigo
  'courvoisier':    { color: '#334155', font: "'Lato', sans-serif" },            // 3-layer — slate
  // Premium Collection — luxury muted tones, elegant fonts
  'dom-perignon':   { color: '#92702A', font: "'Lato', sans-serif" },               // Luxury minimal — muted gold
  'veuve-clicquot': { color: '#8B6D4C', font: "'Lato', sans-serif" },           // Magazine — warm brown
  'armagnac':       { color: '#4338CA', font: "'Inter', sans-serif" },           // Dashboard — indigo
  'amarone':        { color: '#881337', font: "'Lato', sans-serif" },            // Zigzag — dark burgundy
  'opus-one':       { color: '#1E293B', font: "'Raleway', sans-serif" },         // Watermark — dark slate
}

const getDefaults = (t: string) => TEMPLATE_DEFAULTS[t] || { color: '#2563EB', font: "'Segoe UI', system-ui, sans-serif" }

const EditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams] = [new URLSearchParams(window.location.search)]
  const autoPdf = searchParams.get('pdf') === '1'
  const { message } = App.useApp()
  const [form] = Form.useForm()
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState('')
  const [template, setTemplate] = useState('cabernet')
  const [primaryColor, setPrimaryColor] = useState('#2563EB')
  const [fontFamily, setFontFamily] = useState("'Segoe UI', system-ui, sans-serif")
  const [previewData, setPreviewData] = useState<ResumeData | null>(null)

  useEffect(() => {
    const fetchResume = async () => {
      if (!id) return
      try {
        const response = await resumeService.getById(id)
        const data = response.data
        setResume(data)
        setTitle(data.title)
        setTemplate(data.templateName)
        const defaults = getDefaults(data.templateName)
        setPrimaryColor(defaults.color)
        setFontFamily(defaults.font)

        let resumeData: ResumeData
        try {
          resumeData = data.data ? JSON.parse(data.data) : null
        } catch {
          resumeData = null as unknown as ResumeData
        }
        if (!resumeData) {
          resumeData = {
            basics: { name: '', label: '', email: '', phone: '', summary: '', location: '' },
            work: [],
            education: [],
            skills: [],
            projects: [],
          }
        }

        form.setFieldsValue(resumeData)
        setPreviewData(resumeData)
      } catch {
        message.error('Failed to load resume')
        navigate('/dashboard')
      } finally {
        setLoading(false)
      }
    }
    fetchResume()
  }, [id, navigate, form])

  const handleSave = async () => {
    if (!id) return
    setSaving(true)
    try {
      const values = form.getFieldsValue(true) as ResumeData
      await resumeService.update(id, {
        title,
        template,
        resumeData: values,
      })
      setPreviewData(values)
      message.success('Resume saved!')
    } catch {
      message.error('Failed to save resume')
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadPdf = () => {
    const previewEl = document.getElementById('resume-preview-capture')
    if (!previewEl) {
      message.error('Preview not ready')
      return
    }

    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      message.error('Please allow popups to download PDF')
      return
    }

    const fontLinks = Array.from(document.querySelectorAll('link[href*="fonts.googleapis.com"]'))
      .map(l => l.outerHTML)
      .join('\n')

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>${title || 'Resume'}</title>
        ${fontLinks}
        <style>
          @page { size: A4; margin: 8mm 0 0 0; }
          @page:first { margin-top: 0; }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: ${fontFamily};
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          li, p { break-inside: avoid; }
          h1, h2, h3, h4, h5, h6 { break-after: avoid; }
        </style>
      </head>
      <body>${previewEl.innerHTML}</body>
      </html>
    `)
    printWindow.document.close()

    printWindow.onload = () => {
      setTimeout(() => {
        const allDivs = printWindow.document.querySelectorAll('div')
        allDivs.forEach((el: HTMLElement) => {
          const h = el.offsetHeight
          if (h > 30 && h < 400) {
            el.style.breakInside = 'avoid'
          }
        })
        printWindow.print()
        printWindow.close()
      }, 500)
    }
  }

  // Auto-download PDF if navigated with ?pdf=1
  useEffect(() => {
    if (autoPdf && !loading && previewData) {
      const timer = setTimeout(() => {
        handleDownloadPdf()
        // Remove ?pdf=1 from URL
        window.history.replaceState({}, '', window.location.pathname)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [autoPdf, loading, previewData]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFormChange = useCallback(() => {
    const values = form.getFieldsValue(true) as ResumeData
    setPreviewData(values)
  }, [form])

  if (loading) {
    return (
      <div className="center-spin" style={{ height: '100vh' }}>
        <Spin size="large" />
      </div>
    )
  }

  const collapseItems = [
    {
      key: 'basics',
      label: 'Basic Information',
      children: (
        <div className="editor-section">
          <Form.Item label="Avatar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {previewData?.basics?.avatarUrl && (
                <img
                  src={previewData.basics.avatarUrl}
                  alt="avatar"
                  style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0' }}
                />
              )}
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={(file) => {
                  const reader = new FileReader()
                  reader.onload = (e) => {
                    const base64 = e.target?.result as string
                    form.setFieldValue(['basics', 'avatarUrl'], base64)
                    handleFormChange()
                  }
                  reader.readAsDataURL(file)
                  return false
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Photo</Button>
              </Upload>
              {previewData?.basics?.avatarUrl && (
                <Button
                  danger
                  size="small"
                  onClick={() => {
                    form.setFieldValue(['basics', 'avatarUrl'], '')
                    handleFormChange()
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          </Form.Item>
          <Form.Item name={['basics', 'name']} label="Full Name">
            <Input placeholder="John Doe" />
          </Form.Item>
          <Form.Item name={['basics', 'label']} label="Professional Title">
            <Input placeholder="Senior Software Engineer" />
          </Form.Item>
          <Form.Item name={['basics', 'email']} label="Email">
            <Input placeholder="john@example.com" />
          </Form.Item>
          <Form.Item name={['basics', 'phone']} label="Phone">
            <Input placeholder="+1 (555) 123-4567" />
          </Form.Item>
          <Form.Item name={['basics', 'location']} label="Location">
            <Input placeholder="San Francisco, CA" />
          </Form.Item>
          <Form.Item name={['basics', 'summary']} label="Summary">
            <TextArea
              rows={4}
              placeholder="A brief professional summary..."
            />
          </Form.Item>
        </div>
      ),
    },
    {
      key: 'work',
      label: 'Work Experience',
      children: (
        <Form.List name="work">
          {(fields, { add, remove }) => (
            <div>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="dynamic-entry">
                  <div className="dynamic-entry-header">
                    <Text strong>Experience #{name + 1}</Text>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(name)}
                      size="small"
                    >
                      Remove
                    </Button>
                  </div>
                  <Form.Item
                    {...restField}
                    name={[name, 'company']}
                    label="Company"
                  >
                    <Input placeholder="Acme Corp" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'position']}
                    label="Position"
                  >
                    <Input placeholder="Senior Developer" />
                  </Form.Item>
                  <Space style={{ width: '100%' }} size="middle">
                    <Form.Item
                      {...restField}
                      name={[name, 'startDate']}
                      label="Start Date"
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="2020-01" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'endDate']}
                      label="End Date"
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="Present" />
                    </Form.Item>
                  </Space>
                  <Form.Item
                    {...restField}
                    name={[name, 'summary']}
                    label="Summary"
                  >
                    <TextArea rows={2} placeholder="Brief role description" />
                  </Form.Item>
                  <Form.Item label="Highlights">
                    <Form.List name={[name, 'highlights']}>
                      {(
                        highlightFields,
                        { add: addHighlight, remove: removeHighlight },
                      ) => (
                        <>
                          {highlightFields.map((hField) => (
                            <Space
                              key={hField.key}
                              style={{ display: 'flex', marginBottom: 8 }}
                              align="baseline"
                            >
                              <Form.Item
                                name={hField.name}
                                style={{ marginBottom: 0, flex: 1 }}
                              >
                                <Input placeholder="Key achievement" />
                              </Form.Item>
                              <MinusCircleOutlined
                                onClick={() => removeHighlight(hField.name)}
                                style={{ color: '#ff4d4f' }}
                              />
                            </Space>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => addHighlight('')}
                            icon={<PlusOutlined />}
                            size="small"
                          >
                            Add Highlight
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>
                  <Divider />
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() =>
                  add({
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    summary: '',
                    highlights: [],
                  } as WorkExperience)
                }
                icon={<PlusOutlined />}
                block
              >
                Add Work Experience
              </Button>
            </div>
          )}
        </Form.List>
      ),
    },
    {
      key: 'education',
      label: 'Education',
      children: (
        <Form.List name="education">
          {(fields, { add, remove }) => (
            <div>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="dynamic-entry">
                  <div className="dynamic-entry-header">
                    <Text strong>Education #{name + 1}</Text>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(name)}
                      size="small"
                    >
                      Remove
                    </Button>
                  </div>
                  <Form.Item
                    {...restField}
                    name={[name, 'institution']}
                    label="Institution"
                  >
                    <Input placeholder="University of Technology" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'area']}
                    label="Field of Study"
                  >
                    <Input placeholder="Computer Science" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'studyType']}
                    label="Degree"
                  >
                    <Input placeholder="Bachelor of Science" />
                  </Form.Item>
                  <Space style={{ width: '100%' }} size="middle">
                    <Form.Item
                      {...restField}
                      name={[name, 'startDate']}
                      label="Start Date"
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="2016-09" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'endDate']}
                      label="End Date"
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="2020-06" />
                    </Form.Item>
                  </Space>
                  <Divider />
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() =>
                  add({
                    institution: '',
                    area: '',
                    studyType: '',
                    startDate: '',
                    endDate: '',
                  } as Education)
                }
                icon={<PlusOutlined />}
                block
              >
                Add Education
              </Button>
            </div>
          )}
        </Form.List>
      ),
    },
    {
      key: 'skills',
      label: 'Skills',
      children: (
        <Form.List name="skills">
          {(fields, { add, remove }) => (
            <div>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="dynamic-entry">
                  <div className="dynamic-entry-header">
                    <Text strong>Skill #{name + 1}</Text>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(name)}
                      size="small"
                    >
                      Remove
                    </Button>
                  </div>
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    label="Skill Name"
                  >
                    <Input placeholder="JavaScript" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'level']}
                    label="Level"
                  >
                    <Select
                      placeholder="Select level"
                      options={[
                        { value: 'Beginner', label: 'Beginner' },
                        { value: 'Intermediate', label: 'Intermediate' },
                        { value: 'Advanced', label: 'Advanced' },
                        { value: 'Expert', label: 'Expert' },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'keywords']}
                    label="Keywords"
                  >
                    <Select
                      mode="tags"
                      placeholder="Type and press Enter (e.g., React, Node.js)"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <Divider />
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() =>
                  add({
                    name: '',
                    level: '',
                    keywords: [],
                  } as Skill)
                }
                icon={<PlusOutlined />}
                block
              >
                Add Skill
              </Button>
            </div>
          )}
        </Form.List>
      ),
    },
    {
      key: 'projects',
      label: 'Projects',
      children: (
        <Form.List name="projects">
          {(fields, { add, remove }) => (
            <div>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="dynamic-entry">
                  <div className="dynamic-entry-header">
                    <Text strong>Project #{name + 1}</Text>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(name)}
                      size="small"
                    >
                      Remove
                    </Button>
                  </div>
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    label="Project Name"
                  >
                    <Input placeholder="My Cool Project" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'description']}
                    label="Description"
                  >
                    <TextArea rows={2} placeholder="What the project does..." />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'url']}
                    label="URL"
                  >
                    <Input placeholder="https://github.com/..." />
                  </Form.Item>
                  <Form.Item label="Highlights">
                    <Form.List name={[name, 'highlights']}>
                      {(
                        highlightFields,
                        { add: addHighlight, remove: removeHighlight },
                      ) => (
                        <>
                          {highlightFields.map((hField) => (
                            <Space
                              key={hField.key}
                              style={{ display: 'flex', marginBottom: 8 }}
                              align="baseline"
                            >
                              <Form.Item
                                name={hField.name}
                                style={{ marginBottom: 0, flex: 1 }}
                              >
                                <Input placeholder="Key feature or achievement" />
                              </Form.Item>
                              <MinusCircleOutlined
                                onClick={() => removeHighlight(hField.name)}
                                style={{ color: '#ff4d4f' }}
                              />
                            </Space>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => addHighlight('')}
                            icon={<PlusOutlined />}
                            size="small"
                          >
                            Add Highlight
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>
                  <Divider />
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() =>
                  add({
                    name: '',
                    description: '',
                    url: '',
                    highlights: [],
                  } as Project)
                }
                icon={<PlusOutlined />}
                block
              >
                Add Project
              </Button>
            </div>
          )}
        </Form.List>
      ),
    },
  ]

  return (
    <Layout className="editor-layout">
      <Header className="editor-header">
        <div className="header-left">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dashboard')}
            type="text"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Dashboard
          </Button>
          <Divider orientation="vertical" style={{ borderColor: 'rgba(255,255,255,0.2)', height: 24 }} />
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
            variant="borderless"
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: 500,
              maxWidth: 300,
            }}
          />
        </div>
        <div className="header-right">
          <Select
            value={template}
            onChange={(t: string) => {
              setTemplate(t)
              const d = getDefaults(t)
              setPrimaryColor(d.color)
              setFontFamily(d.font)
            }}
            style={{ width: 200 }}
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
          <Select
            value={fontFamily}
            onChange={setFontFamily}
            style={{ width: 160 }}
            popupMatchSelectWidth={220}
            options={[
              { label: '── Sans Serif ──', options: [
                { value: "'Inter', sans-serif", label: 'Inter' },
                { value: "'Roboto', sans-serif", label: 'Roboto' },
                { value: "'Open Sans', sans-serif", label: 'Open Sans' },
                { value: "'Lato', sans-serif", label: 'Lato' },
                { value: "'Poppins', sans-serif", label: 'Poppins' },
                { value: "'Montserrat', sans-serif", label: 'Montserrat' },
                { value: "'Nunito', sans-serif", label: 'Nunito' },
                { value: "'Raleway', sans-serif", label: 'Raleway' },
                { value: "'Quicksand', sans-serif", label: 'Quicksand' },
                { value: "'Rubik', sans-serif", label: 'Rubik' },
                { value: "'Work Sans', sans-serif", label: 'Work Sans' },
                { value: "'Fira Sans', sans-serif", label: 'Fira Sans' },
                { value: "'Barlow', sans-serif", label: 'Barlow' },
                { value: "'DM Sans', sans-serif", label: 'DM Sans' },
                { value: "'IBM Plex Sans', sans-serif", label: 'IBM Plex Sans' },
                { value: "'Cabin', sans-serif", label: 'Cabin' },
                { value: "'Mukta', sans-serif", label: 'Mukta' },
                { value: "'PT Sans', sans-serif", label: 'PT Sans' },
                { value: "'Source Sans 3', sans-serif", label: 'Source Sans' },
                { value: "'Segoe UI', system-ui, sans-serif", label: 'Segoe UI' },
              ]},
              { label: '── Serif ──', options: [
                { value: "'Merriweather', serif", label: 'Merriweather' },
                { value: "'Playfair Display', serif", label: 'Playfair Display' },
                { value: "'Roboto Slab', serif", label: 'Roboto Slab' },
                { value: "'Lora', serif", label: 'Lora' },
                { value: "Georgia, serif", label: 'Georgia' },
                { value: "'Times New Roman', serif", label: 'Times New Roman' },
              ]},
            ]}
          />
          <Tooltip title="Template Color">
            <ColorPicker
              value={primaryColor}
              onChange={(_, hex) => setPrimaryColor(hex)}
              presets={[
                {
                  label: 'Popular',
                  colors: [
                    '#2563EB', '#1E40AF', '#0891B2', '#0D9488', '#059669',
                    '#16A34A', '#CA8A04', '#EA580C', '#DC2626', '#E11D48',
                    '#9333EA', '#7C3AED', '#4F46E5', '#475569', '#1E293B',
                  ],
                },
              ]}
              size="middle"
            />
          </Tooltip>
          <Tooltip title="Reset to template default">
            <Button
              icon={<UndoOutlined />}
              onClick={() => {
                const d = getDefaults(template)
                setPrimaryColor(d.color)
                setFontFamily(d.font)
              }}
            />
          </Tooltip>
          <Button
            icon={<SaveOutlined />}
            onClick={handleSave}
            loading={saving}
            type="primary"
          >
            Save
          </Button>
          <Button
            icon={<DownloadOutlined />}
            onClick={handleDownloadPdf}
          >
            PDF
          </Button>
        </div>
      </Header>

      <Layout className="editor-body">
        <Sider
          width={480}
          theme="light"
          className="editor-sider"
          breakpoint="lg"
          collapsedWidth={0}
        >
          <div className="editor-form-container">
            <Form
              form={form}
              layout="vertical"
              onValuesChange={handleFormChange}
              size="middle"
            >
              <Collapse
                items={collapseItems}
                defaultActiveKey={['basics']}
                bordered={false}
                accordion={false}
              />
            </Form>
          </div>
        </Sider>

        <Content className="preview-panel">
          <div className="preview-container" id="resume-preview-capture">
            {previewData && (
              <ResumePreview data={previewData} template={template} primaryColor={primaryColor} fontFamily={fontFamily} />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default EditorPage
