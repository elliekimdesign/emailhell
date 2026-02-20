export default function ThreadHistoryPanel({ selectedThread }) {
  if (!selectedThread) {
    return (
      <div className="panel p2">
        <div className="ph">
          <div className="step">2</div>
          <div className="ptitle">Thread History</div>
          <div className="psub">Select an email</div>
        </div>
        <div className="tl-empty">
          <div className="tl-empty-ico">💬</div>
          <div className="tl-empty-text">Click an email thread<br/>to see the conversation</div>
        </div>
      </div>
    )
  }

  return (
    <div className="panel p2">
      <div className="ph">
        <div className="step">2</div>
        <div className="ptitle">Thread History</div>
        <div className="psub">{selectedThread.context.length} messages</div>
      </div>

      <div className="thread-panel-messages">
        {[...selectedThread.context].reverse().map((msg, i) => (
          <div key={i} className={`thread-panel-msg ${msg.from === 'me' ? 'msg-me' : 'msg-them'}`}>
            <div className="thread-msg-header">
              <div className="cav" style={{
                background: msg.from === 'me' ? 'var(--moss)' : selectedThread.recipient.color,
                width: 24,
                height: 24,
                fontSize: 9
              }}>
                {msg.from === 'me' ? 'SK' : selectedThread.recipient.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="thread-msg-from">
                {msg.from === 'me' ? 'kimkenny' : msg.from}
              </div>
              {i === 0 && (
                <div className="thread-msg-badge">Latest</div>
              )}
            </div>
            <div className="thread-msg-text">{msg.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
