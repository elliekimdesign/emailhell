import { useState, useRef, useCallback, useEffect } from 'react'
import TopBar from './components/TopBar'
import Sidebar from './components/Sidebar'
import ResearchPanel from './components/ResearchPanel'
import ThreadHistoryPanel from './components/ThreadHistoryPanel'
import EmailDraftPanel from './components/EmailDraftPanel'
import Toast from './components/Toast'

const ACCOUNTS = [
  { label: 'Personal', email: 'kimkenny@personal.com', color: '#4EB87A' },
  { label: 'Work', email: 'kimkenny@company.co', color: '#6FA3C8' },
  { label: 'School', email: 'kimkenny@school.edu', color: '#E8886A' },
]

export default function App() {
  const [recipients, setRecipients] = useState([])
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [statusText, setStatusText] = useState('이메일 작성을 시작하세요')
  const [toast, setToast] = useState('')
  const [context, setContext] = useState(null)
  const [selectedThread, setSelectedThread] = useState(null)
  const [activeAccount, setActiveAccount] = useState(1) // 0=Personal, 1=Work, 2=School
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // ── Resizable panels ─────────────────────────────────────────────
  const [p1Width, setP1Width] = useState(320) // Research (email list)
  const [p2Width, setP2Width] = useState(380) // Thread History
  // Email Draft fills remaining space
  const panelDragRef = useRef(null)
  const dropdownRef = useRef(null)

  const startPanelDrag = (panel, e) => {
    e.preventDefault()
    panelDragRef.current = {
      panel,
      startX: e.clientX,
      startWidth: panel === 'p1' ? p1Width : p2Width,
    }

    const onMove = (ev) => {
      if (!panelDragRef.current) return
      const delta = ev.clientX - panelDragRef.current.startX
      if (panel === 'p1') {
        setP1Width(Math.max(180, panelDragRef.current.startWidth + delta))
      } else {
        // p2: drag right = p2 wider
        setP2Width(Math.max(180, panelDragRef.current.startWidth + delta))
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleSendAll = () => {
    if (!body) { showToast('이메일 내용을 작성해 주세요'); return }
    showToast(`📨 이메일이 발송되었습니다`)
    setStatusText(`발송 완료`)
  }

  return (
    <>
      <TopBar onSendAll={handleSendAll} />
      <div className="main">
        <Sidebar />
        <div className="content-area">
          {/* Account Switcher Dropdown */}
          <div className="account-switcher" ref={dropdownRef}>
            <button
              className="account-display"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="account-dot" style={{ background: ACCOUNTS[activeAccount].color }}></div>
              <div className="account-email-main">{ACCOUNTS[activeAccount].email}</div>
              <div className="account-badge" style={{ background: ACCOUNTS[activeAccount].color }}>
                {ACCOUNTS[activeAccount].label}
              </div>
              <div className="account-arrow">{isDropdownOpen ? '▲' : '▼'}</div>
            </button>

            {isDropdownOpen && (
              <div className="account-dropdown">
                {ACCOUNTS.map((acc, i) => (
                  <button
                    key={i}
                    className={`account-dropdown-item${activeAccount === i ? ' active' : ''}`}
                    onClick={() => {
                      setActiveAccount(i)
                      setSelectedThread(null)
                      setStatusText(`Switched to ${acc.label} account`)
                      setIsDropdownOpen(false)
                    }}
                  >
                    <div className="account-dot" style={{ background: acc.color }}></div>
                    <div className="account-dropdown-email">{acc.email}</div>
                    <div className="account-dropdown-badge" style={{ background: acc.color }}>
                      {acc.label}
                    </div>
                    {activeAccount === i && <div className="account-check">✓</div>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="panels">

          {/* Panel 1 — Email List (Research) */}
          <div className="panel-wrap" style={{ width: p1Width }}>
            <ResearchPanel
              setStatus={setStatusText}
              selectedThread={selectedThread}
              setSelectedThread={setSelectedThread}
              activeAccount={activeAccount}
            />
          </div>

          {/* Divider 1 */}
          <div className="panel-div" onMouseDown={e => startPanelDrag('p1', e)} />

          {/* Panel 2 — Thread History */}
          <div className="panel-wrap" style={{ width: p2Width }}>
            <ThreadHistoryPanel
              selectedThread={selectedThread}
            />
          </div>

          {/* Divider 2 */}
          <div className="panel-div" onMouseDown={e => startPanelDrag('p2', e)} />

          {/* Panel 3 — Email Draft (fills remaining space) */}
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
              selectedThread={selectedThread}
              activeAccount={activeAccount}
            />
          </div>

          </div> {/* end panels */}
        </div> {/* end content-area */}
      </div> {/* end main */}
      <div className="statusbar">
        <div className="sl"><div className="dot"></div>AI Connected</div>
        <div className="sc">{statusText}</div>
        <div className="sl">Feb 18, 2026</div>
      </div>
      <Toast message={toast} />
    </>
  )
}
