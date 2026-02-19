import { useState } from 'react'

const ALL_CONTACTS = [
  { name: 'Sarah Lee',    email: 'sarah.lee@acme.com',  color: '#3D8A60' },
  { name: 'James Kimkenny', email: 'j.kim@venture.io',    color: '#5A8FB5' },
  { name: 'Mia Tanaka',   email: 'mia@designstudio.co', color: '#C87060' },
  { name: 'David Park',   email: 'd.park@techcorp.com', color: '#7060C8' },
  { name: 'Lena Fischer', email: 'lena@growthlab.eu',   color: '#B07040' },
  { name: 'Tom Nakamura', email: 'tom.n@startup.ai',    color: '#40A870' },
  { name: 'Aisha Rahman', email: 'aisha@globalco.org',  color: '#B04060' },
]

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function RecipientsPanel({ recipients, setRecipients, body, setStatus, showToast, onSendAll }) {
  const [search, setSearch] = useState('')

  const filtered = ALL_CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const toggleContact = (contact) => {
    const exists = recipients.some(r => r.email === contact.email)
    if (exists) {
      setRecipients(prev => prev.filter(r => r.email !== contact.email))
    } else {
      setRecipients(prev => [...prev, contact])
      setStatus(`수신자 ${recipients.length + 1}명 선택됨`)
    }
  }

  const removeRecipient = (email) => {
    setRecipients(prev => prev.filter(r => r.email !== email))
  }

  const addManual = () => {
    const v = search.trim()
    if (!v) { showToast('이름 또는 이메일을 입력하세요'); return }
    const contact = {
      name: v.includes('@') ? v.split('@')[0] : v,
      email: v.includes('@') ? v : v + '@email.com',
      color: '#555560',
    }
    if (!recipients.some(r => r.email === contact.email)) {
      setRecipients(prev => [...prev, contact])
    }
    setSearch('')
  }

  return (
    <div className="panel p3">
      <div className="ph">
        <div className="step">3</div>
        <div className="ptitle">Recipients</div>
        <div className="psub">{recipients.length}명</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
        <div className="sec-label">선택된 수신자</div>
        <div className="chips-area">
          {recipients.length === 0 ? (
            <span className="no-r">아직 없어요</span>
          ) : (
            recipients.map(r => (
              <div key={r.email} className="chip">
                <div className="chip-av" style={{ background: r.color }}>{initials(r.name)}</div>
                <span>{r.name.split(' ')[0]}</span>
                <span className="chip-rm" onClick={() => removeRecipient(r.email)}>✕</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="divider"></div>

      <div className="rsearch-row">
        <input
          className="rsearch"
          type="text"
          placeholder="이름 또는 이메일…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="add-btn" onClick={addManual}>+ 추가</button>
      </div>

      <div className="sec-label">추천 연락처</div>

      <div className="contacts-list">
        {filtered.map(contact => {
          const added = recipients.some(r => r.email === contact.email)
          return (
            <div
              key={contact.email}
              className={`crow${added ? ' added' : ''}`}
              onClick={() => toggleContact(contact)}
            >
              <div className="cav" style={{ background: contact.color }}>{initials(contact.name)}</div>
              <div className="cinfo">
                <div className="cname">{contact.name}</div>
                <div className="cemail">{contact.email}</div>
              </div>
              <div className={`ctag ${added ? 'ctag-added' : 'ctag-add'}`}>
                {added ? '✓ 추가됨' : '+ 추가'}
              </div>
            </div>
          )
        })}
      </div>

      {recipients.length > 0 && (
        <div className="send-summary">
          <div className="ss-ico">📨</div>
          <div className="ss-text">
            <div className="ss-title">{recipients.length}명에게 발송 준비</div>
            <div className="ss-sub">{body ? '초안과 수신자 설정 완료' : '초안을 작성해 주세요'}</div>
          </div>
          <button className="send-now" onClick={onSendAll}>보내기 ↗</button>
        </div>
      )}
    </div>
  )
}
