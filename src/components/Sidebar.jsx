export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sicon active" title="Compose">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11.5 2.5l2 2L6 12H4v-2l7.5-7.5z"/>
          <path d="M2 14h12" opacity=".3"/>
        </svg>
      </div>
      <div className="sicon" title="Templates">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="12" height="12" rx="2"/>
          <path d="M5 5.5h6M5 8h6M5 10.5h4"/>
        </svg>
      </div>
      <div className="sicon" title="Contacts">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="5.5" r="2.5"/>
          <path d="M2.5 13.5c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5"/>
        </svg>
      </div>
      <div className="sicon" title="History">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="5.5"/>
          <path d="M8 5v3.5l2 1.5"/>
        </svg>
      </div>
      <div className="sidebar-spacer"></div>
      <div className="sicon" title="Settings">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="2"/>
          <path d="M8 1.5v1.3M8 13.2v1.3M1.5 8h1.3M13.2 8h1.3M3.4 3.4l.9.9M11.7 11.7l.9.9M3.4 12.6l.9-.9M11.7 4.3l.9-.9"/>
        </svg>
      </div>
    </div>
  )
}
