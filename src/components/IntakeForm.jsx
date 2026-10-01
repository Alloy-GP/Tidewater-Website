// Tidewater — adaptive multi-intent intake form.
// Recreated from the CAM intake handoff, themed to Tidewater (teal/gold/dark,
// Nunito Sans + Work Sans, Lucide-style icons). Posts to /api/lead.
import { useState, useEffect } from 'react';

// ── Icons (Lucide-style, matches the site set) ───────────────────
const I = {
  building:   <svg viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16"/><path d="M15 21V9h3a1 1 0 0 1 1 1v11"/><path d="M8 7h2M8 11h2M8 15h2"/></svg>,
  hardhat:    <svg viewBox="0 0 24 24"><path d="M2 18a10 10 0 0 1 20 0"/><path d="M2 18h20"/><path d="M10 8.5V6a2 2 0 0 1 4 0v2.5"/><path d="M6 18v-2a6 6 0 0 1 1.2-3.6M18 18v-2a6 6 0 0 0-1.2-3.6"/></svg>,
  wrench:     <svg viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8 6.2 21l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.5 2.5-2.3-.6-.6-2.3z"/></svg>,
  chat:       <svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.7-.7L3 21l1.4-4.2A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/></svg>,
  home:       <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  arrowRight: <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  arrowLeft:  <svg viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  check:      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  lock:       <svg viewBox="0 0 24 24"><rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/></svg>,
  zap:        <svg viewBox="0 0 24 24"><polygon points="13 2 4 14 11 14 10 22 20 9 13 9 13 2"/></svg>,
  chevron:    <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>,
  inbox:      <svg viewBox="0 0 24 24"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13l3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/></svg>,
  users:      <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>,
  clock:      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>,
};
function Ic({ name }) { return <span className="tw-if-ic">{I[name]}</span>; }

// ── Intents (Tidewater) ──────────────────────────────────────────
const INTENTS = [
  {
    id: 'proposal', label: 'Request a proposal', icon: 'building', tone: 'teal',
    blurb: 'We’re a board exploring new management.', forWho: 'Boards & HOA / condo directors', hot: true,
    routeTo: 'our management team', fields: [
      { key: 'association', label: 'Association / community name', type: 'text', required: true, placeholder: 'e.g. Wynbrook HOA', col: 2 },
      { key: 'city', label: 'City', type: 'text', required: true, placeholder: 'e.g. Annapolis' },
      { key: 'zip', label: 'ZIP code', type: 'text', required: true, placeholder: 'e.g. 21401', inputMode: 'numeric', maxLength: 10 },
      { key: 'units', label: 'Number of units', type: 'text', required: true, placeholder: 'e.g. 120', inputMode: 'numeric', maxLength: 6 },
      { key: 'propertyType', label: 'Property type', type: 'select', required: true, options: ['HOA', 'Condominium', 'Townhome', 'Master-planned', 'Commercial / mixed-use', 'Rental property'] },
      { key: 'situation', label: 'Current situation', type: 'select', required: true, options: ['Self-managed today', 'Unhappy with current manager', 'Contract ending soon', 'Just exploring'], col: 2 },
      { key: 'timeline', label: 'Decision timeline', type: 'radio', required: true, options: ['ASAP', '1–3 months', 'Just researching'], col: 2 },
    ],
  },
  {
    id: 'rental', label: 'Rental property management', icon: 'home', tone: 'ocean',
    blurb: 'I own a rental property and want it managed.', forWho: 'Rental owners & landlords',
    routeTo: 'our rental team', fields: [
      { key: 'address', label: 'Property address or area', type: 'text', required: true, placeholder: 'e.g. Annapolis, MD or 123 Main St', col: 2 },
      { key: 'propertyType', label: 'Property type', type: 'select', required: true, options: ['Single-family home', 'Townhome', 'Condo', 'Small multifamily (2–4)', 'Other'] },
      { key: 'unitsRental', label: 'Number of units', type: 'select', required: true, options: ['1', '2–4', '5–20', '20+'] },
      { key: 'situation', label: 'Current situation', type: 'select', required: true, options: ['Self-managing now', 'Unhappy with current manager', 'First-time landlord', 'Just exploring'], col: 2 },
      { key: 'timeline', label: 'When do you need management?', type: 'radio', required: true, options: ['ASAP', '1–3 months', 'Just researching'], col: 2 },
    ],
  },
  {
    id: 'vendor', label: 'Submit a bid', icon: 'hardhat', tone: 'clay',
    blurb: 'I’m a vendor who wants to work with you.', forWho: 'Contractors & service vendors',
    routeTo: 'our operations team', fields: [
      { key: 'company', label: 'Company name', type: 'text', required: true, placeholder: 'e.g. Bayside Landscaping', col: 2 },
      { key: 'trade', label: 'Trade / service', type: 'select', required: true, options: ['Landscaping', 'Roofing', 'Paving & concrete', 'Pool service', 'Janitorial', 'Plumbing', 'Electrical', 'Other'] },
      { key: 'serviceArea', label: 'Service area', type: 'text', required: true, placeholder: 'e.g. Anne Arundel County' },
      { key: 'insured', label: 'Licensed & insured?', type: 'radio', required: true, options: ['Yes', 'In progress'], col: 2 },
    ],
  },
  {
    id: 'service', label: 'Request a maintenance proposal', icon: 'wrench', tone: 'sage',
    blurb: 'I’d like a quote for maintenance or home improvements.', forWho: 'Homeowners & property owners',
    routeTo: 'our maintenance team', fields: [
      { key: 'address', label: 'Property address or area', type: 'text', required: true, placeholder: 'e.g. Owings Mills, MD or 123 Main St', col: 2 },
      { key: 'workType', label: 'Type of work', type: 'select', required: true, options: ['General maintenance', 'Repairs', 'Home improvement / renovation', 'Preventative maintenance', 'Not sure yet'] },
      { key: 'timeline', label: 'Timeline', type: 'radio', required: true, options: ['ASAP', '1–3 months', 'Just exploring'], col: 2 },
    ],
  },
  {
    id: 'general', label: 'General question', icon: 'chat', tone: 'gold',
    blurb: 'Something else — just reaching out.', forWho: 'Anyone',
    routeTo: 'our front desk', fields: [],
  },
];
const intentById = (id) => INTENTS.find((i) => i.id === id);

function genId() {
  const d = new Date();
  const s = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return 'REQ-' + s + '-' + Math.floor(1000 + Math.random() * 9000);
}

// WhatConverts reads the DOM form on submit and only captures controls that
// have a `name` attribute. Map our standard contact fields to the canonical
// names WC maps to its built-in lead fields (Name/Email/Phone/Company); every
// other field uses its human label as the name so WC shows it verbatim as a
// custom field. (The actual POST builds its own FormData, so these names don't
// change what the email/handler receive — they exist purely for WC capture.)
const WC_STD = { name: 'name', email: 'email', phone: 'phone', association: 'company', company: 'company' };
const wcName = (def) => WC_STD[def.key] || def.label;

function Field({ def, value, error, onChange }) {
  const span = def.col === 2 ? '1 / -1' : 'auto';
  const fid = 'if-' + def.key;
  const name = wcName(def);
  const filled = value != null && String(value) !== '';

  // Radio (segmented) has no placeholder slot — keep a static label.
  if (def.type === 'radio') {
    return (
      <div className="tw-if-field" style={{ gridColumn: span }}>
        <label className="tw-if-label" htmlFor={fid}>{def.label}{def.required && <span className="tw-if-req">*</span>}</label>
        <div className="tw-if-segmented" role="radiogroup">
          {def.options.map((o) => (
            <button type="button" key={o} className={'tw-if-seg' + (value === o ? ' on' : '')}
              onClick={() => onChange(def.key, o)}>{o}</button>
          ))}
          {/* Carries the segmented value into the DOM form so WhatConverts captures it. */}
          <input type="hidden" id={fid} name={name} value={value || ''} readOnly />
        </div>
        {error && <div className="tw-if-err-msg">{error}</div>}
      </div>
    );
  }

  // Floating label: sits inside the field, shrinks to the top border on focus/fill.
  return (
    <div className="tw-if-field" style={{ gridColumn: span }}>
      <div className={'tw-if-float' + (filled ? ' has-value' : '') + (error ? ' is-err' : '')}>
        {def.type === 'text' && (
          <input id={fid} name={name} aria-label={def.label} className="tw-if-control" type="text" placeholder=" "
            inputMode={def.inputMode} maxLength={def.maxLength}
            value={value || ''} onChange={(e) => onChange(def.key, e.target.value)} />
        )}
        {def.type === 'select' && (
          <>
            <select id={fid} name={name} aria-label={def.label} className="tw-if-control tw-if-select" value={value || ''} onChange={(e) => onChange(def.key, e.target.value)}>
              <option value="" disabled></option>
              {def.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <span className="tw-if-caret"><Ic name="chevron" /></span>
          </>
        )}
        <label className="tw-if-flabel" htmlFor={fid}>{def.label}{def.required && <span className="tw-if-req">*</span>}</label>
      </div>
      {error && <div className="tw-if-err-msg">{error}</div>}
    </div>
  );
}

function Receipt({ intent }) {
  const steps = [
    { icon: 'check', title: 'Logged & time-stamped', detail: 'Saved to our system the moment you hit send — nothing slips through.' },
    { icon: 'users', title: 'Routed to the right team', detail: `Sent straight to ${intent.routeTo}.` },
    { icon: 'clock', title: 'A real person responds', detail: 'Expect to hear back within one business day — no auto-pilot.' },
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    setShown(0);
    const timers = steps.map((_, i) => setTimeout(() => setShown((s) => Math.max(s, i + 1)), 280 + i * 360));
    return () => timers.forEach(clearTimeout);
  }, [intent.id]);
  return (
    <div className="tw-if-receipt">
      <div className="tw-if-receipt-head"><Ic name="zap" /> Here’s what happens next</div>
      <ul className="tw-if-receipt-list">
        {steps.map((r, i) => (
          <li key={r.title} className={'tw-if-receipt-row' + (i < shown ? ' on' : '')}>
            <span className="tw-if-receipt-check"><Ic name="check" /></span>
            <span className="tw-if-receipt-txt"><strong>{r.title}</strong><span>{r.detail}</span></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function IntakeForm() {
  const [step, setStep] = useState('intent');
  const [intentId, setIntentId] = useState(null);
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [fields, setFields] = useState({});
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submission, setSubmission] = useState(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [hp, setHp] = useState(''); // honeypot — must stay empty for humans

  const intent = intentId ? intentById(intentId) : null;

  // Deep-link: /request-a-proposal?intent=proposal opens straight to that intent's fields.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const want = new URLSearchParams(window.location.search).get('intent');
    if (want && intentById(want)) { setIntentId(want); setFields({}); setErrors({}); setStep('form'); }
  }, []);

  const pick = (id) => { setIntentId(id); setFields({}); setErrors({}); setStep('form'); };
  const back = () => { setStep('intent'); setErrors({}); setSendError(''); };
  const setField = (k, v) => { setFields((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: null })); };
  const setC = (k, v) => { setContact((c) => ({ ...c, [k]: v })); setErrors((e) => ({ ...e, [k]: null })); };

  function validate() {
    const e = {};
    if (!contact.name.trim()) e.name = 'Required';
    if (!contact.email.trim()) e.email = 'Required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email)) e.email = 'Enter a valid email';
    (intent.fields || []).forEach((f) => { if (f.required && !fields[f.key]) e[f.key] = 'Required'; });
    if (intent.id === 'service' && !message.trim()) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(ev) {
    ev.preventDefault();
    if (!validate() || sending) return;
    setSending(true); setSendError('');
    const id = genId();
    const company = fields.association || fields.company || fields.unit || fields.address || '';
    // Send the per-intent fields as a labeled, ordered list so the handler can
    // render every answer with its real label (not a cram-everything-into-message blob).
    const fieldsJson = JSON.stringify(
      (intent.fields || []).map((f) => ({ label: f.label, value: (fields[f.key] ?? '').toString().trim() }))
    );

    const fd = new FormData();
    fd.set('name', contact.name.trim());
    fd.set('email', contact.email.trim());
    fd.set('phone', contact.phone.trim());
    fd.set('company', company);
    fd.set('intent', intent.id);
    fd.set('intentLabel', intent.label);
    fd.set('ref', id);
    fd.set('fieldsJson', fieldsJson);
    fd.set('message', message.trim()); // free-text "anything else" only
    fd.set('source', typeof window !== 'undefined' ? window.location.pathname : '');
    fd.set('website', hp); // honeypot — handler rejects if non-empty

    try {
      const res = await fetch('/api/lead', { method: 'POST', body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.error || 'Something went wrong.');
      setSubmission({ id, first: contact.name.trim().split(' ')[0] });
      setStep('done');
    } catch (err) {
      setSendError(err.message || 'Something went wrong. Please try again or call (855) 876-5500.');
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setStep('intent'); setIntentId(null); setContact({ name: '', email: '', phone: '' });
    setFields({}); setMessage(''); setErrors({}); setSubmission(null); setSendError('');
  }

  return (
    <div className="tw-if-widget">
      <div className="tw-if-inner">
        {step === 'intent' && (
          <div className="tw-if-stage">
            <div className="tw-if-eyebrow">Get in touch</div>
            <h2 className="tw-if-title">How can we help?</h2>
            <p className="tw-if-sub">Pick what fits — we’ll only ask what we need, then make sure the right person sees it fast.</p>
            <div className="tw-if-intent-grid">
              {INTENTS.map((it) => (
                <button type="button" key={it.id} className={`tw-if-intent-card tone-${it.tone}`} onClick={() => pick(it.id)}>
                  <span className="tw-if-intent-icon"><Ic name={it.icon} /></span>
                  <span className="tw-if-intent-body">
                    <span className="tw-if-intent-label">{it.label}{it.hot && <span className="tw-if-hot">Most common</span>}</span>
                    <span className="tw-if-intent-blurb">{it.blurb}</span>
                    <span className="tw-if-intent-for">{it.forWho}</span>
                  </span>
                  <span className="tw-if-intent-arrow"><Ic name="arrowRight" /></span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'form' && intent && (
          // WhatConverts tracks ONLY the proposal intent: the tracked id="lead-form"
          // renders only for proposal; every other intent gets id="intake-form" so WC
          // ignores it. key forces a clean remount per intent for WC's form detection.
          <form
            key={intent.id}
            id={intent.id === 'proposal' ? 'lead-form' : 'intake-form'}
            name={intent.id === 'proposal' ? 'lead-form' : 'intake-form'}
            className="tw-if-stage" onSubmit={submit} noValidate>
            {/* Honeypot — hidden from humans; bots that fill it get rejected by /api/lead */}
            <div className="tw-hp" aria-hidden="true">
              <label>Leave this field empty
                <input type="text" name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
              </label>
            </div>
            <button type="button" className="tw-if-back" onClick={back}><Ic name="arrowLeft" /> Change request type</button>
            <div className={`tw-if-chosen tone-${intent.tone}`}>
              <span className="tw-if-intent-icon"><Ic name={intent.icon} /></span>
              <span className="tw-if-chosen-txt"><strong>{intent.label}</strong><span>{intent.blurb}</span></span>
            </div>
            <div className="tw-if-grid">
              <Field def={{ key: 'name', label: 'Your name', type: 'text', required: true, placeholder: 'First & last', col: 2 }} value={contact.name} error={errors.name} onChange={setC} />
              <Field def={{ key: 'email', label: 'Email', type: 'text', required: true, placeholder: 'you@email.com' }} value={contact.email} error={errors.email} onChange={setC} />
              <Field def={{ key: 'phone', label: 'Phone', type: 'text', placeholder: '(optional)' }} value={contact.phone} error={errors.phone} onChange={setC} />
              {(intent.fields || []).map((f) => (
                <Field key={f.key} def={f} value={fields[f.key]} error={errors[f.key]} onChange={setField} />
              ))}
              <div className="tw-if-field" style={{ gridColumn: '1 / -1' }}>
                <div className={'tw-if-float tw-if-float-top' + (message ? ' has-value' : '') + (errors.message ? ' is-err' : '')}>
                  <textarea id="if-message" aria-label={intent.id === 'service' ? 'What do you need done?' : 'Anything else?'} name={intent.id === 'service' ? 'What do you need done?' : 'Message'} className="tw-if-control tw-if-textarea" rows={intent.id === 'general' ? 5 : 3}
                    placeholder=" "
                    value={message} onChange={(e) => { setMessage(e.target.value); setErrors((x) => ({ ...x, message: null })); }} />
                  <label className="tw-if-flabel" htmlFor="if-message">{intent.id === 'service' ? 'What do you need done?' : 'Anything else?'}{intent.id === 'service' && <span className="tw-if-req">*</span>}</label>
                </div>
                {errors.message && <div className="tw-if-err-msg">{errors.message}</div>}
              </div>
            </div>
            {sendError && <div className="tw-if-senderror">{sendError}</div>}
            <div className="tw-if-actions">
              <div className="tw-if-trust"><Ic name="lock" /> Your details stay private. No spam, ever.</div>
              <button type="submit" className="tw-if-submit" disabled={sending}>
                {sending ? 'Sending…' : intent.id === 'proposal' ? 'Request my proposal' : intent.id === 'vendor' ? 'Submit bid' : intent.id === 'service' ? 'Send request' : 'Send message'}
                {!sending && <Ic name="arrowRight" />}
              </button>
            </div>
          </form>
        )}

        {step === 'done' && submission && (
          <div className="tw-if-stage tw-if-done">
            <div className="tw-if-done-badge"><Ic name="check" /></div>
            <h2 className="tw-if-title" style={{ marginTop: 14 }}>You’re all set, {submission.first}.</h2>
            <p className="tw-if-sub">Your request is in — reference <strong style={{ color: 'var(--if-accent)' }}>{submission.id}</strong>. Expect to hear back within one business day.</p>
            <Receipt intent={intent} />
            <button type="button" className="tw-if-restart" onClick={reset}>Submit another request</button>
          </div>
        )}
      </div>
    </div>
  );
}
