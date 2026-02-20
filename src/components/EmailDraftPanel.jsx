import { useState, useEffect } from 'react'

const SENDERS = [
  { label: '개인', email: 'kimkenny@personal.com', color: '#4EB87A' },
  { label: '회사', email: 'kimkenny@company.co', color: '#6FA3C8' },
  { label: '학교', email: 'kimkenny@school.edu', color: '#E8886A' },
]

const DRAFTS = [
  `안녕하세요 Sarah,\n\n최근 Acme Inc.의 시리즈 B 펀딩 소식을 접했습니다. 4,000만 달러 규모의 투자, 진심으로 축하드립니다!\n\n저는 [회사명]에서 파트너십을 담당하는 [이름]입니다. 공통 클라이언트 3곳과의 시너지 가능성을 탐색해보고 싶어 연락드렸습니다.\n\n이번 주 20분 정도 짧은 통화가 가능할까요?\n\n감사합니다,\nJames`,
  `안녕하세요,\n\n2025 시장 리포트를 검토하다가 귀사의 인상적인 성장세(YoY 23%)를 확인했습니다.\n\n양측 모두에게 가치 있는 협업 방안을 제안드리고 싶습니다. 간단한 미팅을 통해 아이디어를 공유할 수 있을까요?\n\n감사합니다.`,
]

export default function EmailDraftPanel({
  subject, setSubject, body, setBody,
  context, setContext,
  setStatus, showToast, recipientCount,
  selectedThread,
  activeAccount,
}) {
  const [activeSender, setActiveSender] = useState(activeAccount || 0)
  const [draftStatus, setDraftStatus] = useState('—')

  // Sync sender with global active account
  useEffect(() => {
    if (activeAccount !== undefined) {
      setActiveSender(activeAccount)
    }
  }, [activeAccount])

  const generateEmail = () => {
    const draft = DRAFTS[Math.floor(Math.random() * DRAFTS.length)]
    setSubject('협업 제안 드립니다')
    setBody(draft)
    setDraftStatus('AI 생성됨')
    setStatus('초안 생성 완료 · 수신자를 추가하고 보내세요')
    showToast('✦ 초안이 생성되었습니다')
  }

  const shortenEmail = () => {
    if (!body) return
    const lines = body.split('\n').filter(l => l.trim())
    setBody(lines.slice(0, Math.ceil(lines.length * 0.55)).join('\n'))
    showToast('요약되었습니다')
  }

  const saveDraft = () => {
    showToast('임시저장 완료')
    setStatus('임시저장됨')
  }

  const removeCtx = () => setContext(null)

  return (
    <div className="panel p3">
      <div className="ph">
        <div className="step">3</div>
        <div className="ptitle">Email Draft</div>
        <div className="psub">{selectedThread ? `Re: ${selectedThread.subject}` : draftStatus}</div>
      </div>

      {context && (
        <div className="ctx-pill">
          <span>📎</span>
          <span>{context.title}</span>
          <span className="rm" onClick={removeCtx}>✕</span>
        </div>
      )}

      <div className="compose-wrap">
        {/* Sender selector */}
        <div className="sender-row">
          <div className="sender-label">From</div>
          <div className="sender-accounts">
            {SENDERS.map((s, i) => (
              <button
                key={i}
                className={`sender-opt${activeSender === i ? ' active' : ''}`}
                onClick={() => {
                  setActiveSender(i)
                  setStatus(s.label + ' 계정으로 발신 설정됨')
                }}
              >
                <div className="sender-dot" style={{ background: s.color }}></div>
                <div>
                  <div className="sender-name">{s.label}</div>
                  <div className="sender-email-text">{s.email}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Subject */}
        <div className="csubject-row">
          <input
            className="csubject-input"
            type="text"
            placeholder="제목을 입력하세요…"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
          <button className="ai-generate-btn" title="AI 초안 생성" onClick={generateEmail}>✦</button>
        </div>

        {/* Body */}
        <div className="cbody-area">
          <textarea
            className="cbody"
            placeholder="내용을 입력하거나 AI 초안을 생성해 보세요…"
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>

        {/* Toolbar */}
        <div className="compose-bar">
          <button className="cbar-btn" onClick={() => { if (body) showToast('이메일을 재작성했습니다') }}>✨ 재작성</button>
          <div className="cbar-sep"></div>
          <button className="cbar-btn" onClick={shortenEmail}>✂️ 요약</button>
          <button className="cbar-btn" onClick={() => { if (body) showToast('공식적인 문체로 변경되었습니다') }}>👔 공식체</button>
          <button className="cbar-btn" onClick={() => { if (body) showToast('친근한 문체로 변경되었습니다 ☀️') }}>☀️ 친근체</button>
          <button className="cbar-save" onClick={saveDraft}>임시저장</button>
        </div>
      </div>
    </div>
  )
}
