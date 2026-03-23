import api from './api'

export interface ResumeBasics {
  name: string
  label: string
  email: string
  phone: string
  summary: string
  location: string
  avatarUrl?: string
  linkedin?: string
  github?: string
  website?: string
}

export interface WorkExperience {
  company: string
  position: string
  startDate: string
  endDate: string
  summary: string
  highlights: string[]
}

export interface Education {
  institution: string
  area: string
  studyType: string
  startDate: string
  endDate: string
}

export interface Skill {
  name: string
  level: string
  keywords: string[]
}

export interface Project {
  name: string
  description: string
  url: string
  highlights: string[]
}

export interface Certification {
  name: string
  issuer: string
  date: string
}

export interface Language {
  language: string
  fluency: string
}

export interface ResumeData {
  basics: ResumeBasics
  work: WorkExperience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  certifications: Certification[]
  languages: Language[]
}

export interface ResumeListItem {
  id: string
  title: string
  slug: string
  templateName: string
  updatedAt: string
}

export interface Resume {
  id: string
  title: string
  slug: string
  templateName: string
  data: string
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
}

export const resumeService = {
  getAll: () => api.get<ResumeListItem[]>('/resumes'),

  getById: (id: string) => api.get<Resume>(`/resumes/${id}`),

  create: (params: { title: string; template: string; resumeData: ResumeData }) =>
    api.post<Resume>('/resumes', {
      title: params.title,
      templateName: params.template,
      data: JSON.stringify(params.resumeData),
    }),

  update: (
    id: string,
    params: { title: string; template: string; resumeData: ResumeData },
  ) => api.put<Resume>(`/resumes/${id}`, {
      title: params.title,
      templateName: params.template,
      data: JSON.stringify(params.resumeData),
    }),

  delete: (id: string) => api.delete(`/resumes/${id}`),

  getBySlug: (slug: string) => api.get<Resume>(`/public/resumes/${slug}`),

  downloadPdf: (id: string) =>
    api.get(`/resumes/${id}/pdf`, { responseType: 'blob' }),

  uploadAvatar: (id: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post(`/resumes/${id}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  exportJson: (id: string) => api.get(`/resumes/${id}/export-json`),

  importJson: (data: unknown) => api.post('/resumes/import-json', data),
}
