export default function TopBar({ onSendAll }) {
  return (
    <div className="topbar">
      <div className="logo">
        <div className="logo-mark">
          <svg width="15" height="12" viewBox="0 0 15 12" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="1" width="13" height="10" rx="1.5"/>
            <path d="M1 3l6.5 4.5L14 3"/>
          </svg>
        </div>
        <div className="logo-name">mai<span>lo</span></div>
      </div>

      <div className="topbar-pills">
        <button className="pill active">Compose</button>
        <button className="pill">Inbox</button>
        <button className="pill">Sent</button>
      </div>

      <div className="topbar-right">
        <button className="send-all-btn" onClick={onSendAll}>모두에게 보내기 ↗</button>
        <div className="avatar">SK</div>
      </div>
    </div>
  )
}
