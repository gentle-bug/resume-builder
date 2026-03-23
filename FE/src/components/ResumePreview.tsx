import React from 'react'
import type { ResumeData } from '../services/resumeService'
import { lighten, darken, alpha } from '../utils/colorUtils'
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react'

interface ResumePreviewProps {
  data: ResumeData | null
  template: string
  primaryColor?: string
  fontFamily?: string
}

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                     */
/* ------------------------------------------------------------------ */

const has = (arr: unknown[] | undefined | null) => arr && arr.length > 0

const levelPercent = (level: string): number => {
  switch ((level || '').toLowerCase()) {
    case 'expert': return 95
    case 'advanced': return 80
    case 'intermediate': return 60
    case 'beginner': return 35
    default: return 50
  }
}

const A4: React.CSSProperties = {
  width: 794,
  minHeight: 1123,
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
}

/* ================================================================== */
/*  1. AZURILL - 2-col, sidebar LEFT, timeline dots                   */
/* ================================================================== */
const Riesling: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const primary = color
  return (
    <div style={{ ...A4, background: '#fff', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: 260, padding: '36px 24px', background: '#F8FAFC', borderRight: `1px solid #E2E8F0` }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: '2px solid #E2E8F0', display: 'block' }} />
        )}
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', margin: 0 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ color: primary, fontSize: 13, margin: '6px 0 0', fontWeight: 500 }}>{basics.label}</p>}
        <div style={{ marginTop: 24, fontSize: 12, color: '#475569', lineHeight: 1.8 }}>
          {basics.email && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={12} />{basics.email}</div>}
          {basics.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={12} />{basics.phone}</div>}
          {basics.location && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={12} />{basics.location}</div>}
          {basics.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Linkedin size={12} />{basics.linkedin}</div>}
          {basics.github && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Github size={12} />{basics.github}</div>}
          {basics.website && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={12} />{basics.website}</div>}
        </div>
        {basics.summary && (
          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: primary, margin: '0 0 10px', fontWeight: 700 }}>Summary</h3>
            <p style={{ fontSize: 12, color: '#334155', lineHeight: 1.6, margin: 0 }}>{basics.summary}</p>
          </div>
        )}
        {has(skills) && (
          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: primary, margin: '0 0 10px', fontWeight: 700 }}>Skills</h3>
            {skills.map((s, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1E293B' }}>{s.name}{s.level && <span style={{ fontWeight: 400, color: '#64748B' }}> - {s.level}</span>}</div>
                {has(s.keywords) && <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{s.keywords.join(', ')}</div>}
              </div>
            ))}
          </div>
        )}
        {has(education) && (
          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: primary, margin: '0 0 10px', fontWeight: 700 }}>Education</h3>
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1E293B' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{e.institution}</div>
                <div style={{ fontSize: 10, color: '#94A3B8' }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {has(certifications) && (
          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: primary, margin: '0 0 10px', fontWeight: 700 }}>Certifications</h3>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1E293B' }}>{cert.name}</div>
                <div style={{ fontSize: 10, color: '#64748B' }}>{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {has(languages) && (
          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: primary, margin: '0 0 10px', fontWeight: 700 }}>Languages</h3>
            {languages.map((l, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1E293B' }}>{l.language}</div>
                {l.fluency && <div style={{ fontSize: 10, color: '#64748B' }}>{l.fluency}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Main */}
      <div style={{ flex: 1, padding: '36px 30px' }}>
        {has(work) && (
          <div>
            <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: primary, margin: '0 0 16px', fontWeight: 700 }}>Experience</h3>
            {work.map((w, i) => (
              <div key={i} style={{ display: 'flex', marginBottom: 20, position: 'relative' }}>
                {/* Timeline */}
                <div style={{ width: 20, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: primary, marginTop: 4 }} />
                  {i < work.length - 1 && <div style={{ width: 2, flex: 1, background: '#CBD5E1', marginTop: 4 }} />}
                </div>
                <div style={{ paddingLeft: 12, flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{w.position}</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{w.company} | {w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</div>
                  {w.summary && <p style={{ fontSize: 12, color: '#334155', margin: '6px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                  {has(w.highlights) && (
                    <ul style={{ margin: '6px 0 0', paddingLeft: 16, fontSize: 12, color: '#334155', lineHeight: 1.7 }}>
                      {w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {has(projects) && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: primary, margin: '0 0 16px', fontWeight: 700 }}>Projects</h3>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{p.name}</div>
                {p.url && <div style={{ fontSize: 11, color: primary }}>{p.url}</div>}
                {p.description && <p style={{ fontSize: 12, color: '#334155', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                {has(p.highlights) && (
                  <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#334155', lineHeight: 1.7 }}>
                    {p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ================================================================== */
/*  2. BRONZOR - CSS grid 5-col, label+content                       */
/* ================================================================== */
const Barolo: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const primary = color
  const SectionRow: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 0, borderTop: `2px solid ${primary}`, paddingTop: 16, marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: primary, paddingRight: 16, paddingTop: 2 }}>{title}</div>
      <div>{children}</div>
    </div>
  )
  return (
    <div style={{ ...A4, background: '#fff', padding: '36px 40px' }}>
      <div style={{ borderTop: `4px solid ${primary}`, paddingTop: 20, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16 }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `2px solid ${primary}` }} />
        )}
        <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1C1917', margin: 0, letterSpacing: -0.5 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ fontSize: 15, color: '#78716C', margin: '4px 0 0' }}>{basics.label}</p>}
        <div style={{ fontSize: 12, color: '#A8A29E', marginTop: 8, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
          {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
          {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
          {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
          {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
          {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
        </div>
        </div>
      </div>
      {basics.summary && (
        <SectionRow title="Summary">
          <p style={{ fontSize: 13, color: '#44403C', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
        </SectionRow>
      )}
      {has(work) && (
        <SectionRow title="Experience">
          {work.map((w, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1C1917' }}>{w.position}</span>
                <span style={{ fontSize: 11, color: '#A8A29E' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
              </div>
              <div style={{ fontSize: 12, color: '#78716C' }}>{w.company}</div>
              {w.summary && <p style={{ fontSize: 12, color: '#44403C', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
              {has(w.highlights) && (
                <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#44403C', lineHeight: 1.6 }}>
                  {w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </SectionRow>
      )}
      {has(education) && (
        <SectionRow title="Education">
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1C1917' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
              <div style={{ fontSize: 12, color: '#78716C' }}>{e.institution} | {e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
            </div>
          ))}
        </SectionRow>
      )}
      {has(skills) && (
        <SectionRow title="Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map((s, i) => (
              <div key={i} style={{ fontSize: 12, background: '#FEF3C7', color: '#92400E', padding: '4px 10px', borderRadius: 4 }}>
                <strong>{s.name}</strong>{s.level ? ` (${s.level})` : ''}
                {has(s.keywords) && <span style={{ color: '#B45309' }}> - {s.keywords.join(', ')}</span>}
              </div>
            ))}
          </div>
        </SectionRow>
      )}
      {has(projects) && (
        <SectionRow title="Projects">
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1C1917' }}>{p.name}</div>
              {p.url && <div style={{ fontSize: 11, color: primary }}>{p.url}</div>}
              {p.description && <p style={{ fontSize: 12, color: '#44403C', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
              {has(p.highlights) && (
                <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#44403C', lineHeight: 1.6 }}>
                  {p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </SectionRow>
      )}
      {has(certifications) && (
        <SectionRow title="Certifications">
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1C1917' }}>{cert.name}</span>
                <span style={{ fontSize: 11, color: '#A8A29E' }}>{cert.date}</span>
              </div>
              <div style={{ fontSize: 12, color: '#78716C' }}>{cert.issuer}</div>
            </div>
          ))}
        </SectionRow>
      )}
      {has(languages) && (
        <SectionRow title="Languages">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {languages.map((l, i) => (
              <span key={i} style={{ fontSize: 12, color: '#44403C' }}><strong>{l.language}</strong>{l.fluency ? ` (${l.fluency})` : ''}</span>
            ))}
          </div>
        </SectionRow>
      )}
    </div>
  )
}

/* ================================================================== */
/*  3. CHIKORITA - 2-col, colored RIGHT sidebar                       */
/* ================================================================== */
const Sauvignon: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const primary = color
  const dark = darken(primary, 40)
  const headingStyle: React.CSSProperties = { fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700, borderBottom: `2px solid ${primary}`, paddingBottom: 6, marginBottom: 14, marginTop: 0 }
  return (
    <div style={{ ...A4, background: '#fff', display: 'flex' }}>
      {/* Main */}
      <div style={{ flex: 1, padding: '36px 28px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: dark, margin: 0 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ color: primary, fontSize: 14, margin: '4px 0 0' }}>{basics.label}</p>}
        {basics.summary && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ ...headingStyle, color: dark }}>Summary</h3>
            <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
          </div>
        )}
        {has(work) && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ ...headingStyle, color: dark }}>Experience</h3>
            {work.map((w, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                  <span style={{ fontSize: 11, color: '#6B7280' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                </div>
                <div style={{ fontSize: 12, color: primary, fontWeight: 500 }}>{w.company}</div>
                {w.summary && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
        {has(projects) && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ ...headingStyle, color: dark }}>Projects</h3>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
                {p.url && <div style={{ fontSize: 11, color: primary }}>{p.url}</div>}
                {p.description && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Sidebar RIGHT */}
      <div style={{ width: 250, background: primary, color: '#fff', padding: '36px 22px' }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 16, border: '2px solid rgba(255,255,255,0.5)', display: 'block' }} />
        )}
        <div style={{ fontSize: 12, lineHeight: 1.9, marginBottom: 28, opacity: 0.9 }}>
          {basics.email && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={12} />{basics.email}</div>}
          {basics.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={12} />{basics.phone}</div>}
          {basics.location && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={12} />{basics.location}</div>}
          {basics.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Linkedin size={12} />{basics.linkedin}</div>}
          {basics.github && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Github size={12} />{basics.github}</div>}
          {basics.website && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={12} />{basics.website}</div>}
        </div>
        {has(skills) && (
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, borderBottom: '2px solid rgba(255,255,255,0.4)', paddingBottom: 6, margin: '0 0 12px', color: '#fff' }}>Skills</h3>
            {skills.map((s, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{s.name}</div>
                {s.level && <div style={{ fontSize: 10, opacity: 0.7 }}>{s.level}</div>}
                {has(s.keywords) && <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>{s.keywords.join(', ')}</div>}
              </div>
            ))}
          </div>
        )}
        {has(education) && (
          <div>
            <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, borderBottom: '2px solid rgba(255,255,255,0.4)', paddingBottom: 6, margin: '0 0 12px', color: '#fff' }}>Education</h3>
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>{e.institution}</div>
                <div style={{ fontSize: 10, opacity: 0.6 }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {has(certifications) && (
          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, borderBottom: '2px solid rgba(255,255,255,0.4)', paddingBottom: 6, margin: '0 0 12px', color: '#fff' }}>Certifications</h3>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{cert.name}</div>
                <div style={{ fontSize: 10, opacity: 0.7 }}>{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {has(languages) && (
          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, borderBottom: '2px solid rgba(255,255,255,0.4)', paddingBottom: 6, margin: '0 0 12px', color: '#fff' }}>Languages</h3>
            {languages.map((l, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{l.language}</div>
                {l.fluency && <div style={{ fontSize: 10, opacity: 0.7 }}>{l.fluency}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ================================================================== */
/*  6. GENGAR - 2-col, sidebar LEFT, bold colored sidebar+header      */
/* ================================================================== */
const Malbec: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const primary = color
  const dark = darken(primary, 30)
  const light = lighten(primary, 85)
  const mid = lighten(primary, 20)
  const headingMain: React.CSSProperties = { fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, color: '#111827', borderBottom: `2px solid ${primary}`, paddingBottom: 6, margin: '0 0 14px' }
  return (
    <div style={{ ...A4, background: '#fff', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: 260, background: light }}>
        <div style={{ background: primary, padding: '28px 22px', color: '#fff' }}>
          {basics.avatarUrl && (
            <img src={basics.avatarUrl} alt="" style={{ width: 76, height: 76, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: '2px solid rgba(255,255,255,0.4)', display: 'block' }} />
          )}
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{basics.name || 'Your Name'}</h1>
          {basics.label && <p style={{ fontSize: 13, margin: '4px 0 0', opacity: 0.9 }}>{basics.label}</p>}
        </div>
        <div style={{ padding: '20px 22px' }}>
          <div style={{ fontSize: 12, color: dark, lineHeight: 1.8, marginBottom: 20 }}>
            {basics.email && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={12} />{basics.email}</div>}
            {basics.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={12} />{basics.phone}</div>}
            {basics.location && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={12} />{basics.location}</div>}
            {basics.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Linkedin size={12} />{basics.linkedin}</div>}
            {basics.github && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Github size={12} />{basics.github}</div>}
            {basics.website && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={12} />{basics.website}</div>}
          </div>
          {has(skills) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: dark, margin: '0 0 10px', fontWeight: 700, borderBottom: `2px solid ${alpha(primary, 0.4)}`, paddingBottom: 4 }}>Skills</h3>
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: darken(primary, 50) }}>{s.name}{s.level && <span style={{ fontWeight: 400, color: mid }}> ({s.level})</span>}</div>
                  {has(s.keywords) && <div style={{ fontSize: 10, color: primary, marginTop: 2 }}>{s.keywords.join(', ')}</div>}
                </div>
              ))}
            </div>
          )}
          {has(education) && (
            <div>
              <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: dark, margin: '0 0 10px', fontWeight: 700, borderBottom: `2px solid ${alpha(primary, 0.4)}`, paddingBottom: 4 }}>Education</h3>
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: darken(primary, 50) }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                  <div style={{ fontSize: 11, color: primary }}>{e.institution}</div>
                  <div style={{ fontSize: 10, color: lighten(primary, 40) }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
                </div>
              ))}
            </div>
          )}
          {has(certifications) && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: dark, margin: '0 0 10px', fontWeight: 700, borderBottom: `2px solid ${alpha(primary, 0.4)}`, paddingBottom: 4 }}>Certifications</h3>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: darken(primary, 50) }}>{cert.name}</div>
                  <div style={{ fontSize: 10, color: primary }}>{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</div>
                </div>
              ))}
            </div>
          )}
          {has(languages) && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: dark, margin: '0 0 10px', fontWeight: 700, borderBottom: `2px solid ${alpha(primary, 0.4)}`, paddingBottom: 4 }}>Languages</h3>
              {languages.map((l, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: darken(primary, 50) }}>{l.language}</div>
                  {l.fluency && <div style={{ fontSize: 10, color: primary }}>{l.fluency}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Main */}
      <div style={{ flex: 1, padding: '36px 28px' }}>
        {basics.summary && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={headingMain}>Summary</h3>
            <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
          </div>
        )}
        {has(work) && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={headingMain}>Experience</h3>
            {work.map((w, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                  <span style={{ fontSize: 11, color: '#9CA3AF' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                </div>
                <div style={{ fontSize: 12, color: primary }}>{w.company}</div>
                {w.summary && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
        {has(projects) && (
          <div>
            <h3 style={headingMain}>Projects</h3>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
                {p.url && <div style={{ fontSize: 11, color: primary }}>{p.url}</div>}
                {p.description && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ================================================================== */
/*  8. KAKUNA - 2-col sidebar RIGHT, center-aligned                   */
/* ================================================================== */
const Champagne: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const primary = color
  const sideBg = lighten(primary, 92)
  const dark = darken(primary, 30)
  const centeredH: React.CSSProperties = { fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, textAlign: 'center', color: '#111827', margin: '0 0 12px', borderBottom: `1px solid #E5E7EB`, paddingBottom: 6 }
  return (
    <div style={{ ...A4, background: '#fff', display: 'flex' }}>
      {/* Main */}
      <div style={{ flex: 1, padding: '30px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          {basics.avatarUrl && (
            <img src={basics.avatarUrl} alt="" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', marginBottom: 10, border: `2px solid ${primary}`, display: 'inline-block' }} />
          )}
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111827', margin: 0 }}>{basics.name || 'Your Name'}</h1>
          {basics.label && <p style={{ color: primary, fontSize: 13, margin: '4px 0 0' }}>{basics.label}</p>}
          <div style={{ fontSize: 11, color: '#6B7280', marginTop: 8, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
            {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
            {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
            {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
            {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
            {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
          </div>
        </div>
        {basics.summary && (
          <div style={{ marginBottom: 20 }}>
            <h3 style={centeredH}>Summary</h3>
            <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.7, margin: 0, textAlign: 'center' }}>{basics.summary}</p>
          </div>
        )}
        {has(work) && (
          <div style={{ marginBottom: 20 }}>
            <h3 style={centeredH}>Experience</h3>
            {work.map((w, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                  <span style={{ fontSize: 11, color: '#9CA3AF' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                </div>
                <div style={{ fontSize: 12, color: primary }}>{w.company}</div>
                {w.summary && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.6 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
        {has(projects) && (
          <div>
            <h3 style={centeredH}>Projects</h3>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
                {p.url && <div style={{ fontSize: 11, color: primary }}>{p.url}</div>}
                {p.description && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.6 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Sidebar right */}
      <div style={{ width: 220, background: sideBg, padding: '30px 18px', borderLeft: `3px solid ${primary}` }}>
        {has(skills) && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, color: primary, margin: '0 0 10px', textAlign: 'center' }}>Skills</h3>
            {skills.map((s, i) => (
              <div key={i} style={{ marginBottom: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: dark }}>{s.name}</div>
                {s.level && <div style={{ fontSize: 10, color: primary }}>{s.level}</div>}
                {has(s.keywords) && <div style={{ fontSize: 10, color: darken(primary, 15), marginTop: 2 }}>{s.keywords.join(', ')}</div>}
              </div>
            ))}
          </div>
        )}
        {has(education) && (
          <div>
            <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, color: primary, margin: '0 0 10px', textAlign: 'center' }}>Education</h3>
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: dark }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                <div style={{ fontSize: 11, color: darken(primary, 15) }}>{e.institution}</div>
                <div style={{ fontSize: 10, color: lighten(primary, 30) }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {has(certifications) && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, color: primary, margin: '0 0 10px', textAlign: 'center' }}>Certifications</h3>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: dark }}>{cert.name}</div>
                <div style={{ fontSize: 10, color: darken(primary, 15) }}>{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {has(languages) && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, color: primary, margin: '0 0 10px', textAlign: 'center' }}>Languages</h3>
            {languages.map((l, i) => (
              <div key={i} style={{ marginBottom: 6, textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: dark }}>{l.language}</div>
                {l.fluency && <div style={{ fontSize: 10, color: darken(primary, 15) }}>{l.fluency}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ================================================================== */
/*  9. LAPRAS - Card-style bordered sections, floating labels          */
/* ================================================================== */
const Bordeaux: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const primary = color
  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div style={{ border: `1.5px solid #CBD5E1`, borderRadius: 8, padding: '20px 18px 14px', marginBottom: 18, position: 'relative' }}>
      <span style={{ position: 'absolute', top: -10, left: 16, background: '#fff', padding: '0 8px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: primary }}>{title}</span>
      {children}
    </div>
  )
  return (
    <div style={{ ...A4, background: '#fff', padding: '36px 36px' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 76, height: 76, borderRadius: '50%', objectFit: 'cover', marginBottom: 10, border: `2px solid ${primary}`, display: 'inline-block' }} />
        )}
        <h1 style={{ fontSize: 30, fontWeight: 700, color: '#0F172A', margin: 0 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ color: primary, fontSize: 14, margin: '4px 0 0' }}>{basics.label}</p>}
        <div style={{ fontSize: 12, color: '#64748B', marginTop: 8, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
          {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
          {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
          {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
          {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
          {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
        </div>
      </div>
      {basics.summary && (
        <Section title="Summary">
          <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
        </Section>
      )}
      {has(work) && (
        <Section title="Experience">
          {work.map((w, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{w.position}</span>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
              </div>
              <div style={{ fontSize: 12, color: primary }}>{w.company}</div>
              {w.summary && <p style={{ fontSize: 12, color: '#334155', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
              {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#334155', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
            </div>
          ))}
        </Section>
      )}
      <div style={{ display: 'flex', gap: 18 }}>
        {has(education) && (
          <div style={{ flex: 1 }}>
            <Section title="Education">
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>{e.institution}</div>
                  <div style={{ fontSize: 10, color: '#94A3B8' }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
                </div>
              ))}
            </Section>
          </div>
        )}
        {has(skills) && (
          <div style={{ flex: 1 }}>
            <Section title="Skills">
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{s.name}</span>
                  {s.level && <span style={{ fontSize: 11, color: '#64748B' }}> ({s.level})</span>}
                  {has(s.keywords) && <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 1 }}>{s.keywords.join(', ')}</div>}
                </div>
              ))}
            </Section>
          </div>
        )}
      </div>
      {has(projects) && (
        <Section title="Projects">
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{p.name}{p.url && <span style={{ fontSize: 11, color: primary, fontWeight: 400, marginLeft: 8 }}>{p.url}</span>}</div>
              {p.description && <p style={{ fontSize: 12, color: '#334155', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
              {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#334155', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
            </div>
          ))}
        </Section>
      )}
      <div style={{ display: 'flex', gap: 18 }}>
        {has(certifications) && (
          <div style={{ flex: 1 }}>
            <Section title="Certifications">
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{cert.name}</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</div>
                </div>
              ))}
            </Section>
          </div>
        )}
        {has(languages) && (
          <div style={{ flex: 1 }}>
            <Section title="Languages">
              {languages.map((l, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{l.language}</span>
                  {l.fluency && <span style={{ fontSize: 11, color: '#64748B' }}> ({l.fluency})</span>}
                </div>
              ))}
            </Section>
          </div>
        )}
      </div>
    </div>
  )
}

/* ================================================================== */
/*  10. LEAFISH - 2-col sidebar RIGHT, two-tone header                */
/* ================================================================== */
const PinotGrigio: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const primary = color
  const dark = darken(primary, 30)
  const mid = lighten(primary, 20)
  const light = lighten(primary, 40)
  const heading: React.CSSProperties = { fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, color: dark, fontWeight: 700, margin: '0 0 12px' }
  return (
    <div style={{ ...A4, background: '#fff' }}>
      {/* Header */}
      <div style={{ background: `${primary}18`, padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {basics.avatarUrl && (
            <img src={basics.avatarUrl} alt="" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `2px solid ${primary}40` }} />
          )}
          <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: dark, margin: 0 }}>{basics.name || 'Your Name'}</h1>
          {basics.label && <p style={{ color: primary, fontSize: 14, margin: '4px 0 0' }}>{basics.label}</p>}
          </div>
        </div>
        <div style={{ fontSize: 12, color: dark, textAlign: 'right', lineHeight: 1.8 }}>
          {basics.email && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}><Mail size={12} />{basics.email}</div>}
          {basics.phone && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}><Phone size={12} />{basics.phone}</div>}
          {basics.location && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}><MapPin size={12} />{basics.location}</div>}
          {basics.linkedin && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}><Linkedin size={12} />{basics.linkedin}</div>}
          {basics.github && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}><Github size={12} />{basics.github}</div>}
          {basics.website && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}><Globe size={12} />{basics.website}</div>}
        </div>
      </div>
      {basics.summary && (
        <div style={{ background: `${primary}08`, padding: '14px 32px', borderBottom: `2px solid ${primary}30` }}>
          <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
        </div>
      )}
      <div style={{ display: 'flex' }}>
        {/* Main */}
        <div style={{ flex: 1, padding: '24px 28px' }}>
          {has(work) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={heading}>Experience</h3>
              {work.map((w, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                    <span style={{ fontSize: 11, color: '#9CA3AF' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                  </div>
                  <div style={{ fontSize: 12, color: primary }}>{w.company}</div>
                  {w.summary && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                  {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
                </div>
              ))}
            </div>
          )}
          {has(projects) && (
            <div>
              <h3 style={heading}>Projects</h3>
              {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
                  {p.url && <div style={{ fontSize: 11, color: primary }}>{p.url}</div>}
                  {p.description && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                  {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Sidebar RIGHT */}
        <div style={{ width: 230, padding: '24px 20px', borderLeft: `2px solid ${primary}20` }}>
          {has(skills) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={heading}>Skills</h3>
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: dark }}>{s.name}</div>
                  {s.level && <div style={{ fontSize: 10, color: mid }}>{s.level}</div>}
                  {has(s.keywords) && <div style={{ fontSize: 10, color: light, marginTop: 2 }}>{s.keywords.join(', ')}</div>}
                </div>
              ))}
            </div>
          )}
          {has(education) && (
            <div>
              <h3 style={heading}>Education</h3>
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: dark }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                  <div style={{ fontSize: 11, color: mid }}>{e.institution}</div>
                  <div style={{ fontSize: 10, color: light }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
                </div>
              ))}
            </div>
          )}
          {has(certifications) && (
            <div style={{ marginTop: 24 }}>
              <h3 style={heading}>Certifications</h3>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: dark }}>{cert.name}</div>
                  <div style={{ fontSize: 10, color: mid }}>{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</div>
                </div>
              ))}
            </div>
          )}
          {has(languages) && (
            <div style={{ marginTop: 24 }}>
              <h3 style={heading}>Languages</h3>
              {languages.map((l, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: dark }}>{l.language}</div>
                  {l.fluency && <div style={{ fontSize: 10, color: mid }}>{l.fluency}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/*  11. ONYX - 2-col sidebar RIGHT, clean professional                */
/* ================================================================== */
const Cabernet: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const primary = color
  const heading: React.CSSProperties = { fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, color: primary, fontWeight: 700, margin: '0 0 14px' }
  return (
    <div style={{ ...A4, background: '#fff' }}>
      <div style={{ padding: '32px 36px 16px', borderBottom: '2px solid #111827', display: 'flex', alignItems: 'center', gap: 16 }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid #111827' }} />
        )}
        <div>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: '#111827', margin: 0, letterSpacing: -0.5 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ fontSize: 14, color: '#6B7280', margin: '4px 0 0' }}>{basics.label}</p>}
        <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 8, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
          {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
          {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
          {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
          {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
          {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
        </div>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        {/* Main */}
        <div style={{ flex: 1, padding: '24px 28px 24px 36px' }}>
          {basics.summary && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={heading}>Profile</h3>
              <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
            </div>
          )}
          {has(work) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={heading}>Experience</h3>
              {work.map((w, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                    <span style={{ fontSize: 11, color: '#9CA3AF' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{w.company}</div>
                  {w.summary && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                  {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
                </div>
              ))}
            </div>
          )}
          {has(projects) && (
            <div>
              <h3 style={heading}>Projects</h3>
              {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
                  {p.url && <div style={{ fontSize: 11, color: '#6B7280' }}>{p.url}</div>}
                  {p.description && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                  {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Sidebar RIGHT */}
        <div style={{ width: 220, padding: '24px 20px', borderLeft: '1px solid #E5E7EB' }}>
          {has(skills) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={heading}>Skills</h3>
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{s.name}</div>
                  {s.level && <div style={{ fontSize: 10, color: '#9CA3AF' }}>{s.level}</div>}
                  {has(s.keywords) && <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>{s.keywords.join(', ')}</div>}
                </div>
              ))}
            </div>
          )}
          {has(education) && (
            <div>
              <h3 style={heading}>Education</h3>
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                  <div style={{ fontSize: 11, color: '#6B7280' }}>{e.institution}</div>
                  <div style={{ fontSize: 10, color: '#9CA3AF' }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
                </div>
              ))}
            </div>
          )}
          {has(certifications) && (
            <div style={{ marginTop: 24 }}>
              <h3 style={heading}>Certifications</h3>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{cert.name}</div>
                  <div style={{ fontSize: 10, color: '#9CA3AF' }}>{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</div>
                </div>
              ))}
            </div>
          )}
          {has(languages) && (
            <div style={{ marginTop: 24 }}>
              <h3 style={heading}>Languages</h3>
              {languages.map((l, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{l.language}</div>
                  {l.fluency && <div style={{ fontSize: 10, color: '#9CA3AF' }}>{l.fluency}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/*  12. PIKACHU - 2-col sidebar LEFT, colored header card              */
/* ================================================================== */
const Prosecco: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const primary = color
  const dark = darken(primary, 40)
  const mid = darken(primary, 20)
  const sHeading: React.CSSProperties = { fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: dark, fontWeight: 700, margin: '0 0 10px' }
  const mHeading: React.CSSProperties = { fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, color: '#111827', fontWeight: 700, margin: '0 0 14px' }
  return (
    <div style={{ ...A4, background: '#fff', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: 260, padding: '24px 20px' }}>
        {/* Header card */}
        <div style={{ background: primary, borderRadius: 12, padding: '24px 18px', color: dark, marginBottom: 24 }}>
          {basics.avatarUrl && (
            <img src={basics.avatarUrl} alt="" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', marginBottom: 10, border: `2px solid ${darken(primary, 50)}`, display: 'block' }} />
          )}
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: darken(primary, 50) }}>{basics.name || 'Your Name'}</h1>
          {basics.label && <p style={{ fontSize: 12, margin: '4px 0 0', color: dark }}>{basics.label}</p>}
          <div style={{ fontSize: 11, marginTop: 12, lineHeight: 1.8, color: mid }}>
            {basics.email && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={12} />{basics.email}</div>}
            {basics.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={12} />{basics.phone}</div>}
            {basics.location && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={12} />{basics.location}</div>}
            {basics.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Linkedin size={12} />{basics.linkedin}</div>}
            {basics.github && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Github size={12} />{basics.github}</div>}
            {basics.website && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={12} />{basics.website}</div>}
          </div>
        </div>
        {has(skills) && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={sHeading}>Skills</h3>
            {skills.map((s, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: darken(primary, 50) }}>{s.name}</div>
                {s.level && (
                  <div style={{ background: lighten(primary, 85), borderRadius: 4, height: 5, marginTop: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${levelPercent(s.level)}%`, height: '100%', background: primary, borderRadius: 4 }} />
                  </div>
                )}
                {has(s.keywords) && <div style={{ fontSize: 10, color: darken(primary, 25), marginTop: 3 }}>{s.keywords.join(', ')}</div>}
              </div>
            ))}
          </div>
        )}
        {has(education) && (
          <div>
            <h3 style={sHeading}>Education</h3>
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: darken(primary, 50) }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                <div style={{ fontSize: 11, color: mid }}>{e.institution}</div>
                <div style={{ fontSize: 10, color: primary }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {has(certifications) && (
          <div style={{ marginTop: 24 }}>
            <h3 style={sHeading}>Certifications</h3>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: darken(primary, 50) }}>{cert.name}</div>
                <div style={{ fontSize: 10, color: mid }}>{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {has(languages) && (
          <div style={{ marginTop: 24 }}>
            <h3 style={sHeading}>Languages</h3>
            {languages.map((l, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: darken(primary, 50) }}>{l.language}</div>
                {l.fluency && <div style={{ fontSize: 10, color: mid }}>{l.fluency}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Main */}
      <div style={{ flex: 1, padding: '36px 28px', borderLeft: `1px solid ${lighten(primary, 70)}` }}>
        {basics.summary && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={mHeading}>Summary</h3>
            <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
          </div>
        )}
        {has(work) && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={mHeading}>Experience</h3>
            {work.map((w, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                  <span style={{ fontSize: 11, color: '#9CA3AF' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                </div>
                <div style={{ fontSize: 12, color: primary }}>{w.company}</div>
                {w.summary && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
        {has(projects) && (
          <div>
            <h3 style={mHeading}>Projects</h3>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
                {p.url && <div style={{ fontSize: 11, color: primary }}>{p.url}</div>}
                {p.description && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ================================================================== */
/*  14. CUSTOM-DEVSTACK - Dark sidebar, skill chips, IDE aesthetic     */
/* ================================================================== */
const Absinthe: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const dark = '#1A1A2E'
  const accent = color
  const chipColors = ['#61DAFB', '#38BDF8', '#A78BFA', '#F472B6', '#34D399', '#FBBF24']
  return (
    <div style={{ ...A4, background: '#fff', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: 238, background: dark, color: '#E2E8F0', padding: '32px 20px' }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 14, border: `3px solid ${accent}`, display: 'block' }} />
        )}
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ color: accent, fontSize: 12, margin: '6px 0 0', fontFamily: 'monospace' }}>&gt; {basics.label}</p>}
        <div style={{ marginTop: 20, fontSize: 11, lineHeight: 1.9, color: '#94A3B8', borderTop: '1px solid #334155', paddingTop: 14 }}>
          {basics.email && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={12} />{basics.email}</div>}
          {basics.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={12} />{basics.phone}</div>}
          {basics.location && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={12} />{basics.location}</div>}
          {basics.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Linkedin size={12} />{basics.linkedin}</div>}
          {basics.github && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Github size={12} />{basics.github}</div>}
          {basics.website && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={12} />{basics.website}</div>}
        </div>
        {has(skills) && (
          <div style={{ marginTop: 24, borderTop: '1px solid #334155', paddingTop: 14 }}>
            <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: accent, margin: '0 0 10px', fontWeight: 600 }}>Tech Stack</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map((s, i) => (
                <React.Fragment key={i}>
                  <span style={{ fontSize: 10, background: chipColors[i % chipColors.length] + '30', color: chipColors[i % chipColors.length], padding: '3px 8px', borderRadius: 10, fontWeight: 600, border: `1px solid ${chipColors[i % chipColors.length]}40` }}>{s.name}</span>
                  {has(s.keywords) && s.keywords.map((kw, j) => (
                    <span key={j} style={{ fontSize: 9, background: '#334155', color: '#94A3B8', padding: '2px 7px', borderRadius: 8 }}>{kw}</span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {has(education) && (
          <div style={{ marginTop: 24, borderTop: '1px solid #334155', paddingTop: 14 }}>
            <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: accent, margin: '0 0 10px', fontWeight: 600 }}>Education</h3>
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#E2E8F0' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                <div style={{ fontSize: 10, color: '#64748B' }}>{e.institution}</div>
                <div style={{ fontSize: 9, color: '#475569' }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {has(certifications) && (
          <div style={{ marginTop: 24, borderTop: '1px solid #334155', paddingTop: 14 }}>
            <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: accent, margin: '0 0 10px', fontWeight: 600 }}>Certifications</h3>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#E2E8F0' }}>{cert.name}</div>
                <div style={{ fontSize: 10, color: '#64748B' }}>{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {has(languages) && (
          <div style={{ marginTop: 24, borderTop: '1px solid #334155', paddingTop: 14 }}>
            <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: accent, margin: '0 0 10px', fontWeight: 600 }}>Languages</h3>
            {languages.map((l, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#E2E8F0' }}>{l.language}</div>
                {l.fluency && <div style={{ fontSize: 10, color: '#64748B' }}>{l.fluency}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Main */}
      <div style={{ flex: 1, padding: '32px 28px' }}>
        {basics.summary && (
          <div style={{ marginBottom: 24, padding: '14px 16px', background: '#F8FAFC', borderRadius: 8, borderLeft: `3px solid ${accent}` }}>
            <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
          </div>
        )}
        {has(work) && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: 1 }}>Experience</h3>
            {work.map((w, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{w.position}</span>
                  <span style={{ fontSize: 10, color: '#94A3B8', fontFamily: 'monospace' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                </div>
                <div style={{ fontSize: 12, color: '#0891B2', fontWeight: 500 }}>{w.company}</div>
                {w.summary && <p style={{ fontSize: 12, color: '#475569', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#475569', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
        {has(projects) && (
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: 1 }}>Projects</h3>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{p.name}</div>
                {p.url && <div style={{ fontSize: 11, color: '#0891B2', fontFamily: 'monospace' }}>{p.url}</div>}
                {p.description && <p style={{ fontSize: 12, color: '#475569', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#475569', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ================================================================== */
/*  15. CUSTOM-CLEANSLATE - Single-col, ATS-friendly, blue accents    */
/* ================================================================== */
const Hennessy: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const accent = color
  const heading: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: '#111827', margin: '0 0 14px', borderBottom: `2px solid ${accent}`, paddingBottom: 4 }
  return (
    <div style={{ ...A4, background: '#fff', padding: '40px 48px', maxWidth: 794 }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 76, height: 76, borderRadius: '50%', objectFit: 'cover', marginBottom: 10, border: `2px solid ${accent}`, display: 'inline-block' }} />
        )}
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', margin: 0 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ color: '#6B7280', fontSize: 14, margin: '4px 0 0' }}>{basics.label}</p>}
        <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 8, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
          {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
          {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
          {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
          {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
          {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
        </div>
      </div>
      {basics.summary && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={heading}>SUMMARY</h3>
          <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
        </div>
      )}
      {has(work) && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={heading}>EXPERIENCE</h3>
          {work.map((w, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
              </div>
              <div style={{ fontSize: 12, color: accent }}>{w.company}</div>
              {w.summary && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
              {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
            </div>
          ))}
        </div>
      )}
      {has(education) && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={heading}>EDUCATION</h3>
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</span>
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</span>
              </div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>{e.institution}</div>
            </div>
          ))}
        </div>
      )}
      {has(skills) && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={heading}>SKILLS</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px 16px' }}>
            {skills.map((s, i) => (
              <div key={i}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{s.name}</span>
                {s.level && <span style={{ fontSize: 10, color: '#9CA3AF' }}> ({s.level})</span>}
                {has(s.keywords) && <div style={{ fontSize: 10, color: '#6B7280', marginTop: 1 }}>{s.keywords.join(', ')}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      {has(projects) && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={heading}>PROJECTS</h3>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}{p.url && <span style={{ fontSize: 11, color: accent, fontWeight: 400, marginLeft: 8 }}>{p.url}</span>}</div>
              {p.description && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
              {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
            </div>
          ))}
        </div>
      )}
      {has(certifications) && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={heading}>CERTIFICATIONS</h3>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{cert.name}</span>
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>{cert.date}</span>
              </div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>{cert.issuer}</div>
            </div>
          ))}
        </div>
      )}
      {has(languages) && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={heading}>LANGUAGES</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {languages.map((l, i) => (
              <span key={i} style={{ fontSize: 12, color: '#374151' }}><strong>{l.language}</strong>{l.fluency ? ` (${l.fluency})` : ''}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ================================================================== */
/*  16. CUSTOM-TECHGRID - 2-col + dark header, skill cards            */
/* ================================================================== */
const Tanqueray: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const dark = '#0D1B2A'
  const accent = color
  const cardColors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B']
  return (
    <div style={{ ...A4, background: '#fff' }}>
      {/* Full-width dark header */}
      <div style={{ background: dark, color: '#fff', padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 16 }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `3px solid ${accent}` }} />
        )}
        <div>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ color: accent, fontSize: 14, margin: '4px 0 0' }}>{basics.label}</p>}
        <div style={{ fontSize: 12, marginTop: 10, color: '#94A3B8', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
          {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
          {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
          {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
          {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
          {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
        </div>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: 278, padding: '24px 20px', borderRight: '1px solid #E2E8F0' }}>
          {has(skills) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#0F172A', fontWeight: 700, margin: '0 0 12px' }}>Skills</h3>
              {skills.map((s, i) => (
                <div key={i} style={{ borderLeft: `3px solid ${cardColors[i % cardColors.length]}`, padding: '8px 12px', marginBottom: 10, background: '#F8FAFC', borderRadius: '0 6px 6px 0' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{s.name}{s.level && <span style={{ fontWeight: 400, color: '#64748B' }}> - {s.level}</span>}</div>
                  {has(s.keywords) && <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 3 }}>{s.keywords.join(', ')}</div>}
                </div>
              ))}
            </div>
          )}
          {has(education) && (
            <div>
              <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#0F172A', fontWeight: 700, margin: '0 0 12px' }}>Education</h3>
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>{e.institution}</div>
                  <div style={{ fontSize: 10, color: '#94A3B8' }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
                </div>
              ))}
            </div>
          )}
          {has(certifications) && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#0F172A', fontWeight: 700, margin: '0 0 12px' }}>Certifications</h3>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{cert.name}</div>
                  <div style={{ fontSize: 10, color: '#94A3B8' }}>{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</div>
                </div>
              ))}
            </div>
          )}
          {has(languages) && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#0F172A', fontWeight: 700, margin: '0 0 12px' }}>Languages</h3>
              {languages.map((l, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{l.language}</div>
                  {l.fluency && <div style={{ fontSize: 10, color: '#64748B' }}>{l.fluency}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Main */}
        <div style={{ flex: 1, padding: '24px 28px' }}>
          {basics.summary && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#0F172A', fontWeight: 700, margin: '0 0 10px' }}>Summary</h3>
              <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
            </div>
          )}
          {has(work) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#0F172A', fontWeight: 700, margin: '0 0 14px' }}>Experience</h3>
              {work.map((w, i) => (
                <div key={i} style={{ display: 'flex', marginBottom: 16 }}>
                  {/* Dotted timeline */}
                  <div style={{ width: 16, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent, marginTop: 5 }} />
                    {i < work.length - 1 && <div style={{ width: 0, flex: 1, borderLeft: '2px dotted #CBD5E1', marginTop: 4 }} />}
                  </div>
                  <div style={{ flex: 1, paddingLeft: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{w.position}</span>
                      <span style={{ fontSize: 11, color: '#94A3B8' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#0284C7' }}>{w.company}</div>
                    {w.summary && <p style={{ fontSize: 12, color: '#475569', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                    {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#475569', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
                  </div>
                </div>
              ))}
            </div>
          )}
          {has(projects) && (
            <div>
              <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#0F172A', fontWeight: 700, margin: '0 0 14px' }}>Projects</h3>
              {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{p.name}</div>
                  {p.url && <div style={{ fontSize: 11, color: '#0284C7' }}>{p.url}</div>}
                  {p.description && <p style={{ fontSize: 12, color: '#475569', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                  {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#475569', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/*  17. CUSTOM-MINIMALPRO - Single-col, Apple-inspired, teal accent   */
/* ================================================================== */
const Belvedere: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const accent = color
  const heading: React.CSSProperties = { fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: '#374151', margin: '0 0 16px' }
  return (
    <div style={{ ...A4, background: '#fff', padding: '48px 52px', position: 'relative' }}>
      {/* Teal accent bar on right */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 4, height: '100%', background: accent }} />
      <div style={{ marginBottom: 40 }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 76, height: 76, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: `2px solid ${accent}`, display: 'block' }} />
        )}
        <h1 style={{ fontSize: 32, fontWeight: 300, color: '#111827', margin: 0, letterSpacing: -0.5 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ color: accent, fontSize: 15, margin: '6px 0 0', fontWeight: 400 }}>{basics.label}</p>}
        <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 12, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
          {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
          {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
          {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
          {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
          {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
        </div>
      </div>
      {basics.summary && (
        <div style={{ marginBottom: 36 }}>
          <h3 style={heading}>About</h3>
          <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.8, margin: 0 }}>{basics.summary}</p>
        </div>
      )}
      {has(work) && (
        <div style={{ marginBottom: 36 }}>
          <h3 style={heading}>Experience</h3>
          {work.map((w, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                <span style={{ fontSize: 11, color: '#6B7280' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
              </div>
              <div style={{ fontSize: 12, color: accent, marginTop: 2 }}>{w.company}</div>
              {w.summary && <p style={{ fontSize: 12, color: '#6B7280', margin: '6px 0 0', lineHeight: 1.7 }}>{w.summary}</p>}
              {has(w.highlights) && <ul style={{ margin: '6px 0 0', paddingLeft: 16, fontSize: 12, color: '#6B7280', lineHeight: 1.8 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
            </div>
          ))}
        </div>
      )}
      {has(education) && (
        <div style={{ marginBottom: 36 }}>
          <h3 style={heading}>Education</h3>
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>{e.institution} | {e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
            </div>
          ))}
        </div>
      )}
      {has(skills) && (
        <div style={{ marginBottom: 36 }}>
          <h3 style={heading}>Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map((s, i) => (
              <span key={i} style={{ fontSize: 12, background: '#F3F4F6', color: '#374151', padding: '5px 14px', borderRadius: 20, fontWeight: 500 }}>
                {s.name}{s.level ? ` (${s.level})` : ''}
              </span>
            ))}
          </div>
        </div>
      )}
      {has(projects) && (
        <div style={{ marginBottom: 36 }}>
          <h3 style={heading}>Projects</h3>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>{p.name}</div>
              {p.url && <div style={{ fontSize: 11, color: accent }}>{p.url}</div>}
              {p.description && <p style={{ fontSize: 12, color: '#6B7280', margin: '4px 0 0', lineHeight: 1.7 }}>{p.description}</p>}
              {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#6B7280', lineHeight: 1.8 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
            </div>
          ))}
        </div>
      )}
      {has(certifications) && (
        <div style={{ marginBottom: 36 }}>
          <h3 style={heading}>Certifications</h3>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>{cert.name}</span>
                <span style={{ fontSize: 11, color: '#6B7280' }}>{cert.date}</span>
              </div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>{cert.issuer}</div>
            </div>
          ))}
        </div>
      )}
      {has(languages) && (
        <div style={{ marginBottom: 36 }}>
          <h3 style={heading}>Languages</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {languages.map((l, i) => (
              <span key={i} style={{ fontSize: 12, background: '#F3F4F6', color: '#374151', padding: '5px 14px', borderRadius: 20, fontWeight: 500 }}>
                {l.language}{l.fluency ? ` (${l.fluency})` : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ================================================================== */
/*  18. CUSTOM-NIGHTOWL - Dark theme, code-editor aesthetic           */
/* ================================================================== */
const Lagavulin: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const bg = '#1E1E2E'
  const text = '#CDD6F4'
  const comment = '#6C7086'
  const green = '#A6E3A1'
  const blue = '#89B4FA'
  const mauve = color
  const peach = '#FAB387'
  const red = '#F38BA8'
  const yellow = '#F9E2AF'
  const skillColors = [blue, green, mauve, peach, red, yellow]
  return (
    <div style={{ ...A4, background: bg, color: text, padding: '36px 40px' }}>
      <div style={{ marginBottom: 28 }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 76, height: 76, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: '3px solid #45475A', display: 'block' }} />
        )}
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#CBA6F7', margin: 0 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ color: green, fontSize: 13, margin: '4px 0 0' }}>{'/* '}{basics.label}{' */'}</p>}
        <div style={{ fontSize: 11, color: comment, marginTop: 10, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
          {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
          {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
          {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
          {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
          {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
        </div>
      </div>
      {basics.summary && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 13, color: comment, margin: '0 0 8px', fontWeight: 400 }}>{'// SUMMARY'}</h3>
          <p style={{ fontSize: 12, color: text, lineHeight: 1.7, margin: 0, paddingLeft: 16, borderLeft: `2px solid #45475A` }}>{basics.summary}</p>
        </div>
      )}
      {has(work) && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 13, color: comment, margin: '0 0 12px', fontWeight: 400 }}>{'// EXPERIENCE'}</h3>
          {work.map((w, i) => (
            <div key={i} style={{ marginBottom: 16, paddingLeft: 16, borderLeft: `2px solid #45475A` }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: blue }}>{w.position}</div>
              <div style={{ fontSize: 12, color: peach }}>{w.company} <span style={{ color: comment }}>|</span> <span style={{ color: yellow }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span></div>
              {w.summary && <p style={{ fontSize: 12, color: '#BAC2DE', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
              {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#BAC2DE', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j} style={{ listStyleType: '"- "' }}>{h}</li>)}</ul>}
            </div>
          ))}
        </div>
      )}
      {has(education) && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 13, color: comment, margin: '0 0 12px', fontWeight: 400 }}>{'// EDUCATION'}</h3>
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: 10, paddingLeft: 16, borderLeft: `2px solid #45475A` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: mauve }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
              <div style={{ fontSize: 11, color: comment }}>{e.institution} | {e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
            </div>
          ))}
        </div>
      )}
      {has(skills) && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 13, color: comment, margin: '0 0 12px', fontWeight: 400 }}>{'// SKILLS'}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map((s, i) => (
              <span key={i} style={{ fontSize: 11, color: skillColors[i % skillColors.length], background: `${skillColors[i % skillColors.length]}15`, padding: '4px 10px', borderRadius: 4, border: `1px solid ${skillColors[i % skillColors.length]}30` }}>
                {s.name}{s.level ? `: ${s.level}` : ''}
              </span>
            ))}
          </div>
        </div>
      )}
      {has(projects) && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 13, color: comment, margin: '0 0 12px', fontWeight: 400 }}>{'// PROJECTS'}</h3>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 14, paddingLeft: 16, borderLeft: `2px solid #45475A` }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: green }}>{p.name}</div>
              {p.url && <div style={{ fontSize: 11, color: blue }}>{p.url}</div>}
              {p.description && <p style={{ fontSize: 12, color: '#BAC2DE', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
              {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#BAC2DE', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j} style={{ listStyleType: '"- "' }}>{h}</li>)}</ul>}
            </div>
          ))}
        </div>
      )}
      {has(certifications) && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 13, color: comment, margin: '0 0 12px', fontWeight: 400 }}>{'// CERTIFICATIONS'}</h3>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: 10, paddingLeft: 16, borderLeft: `2px solid #45475A` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: mauve }}>{cert.name}</div>
              <div style={{ fontSize: 11, color: comment }}>{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</div>
            </div>
          ))}
        </div>
      )}
      {has(languages) && (
        <div>
          <h3 style={{ fontSize: 13, color: comment, margin: '0 0 12px', fontWeight: 400 }}>{'// LANGUAGES'}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {languages.map((l, i) => (
              <span key={i} style={{ fontSize: 11, color: green, background: `${green}15`, padding: '4px 10px', borderRadius: 4, border: `1px solid ${green}30` }}>
                {l.language}{l.fluency ? `: ${l.fluency}` : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ================================================================== */
/*  19. CUSTOM-BLUEPRINT - 2-col, navy, pale blue sidebar, bar charts */
/* ================================================================== */
const Macallan: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const navy = color
  const accent = lighten(navy, 50)
  const paleBg = lighten(navy, 92)
  return (
    <div style={{ ...A4, background: '#fff', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: 200, background: paleBg, padding: '32px 16px' }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', marginBottom: 14, border: `2px solid ${navy}`, display: 'block' }} />
        )}
        <div style={{ fontSize: 11, color: navy, lineHeight: 1.9, marginBottom: 24, borderBottom: `2px solid ${accent}`, paddingBottom: 14 }}>
          {basics.email && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={12} />{basics.email}</div>}
          {basics.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={12} />{basics.phone}</div>}
          {basics.location && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={12} />{basics.location}</div>}
          {basics.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Linkedin size={12} />{basics.linkedin}</div>}
          {basics.github && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Github size={12} />{basics.github}</div>}
          {basics.website && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={12} />{basics.website}</div>}
        </div>
        {has(skills) && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: navy, fontWeight: 700, margin: '0 0 10px' }}>Skills</h3>
            {skills.map((s, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: navy, fontWeight: 600, marginBottom: 3 }}>
                  <span>{s.name}</span>
                  {s.level && <span style={{ fontSize: 9, color: '#64748B' }}>{s.level}</span>}
                </div>
                <div style={{ background: lighten(navy, 80), borderRadius: 3, height: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${levelPercent(s.level)}%`, height: '100%', background: `linear-gradient(90deg, ${navy}, ${accent})`, borderRadius: 3 }} />
                </div>
                {has(s.keywords) && <div style={{ fontSize: 9, color: '#64748B', marginTop: 2 }}>{s.keywords.join(', ')}</div>}
              </div>
            ))}
          </div>
        )}
        {has(education) && (
          <div>
            <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: navy, fontWeight: 700, margin: '0 0 10px' }}>Education</h3>
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: navy }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                <div style={{ fontSize: 10, color: lighten(navy, 30) }}>{e.institution}</div>
                <div style={{ fontSize: 9, color: lighten(navy, 50) }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {has(certifications) && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: navy, fontWeight: 700, margin: '0 0 10px' }}>Certifications</h3>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: navy }}>{cert.name}</div>
                <div style={{ fontSize: 10, color: lighten(navy, 30) }}>{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {has(languages) && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: navy, fontWeight: 700, margin: '0 0 10px' }}>Languages</h3>
            {languages.map((l, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: navy }}>{l.language}</div>
                {l.fluency && <div style={{ fontSize: 10, color: lighten(navy, 30) }}>{l.fluency}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Main */}
      <div style={{ flex: 1, padding: '32px 28px' }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: navy, margin: 0 }}>{basics.name || 'Your Name'}</h1>
          {basics.label && <p style={{ color: accent, fontSize: 14, margin: '4px 0 0', fontWeight: 600 }}>{basics.label}</p>}
        </div>
        {basics.summary && (
          <div style={{ marginBottom: 24, padding: '12px 16px', background: paleBg, borderLeft: `3px solid ${accent}`, borderRadius: '0 6px 6px 0' }}>
            <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
          </div>
        )}
        {has(work) && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, color: navy, fontWeight: 700, margin: '0 0 14px', borderBottom: `2px solid ${accent}`, paddingBottom: 6, display: 'inline-block' }}>Experience</h3>
            {work.map((w, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: navy }}>{w.position}</span>
                  <span style={{ fontSize: 11, color: lighten(navy, 50) }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                </div>
                <div style={{ fontSize: 12, color: accent, fontWeight: 500 }}>{w.company}</div>
                {w.summary && <p style={{ fontSize: 12, color: '#475569', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#475569', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
        {has(projects) && (
          <div>
            <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, color: navy, fontWeight: 700, margin: '0 0 14px', borderBottom: `2px solid ${accent}`, paddingBottom: 6, display: 'inline-block' }}>Projects</h3>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: navy }}>{p.name}</div>
                {p.url && <div style={{ fontSize: 11, color: lighten(navy, 30) }}>{p.url}</div>}
                {p.description && <p style={{ fontSize: 12, color: '#475569', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#475569', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ================================================================== */
/*  20. CUSTOM-ZENITH - Asymmetric 2-col, gradient header, ring skill */
/* ================================================================== */
const Aperol: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const indigo = color
  const purple = '#A855F7'
  const sectionIcons: Record<string, string> = { Summary: 'S', Experience: 'E', Education: 'Ed', Projects: 'P' }
  const SectionIcon: React.FC<{ label: string }> = ({ label }) => (
    <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${indigo}, ${purple})`, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, marginRight: 10, flexShrink: 0 }}>{sectionIcons[label] || label[0]}</div>
  )
  return (
    <div style={{ ...A4, background: '#fff' }}>
      {/* Gradient header */}
      <div style={{ background: `linear-gradient(135deg, ${indigo}, ${purple})`, color: '#fff', padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 16 }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '3px solid rgba(255,255,255,0.3)' }} />
        )}
        <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ fontSize: 14, margin: '4px 0 0', opacity: 0.9 }}>{basics.label}</p>}
        <div style={{ fontSize: 12, marginTop: 10, opacity: 0.8, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
          {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
          {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
          {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
          {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
          {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
        </div>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        {/* Sidebar 40% */}
        <div style={{ width: 318, padding: '24px 22px', borderRight: '1px solid #E5E7EB' }}>
          {basics.summary && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <SectionIcon label="Summary" />
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#111827' }}>Summary</span>
              </div>
              <p style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
            </div>
          )}
          {has(skills) && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${indigo}, ${purple})`, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, marginRight: 10 }}>Sk</div>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#111827' }}>Skills</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                {skills.map((s, i) => {
                  const pct = levelPercent(s.level)
                  const deg = (pct / 100) * 360
                  return (
                    <div key={i} style={{ textAlign: 'center', width: 70 }}>
                      <div style={{ width: 50, height: 50, borderRadius: '50%', background: `conic-gradient(${indigo} ${deg}deg, #E5E7EB ${deg}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px' }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: indigo }}>{pct}%</div>
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#111827' }}>{s.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {has(education) && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <SectionIcon label="Education" />
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#111827' }}>Education</span>
              </div>
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                  <div style={{ fontSize: 11, color: '#6B7280' }}>{e.institution}</div>
                  <div style={{ fontSize: 10, color: '#9CA3AF' }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
                </div>
              ))}
            </div>
          )}
          {has(languages) && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${indigo}, ${purple})`, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, marginRight: 10 }}>L</div>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#111827' }}>Languages</span>
              </div>
              {languages.map((l, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{l.language}</div>
                  {l.fluency && <div style={{ fontSize: 10, color: '#9CA3AF' }}>{l.fluency}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Main 60% */}
        <div style={{ flex: 1, padding: '24px 28px' }}>
          {has(work) && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                <SectionIcon label="Experience" />
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#111827' }}>Experience</span>
              </div>
              {work.map((w, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                    <span style={{ fontSize: 11, color: '#9CA3AF' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                  </div>
                  <div style={{ fontSize: 12, color: indigo }}>{w.company}</div>
                  {w.summary && <p style={{ fontSize: 12, color: '#4B5563', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                  {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#4B5563', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
                </div>
              ))}
            </div>
          )}
          {has(projects) && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                <SectionIcon label="Projects" />
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#111827' }}>Projects</span>
              </div>
              {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
                  {p.url && <div style={{ fontSize: 11, color: indigo }}>{p.url}</div>}
                  {p.description && <p style={{ fontSize: 12, color: '#4B5563', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                  {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#4B5563', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
                </div>
              ))}
            </div>
          )}
          {has(certifications) && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${indigo}, ${purple})`, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, marginRight: 10 }}>C</div>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#111827' }}>Certifications</span>
              </div>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{cert.name}</span>
                    <span style={{ fontSize: 11, color: '#9CA3AF' }}>{cert.date}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/*  21. CUSTOM-MATRIX - Single-col banded, green left border          */
/* ================================================================== */
const Chartreuse: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const green = color
  const altBg = lighten(green, 92)
  const Band: React.FC<{ bg: string; children: React.ReactNode }> = ({ bg, children }) => (
    <div style={{ padding: '20px 36px', background: bg }}>{children}</div>
  )
  const heading: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: darken(green, 30), margin: '0 0 14px', paddingLeft: 14, borderLeft: `4px solid ${green}` }
  return (
    <div style={{ ...A4, background: '#fff' }}>
      {/* Header */}
      <Band bg="#fff">
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 76, height: 76, borderRadius: '50%', objectFit: 'cover', marginBottom: 10, border: `2px solid ${green}`, display: 'block' }} />
        )}
        <h1 style={{ fontSize: 28, fontWeight: 700, color: darken(green, 30), margin: 0 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ color: green, fontSize: 14, margin: '4px 0 0' }}>{basics.label}</p>}
        <div style={{ fontSize: 12, color: '#6B7280', marginTop: 8, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
          {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
          {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
          {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
          {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
          {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
        </div>
      </Band>
      {basics.summary && (
        <Band bg={altBg}>
          <h3 style={heading}>Summary</h3>
          <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
        </Band>
      )}
      {has(work) && (
        <Band bg="#fff">
          <h3 style={heading}>Experience</h3>
          {work.map((w, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
              </div>
              <div style={{ fontSize: 12, color: green }}>{w.company}</div>
              {w.summary && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
              {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
            </div>
          ))}
        </Band>
      )}
      {has(education) && (
        <Band bg={altBg}>
          <h3 style={heading}>Education</h3>
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</span>
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</span>
              </div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>{e.institution}</div>
            </div>
          ))}
        </Band>
      )}
      {has(skills) && (
        <Band bg="#fff">
          <h3 style={heading}>Skills</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${green}` }}>
                <th style={{ textAlign: 'left', padding: '6px 8px', color: darken(green, 30), fontWeight: 700 }}>Skill</th>
                <th style={{ textAlign: 'left', padding: '6px 8px', color: darken(green, 30), fontWeight: 700 }}>Level</th>
                <th style={{ textAlign: 'left', padding: '6px 8px', color: darken(green, 30), fontWeight: 700 }}>Keywords</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((s, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 600, color: '#111827' }}>{s.name}</td>
                  <td style={{ padding: '6px 8px', color: '#6B7280' }}>{s.level || '-'}</td>
                  <td style={{ padding: '6px 8px', color: '#9CA3AF' }}>{has(s.keywords) ? s.keywords.join(', ') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Band>
      )}
      {has(projects) && (
        <Band bg={altBg}>
          <h3 style={heading}>Projects</h3>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
              {p.url && <div style={{ fontSize: 11, color: green }}>{p.url}</div>}
              {p.description && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
              {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
            </div>
          ))}
        </Band>
      )}
      {has(certifications) && (
        <Band bg="#fff">
          <h3 style={heading}>Certifications</h3>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{cert.name}</span>
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>{cert.date}</span>
              </div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>{cert.issuer}</div>
            </div>
          ))}
        </Band>
      )}
      {has(languages) && (
        <Band bg={altBg}>
          <h3 style={heading}>Languages</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {languages.map((l, i) => (
              <span key={i} style={{ fontSize: 12, color: '#374151' }}><strong>{l.language}</strong>{l.fluency ? ` (${l.fluency})` : ''}</span>
            ))}
          </div>
        </Band>
      )}
    </div>
  )
}

/* ================================================================== */
/*  22. CUSTOM-HORIZONLINE - Full header + timeline + amber accents   */
/* ================================================================== */
const Glenfiddich: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const amber = color
  const dark = '#1F2937'
  const heading: React.CSSProperties = { fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, color: dark, fontWeight: 700, margin: '0 0 14px' }
  return (
    <div style={{ ...A4, background: '#fff' }}>
      {/* Full header */}
      <div style={{ background: dark, color: '#fff', padding: '28px 36px', display: 'flex', alignItems: 'center', gap: 16 }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `3px solid ${amber}` }} />
        )}
        <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ color: amber, fontSize: 14, margin: '4px 0 0' }}>{basics.label}</p>}
        <div style={{ fontSize: 12, marginTop: 10, color: '#9CA3AF', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
          {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
          {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
          {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
          {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
          {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
        </div>
        </div>
      </div>
      {/* Career timeline bar */}
      {has(work) && (
        <div style={{ background: lighten(amber, 92), padding: '12px 36px', borderBottom: `2px solid ${amber}`, overflowX: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, position: 'relative', minHeight: 36 }}>
            {work.map((w, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: amber, margin: '0 auto 4px', position: 'relative', zIndex: 1 }} />
                <div style={{ fontSize: 9, fontWeight: 600, color: dark }}>{w.company}</div>
                <div style={{ fontSize: 8, color: '#9CA3AF' }}>{w.startDate}</div>
                {i < work.length - 1 && (
                  <div style={{ position: 'absolute', top: 4, left: '50%', right: '-50%', height: 2, background: amber, zIndex: 0 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Body */}
      <div style={{ padding: '24px 36px' }}>
        {basics.summary && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={heading}>Summary</h3>
            <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
          </div>
        )}
        {has(work) && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={heading}>Experience</h3>
            {work.map((w, i) => (
              <div key={i} style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
                {/* Metric callout */}
                <div style={{ width: 70, flexShrink: 0, textAlign: 'center', padding: '8px 0', background: lighten(amber, 92), borderRadius: 8, border: `1px solid ${alpha(amber, 0.25)}` }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: amber }}>{w.startDate?.slice(0, 4)}</div>
                  <div style={{ fontSize: 8, color: '#9CA3AF' }}>{w.endDate || 'Now'}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{w.position}</div>
                  <div style={{ fontSize: 12, color: amber }}>{w.company}</div>
                  {w.summary && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                  {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ flex: 1 }}>
            {has(education) && (
              <div style={{ marginBottom: 24 }}>
                <h3 style={heading}>Education</h3>
                {education.map((e, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>{e.institution} | {e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            {has(skills) && (
              <div style={{ marginBottom: 24 }}>
                <h3 style={heading}>Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {skills.map((s, i) => (
                    <span key={i} style={{ fontSize: 11, background: lighten(amber, 92), color: darken(amber, 30), padding: '4px 10px', borderRadius: 4, border: `1px solid ${alpha(amber, 0.25)}`, fontWeight: 500 }}>
                      {s.name}{s.level ? ` (${s.level})` : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {has(projects) && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={heading}>Projects</h3>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
                {p.url && <div style={{ fontSize: 11, color: amber }}>{p.url}</div>}
                {p.description && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
        {has(certifications) && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={heading}>Certifications</h3>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{cert.name}</span>
                  <span style={{ fontSize: 11, color: '#9CA3AF' }}>{cert.date}</span>
                </div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>{cert.issuer}</div>
              </div>
            ))}
          </div>
        )}
        {has(languages) && (
          <div>
            <h3 style={heading}>Languages</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {languages.map((l, i) => (
                <span key={i} style={{ fontSize: 11, background: lighten(amber, 92), color: darken(amber, 30), padding: '4px 10px', borderRadius: 4, border: `1px solid ${alpha(amber, 0.25)}`, fontWeight: 500 }}>
                  {l.language}{l.fluency ? ` (${l.fluency})` : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ================================================================== */
/*  23. CUSTOM-LAYERS - 3-layer: strip + sidebar + main, tag cloud    */
/* ================================================================== */
const Courvoisier: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const indigo = color
  const sidebarBg = lighten(indigo, 92)
  const fontSizeForLevel = (level: string): number => {
    switch ((level || '').toLowerCase()) {
      case 'expert': return 16
      case 'advanced': return 14
      case 'intermediate': return 12
      case 'beginner': return 10
      default: return 12
    }
  }
  return (
    <div style={{ ...A4, background: '#fff', display: 'flex' }}>
      {/* Indigo strip */}
      <div style={{ width: 8, background: indigo, flexShrink: 0 }} />
      {/* Sidebar */}
      <div style={{ width: 230, background: sidebarBg, padding: '32px 18px' }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 76, height: 76, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: `2px solid ${indigo}`, display: 'block' }} />
        )}
        <h1 style={{ fontSize: 20, fontWeight: 700, color: darken(indigo, 30), margin: 0 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ color: indigo, fontSize: 12, margin: '4px 0 0' }}>{basics.label}</p>}
        <div style={{ marginTop: 16, fontSize: 11, color: lighten(indigo, 20), lineHeight: 1.9 }}>
          {basics.email && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={12} />{basics.email}</div>}
          {basics.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={12} />{basics.phone}</div>}
          {basics.location && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={12} />{basics.location}</div>}
          {basics.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Linkedin size={12} />{basics.linkedin}</div>}
          {basics.github && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Github size={12} />{basics.github}</div>}
          {basics.website && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={12} />{basics.website}</div>}
        </div>
        {has(skills) && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: darken(indigo, 30), fontWeight: 700, margin: '0 0 12px' }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'baseline' }}>
              {skills.map((s, i) => (
                <span key={i} style={{ fontSize: fontSizeForLevel(s.level), fontWeight: fontSizeForLevel(s.level) > 13 ? 700 : 500, color: indigo, lineHeight: 1.4 }}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {has(education) && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: darken(indigo, 30), fontWeight: 700, margin: '0 0 10px' }}>Education</h3>
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: darken(indigo, 30) }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                <div style={{ fontSize: 10, color: lighten(indigo, 20) }}>{e.institution}</div>
                <div style={{ fontSize: 9, color: lighten(indigo, 50) }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {has(certifications) && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: darken(indigo, 30), fontWeight: 700, margin: '0 0 10px' }}>Certifications</h3>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: darken(indigo, 30) }}>{cert.name}</div>
                <div style={{ fontSize: 10, color: lighten(indigo, 20) }}>{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {has(languages) && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: darken(indigo, 30), fontWeight: 700, margin: '0 0 10px' }}>Languages</h3>
            {languages.map((l, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: darken(indigo, 30) }}>{l.language}</div>
                {l.fluency && <div style={{ fontSize: 10, color: lighten(indigo, 20) }}>{l.fluency}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Main */}
      <div style={{ flex: 1, padding: '32px 28px' }}>
        {basics.summary && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, color: darken(indigo, 30), fontWeight: 700, margin: '0 0 10px' }}>Summary</h3>
            <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
          </div>
        )}
        {has(work) && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, color: darken(indigo, 30), fontWeight: 700, margin: '0 0 14px' }}>Experience</h3>
            {work.map((w, i) => (
              <div key={i} style={{ marginBottom: 16, padding: '14px 16px', background: '#FAFAFA', borderRadius: 8, border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                  <span style={{ fontSize: 11, color: '#9CA3AF' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                </div>
                <div style={{ fontSize: 12, color: indigo, marginTop: 2 }}>{w.company}</div>
                {w.summary && <p style={{ fontSize: 12, color: '#4B5563', margin: '6px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                {has(w.highlights) && <ul style={{ margin: '6px 0 0', paddingLeft: 16, fontSize: 12, color: '#4B5563', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
        {has(projects) && (
          <div>
            <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, color: darken(indigo, 30), fontWeight: 700, margin: '0 0 14px' }}>Projects</h3>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 14, padding: '14px 16px', background: '#FAFAFA', borderRadius: 8, border: '1px solid #E5E7EB' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
                {p.url && <div style={{ fontSize: 11, color: indigo, marginTop: 2 }}>{p.url}</div>}
                {p.description && <p style={{ fontSize: 12, color: '#4B5563', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#4B5563', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ================================================================== */
/*  DOM-PERIGNON - Single column, premium minimal, gold line           */
/* ================================================================== */
const DomPerignon: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const primary = color
  const sectionTitle: React.CSSProperties = { fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: primary, fontWeight: 700, margin: '0 0 14px', borderBottom: `1px solid ${primary}33`, paddingBottom: 4 }
  return (
    <div style={{ ...A4, background: '#fff', padding: 50 }}>
      {/* Centered Header */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 14, border: `1px solid ${primary}`, display: 'inline-block' }} />
        )}
        <h1 style={{ fontSize: 30, fontWeight: 300, color: '#111827', margin: 0, letterSpacing: 1 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ fontStyle: 'italic', color: primary, fontSize: 13, margin: '6px 0 0' }}>{basics.label}</p>}
        <div style={{ width: 60, height: 1, background: primary, margin: '16px auto 0' }} />
        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 14, display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap' }}>
          {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
          {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
          {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
          {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
          {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
          {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
        </div>
      </div>
      {basics.summary && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={sectionTitle}>Summary</h3>
          <p style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.8, margin: 0 }}>{basics.summary}</p>
        </div>
      )}
      {has(work) && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={sectionTitle}>Experience</h3>
          {work.map((w, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                <span style={{ fontSize: 10, color: '#6B7280' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
              </div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{w.company}</div>
              {w.summary && <p style={{ fontSize: 12, color: '#6B7280', margin: '6px 0 0', lineHeight: 1.7 }}>{w.summary}</p>}
              {has(w.highlights) && <ul style={{ margin: '6px 0 0', paddingLeft: 16, fontSize: 12, color: '#6B7280', lineHeight: 1.8 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
            </div>
          ))}
        </div>
      )}
      {has(education) && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={sectionTitle}>Education</h3>
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
              <div style={{ fontSize: 11, color: '#9CA3AF' }}>{e.institution} | {e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
            </div>
          ))}
        </div>
      )}
      {has(skills) && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={sectionTitle}>Skills</h3>
          {skills.map((s, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#374151', fontWeight: 500, marginBottom: 4 }}>
                <span>{s.name}</span>
                {s.level && <span style={{ fontSize: 10, color: '#6B7280' }}>{s.level}</span>}
              </div>
              <div style={{ background: '#F3F4F6', borderRadius: 1, height: 2, overflow: 'hidden' }}>
                <div style={{ width: `${levelPercent(s.level)}%`, height: '100%', background: primary, borderRadius: 1 }} />
              </div>
              {has(s.keywords) && <div style={{ fontSize: 10, color: '#6B7280', marginTop: 3 }}>{s.keywords.join(', ')}</div>}
            </div>
          ))}
        </div>
      )}
      {has(projects) && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={sectionTitle}>Projects</h3>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
              {p.url && <div style={{ fontSize: 11, color: primary }}>{p.url}</div>}
              {p.description && <p style={{ fontSize: 12, color: '#6B7280', margin: '4px 0 0', lineHeight: 1.7 }}>{p.description}</p>}
              {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#6B7280', lineHeight: 1.8 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
            </div>
          ))}
        </div>
      )}
      {has(certifications) && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={sectionTitle}>Certifications</h3>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{cert.name}</span>
                <span style={{ fontSize: 10, color: '#6B7280' }}>{cert.date}</span>
              </div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>{cert.issuer}</div>
            </div>
          ))}
        </div>
      )}
      {has(languages) && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={sectionTitle}>Languages</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {languages.map((l, i) => (
              <span key={i} style={{ fontSize: 12, color: '#374151' }}><strong>{l.language}</strong>{l.fluency ? ` (${l.fluency})` : ''}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ================================================================== */
/*  VEUVE-CLICQUOT - 2-col editorial, drop cap, pull-quote summary    */
/* ================================================================== */
const VeuveClicquot: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const primary = color
  const heading: React.CSSProperties = { fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, color: '#111827', margin: '0 0 14px' }
  return (
    <div style={{ ...A4, background: '#fff' }}>
      {/* Full-width header with drop cap */}
      <div style={{ padding: '36px 36px 20px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.2 }}>
          <span style={{ fontSize: 60, float: 'left', lineHeight: 0.8, marginRight: 6, marginTop: 4, color: primary, fontWeight: 700 }}>{(basics.name || 'Y')[0]}</span>
          {(basics.name || 'Your Name').slice(1)}
        </h1>
        {basics.label && <p style={{ color: '#6B7280', fontSize: 14, margin: '6px 0 0' }}>{basics.label}</p>}
        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 8, display: 'flex', gap: 16, flexWrap: 'wrap', clear: 'both' }}>
          {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
          {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
          {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
          {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
          {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
          {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
        </div>
      </div>
      {/* Summary as pull-quote */}
      {basics.summary && (
        <div style={{ padding: '0 36px 20px' }}>
          <div style={{ borderLeft: `3px solid ${primary}`, paddingLeft: 16, fontStyle: 'italic', fontSize: 13, color: '#4B5563', lineHeight: 1.8 }}>
            {basics.summary}
          </div>
        </div>
      )}
      {/* 2-col body */}
      <div style={{ display: 'flex' }}>
        {/* Left 58% */}
        <div style={{ width: '58%', padding: '20px 28px 36px 36px' }}>
          {has(work) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={heading}>Experience</h3>
              {work.map((w, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                    <span style={{ fontSize: 11, color: '#9CA3AF' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                  </div>
                  <div style={{ fontSize: 12, color: primary }}>{w.company}</div>
                  {w.summary && <p style={{ fontSize: 13, color: '#374151', margin: '4px 0 0', lineHeight: 1.7 }}>{w.summary}</p>}
                  {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 13, color: '#374151', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
                </div>
              ))}
            </div>
          )}
          {has(projects) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={heading}>Projects</h3>
              {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
                  {p.url && <div style={{ fontSize: 11, color: primary }}>{p.url}</div>}
                  {p.description && <p style={{ fontSize: 13, color: '#374151', margin: '4px 0 0', lineHeight: 1.7 }}>{p.description}</p>}
                  {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 13, color: '#374151', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
                </div>
              ))}
            </div>
          )}
          {has(certifications) && (
            <div>
              <h3 style={heading}>Certifications</h3>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{cert.name}</span>
                    <span style={{ fontSize: 11, color: '#9CA3AF' }}>{cert.date}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Right 42% */}
        <div style={{ width: '42%', background: '#FDF8F3', padding: '20px 24px 36px' }}>
          {basics.avatarUrl && (
            <img src={basics.avatarUrl} alt="" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', marginBottom: 16, border: `2px solid ${primary}`, display: 'block' }} />
          )}
          {has(skills) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ ...heading, color: '#78716C' }}>Skills</h3>
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1C1917' }}>{s.name}</div>
                  {s.level && <div style={{ fontSize: 10, color: '#A8A29E' }}>{s.level}</div>}
                  {has(s.keywords) && <div style={{ fontSize: 10, color: '#D6D3D1', marginTop: 2 }}>{s.keywords.join(', ')}</div>}
                </div>
              ))}
            </div>
          )}
          {has(education) && (
            <div>
              <h3 style={{ ...heading, color: '#78716C' }}>Education</h3>
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1C1917' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                  <div style={{ fontSize: 11, color: '#78716C' }}>{e.institution}</div>
                  <div style={{ fontSize: 10, color: '#A8A29E' }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
                </div>
              ))}
            </div>
          )}
          {has(languages) && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ ...heading, color: '#78716C' }}>Languages</h3>
              {languages.map((l, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1C1917' }}>{l.language}</div>
                  {l.fluency && <div style={{ fontSize: 10, color: '#A8A29E' }}>{l.fluency}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/*  ARMAGNAC - Dark header, 2-col body, timeline + dashboard feel      */
/* ================================================================== */
const ArmagnacTpl: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const primary = color
  const heading: React.CSSProperties = { fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, color: '#0F172A', margin: '0 0 14px' }
  return (
    <div style={{ ...A4, background: '#fff' }}>
      {/* Dark header */}
      <div style={{ background: '#1E293B', color: '#fff', padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 16 }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `3px solid ${primary}` }} />
        )}
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>{basics.name || 'Your Name'}</h1>
          {basics.label && <p style={{ color: primary, fontSize: 14, margin: '4px 0 0' }}>{basics.label}</p>}
          <div style={{ fontSize: 12, marginTop: 10, color: '#94A3B8', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
            {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
            {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
            {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
            {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
            {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
          </div>
        </div>
      </div>
      {/* 2-col body */}
      <div style={{ display: 'flex' }}>
        {/* Left 55% - timeline experience */}
        <div style={{ width: '55%', padding: '24px 24px 36px 32px' }}>
          {basics.summary && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={heading}>Summary</h3>
              <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
            </div>
          )}
          {has(work) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={heading}>Experience</h3>
              {work.map((w, i) => (
                <div key={i} style={{ display: 'flex', marginBottom: 18 }}>
                  {/* Timeline */}
                  <div style={{ width: 20, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: primary, marginTop: 5 }} />
                    {i < work.length - 1 && <div style={{ width: 2, flex: 1, background: '#E2E8F0', marginTop: 4 }} />}
                  </div>
                  <div style={{ flex: 1, paddingLeft: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{w.position}</span>
                      <span style={{ fontSize: 11, color: '#94A3B8' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                    </div>
                    <div style={{ fontSize: 12, color: primary }}>{w.company}</div>
                    {w.summary && <p style={{ fontSize: 12, color: '#475569', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                    {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#475569', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
                  </div>
                </div>
              ))}
            </div>
          )}
          {has(projects) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={heading}>Projects</h3>
              {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{p.name}</div>
                  {p.url && <div style={{ fontSize: 11, color: primary }}>{p.url}</div>}
                  {p.description && <p style={{ fontSize: 12, color: '#475569', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                  {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#475569', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
                </div>
              ))}
            </div>
          )}
          {has(certifications) && (
            <div>
              <h3 style={heading}>Certifications</h3>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{cert.name}</span>
                    <span style={{ fontSize: 11, color: '#94A3B8' }}>{cert.date}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#475569' }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Right 45% */}
        <div style={{ width: '45%', padding: '24px 24px 36px', borderLeft: '1px solid #E2E8F0' }}>
          {has(skills) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={heading}>Skills</h3>
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: '#0F172A', marginBottom: 4 }}>
                    <span>{s.name}</span>
                    {s.level && <span style={{ fontWeight: 400, fontSize: 10, color: '#94A3B8' }}>{s.level}</span>}
                  </div>
                  <div style={{ background: '#F1F5F9', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${levelPercent(s.level)}%`, height: '100%', background: primary, borderRadius: 4 }} />
                  </div>
                  {has(s.keywords) && <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 3 }}>{s.keywords.join(', ')}</div>}
                </div>
              ))}
            </div>
          )}
          {has(education) && (
            <div>
              <h3 style={heading}>Education</h3>
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 12, padding: '12px 14px', background: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>{e.institution}</div>
                  <div style={{ fontSize: 10, color: '#94A3B8' }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
                </div>
              ))}
            </div>
          )}
          {has(languages) && (
            <div style={{ marginTop: 24 }}>
              <h3 style={heading}>Languages</h3>
              {languages.map((l, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{l.language}</div>
                  {l.fluency && <div style={{ fontSize: 10, color: '#94A3B8' }}>{l.fluency}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/*  AMARONE - Zigzag sections, alternating borders, burgundy accent    */
/* ================================================================== */
const AmaroneTpl: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const primary = color
  const heading: React.CSSProperties = { fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, color: '#111827', margin: '0 0 14px' }
  return (
    <div style={{ ...A4, background: '#fff', padding: '36px 40px' }}>
      {/* Centered header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 76, height: 76, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: `2px solid ${primary}`, display: 'inline-block' }} />
        )}
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', margin: 0 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ color: primary, fontSize: 14, margin: '4px 0 0' }}>{basics.label}</p>}
        <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 8, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
          {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
          {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
          {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
          {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
          {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
        </div>
      </div>
      {/* Summary - odd (left border) */}
      {basics.summary && (
        <div style={{ marginBottom: 28, borderLeft: `4px solid ${primary}`, paddingLeft: 20 }}>
          <h3 style={heading}>Summary</h3>
          <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
        </div>
      )}
      {/* Experience - even (right border) */}
      {has(work) && (
        <div style={{ marginBottom: 28, borderRight: `4px solid ${primary}`, paddingRight: 20 }}>
          <h3 style={heading}>Experience</h3>
          {work.map((w, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
              </div>
              <div style={{ fontSize: 12, color: primary }}>{w.company}</div>
              {w.summary && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
              {has(w.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
            </div>
          ))}
        </div>
      )}
      {/* Education - odd (left border) */}
      {has(education) && (
        <div style={{ marginBottom: 28, borderLeft: `4px solid ${primary}`, paddingLeft: 20 }}>
          <h3 style={heading}>Education</h3>
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>{e.institution} | {e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
            </div>
          ))}
        </div>
      )}
      {/* Skills - even (right border) */}
      {has(skills) && (
        <div style={{ marginBottom: 28, borderRight: `4px solid ${primary}`, paddingRight: 20 }}>
          <h3 style={heading}>Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map((s, i) => (
              <span key={i} style={{ fontSize: 12, background: `${primary}12`, color: '#374151', padding: '5px 12px', borderRadius: 4, fontWeight: 500 }}>
                {s.name}{s.level ? ` (${s.level})` : ''}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Projects - odd (left border) */}
      {has(projects) && (
        <div style={{ marginBottom: 28, borderLeft: `4px solid ${primary}`, paddingLeft: 20 }}>
          <h3 style={heading}>Projects</h3>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
              {p.url && <div style={{ fontSize: 11, color: primary }}>{p.url}</div>}
              {p.description && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
              {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.7 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
            </div>
          ))}
        </div>
      )}
      {/* Certifications - even (right border) */}
      {has(certifications) && (
        <div style={{ marginBottom: 28, borderRight: `4px solid ${primary}`, paddingRight: 20 }}>
          <h3 style={heading}>Certifications</h3>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{cert.name}</span>
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>{cert.date}</span>
              </div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>{cert.issuer}</div>
            </div>
          ))}
        </div>
      )}
      {/* Languages - odd (left border) */}
      {has(languages) && (
        <div style={{ borderLeft: `4px solid ${primary}`, paddingLeft: 20 }}>
          <h3 style={heading}>Languages</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {languages.map((l, i) => (
              <span key={i} style={{ fontSize: 12, background: `${primary}12`, color: '#374151', padding: '5px 12px', borderRadius: 4, fontWeight: 500 }}>
                {l.language}{l.fluency ? ` (${l.fluency})` : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ================================================================== */
/*  OPUS-ONE - Single col, watermark letter, pill skills, ultra premium */
/* ================================================================== */
const OpusOne: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const primary = color
  const sectionTitle: React.CSSProperties = { fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#475569', fontWeight: 700, margin: '0 0 14px' }
  return (
    <div style={{ ...A4, background: '#fff', padding: 45, position: 'relative', overflow: 'hidden' }}>
      {/* Avatar top-right */}
      {basics.avatarUrl && (
        <img src={basics.avatarUrl} alt="" style={{ position: 'absolute', top: 45, right: 45, width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', border: '1px solid #E5E7EB' }} />
      )}
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 36, paddingRight: 60 }}>
          <h1 style={{ fontSize: 28, fontWeight: 400, color: '#111827', margin: 0, letterSpacing: 0.5 }}>{basics.name || 'Your Name'}</h1>
          {basics.label && <p style={{ color: primary, fontSize: 13, margin: '6px 0 0', fontWeight: 500 }}>{basics.label}</p>}
          <div style={{ fontSize: 11, color: '#4B5563', marginTop: 12, display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{basics.email}</span>}
            {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{basics.phone}</span>}
            {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{basics.location}</span>}
            {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={12} />{basics.linkedin}</span>}
            {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={12} />{basics.github}</span>}
            {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{basics.website}</span>}
          </div>
        </div>
        {basics.summary && (
          <div style={{ marginBottom: 32 }}>
            <h3 style={sectionTitle}>Summary</h3>
            <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.8, margin: 0 }}>{basics.summary}</p>
          </div>
        )}
        {has(work) && (
          <div style={{ marginBottom: 32 }}>
            <h3 style={sectionTitle}>Experience</h3>
            {work.map((w, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                  <span style={{ fontSize: 11, color: '#4B5563' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                </div>
                <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{w.company}</div>
                {w.summary && <p style={{ fontSize: 12, color: '#374151', margin: '6px 0 0', lineHeight: 1.7 }}>{w.summary}</p>}
                {has(w.highlights) && <ul style={{ margin: '6px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 1.8 }}>{w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
        {has(education) && (
          <div style={{ marginBottom: 32 }}>
            <h3 style={sectionTitle}>Education</h3>
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                <div style={{ fontSize: 11, color: '#6B7280' }}>{e.institution} | {e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {has(skills) && (
          <div style={{ marginBottom: 32 }}>
            <h3 style={sectionTitle}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {skills.map((s, i) => (
                <span key={i} style={{ fontSize: 11, color: '#374151', padding: '4px 14px', borderRadius: 12, border: '1px solid #D1D5DB', background: 'transparent', fontWeight: 500 }}>
                  {s.name}{s.level ? ` (${s.level})` : ''}
                </span>
              ))}
            </div>
          </div>
        )}
        {has(projects) && (
          <div style={{ marginBottom: 32 }}>
            <h3 style={sectionTitle}>Projects</h3>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{p.name}</div>
                {p.url && <div style={{ fontSize: 11, color: primary }}>{p.url}</div>}
                {p.description && <p style={{ fontSize: 12, color: '#6B7280', margin: '4px 0 0', lineHeight: 1.7 }}>{p.description}</p>}
                {has(p.highlights) && <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#6B7280', lineHeight: 1.8 }}>{p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
        {has(certifications) && (
          <div style={{ marginBottom: 32 }}>
            <h3 style={sectionTitle}>Certifications</h3>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{cert.name}</span>
                  <span style={{ fontSize: 11, color: '#4B5563' }}>{cert.date}</span>
                </div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>{cert.issuer}</div>
              </div>
            ))}
          </div>
        )}
        {has(languages) && (
          <div style={{ marginBottom: 32 }}>
            <h3 style={sectionTitle}>Languages</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {languages.map((l, i) => (
                <span key={i} style={{ fontSize: 11, color: '#374141', padding: '4px 14px', borderRadius: 12, border: '1px solid #D1D5DB', background: 'transparent', fontWeight: 500 }}>
                  {l.language}{l.fluency ? ` (${l.fluency})` : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ================================================================== */
/*  ROMANEE - Swiss/Brutalist Typography                               */
/* ================================================================== */
const Romanee: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const headingColor = darken(color, 40)
  const sectionStyle: React.CSSProperties = { borderBottom: `1px solid ${color}`, paddingBottom: 20, marginBottom: 28 }
  const sectionTitle: React.CSSProperties = { fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 4, color: headingColor, margin: '0 0 16px' }
  return (
    <div style={{ ...A4, background: '#fff', padding: 60 }}>
      {/* Header */}
      <div style={{ ...sectionStyle }}>
        <h1 style={{ fontSize: 40, fontWeight: 200, color: headingColor, margin: 0, lineHeight: 1.1 }}>{basics.name || 'Your Name'}</h1>
        {basics.label && <p style={{ fontSize: 14, color: '#6B7280', margin: '8px 0 0', fontWeight: 400, letterSpacing: 1 }}>{basics.label}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 14, fontSize: 12, color: '#6B7280' }}>
          {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Mail size={12} color={color} />{basics.email}</span>}
          {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Phone size={12} color={color} />{basics.phone}</span>}
          {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><MapPin size={12} color={color} />{basics.location}</span>}
          {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Linkedin size={12} color={color} />{basics.linkedin}</span>}
          {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Github size={12} color={color} />{basics.github}</span>}
          {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Globe size={12} color={color} />{basics.website}</span>}
        </div>
      </div>
      {/* Avatar */}
      {basics.avatarUrl && (
        <div style={{ marginBottom: 24 }}>
          <img src={basics.avatarUrl} alt="" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: `1px solid ${color}` }} />
        </div>
      )}
      {/* Summary */}
      {basics.summary && (
        <div style={{ ...sectionStyle }}>
          <h3 style={sectionTitle}>Summary</h3>
          <p style={{ fontSize: 12, color: '#374151', lineHeight: 2.0, margin: 0 }}>{basics.summary}</p>
        </div>
      )}
      {/* Experience */}
      {has(work) && (
        <div style={{ ...sectionStyle }}>
          <h3 style={sectionTitle}>Experience</h3>
          {work.map((w, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: headingColor }}>{w.position}</span>
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
              </div>
              <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{w.company}</div>
              {w.summary && <p style={{ fontSize: 12, color: '#374151', margin: '6px 0 0', lineHeight: 2.0 }}>{w.summary}</p>}
              {has(w.highlights) && (
                <ul style={{ margin: '6px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 2.0 }}>
                  {w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Education */}
      {has(education) && (
        <div style={{ ...sectionStyle }}>
          <h3 style={sectionTitle}>Education</h3>
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: headingColor }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
              <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 2.0 }}>{e.institution} | {e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
            </div>
          ))}
        </div>
      )}
      {/* Skills - comma separated inline */}
      {has(skills) && (
        <div style={{ ...sectionStyle }}>
          <h3 style={sectionTitle}>Skills</h3>
          <p style={{ fontSize: 12, color: '#374151', lineHeight: 2.0, margin: 0 }}>
            {skills.map((s, i) => (
              <span key={i}>
                <strong>{s.name}</strong>{s.level ? ` (${s.level})` : ''}
                {has(s.keywords) && <span style={{ color: '#6B7280' }}> [{s.keywords.join(', ')}]</span>}
                {i < skills.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
      )}
      {/* Projects */}
      {has(projects) && (
        <div style={{ ...sectionStyle }}>
          <h3 style={sectionTitle}>Projects</h3>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: headingColor }}>{p.name}</div>
              {p.url && <div style={{ fontSize: 11, color: color }}>{p.url}</div>}
              {p.description && <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0', lineHeight: 2.0 }}>{p.description}</p>}
              {has(p.highlights) && (
                <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#374151', lineHeight: 2.0 }}>
                  {p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Certifications */}
      {has(certifications) && (
        <div style={{ ...sectionStyle }}>
          <h3 style={sectionTitle}>Certifications</h3>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: headingColor }}>{cert.name}</span>
              <span style={{ fontSize: 12, color: '#6B7280' }}> — {cert.issuer}{cert.date ? `, ${cert.date}` : ''}</span>
            </div>
          ))}
        </div>
      )}
      {/* Languages */}
      {has(languages) && (
        <div>
          <h3 style={sectionTitle}>Languages</h3>
          <p style={{ fontSize: 12, color: '#374151', lineHeight: 2.0, margin: 0 }}>
            {languages.map((l, i) => (
              <span key={i}><strong>{l.language}</strong>{l.fluency ? ` (${l.fluency})` : ''}{i < languages.length - 1 ? ', ' : ''}</span>
            ))}
          </p>
        </div>
      )}
    </div>
  )
}

/* ================================================================== */
/*  CRISTAL - Monochrome Luxury                                        */
/* ================================================================== */
const Cristal: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const textPrimary = '#111827'
  const textSecondary = '#6B7280'
  const divider = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
      <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
      <span style={{ color: color, fontSize: 10, lineHeight: 1 }}>{'\u25C6'}</span>
      <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
    </div>
  )
  const sectionTitle: React.CSSProperties = { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: textPrimary, margin: '0 0 14px' }
  return (
    <div style={{ ...A4, background: '#fff', borderLeft: `2px solid ${color}` }}>
      <div style={{ padding: '48px 44px 48px 42px' }}>
        {/* Header */}
        <div style={{ marginBottom: 8 }}>
          {basics.avatarUrl && (
            <img src={basics.avatarUrl} alt="" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', marginBottom: 14, border: `1px solid ${color}`, display: 'block' }} />
          )}
          <h1 style={{ fontSize: 28, fontWeight: 300, color: textPrimary, margin: 0, letterSpacing: 3 }}>{basics.name || 'Your Name'}</h1>
          {basics.label && <p style={{ fontSize: 13, color: textSecondary, margin: '6px 0 0', letterSpacing: 1 }}>{basics.label}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 12, fontSize: 11, color: textSecondary }}>
            {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={11} color={textSecondary} />{basics.email}</span>}
            {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={11} color={textSecondary} />{basics.phone}</span>}
            {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={11} color={textSecondary} />{basics.location}</span>}
            {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={11} color={textSecondary} />{basics.linkedin}</span>}
            {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={11} color={textSecondary} />{basics.github}</span>}
            {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={11} color={textSecondary} />{basics.website}</span>}
          </div>
        </div>
        {/* Summary */}
        {basics.summary && (
          <>
            {divider}
            <div>
              <h3 style={sectionTitle}>Summary</h3>
              <p style={{ fontSize: 12, color: textSecondary, lineHeight: 1.8, margin: 0 }}>{basics.summary}</p>
            </div>
          </>
        )}
        {/* Experience */}
        {has(work) && (
          <>
            {divider}
            <div>
              <h3 style={sectionTitle}>Experience</h3>
              {work.map((w, i) => (
                <div key={i} style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>{w.position}</span>
                    <span style={{ fontSize: 10, color: textSecondary }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                  </div>
                  <div style={{ fontSize: 11, color: textSecondary, marginTop: 2 }}>{w.company}</div>
                  {w.summary && <p style={{ fontSize: 12, color: textSecondary, margin: '6px 0 0', lineHeight: 1.7 }}>{w.summary}</p>}
                  {has(w.highlights) && (
                    <ul style={{ margin: '6px 0 0', paddingLeft: 16, fontSize: 12, color: textSecondary, lineHeight: 1.8 }}>
                      {w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        {/* Education */}
        {has(education) && (
          <>
            {divider}
            <div>
              <h3 style={sectionTitle}>Education</h3>
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                  <div style={{ fontSize: 11, color: textSecondary }}>{e.institution} | {e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
                </div>
              ))}
            </div>
          </>
        )}
        {/* Skills with thin progress bars */}
        {has(skills) && (
          <>
            {divider}
            <div>
              <h3 style={sectionTitle}>Skills</h3>
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: textPrimary, fontWeight: 500, marginBottom: 4 }}>
                    <span>{s.name}</span>
                    {s.level && <span style={{ fontSize: 10, color: textSecondary }}>{s.level}</span>}
                  </div>
                  <div style={{ background: '#F3F4F6', borderRadius: 1, height: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${levelPercent(s.level)}%`, height: '100%', background: color, borderRadius: 1 }} />
                  </div>
                  {has(s.keywords) && <div style={{ fontSize: 10, color: textSecondary, marginTop: 3 }}>{s.keywords.join(', ')}</div>}
                </div>
              ))}
            </div>
          </>
        )}
        {/* Projects */}
        {has(projects) && (
          <>
            {divider}
            <div>
              <h3 style={sectionTitle}>Projects</h3>
              {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>{p.name}</div>
                  {p.url && <div style={{ fontSize: 10, color: color }}>{p.url}</div>}
                  {p.description && <p style={{ fontSize: 12, color: textSecondary, margin: '4px 0 0', lineHeight: 1.7 }}>{p.description}</p>}
                  {has(p.highlights) && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: textSecondary, lineHeight: 1.8 }}>
                      {p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        {/* Certifications */}
        {has(certifications) && (
          <>
            {divider}
            <div>
              <h3 style={sectionTitle}>Certifications</h3>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: textPrimary }}>{cert.name}</span>
                  <span style={{ fontSize: 11, color: textSecondary }}> — {cert.issuer}{cert.date ? `, ${cert.date}` : ''}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {/* Languages */}
        {has(languages) && (
          <>
            {divider}
            <div>
              <h3 style={sectionTitle}>Languages</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                {languages.map((l, i) => (
                  <span key={i} style={{ fontSize: 12, color: textPrimary }}>
                    <strong>{l.language}</strong>{l.fluency ? <span style={{ color: textSecondary }}> ({l.fluency})</span> : ''}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ================================================================== */
/*  SASSICAIA - Infographic / Data Visualization                       */
/* ================================================================== */
const Sassicaia: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const sidebarBg = lighten(color, 92)
  const sectionTitle: React.CSSProperties = { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#111827', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }
  const sectionIcon = (letter: string) => (
    <span style={{ width: 20, height: 20, borderRadius: '50%', background: color, color: '#fff', fontSize: 10, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{letter}</span>
  )
  return (
    <div style={{ ...A4, background: '#fff', display: 'flex' }}>
      {/* Main - 60% */}
      <div style={{ width: '60%', padding: '36px 28px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {basics.avatarUrl && (
              <img src={basics.avatarUrl} alt="" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${color}` }} />
            )}
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: 0 }}>{basics.name || 'Your Name'}</h1>
              {basics.label && <p style={{ fontSize: 13, color: color, margin: '4px 0 0', fontWeight: 500 }}>{basics.label}</p>}
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12, fontSize: 11, color: '#6B7280' }}>
            {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={11} color={color} />{basics.email}</span>}
            {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={11} color={color} />{basics.phone}</span>}
            {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={11} color={color} />{basics.location}</span>}
            {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={11} color={color} />{basics.linkedin}</span>}
            {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={11} color={color} />{basics.github}</span>}
            {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={11} color={color} />{basics.website}</span>}
          </div>
        </div>
        {/* Summary */}
        {basics.summary && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={sectionTitle}>{sectionIcon('S')} Summary</h3>
            <p style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
          </div>
        )}
        {/* Experience - timeline */}
        {has(work) && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={sectionTitle}>{sectionIcon('E')} Experience</h3>
            {work.map((w, i) => (
              <div key={i} style={{ display: 'flex', marginBottom: 18 }}>
                <div style={{ width: 16, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
                  {i < work.length - 1 && <div style={{ width: 2, flex: 1, background: lighten(color, 70), marginTop: 4 }} />}
                </div>
                <div style={{ paddingLeft: 10, flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                    <span style={{ fontSize: 10, color: '#9CA3AF' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 1 }}>{w.company}</div>
                  {w.summary && <p style={{ fontSize: 11, color: '#4B5563', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                  {has(w.highlights) && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: 14, fontSize: 11, color: '#4B5563', lineHeight: 1.7 }}>
                      {w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Projects */}
        {has(projects) && (
          <div>
            <h3 style={sectionTitle}>{sectionIcon('P')} Projects</h3>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{p.name}</div>
                {p.url && <div style={{ fontSize: 10, color: color }}>{p.url}</div>}
                {p.description && <p style={{ fontSize: 11, color: '#4B5563', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                {has(p.highlights) && (
                  <ul style={{ margin: '4px 0 0', paddingLeft: 14, fontSize: 11, color: '#4B5563', lineHeight: 1.7 }}>
                    {p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Sidebar - 40% */}
      <div style={{ width: '40%', background: sidebarBg, padding: '36px 24px' }}>
        {/* Skills - horizontal bar charts */}
        {has(skills) && (
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ ...sectionTitle, color: darken(color, 20) }}>{sectionIcon('K')} Skills</h3>
            {skills.map((s, i) => {
              const pct = levelPercent(s.level)
              return (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#374151', fontWeight: 500, marginBottom: 3 }}>
                    <span>{s.name}</span>
                    <span style={{ fontSize: 10, color: '#6B7280' }}>{pct}%</span>
                  </div>
                  <div style={{ background: '#E5E7EB', borderRadius: 3, height: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3 }} />
                  </div>
                  {has(s.keywords) && <div style={{ fontSize: 9, color: '#6B7280', marginTop: 2 }}>{s.keywords.join(', ')}</div>}
                </div>
              )
            })}
          </div>
        )}
        {/* Languages - circular progress */}
        {has(languages) && (
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ ...sectionTitle, color: darken(color, 20) }}>{sectionIcon('L')} Languages</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {languages.map((l, i) => {
                const pct = levelPercent(l.fluency)
                const radius = 22
                const circumference = 2 * Math.PI * radius
                const offset = circumference - (pct / 100) * circumference
                return (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <svg width={54} height={54} viewBox="0 0 54 54">
                      <circle cx={27} cy={27} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={4} />
                      <circle cx={27} cy={27} r={radius} fill="none" stroke={color} strokeWidth={4} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 27 27)" />
                      <text x={27} y={27} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 10, fontWeight: 600, fill: '#374151' }}>{pct}%</text>
                    </svg>
                    <div style={{ fontSize: 10, color: '#374151', marginTop: 2, fontWeight: 500 }}>{l.language}</div>
                    {l.fluency && <div style={{ fontSize: 9, color: '#6B7280' }}>{l.fluency}</div>}
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {/* Education - card style */}
        {has(education) && (
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ ...sectionTitle, color: darken(color, 20) }}>{sectionIcon('D')} Education</h3>
            {education.map((e, i) => (
              <div key={i} style={{ background: '#fff', borderLeft: `3px solid ${color}`, padding: '8px 12px', marginBottom: 8, borderRadius: 4 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                <div style={{ fontSize: 10, color: '#6B7280' }}>{e.institution}</div>
                <div style={{ fontSize: 9, color: '#9CA3AF' }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {/* Certifications - badge chips */}
        {has(certifications) && (
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ ...sectionTitle, color: darken(color, 20) }}>{sectionIcon('C')} Certifications</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {certifications.map((cert, i) => (
                <span key={i} style={{ fontSize: 10, background: '#fff', color: '#374151', padding: '4px 10px', borderRadius: 12, border: `1px solid ${lighten(color, 60)}`, fontWeight: 500 }}>
                  {cert.name}{cert.issuer ? ` — ${cert.issuer}` : ''}{cert.date ? ` (${cert.date})` : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ================================================================== */
/*  KRUG - Modern Gradient + Glass                                     */
/* ================================================================== */
const Krug: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const darkColor = darken(color, 30)
  const bodyBg = lighten(color, 95)
  const card: React.CSSProperties = { background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, padding: '18px 20px', marginBottom: 16 }
  const sectionTitle: React.CSSProperties = { fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#111827', margin: '0 0 14px' }
  return (
    <div style={{ ...A4, background: bodyBg, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,0,0,0.02) 19px, rgba(0,0,0,0.02) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0,0,0,0.02) 19px, rgba(0,0,0,0.02) 20px)' }}>
      {/* Gradient Header */}
      <div style={{ background: `linear-gradient(135deg, ${color}, ${darkColor})`, padding: '36px 40px 30px', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {basics.avatarUrl && (
            <img src={basics.avatarUrl} alt="" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.6)', flexShrink: 0 }} />
          )}
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#fff', margin: 0 }}>{basics.name || 'Your Name'}</h1>
            {basics.label && <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', margin: '4px 0 0' }}>{basics.label}</p>}
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 16, fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>
          {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={11} color="rgba(255,255,255,0.7)" />{basics.email}</span>}
          {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={11} color="rgba(255,255,255,0.7)" />{basics.phone}</span>}
          {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={11} color="rgba(255,255,255,0.7)" />{basics.location}</span>}
          {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={11} color="rgba(255,255,255,0.7)" />{basics.linkedin}</span>}
          {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={11} color="rgba(255,255,255,0.7)" />{basics.github}</span>}
          {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={11} color="rgba(255,255,255,0.7)" />{basics.website}</span>}
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: '24px 32px 32px' }}>
        {/* Summary */}
        {basics.summary && (
          <div style={card}>
            <h3 style={sectionTitle}>Summary</h3>
            <p style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.7, margin: 0 }}>{basics.summary}</p>
          </div>
        )}
        {/* Experience */}
        {has(work) && (
          <div style={card}>
            <h3 style={sectionTitle}>Experience</h3>
            {work.map((w, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                  <span style={{ fontSize: 10, color: '#9CA3AF' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                </div>
                <div style={{ fontSize: 11, color: color, marginTop: 2, fontWeight: 500 }}>{w.company}</div>
                {w.summary && <p style={{ fontSize: 12, color: '#4B5563', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                {has(w.highlights) && (
                  <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#4B5563', lineHeight: 1.7 }}>
                    {w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
        {/* Education */}
        {has(education) && (
          <div style={card}>
            <h3 style={sectionTitle}>Education</h3>
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                <div style={{ fontSize: 11, color: '#6B7280' }}>{e.institution} | {e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {/* Skills - pill tags */}
        {has(skills) && (
          <div style={card}>
            <h3 style={sectionTitle}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {skills.map((s, i) => (
                <span key={i} style={{ fontSize: 11, background: '#fff', color: '#374151', padding: '5px 14px', borderRadius: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', fontWeight: 500, border: '1px solid rgba(0,0,0,0.04)' }}>
                  {s.name}{s.level ? ` (${s.level})` : ''}
                  {has(s.keywords) && <span style={{ color: '#9CA3AF', fontSize: 10 }}> - {s.keywords.join(', ')}</span>}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Projects */}
        {has(projects) && (
          <div style={card}>
            <h3 style={sectionTitle}>Projects</h3>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{p.name}</div>
                {p.url && <div style={{ fontSize: 10, color: color }}>{p.url}</div>}
                {p.description && <p style={{ fontSize: 12, color: '#4B5563', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                {has(p.highlights) && (
                  <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#4B5563', lineHeight: 1.7 }}>
                    {p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
        {/* Certifications */}
        {has(certifications) && (
          <div style={card}>
            <h3 style={sectionTitle}>Certifications</h3>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{cert.name}</span>
                <span style={{ fontSize: 11, color: '#6B7280' }}> — {cert.issuer}{cert.date ? `, ${cert.date}` : ''}</span>
              </div>
            ))}
          </div>
        )}
        {/* Languages */}
        {has(languages) && (
          <div style={card}>
            <h3 style={sectionTitle}>Languages</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {languages.map((l, i) => (
                <span key={i} style={{ fontSize: 11, background: '#fff', color: '#374151', padding: '5px 14px', borderRadius: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', fontWeight: 500 }}>
                  {l.language}{l.fluency ? ` — ${l.fluency}` : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ================================================================== */
/*  PETRUS - Editorial / Photo-centric                                 */
/* ================================================================== */
const Petrus: React.FC<{ data: ResumeData; color: string }> = ({ data, color }) => {
  const { basics, work, education, skills, projects, certifications, languages } = data
  const darkBg = darken(color, 50)
  const skillsCount = skills ? skills.length : 0
  const projectsCount = projects ? projects.length : 0
  const yearsExp = work && work.length > 0 ? (() => {
    const starts = work.map(w => parseInt(w.startDate, 10)).filter(y => !isNaN(y))
    if (starts.length === 0) return 0
    return new Date().getFullYear() - Math.min(...starts)
  })() : 0
  const sectionTitle: React.CSSProperties = { fontSize: 12, fontWeight: 700, textTransform: 'uppercase', fontStyle: 'italic', letterSpacing: 1.5, color: '#111827', margin: '0 0 14px' }
  return (
    <div style={{ ...A4, background: '#fff' }}>
      {/* Dark Header Strip */}
      <div style={{ background: darkBg, padding: '32px 40px', color: '#fff', display: 'flex', alignItems: 'center', gap: 20 }}>
        {basics.avatarUrl && (
          <img src={basics.avatarUrl} alt="" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)', flexShrink: 0 }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>{basics.name || 'Your Name'}</h1>
          {basics.label && <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: '4px 0 0', fontStyle: 'italic' }}>{basics.label}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 12, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
            {basics.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={11} color="rgba(255,255,255,0.6)" />{basics.email}</span>}
            {basics.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={11} color="rgba(255,255,255,0.6)" />{basics.phone}</span>}
            {basics.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={11} color="rgba(255,255,255,0.6)" />{basics.location}</span>}
            {basics.linkedin && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Linkedin size={11} color="rgba(255,255,255,0.6)" />{basics.linkedin}</span>}
            {basics.github && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Github size={11} color="rgba(255,255,255,0.6)" />{basics.github}</span>}
            {basics.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Globe size={11} color="rgba(255,255,255,0.6)" />{basics.website}</span>}
          </div>
        </div>
      </div>
      {/* Quick Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ padding: '14px 20px', textAlign: 'center', borderRight: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: color }}>{yearsExp}+</div>
          <div style={{ fontSize: 10, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1 }}>Years Exp.</div>
        </div>
        <div style={{ padding: '14px 20px', textAlign: 'center', borderRight: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: color }}>{skillsCount}</div>
          <div style={{ fontSize: 10, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1 }}>Skills</div>
        </div>
        <div style={{ padding: '14px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: color }}>{projectsCount}</div>
          <div style={{ fontSize: 10, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1 }}>Projects</div>
        </div>
      </div>
      {/* Body: 2 columns */}
      <div style={{ display: 'flex' }}>
        {/* Main - 65% */}
        <div style={{ width: '65%', padding: '24px 28px' }}>
          {/* Summary - pull quote */}
          {basics.summary && (
            <div style={{ marginBottom: 24, position: 'relative', paddingLeft: 20 }}>
              <span style={{ position: 'absolute', left: 0, top: -4, fontSize: 36, color: color, fontWeight: 700, lineHeight: 1 }}>{'\u201C'}</span>
              <p style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>{basics.summary}</p>
            </div>
          )}
          {/* Experience */}
          {has(work) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={sectionTitle}>Experience</h3>
              {work.map((w, i) => (
                <div key={i} style={{ borderLeft: `4px solid ${color}`, paddingLeft: 14, marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{w.position}</span>
                    <span style={{ fontSize: 10, color: '#9CA3AF' }}>{w.startDate}{w.endDate ? ` - ${w.endDate}` : ''}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{w.company}</div>
                  {w.summary && <p style={{ fontSize: 12, color: '#4B5563', margin: '4px 0 0', lineHeight: 1.6 }}>{w.summary}</p>}
                  {has(w.highlights) && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#4B5563', lineHeight: 1.7 }}>
                      {w.highlights.map((h, j) => h && <li key={j}>{h}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
          {/* Projects */}
          {has(projects) && (
            <div>
              <h3 style={sectionTitle}>Projects</h3>
              {projects.map((p, i) => (
                <div key={i} style={{ borderLeft: `4px solid ${color}`, paddingLeft: 14, marginBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{p.name}</div>
                  {p.url && <div style={{ fontSize: 10, color: color }}>{p.url}</div>}
                  {p.description && <p style={{ fontSize: 12, color: '#4B5563', margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
                  {has(p.highlights) && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#4B5563', lineHeight: 1.7 }}>
                      {p.highlights.map((h, j) => h && <li key={j}>{h}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Sidebar - 35% */}
        <div style={{ width: '35%', padding: '24px 22px', borderLeft: '1px solid #E5E7EB' }}>
          {/* Skills */}
          {has(skills) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={sectionTitle}>Skills</h3>
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{s.name}</div>
                  {s.level && <div style={{ fontSize: 10, color: '#6B7280' }}>{s.level}</div>}
                  {has(s.keywords) && <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>{s.keywords.join(', ')}</div>}
                </div>
              ))}
            </div>
          )}
          {/* Education */}
          {has(education) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={sectionTitle}>Education</h3>
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{e.studyType ? `${e.studyType} in ` : ''}{e.area}</div>
                  <div style={{ fontSize: 10, color: '#6B7280' }}>{e.institution}</div>
                  <div style={{ fontSize: 9, color: '#9CA3AF' }}>{e.startDate}{e.endDate ? ` - ${e.endDate}` : ''}</div>
                </div>
              ))}
            </div>
          )}
          {/* Certifications */}
          {has(certifications) && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={sectionTitle}>Certifications</h3>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>{cert.name}</div>
                  <div style={{ fontSize: 10, color: '#6B7280' }}>{cert.issuer}{cert.date ? ` | ${cert.date}` : ''}</div>
                </div>
              ))}
            </div>
          )}
          {/* Languages */}
          {has(languages) && (
            <div>
              <h3 style={sectionTitle}>Languages</h3>
              {languages.map((l, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>{l.language}</span>
                  {l.fluency && <span style={{ fontSize: 10, color: '#6B7280' }}> — {l.fluency}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/*  Main ResumePreview component                                       */
/* ================================================================== */

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template, primaryColor, fontFamily }) => {
  if (!data) {
    return (
      <div style={{ ...A4, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: 16, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
        No resume data to preview
      </div>
    )
  }

  const c = primaryColor || '#2563EB'
  const font = fontFamily || "'Segoe UI', system-ui, sans-serif"

  const renderTemplate = () => {
  switch (template) {
    case 'riesling':
      return <Riesling data={data} color={c} />
    case 'barolo':
      return <Barolo data={data} color={c} />
    case 'sauvignon':
      return <Sauvignon data={data} color={c} />
    case 'malbec':
      return <Malbec data={data} color={c} />
    case 'champagne':
      return <Champagne data={data} color={c} />
    case 'bordeaux':
      return <Bordeaux data={data} color={c} />
    case 'pinot-grigio':
      return <PinotGrigio data={data} color={c} />
    case 'cabernet':
      return <Cabernet data={data} color={c} />
    case 'prosecco':
      return <Prosecco data={data} color={c} />
    case 'absinthe':
      return <Absinthe data={data} color={c} />
    case 'hennessy':
      return <Hennessy data={data} color={c} />
    case 'tanqueray':
      return <Tanqueray data={data} color={c} />
    case 'belvedere':
      return <Belvedere data={data} color={c} />
    case 'lagavulin':
      return <Lagavulin data={data} color={c} />
    case 'macallan':
      return <Macallan data={data} color={c} />
    case 'aperol':
      return <Aperol data={data} color={c} />
    case 'chartreuse':
      return <Chartreuse data={data} color={c} />
    case 'glenfiddich':
      return <Glenfiddich data={data} color={c} />
    case 'courvoisier':
      return <Courvoisier data={data} color={c} />
    case 'dom-perignon':
      return <DomPerignon data={data} color={c} />
    case 'veuve-clicquot':
      return <VeuveClicquot data={data} color={c} />
    case 'armagnac':
      return <ArmagnacTpl data={data} color={c} />
    case 'amarone':
      return <AmaroneTpl data={data} color={c} />
    case 'opus-one':
      return <OpusOne data={data} color={c} />
    case 'romanee':
      return <Romanee data={data} color={c} />
    case 'cristal':
      return <Cristal data={data} color={c} />
    case 'sassicaia':
      return <Sassicaia data={data} color={c} />
    case 'krug':
      return <Krug data={data} color={c} />
    case 'petrus':
      return <Petrus data={data} color={c} />
    default:
      return (
        <div style={{ ...A4, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: 16 }}>
          Select a template to preview
        </div>
      )
  }
  }

  return (
    <div style={{ fontFamily: font }}>
      {renderTemplate()}
    </div>
  )
}

export default ResumePreview
