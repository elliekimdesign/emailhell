import { useState, useRef, useCallback } from 'react'
import TopBar from './components/TopBar'
import Sidebar from './components/Sidebar'
import ResearchPanel from './components/ResearchPanel'
import EmailDraftPanel from './components/EmailDraftPanel'
import RecipientsPanel from './components/RecipientsPanel'
import Toast from './components/Toast'

export default function App() {
  const [recipients, setRecipients] = useState([])
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [statusText, setStatusText] = useState('이메일 작성을 시작하세요')
  const [toast, setToast] = useState('')
  const [context, setContext] = useState(null)

  // ── Resizable panels ─────────────────────────────────────────────
  const [p1Width, setP1Width] = useState(320) // Research
  const [p3Width, setP3Width] = useState(280) // Recipients — Email Draft fills remaining
  const panelDragRef = useRef(null)

  const startPanelDrag = (panel, e) => {
    e.preventDefault()
    panelDragRef.current = {
      panel,
      startX: e.clientX,
      startWidth: panel === 'p1' ? p1Width : p3Width,
    }

    const onMove = (ev) => {
      if (!panelDragRef.current) return
      const delta = ev.clientX - panelDragRef.current.startX
      if (panel === 'p1') {
        setP1Width(Math.max(180, panelDragRef.current.startWidth + delta))
      } else {
        // right divider: drag right = p3 narrower
        setP3Width(Math.max(180, panelDragRef.current.startWidth - delta))
      }
    }

    const onUp = () => {
      panelDragRef.current = null
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  // ────────────────────────────────────────────────────────────────
  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2200)
  }, [])

  const handleSendAll = () => {
    if (!recipients.length) { showToast('수신자를 추가해 주세요'); return }
    if (!body) { showToast('이메일 내용을 작성해 주세요'); return }
    showToast(`📨 ${recipients.length}명에게 발송되었습니다`)
    setStatusText(`${recipients.length}명에게 발송 완료`)
  }

  return (
    <>
      <TopBar onSendAll={handleSendAll} />
      <div className="main">
        <Sidebar />
        <div className="panels">

          {/* Panel 1 — Research */}
          <div className="panel-wrap" style={{ width: p1Width }}>
            <ResearchPanel
              setStatus={setStatusText}
              context={context}
              setContext={setContext}
            />
          </div>

          {/* Divider 1 */}
          <div className="panel-div" onMouseDown={e => startPanelDrag('p1', e)} />

          {/* Panel 2 — Email Draft (fills remaining space) */}
          <div className="panel-wrap" style={{ flex: 1, minWidth: 180 }}>
            <EmailDraftPanel
              subject={subject}
              setSubject={setSubject}
              body={body}
              setBody={setBody}
              context={context}
              setContext={setContext}
              setStatus={setStatusText}
              showToast={showToast}
              recipientCount={recipients.length}
            />
          </div>

          {/* Divider 2 */}
          <div className="panel-div" onMouseDown={e => startPanelDrag('p3', e)} />

          {/* Panel 3 — Recipients */}
          <div className="panel-wrap" style={{ width: p3Width }}>
            <RecipientsPanel
              recipients={recipients}
              setRecipients={setRecipients}
              body={body}
              setStatus={setStatusText}
              showToast={showToast}
              onSendAll={handleSendAll}
            />
          </div>

        </div>
      </div>
      <div className="statusbar">
        <div className="sl"><div className="dot"></div>AI Connected</div>
        <div className="sc">{statusText}</div>
        <div className="sl">Feb 18, 2026</div>
      </div>
      <Toast message={toast} />
    </>
  )
}
