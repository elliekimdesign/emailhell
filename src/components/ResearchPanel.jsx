import { useState, useRef, useEffect } from 'react'

// ── Mock email threads ──────────────────────────────────────────────
const now = new Date('2026-02-18T10:00:00')
function daysAgo(d) { return new Date(now - d * 86400000) }
function hoursAgo(h) { return new Date(now - h * 3600000) }

const THREADS = [
  {
    id: 1,
    subject: 'Q4 Partnership Proposal — Acme Inc.',
    read: false,
    recipient: { name: 'Sarah Lee', email: 'sarah.lee@acme.com', color: '#3D8A60' },
    messageCount: 9,
    lastActive: hoursAgo(2),
    preview: 'Could you send over the revised deck before Thursday? The leadership team wants to review before the call.',
    context: [
      { from: 'me', text: `Hi Sarah,

I hope this finds you well! I wanted to follow up on the Q4 partnership proposal we put together after the TechConnect Summit last month. I think the alignment between what Acme is building and our direction is genuinely strong, and I'd love to move the conversation forward.

I've attached the initial deck covering the three integration scenarios we outlined, along with preliminary revenue projections for each. The co-marketing opportunity in Scenario B is particularly exciting — our target audiences overlap significantly, and I think there's real upside there for both sides.

Would you have 30 minutes this week to walk through the proposal together? I'm flexible on timing and happy to work around your schedule.

Looking forward to hearing your thoughts!

Best,
James` },
      { from: 'Sarah Lee', text: `Hi James,

Thanks so much for following up — great to hear from you! I had a chance to look through the deck and it's definitely promising. The co-marketing scenario caught our VP of Partnerships' attention as well.

Before we schedule a call, could you send over a revised version with updated unit economics? Our CFO flagged that she'd want to see the Q4 margin assumptions laid out more clearly before the discussion. Nothing major — just a bit more detail on how you arrived at the projections.

If you could get that to me before Thursday, that would be perfect. We have a leadership sync on Friday morning and I'd love to have the updated deck ready to present.

Thanks again!

Best,
Sarah` },
      { from: 'me', text: `Hi Sarah,

Of course — happy to get that over to you. I'll have the revised deck with the updated unit economics and Q4 margin assumptions ready by Wednesday EOD, so you'll have plenty of time before the Friday sync.

I'll also add a slide breaking down the co-marketing revenue split in more detail since that seems to be of particular interest. And I'll make the assumptions section more explicit so everything is easy to follow without needing to read the footnotes.

Is there anything else you'd like me to include or address before I send it over?

Best,
James` },
      { from: 'Sarah Lee', text: `Hi James,

That's great, thank you! The additional co-marketing breakdown sounds really useful.

One more thing — since our leadership team will be reviewing the deck before the actual call, would it be possible to push the meeting itself to next week? That would give everyone time to come properly prepared rather than reviewing it the same day. Would Tuesday at 3pm work for you?

Also, just a quick heads up: could you double-check the NDA coverage on the financial projections before sharing? Our legal team flagged it as something to confirm, especially since we'll be circulating it internally.

Thanks,
Sarah` },
      { from: 'me', text: `Hi Sarah,

Tuesday at 3pm works perfectly — I'll block it now. I'll also confirm with our legal team about NDA coverage on the projections and include a note alongside the deck when I send it over on Wednesday.

Should I go ahead and update the calendar invite to include your VP of Partnerships as well, or would you prefer to add him directly?

Best,
James` },
      { from: 'Sarah Lee', text: `Hi James,

Yes, please update the invite — and could you also add David Chen from our BD team? He'll be leading the partnership evaluation on our end going forward, so it's important he's looped in from the start. His email is david.chen@acme.com.

Really looking forward to the call!

Best,
Sarah` },
    ],
  },
  {
    id: 2,
    subject: 'Re: Design System Feedback — Sprint 12',
    read: false,
    recipient: { name: 'Mia Tanaka', email: 'mia@designstudio.co', color: '#C87060' },
    messageCount: 12,
    lastActive: hoursAgo(5),
    preview: 'The token changes look great overall. One concern with the dark mode contrast ratios on the secondary buttons.',
    context: [
      { from: 'me', text: `Hi Mia,

Hope you're having a good week! I've just wrapped up the Sprint 12 design system updates and wanted to share them with you for review before we push to production.

The main changes in this sprint include: updated color tokens for the new brand palette, a revised spacing scale using an 8px base, new component variants across the full button system, and updated typography styles for the heading hierarchy. I've also cleaned up some inconsistencies in the icon set that were flagged in the Sprint 11 audit.

I've linked the Figma file and the full token documentation below. Please let me know if anything looks off or if you have questions about the rationale behind any of the changes — happy to walk through anything in more detail.

Thanks so much for your time on this. Your feedback on Sprint 11 was incredibly valuable.

Best,
James` },
      { from: 'Mia Tanaka', text: `Hi James,

Thanks for sending this over! I went through everything carefully and the overall direction is really solid. The new brand palette feels much more cohesive and the typography hierarchy is a big improvement.

One concern I do need to flag: the dark mode contrast ratios on the secondary buttons are borderline. I ran them through Stark and the ghost button label on dark backgrounds is sitting at 3.8:1, which falls short of the WCAG AA standard of 4.5:1. Depending on the markets we're operating in, this could create accessibility compliance risk.

Everything else looks great — especially the spacing scale cleanup. Nice work!

Best,
Mia` },
      { from: 'me', text: `Hi Mia,

Great catch — I completely missed that. Thank you for running the contrast check. I'll update the ghost button label color from #8A9BA8 to #B2C5D4, which should push us to around 5.2:1 and comfortably above AA compliance. I'll re-verify with Stark before pushing the update.

I really appreciate you catching this before it went to production. Should I send you an updated Figma preview once I've made the change, so you can confirm before I finalize the tokens?

Best,
James` },
      { from: 'Mia Tanaka', text: `Hi James,

Yes, a quick preview would be great — just a screenshot of the button variants in dark mode should be enough.

One more thing while I have your attention: the spacing scale jump from 16px to 24px feels a bit abrupt. In dense UI areas like data tables and form layouts, there's no intermediate option, which creates some awkward padding situations. Would it be possible to add a 20px step as --space-5? I know it's a late-stage change, but I think it'll save a lot of pain downstream.

Best,
Mia` },
      { from: 'me', text: `Hi Mia,

Totally agree — adding --space-5 at 20px makes a lot of sense. I'll work it into the token file and update the documentation to reflect the intended use cases for that step, so the team knows when to reach for it.

I'll send over the updated dark mode preview alongside the full revised token set. Is there anything else you'd want me to address before I finalize the sprint? I want to make sure we don't need another revision cycle.

Best,
James` },
      { from: 'Mia Tanaka', text: `Hi James,

Just one last thing — the icon sizing on mobile viewports looks slightly large. The 24px icons feel a bit overwhelming on small screens; 20px might be a better default for anything below 375px breakpoint.

Other than that, the system is in really great shape. Once you've got the contrast fix, the spacing step, and the mobile icon size sorted, you're good to ship. Nice work on this sprint overall!

Best,
Mia` },
    ],
  },
  {
    id: 3,
    subject: 'Follow-up: Investment Memo Review',
    read: true,
    recipient: { name: 'James Kimkenny', email: 'j.kim@venture.io', color: '#5A8FB5' },
    messageCount: 7,
    lastActive: hoursAgo(18),
    preview: 'We reviewed the memo internally. A few questions on the unit economics section — can we get on a call this week?',
    context: [
      { from: 'James Kimkenny', text: `Hi,

Our team had a chance to sit down with the investment memo this week and we're genuinely impressed with the thesis. The market framing is tight, the problem statement is compelling, and the team section is one of the stronger ones we've seen this quarter.

That said, before we can move forward, we have some questions about the unit economics section. Specifically, the CAC payback period and LTV assumptions feel optimistic given the current market environment. Our investment committee is going to push hard on those numbers, so we'd like to pressure-test them with you directly before we table it for a decision.

Would you be open to a short call this week to walk us through the methodology?

Best,
James K.` },
      { from: 'me', text: `Hi James,

Really glad to hear the team found the memo compelling — and I completely welcome the scrutiny on the unit economics. You're right that the assumptions are aggressive; they're based on our current cohort data, but I'd love the chance to walk through the underlying logic in detail and show the sensitivity analysis we ran under more conservative scenarios.

I'm available Thursday afternoon and most of Friday. Would either of those work for a 30-minute call? I can also prepare a short supplementary document covering the CAC calculation methodology ahead of the call if that would be helpful for the investment committee.

Best,
James` },
      { from: 'James Kimkenny', text: `Hi James,

Friday afternoon works well on our end. A supplementary doc would be very useful — particularly if it addresses the LTV assumptions and how you've modeled for churn. The 18-month CAC payback period is the main sticking point for the committee right now.

If you could have it ready by Thursday EOD, that would give us time to review before the call. We want to come prepared with specific questions rather than going in cold.

Best,
James K.` },
      { from: 'me', text: `Hi James,

Absolutely — I'll have the supplementary doc in your inbox by Thursday at 5pm. It'll cover the full LTV and CAC methodology, including a sensitivity analysis showing how the payback period shifts under three different churn scenarios. I'll also include a note on the key assumptions that drive the model so the committee can see exactly where the levers are.

What time on Friday works best for you?

Best,
James` },
      { from: 'James Kimkenny', text: `Hi James,

Friday at 2pm works perfectly. I'll send a calendar invite with the video call link shortly — it'll just be myself and our associate, Priya, who's been leading the due diligence.

Looking forward to the conversation. This is exactly the kind of diligence process we want to go through carefully before moving to a term sheet discussion.

Best,
James K.` },
    ],
  },
  {
    id: 4,
    subject: 'Acme Inc. — Contract Amendment Draft',
    read: true,
    recipient: { name: 'Sarah Lee', email: 'sarah.lee@acme.com', color: '#3D8A60' },
    messageCount: 5,
    lastActive: daysAgo(3),
    preview: 'Legal has reviewed the amendment. A couple of minor redlines on section 4.2.',
    context: [
      { from: 'Sarah Lee', text: `Hi James,

Hope you're well! I wanted to give you an update on the contract amendment we sent over last week.

Our legal team has completed their review and overall they're comfortable with the terms. There are just a couple of minor redlines, both in section 4.2 regarding the liability cap language. Specifically, legal wants to replace "aggregate liability" with "direct damages liability" and cap it at 12 months of fees rather than 18. It's fairly standard language on our side — nothing that should be a dealbreaker.

I've attached the redlined version for your review. Please let us know by Friday whether your counsel can agree to the revised language, as we're hoping to execute by end of month.

Best,
Sarah` },
      { from: 'me', text: `Hi Sarah,

Thanks for the update — and glad to hear it's nothing major. I'll pass the redlined version to our legal counsel today and ask them to prioritize a review given the Friday timeline.

The shift from "aggregate liability" to "direct damages liability" sounds reasonable at first glance, though I'll want counsel to confirm the practical implications before we formally agree. I'll come back to you by Thursday at the latest.

Best,
James` },
      { from: 'Sarah Lee', text: `Hi James,

That works perfectly — Thursday gives us just enough time to finalize before Friday. If your counsel has any questions or counter-proposals, feel free to have them reach out directly to our General Counsel, Monica Reyes (m.reyes@acme.com). She's briefed on the redlines and can turn around responses quickly.

Looking forward to getting this wrapped up!

Best,
Sarah` },
    ],
  },
  {
    id: 5,
    subject: 'Intro: GrowthLab x Us — Potential Collab',
    read: false,
    recipient: { name: 'Lena Fischer', email: 'lena@growthlab.eu', color: '#B07040' },
    messageCount: 6,
    lastActive: daysAgo(1),
    preview: 'Thanks for the intro! I looked at your work and I think there\'s a real overlap with what we\'re building.',
    context: [
      { from: 'Lena Fischer', text: `Hi,

Thanks so much for the introduction — I really appreciate Marcus making the connection.

I've had a chance to look through your recent work, and I have to say there's a genuine overlap with what we're building at GrowthLab. Particularly your approach to retention-driven growth loops for B2B SaaS — we've been working on a very similar framework for our enterprise clients and I think there's real potential to combine approaches.

I'd love to explore what a collaboration might look like, even informally at first. Are you open to an initial conversation?

Best,
Lena` },
      { from: 'me', text: `Hi Lena,

Wonderful to connect — and thank Marcus indeed for making the introduction!

I've been following GrowthLab's work on the B2B retention side for a while, and your published frameworks are excellent. I can already see how our approaches could complement each other really well, especially at the intersection of product-led growth and customer success.

I'd love to set up a conversation to explore potential collaboration. I'm thinking we could start by mapping out the specific areas of overlap and identify whether there's a joint engagement or research project where we could trial working together. No pressure to commit to anything upfront.

Would you be open to a 30-minute exploratory call next week?

Best,
James` },
      { from: 'Lena Fischer', text: `Hi James,

A 30-minute exploratory call sounds like a great starting point — next week works well for me.

I'd also like to bring in our Head of Partnerships, Nina Berger, since she'd be the one facilitating any formal arrangement on our end. She has good context on the types of collaborations we've done before and can help us move quickly if there's a strong fit. Would it be okay if she joined the call?

Best,
Lena` },
      { from: 'me', text: `Hi Lena,

Please do bring Nina along — the more the merrier at this stage, and it'll be much more efficient to have the right people in the room from the start rather than doing multiple rounds of catch-up later.

Monday or Tuesday next week work well for me. I'm flexible on timing — mornings or afternoons on either day. Just send over a time that works for you both and I'll confirm right away.

Looking forward to it!

Best,
James` },
    ],
  },
  {
    id: 6,
    subject: 'AI Tools Evaluation — Vendor Shortlist',
    read: true,
    recipient: { name: 'David Park', email: 'd.park@techcorp.com', color: '#7060C8' },
    messageCount: 8,
    lastActive: hoursAgo(9),
    preview: 'We\'ve narrowed it down to three vendors. Your input on the integration complexity would really help.',
    context: [
      { from: 'David Park', text: `Hi James,

Hope you're well. I wanted to reach out because we've completed the initial AI vendor evaluation and narrowed the list down to three candidates: VendorA (a generalist LLM API provider), VendorB (specialized for document processing workflows), and VendorC (a custom fine-tuned solution built on an open-source base).

Given your experience with AI infrastructure and vendor integrations, I'd really value your input on the integration complexity before we make a final recommendation to the board. The decision deadline is next Wednesday and we want to make sure we're not overlooking anything technical before we commit.

Would you be able to take a look at the specs?

Best,
David` },
      { from: 'me', text: `Hi David,

Happy to help with the evaluation — this is exactly the kind of decision that benefits from a second set of eyes before committing. AI vendor lock-in can be surprisingly painful if you pick the wrong one.

Could you share the technical spec sheets for each vendor? I'd specifically want to look at the API architecture and versioning policy, rate limits and SLA structure, data residency and privacy handling, and what the migration path looks like if you ever need to switch. The last one is often overlooked but becomes very important later.

Best,
James` },
      { from: 'David Park', text: `Hi James,

Sending the spec sheets over separately — you should have them in your inbox now.

Quick note on VendorC: this is the one our engineering team is most concerned about. Their API uses a non-standard OAuth flow that doesn't play nicely with our existing middleware stack, and the documentation is surprisingly sparse for a production-grade product. Our lead engineer flagged potential compatibility issues that could add 3–4 weeks to the integration timeline.

VendorA and VendorB look relatively clean from an integration standpoint, though VendorB has some data residency constraints that might complicate our planned EU rollout next quarter.

Best,
David` },
      { from: 'me', text: `Hi David,

Got the docs — I'll do a thorough review today and tomorrow. The VendorC authentication concern is worth taking very seriously. Non-standard auth flows tend to create compounding issues: maintenance overhead as the vendor updates their implementation, complications during security audits, and brittle integrations that break unexpectedly.

I'll provide a brief risk assessment for all three vendors and flag anything that looks like a red flag. You'll have my full analysis by EOD tomorrow, well ahead of your Wednesday deadline.

Best,
James` },
      { from: 'David Park', text: `Hi James,

Really appreciate you moving quickly on this. The board meeting is Thursday morning, so Wednesday EOD is a hard deadline for our recommendation.

If VendorC really does have major integration concerns, we may need to weigh whether the customization benefits justify the added overhead and timeline risk. My instinct is that we should go with VendorA as the safer foundation and revisit fine-tuning options in Q3 once we have more bandwidth. But I'll wait to see your analysis before deciding.

Best,
David` },
    ],
  },
  {
    id: 7,
    subject: 'Re: Budget Approval — Q1 Campaign',
    read: true,
    recipient: { name: 'Lena Fischer', email: 'lena@growthlab.eu', color: '#B07040' },
    messageCount: 4,
    lastActive: daysAgo(4),
    preview: 'The revised budget looks reasonable. Just waiting on sign-off from the CFO.',
    context: [
      { from: 'Lena Fischer', text: `Hi James,

Just wanted to loop you in with a quick update on the Q1 campaign budget you submitted last week.

I've had a chance to review it and the numbers look reasonable to me. The reallocation toward performance channels makes sense given last quarter's data, and building in a 15% contingency buffer is prudent given how Q4 went. I'll be presenting it to our CFO, Maria Hoffmann, for final sign-off.

Maria tends to be thorough in her review process, so it might take a few days, but I don't anticipate any major pushback — the budget is well-justified and conservative. I'll keep you posted as soon as I hear back.

Best,
Lena` },
      { from: 'me', text: `Hi Lena,

Thank you for the update, and for advocating for the budget on our end — I really appreciate it.

Once the CFO gives the green light, I'll brief the team immediately so we can start the campaign build-out without losing any lead time. If it would be helpful, I can also prepare a more detailed channel strategy and brief in the meantime so we're ready to hit the ground running as soon as the budget is confirmed. Just let me know.

Best,
James` },
    ],
  },
  {
    id: 8,
    subject: 'Startup.ai — Onboarding & Next Steps',
    read: false,
    recipient: { name: 'Tom Nakamura', email: 'tom.n@startup.ai', color: '#40A870' },
    messageCount: 10,
    lastActive: hoursAgo(30),
    preview: 'Onboarding call was great! Here\'s a recap and the action items we agreed on.',
    context: [
      { from: 'Tom Nakamura', text: `Hi James,

What a fantastic onboarding call today — the team was really impressed with your technical depth and the clarity of your implementation plan. You clearly came well-prepared, which makes our job much easier.

As discussed, here's a recap of the key action items we agreed on:
- You'll complete the initial API integration setup by end of next week (Feb 27th)
- We'll send sandbox credentials to this email by EOD today
- First milestone review is scheduled for March 1st at 10am
- Weekly check-in cadence: Fridays at 10am, starting this week

Please let me know if I've missed anything or if any of these timelines need adjusting on your end.

Best,
Tom` },
      { from: 'me', text: `Hi Tom,

Thanks for the warm welcome — the Startup.ai team made the onboarding experience genuinely smooth and I'm excited to get started.

The recap looks accurate. I'll kick off the integration setup as soon as the sandbox credentials come through.

One thing I wanted to clarify before I begin: the documentation mentions both REST and GraphQL endpoints. Is the GraphQL API fully supported for production use, or would you recommend sticking with REST for the initial integration? Given the batch operations in our use case, GraphQL might be significantly more efficient, but I want to make sure we're building on stable ground.

Best,
James` },
      { from: 'Tom Nakamura', text: `Hi James,

Great question — and good instinct on the GraphQL front. The GraphQL API is fully production-ready and is actually our preferred option for complex queries and batch operations. You'll get much better performance and more flexibility compared to the REST endpoints. I'll flag this to our dev docs team to make the recommendation clearer in the onboarding materials.

One thing to note: the GraphQL schema is versioned separately, so make sure you pin to v2.1 in your client config. v2.0 is still live but will be deprecated in Q2.

And please do reach out if you hit any blockers — our developer support team is on Slack and typically responds within 2 hours during business hours. We want this integration to go as smoothly as possible.

Best,
Tom` },
      { from: 'me', text: `Hi Tom,

That's really helpful — I'll go with GraphQL v2.1. Good to know about the versioning ahead of time; I'll make sure to pin it from the start so we don't get caught by a deprecation later.

I'm aiming to have the first integration milestone completed by February 27th as planned. If anything comes up during setup, I'll ping the Slack channel. I'll also document any gaps or ambiguities I find in the API docs so the team can use it as feedback.

Looking forward to the Friday check-in!

Best,
James` },
      { from: 'Tom Nakamura', text: `Hi James,

Perfect — February 27th is in our milestone tracker. Any documentation feedback is always very welcome; we're actively improving the developer experience and real-world input is invaluable.

I'll check in on Friday to see how things are progressing. Feel free to share any early impressions, even if the integration isn't fully complete yet — it's always useful to hear how the first few days go.

Best,
Tom` },
    ],
  },
]

// ── AI responses for thread chat ─────────────────────────────────────
function getThreadResponses(thread) {
  return [
    {
      text: `이 스레드에서 ${thread.recipient.name}님은 "${thread.preview.slice(0, 60)}…"라고 말씀하셨어요. 답장에서 이 점을 먼저 acknowledge하는 게 좋을 것 같아요. 구체적으로 어떤 부분이 어렵게 느껴지세요?`,
    },
    {
      text: `총 ${thread.messageCount}번의 주고받음이 있었던 스레드예요. 관계가 이미 충분히 형성되어 있으니, 너무 격식을 차리지 않아도 됩니다. 핵심 답변 내용을 먼저 알려주시면 초안을 잡아드릴게요.`,
    },
    {
      text: `${thread.recipient.name}님의 마지막 메시지 톤을 보면 빠른 답변을 기대하는 것 같아요. 간결하고 action-oriented한 답장이 좋을 것 같습니다. 원하시는 방향이 있으시면 말씀해 주세요!`,
    },
  ]
}

// ── Deduplication + sorting ──────────────────────────────────────────
function getDisplayThreads() {
  const DAYS_CUTOFF = 7
  const cutoff = new Date(now - DAYS_CUTOFF * 86400000)

  // Filter ongoing only
  const active = THREADS.filter(t => t.lastActive >= cutoff)

  // Deduplicate by recipient email: keep best (most messages, then most recent)
  const byRecipient = {}
  active.forEach(t => {
    const key = t.recipient.email
    const existing = byRecipient[key]
    if (!existing) {
      byRecipient[key] = t
    } else {
      const betterCount = t.messageCount > existing.messageCount
      const tiedButNewer = t.messageCount === existing.messageCount && t.lastActive > existing.lastActive
      if (betterCount || tiedButNewer) byRecipient[key] = t
    }
  })

  // Sort by most recent activity
  return Object.values(byRecipient).sort((a, b) => b.lastActive - a.lastActive)
}

// ── Relative time helper ─────────────────────────────────────────────
function relTime(date) {
  const diff = now - date
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

// ── Component ────────────────────────────────────────────────────────
export default function ResearchPanel({ setStatus }) {
  const displayThreads = getDisplayThreads()

  const [selectedThread, setSelectedThread] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [aiIdx, setAiIdx] = useState(0)
  const [historyOpen, setHistoryOpen] = useState(false)

  // Track which threads have been read (opens = marks as read)
  const [readIds, setReadIds] = useState(
    () => new Set(THREADS.filter(t => t.read).map(t => t.id))
  )

  // Resizable columns — sender and date have fixed px, subject takes 1fr remainder
  const [colWidths, setColWidths] = useState({ sender: 130, date: 56 })
  const dragRef = useRef(null)

  const startDrag = (col, e) => {
    e.preventDefault()
    e.stopPropagation()
    dragRef.current = { col, startX: e.clientX, startWidth: colWidths[col] }

    const onMove = (ev) => {
      if (!dragRef.current) return
      const delta = ev.clientX - dragRef.current.startX
      // date handle is on the right — moving right makes date narrower
      const next = col === 'date'
        ? Math.max(44, dragRef.current.startWidth - delta)
        : Math.max(70, dragRef.current.startWidth + delta)
      setColWidths(prev => ({ ...prev, [col]: next }))
    }

    const onUp = () => {
      dragRef.current = null
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  const chatRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      setTimeout(() => { chatRef.current.scrollTop = chatRef.current.scrollHeight }, 40)
    }
  }, [chatMessages, thinking])

  const openThread = (thread) => {
    setSelectedThread(thread)
    setAiIdx(0)
    setHistoryOpen(false)
    // Mark as read when opened
    setReadIds(prev => new Set([...prev, thread.id]))
    setChatMessages([
      {
        type: 'ai',
        text: `"${thread.subject}" 스레드를 불러왔어요.\n\n${thread.recipient.name}님과 총 ${thread.messageCount}번 주고받았고, 마지막 메시지: "${thread.preview}"\n\n이 스레드에 대해 궁금한 점이나 답장 준비를 도와드릴게요!`,
      },
    ])
    setStatus(`"${thread.subject}" 스레드 분석 중`)
  }

  const closeThread = () => {
    setSelectedThread(null)
    setChatMessages([])
    setChatInput('')
    setHistoryOpen(false)
    setStatus('이메일 작성을 시작하세요')
  }

  const sendMessage = () => {
    const text = chatInput.trim()
    if (!text) return
    setChatMessages(prev => [...prev, { type: 'user', text }])
    setChatInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    setThinking(true)
    setTimeout(() => {
      setThinking(false)
      const responses = getThreadResponses(selectedThread)
      const resp = responses[aiIdx % responses.length]
      setAiIdx(i => i + 1)
      setChatMessages(prev => [...prev, { type: 'ai', text: resp.text }])
    }, 1000)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const autoResize = (e) => {
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'
  }

  const latestMsg = selectedThread ? selectedThread.context[selectedThread.context.length - 1] : null
  const earlierMsgs = selectedThread ? selectedThread.context.slice(0, -1) : []

  const gridCols = `${colWidths.sender}px 1fr ${colWidths.date}px`

  return (
    <div className="panel p1" style={{ gap: 0, padding: 0 }}>

      {/* ══════════════════════════════════════
          LIST MODE — no thread selected
      ══════════════════════════════════════ */}
      {!selectedThread && (<>

        {/* Panel header */}
        <div className="ph" style={{ padding: '18px 16px 14px', flexShrink: 0 }}>
          <div className="step">1</div>
          <div className="ptitle">Threads</div>
          <div className="psub">Email History</div>
        </div>

        {/* Column headers */}
        <div className="tl-section">
          <div className="tl-cols" style={{ gridTemplateColumns: gridCols }}>
            <div className="tl-col-sender tl-col-hd">
              Sender
              <div className="col-resizer" onMouseDown={e => startDrag('sender', e)} />
            </div>
            <div className="tl-col-subject tl-col-hd">
              Subject
              <div className="col-resizer" onMouseDown={e => startDrag('date', e)} />
            </div>
            <div className="tl-col-date tl-col-hd">Date</div>
          </div>

          <div className="tl-list">
            {displayThreads.map(thread => {
              const isRead = readIds.has(thread.id)
              return (
                <div
                  key={thread.id}
                  className={`ti${!isRead ? ' unread' : ''}`}
                  style={{ gridTemplateColumns: gridCols }}
                  onClick={() => openThread(thread)}
                >
                  <div className="ti-col-sender">
                    <div className="cav" style={{ background: thread.recipient.color, width: 24, height: 24, fontSize: 8, flexShrink: 0 }}>
                      {thread.recipient.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                    <span className="ti-recipient">{thread.recipient.name}</span>
                  </div>
                  <div className="ti-col-subject">
                    <span className="ti-subject">{thread.subject}</span>
                  </div>
                  <div className="ti-col-date">
                    <span className="ti-time">{relTime(thread.lastActive)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Empty hint */}
        <div className="tl-empty">
          <div className="tl-empty-ico">💬</div>
          <div className="tl-empty-text">Click a thread to read it<br/>and get AI help replying</div>
        </div>

      </>)}

      {/* ══════════════════════════════════════
          DETAIL MODE — thread selected
      ══════════════════════════════════════ */}
      {selectedThread && (<>

        {/* Detail header — back button + subject */}
        <div className="detail-header">
          <button className="back-btn" onClick={closeThread}>← Back</button>
          <div className="detail-meta">
            <div className="detail-subject">{selectedThread.subject}</div>
            <div className="detail-recipient">
              <div className="cav" style={{ background: selectedThread.recipient.color, width: 16, height: 16, fontSize: 7, flexShrink: 0 }}>
                {selectedThread.recipient.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              {selectedThread.recipient.name}
            </div>
          </div>
        </div>

        {/* Primary email body — fills most of the vertical space */}
        <div className="email-primary">
          <div className="email-body-scroll">
            <div className="email-body-from">
              <div className="cav" style={{ background: latestMsg.from === 'me' ? 'var(--moss)' : selectedThread.recipient.color, width: 28, height: 28, fontSize: 10, flexShrink: 0 }}>
                {latestMsg.from === 'me' ? 'ME' : selectedThread.recipient.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div className="ebf-name">{latestMsg.from === 'me' ? 'You' : latestMsg.from}</div>
                <div className="ebf-label">Latest message</div>
              </div>
            </div>
            <div className="email-body-text">{latestMsg.text}</div>
          </div>

          {/* Thread history — collapsible */}
          {earlierMsgs.length > 0 && (
            <div className="thread-history">
              <button className="history-toggle" onClick={() => setHistoryOpen(o => !o)}>
                <span className="ht-arrow">{historyOpen ? '▲' : '▼'}</span>
                {earlierMsgs.length} earlier {earlierMsgs.length === 1 ? 'message' : 'messages'}
              </button>
              {historyOpen && (
                <div className="history-list">
                  {earlierMsgs.map((msg, i) => (
                    <div key={i} className={`history-msg ${msg.from === 'me' ? 'hmsg-me' : 'hmsg-them'}`}>
                      <span className="hmsg-from">{msg.from === 'me' ? 'You' : msg.from}</span>
                      <span className="hmsg-text">{msg.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* AI chat — secondary area below */}
        <div className="thread-chat">
          <div className="tctx">
            <div className="tctx-ico">✦</div>
            <div className="tctx-info">
              <div className="tctx-subject">Ask AI about this thread</div>
              <div className="tctx-name">Get help preparing your reply</div>
            </div>
          </div>

          <div className="chat-area tl-chat-area" ref={chatRef}>
            {chatMessages.map((msg, i) => (
              msg.type === 'ai' ? (
                <div key={i} className="bubble ba">
                  <span className="ai-tag">MAILO AI</span>
                  {msg.text}
                </div>
              ) : (
                <div key={i} className="bubble bu">{msg.text}</div>
              )
            ))}
            {thinking && (
              <div className="thinking">
                <div className="tdot"></div><div className="tdot"></div><div className="tdot"></div>
              </div>
            )}
          </div>

          <div className="cinput-row" style={{ padding: '0 12px 12px' }}>
            <textarea
              ref={textareaRef}
              className="cinput"
              value={chatInput}
              placeholder="Ask about this thread or get help replying…"
              rows={1}
              onKeyDown={handleKey}
              onInput={autoResize}
              onChange={e => setChatInput(e.target.value)}
            />
            <button className="csend" onClick={sendMessage}>↑</button>
          </div>
        </div>

      </>)}
    </div>
  )
}
