import { useEffect, useRef, useState } from 'react'

const PROGRAM_LABELS = {
  lifestyle: 'Lifestyle Coaching',
  contest_prep: 'Contest Prep Coaching',
  posing: 'Posing Coaching',
}
const PROGRAM_ORDER = ['lifestyle', 'contest_prep', 'posing']

function centsToRupees(cents) {
  if (cents === null || cents === undefined) return ''
  return String(Math.round(cents / 100))
}
function rupeesToCents(value) {
  const n = parseFloat(value)
  if (Number.isNaN(n) || value === '') return null
  return Math.round(n * 100)
}

function compressImage(file, maxWidth = 1200, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width)
        const canvas = document.createElement('canvas')
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

function Toast({ message, kind }) {
  if (!message) return null
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: kind === 'error' ? '#C0392B' : '#0B0B0C',
        color: kind === 'error' ? '#fff' : '#F4C400',
        border: '1px solid rgba(244,196,0,0.35)',
        padding: '14px 28px',
        borderRadius: '999px',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '14px',
        fontWeight: 500,
        zIndex: 200,
        boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
      }}
    >
      {message}
    </div>
  )
}

const inputStyle = {
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '15px',
  padding: '11px 14px',
  borderRadius: '8px',
  border: '1.5px solid #E6E2D8',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  background: '#FBFAF7',
  transition: 'border-color 150ms ease, background 150ms ease',
}

const labelStyle = {
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '11px',
  fontWeight: 700,
  color: '#9A9280',
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
  display: 'block',
  marginBottom: '7px',
}

const btnPrimary = {
  fontFamily: 'Oswald, sans-serif',
  fontWeight: 600,
  fontSize: '13px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#0B0B0C',
  background: '#F4C400',
  border: 'none',
  borderRadius: '999px',
  padding: '11px 24px',
  cursor: 'pointer',
  transition: 'transform 150ms ease, box-shadow 150ms ease',
}

const btnGhost = {
  fontFamily: 'DM Sans, sans-serif',
  fontWeight: 500,
  fontSize: '13px',
  color: '#8A8578',
  background: 'transparent',
  border: '1.5px solid #E6E2D8',
  borderRadius: '999px',
  padding: '10px 20px',
  cursor: 'pointer',
  transition: 'all 150ms ease',
}

function focusGold(e) {
  e.currentTarget.style.borderColor = '#F4C400'
  e.currentTarget.style.background = '#fff'
}
function blurGold(e) {
  e.currentTarget.style.borderColor = '#E6E2D8'
  e.currentTarget.style.background = '#FBFAF7'
}

function Toggle({ checked, onChange, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
      <span style={{ position: 'relative', width: '42px', height: '24px', borderRadius: '999px', background: checked ? '#F4C400' : '#DDD7C8', transition: 'background 200ms ease', flexShrink: 0, display: 'inline-block' }}>
        <input type="checkbox" checked={checked} onChange={onChange} style={{ position: 'absolute', inset: 0, opacity: 0, margin: 0, cursor: 'pointer' }} />
        <span style={{ position: 'absolute', top: '3px', left: checked ? '21px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left 200ms ease', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
      </span>
      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#4A463C', fontWeight: 600 }}>{label}</span>
    </label>
  )
}

function cardHoverProps() {
  return {
    onMouseEnter: (e) => {
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(11,11,12,0.08)'
      e.currentTarget.style.transform = 'translateY(-2px)'
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.boxShadow = '0 2px 10px rgba(11,11,12,0.04)'
      e.currentTarget.style.transform = 'translateY(0)'
    },
  }
}

function TierRow({ tier, onSave, onDelete }) {
  const [label, setLabel] = useState(tier.tier_label)
  const [original, setOriginal] = useState(centsToRupees(tier.original_price_cents))
  const [price, setPrice] = useState(centsToRupees(tier.price_cents))
  const [free, setFree] = useState(tier.is_free)
  const [saving, setSaving] = useState(false)

  const dirty =
    label !== tier.tier_label ||
    original !== centsToRupees(tier.original_price_cents) ||
    price !== centsToRupees(tier.price_cents) ||
    free !== tier.is_free

  async function handleSave() {
    setSaving(true)
    await onSave(tier.id, {
      tier_label: label,
      original_price_cents: free ? null : rupeesToCents(original),
      price_cents: free ? null : rupeesToCents(price),
      is_free: free,
    })
    setSaving(false)
  }

  return (
    <div
      style={{ background: '#fff', borderRadius: '14px', border: '1px solid #EFEBE0', padding: '22px', marginBottom: '14px', boxShadow: '0 2px 10px rgba(11,11,12,0.04)', transition: 'box-shadow 200ms ease, transform 200ms ease' }}
      {...cardHoverProps()}
    >
      <div style={{ marginBottom: '18px' }}>
        <label style={labelStyle}>What's this called?</label>
        <input style={{ ...inputStyle, maxWidth: '320px' }} value={label} onChange={(e) => setLabel(e.target.value)} onFocus={focusGold} onBlur={blurGold} placeholder="e.g. 20 min session" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '16px', alignItems: 'end', marginBottom: '18px' }}>
        <div>
          <label style={labelStyle}>Original price (₹) — optional</label>
          <input style={{ ...inputStyle, opacity: free ? 0.4 : 1 }} disabled={free} type="number" value={original} onChange={(e) => setOriginal(e.target.value)} onFocus={focusGold} onBlur={blurGold} placeholder="e.g. 2000" />
        </div>
        <div>
          <label style={labelStyle}>Price to show (₹)</label>
          <input style={{ ...inputStyle, opacity: free ? 0.4 : 1 }} disabled={free} type="number" value={price} onChange={(e) => setPrice(e.target.value)} onFocus={focusGold} onBlur={blurGold} placeholder="e.g. 1500" />
        </div>
        <div style={{ paddingBottom: '11px' }}>
          <Toggle checked={free} onChange={(e) => setFree(e.target.checked)} label="Make it FREE" />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #F3F0E8', paddingTop: '16px' }}>
        <button style={btnGhost} onClick={() => onDelete(tier.id)}>Remove</button>
        <button style={{ ...btnPrimary, opacity: dirty ? 1 : 0.35, cursor: dirty ? 'pointer' : 'default' }} disabled={!dirty || saving} onClick={handleSave}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}

function PhotoCard({ photo, onSave, onDelete }) {
  const [caption, setCaption] = useState(photo.caption)
  const [service, setService] = useState(photo.service)
  const [detail, setDetail] = useState(photo.detail)
  const [saving, setSaving] = useState(false)

  const dirty = caption !== photo.caption || service !== photo.service || detail !== photo.detail

  async function handleSave() {
    setSaving(true)
    await onSave(photo.id, { caption, service, detail })
    setSaving(false)
  }

  return (
    <div
      style={{ background: '#fff', borderRadius: '14px', border: '1px solid #EFEBE0', overflow: 'hidden', boxShadow: '0 2px 10px rgba(11,11,12,0.04)', transition: 'box-shadow 200ms ease, transform 200ms ease' }}
      {...cardHoverProps()}
    >
      <img src={photo.image_data} alt="" style={{ width: '100%', height: '170px', objectFit: 'cover', display: 'block' }} />
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={labelStyle}>Caption</label>
          <input style={inputStyle} value={caption} onChange={(e) => setCaption(e.target.value)} onFocus={focusGold} onBlur={blurGold} placeholder="e.g. Lost 8kg · 3 months" />
        </div>
        <div>
          <label style={labelStyle}>Service tag</label>
          <input style={inputStyle} value={service} onChange={(e) => setService(e.target.value)} onFocus={focusGold} onBlur={blurGold} placeholder="e.g. Lifestyle Coaching" />
        </div>
        <div>
          <label style={labelStyle}>Small extra detail</label>
          <input style={inputStyle} value={detail} onChange={(e) => setDetail(e.target.value)} onFocus={focusGold} onBlur={blurGold} placeholder="e.g. Built around real meals" />
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <button style={{ ...btnPrimary, flex: 1, opacity: dirty ? 1 : 0.35, cursor: dirty ? 'pointer' : 'default' }} disabled={!dirty || saving} onClick={handleSave}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button style={btnGhost} onClick={() => onDelete(photo.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

function TabButton({ active, onClick, icon, title, subtitle }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '22px 26px',
        borderRadius: '14px',
        border: active ? '2px solid #F4C400' : '2px solid transparent',
        background: active ? 'rgba(244,196,0,0.08)' : '#fff',
        boxShadow: active ? '0 8px 24px rgba(244,196,0,0.15)' : '0 2px 10px rgba(11,11,12,0.04)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 200ms ease',
      }}
    >
      <span style={{ fontSize: '32px', lineHeight: 1 }}>{icon}</span>
      <span>
        <span style={{ display: 'block', fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '18px', color: '#0B0B0C', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
          {title}
        </span>
        <span style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#8A8578', marginTop: '2px' }}>{subtitle}</span>
      </span>
    </button>
  )
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('pricing')
  const [tiers, setTiers] = useState(null)
  const [photos, setPhotos] = useState(null)
  const [toast, setToast] = useState({ message: '', kind: 'ok' })
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    loadAll()
  }, [])

  function showToast(message, kind = 'ok') {
    setToast({ message, kind })
    setTimeout(() => setToast({ message: '', kind: 'ok' }), 2500)
  }

  async function loadAll() {
    try {
      const [tiersRes, photosRes] = await Promise.all([fetch('/api/pricing'), fetch('/api/gallery')])
      setTiers(await tiersRes.json())
      setPhotos(await photosRes.json())
    } catch {
      showToast("Couldn't load your data. Check your internet and refresh.", 'error')
    }
  }

  async function saveTier(id, patch) {
    try {
      const res = await fetch('/api/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...patch }),
      })
      if (!res.ok) throw new Error()
      const updated = await res.json()
      setTiers((prev) => prev.map((t) => (t.id === id ? updated : t)))
      showToast('Saved! It’s live on your website now.')
    } catch {
      showToast("Couldn't save that. Try again.", 'error')
    }
  }

  async function deleteTier(id) {
    if (!confirm('Remove this price? This cannot be undone.')) return
    try {
      await fetch(`/api/pricing?id=${id}`, { method: 'DELETE' })
      setTiers((prev) => prev.filter((t) => t.id !== id))
      showToast('Removed.')
    } catch {
      showToast("Couldn't remove that. Try again.", 'error')
    }
  }

  async function addTier(programKey) {
    try {
      const res = await fetch('/api/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ program_key: programKey, tier_label: 'New option' }),
      })
      const created = await res.json()
      setTiers((prev) => [...prev, created])
    } catch {
      showToast("Couldn't add that. Try again.", 'error')
    }
  }

  async function savePhoto(id, patch) {
    try {
      const res = await fetch('/api/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...patch }),
      })
      if (!res.ok) throw new Error()
      const updated = await res.json()
      setPhotos((prev) => prev.map((p) => (p.id === id ? updated : p)))
      showToast('Saved! It’s live on your website now.')
    } catch {
      showToast("Couldn't save that. Try again.", 'error')
    }
  }

  async function deletePhoto(id) {
    if (!confirm('Delete this photo from your website? This cannot be undone.')) return
    try {
      await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
      setPhotos((prev) => prev.filter((p) => p.id !== id))
      showToast('Photo deleted.')
    } catch {
      showToast("Couldn't delete that. Try again.", 'error')
    }
  }

  async function handleFilePick(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const dataUrl = await compressImage(file)
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_data: dataUrl, caption: 'New transformation', service: 'Lifestyle Coaching', detail: '' }),
      })
      const created = await res.json()
      setPhotos((prev) => [...prev, created])
      showToast('Photo added! Fill in the details below and hit Save.')
    } catch {
      showToast("Couldn't upload that photo. Try a smaller file.", 'error')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const loading = tiers === null || photos === null

  return (
    <div style={{ minHeight: '100vh', background: '#F7F5EE', fontFamily: 'DM Sans, sans-serif' }}>
      <div style={{ background: '#0B0B0C', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '20px', color: '#FFF' }}>
          TRANSFORM<span style={{ color: '#F4C400' }}>RS</span> <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400, fontSize: '14px' }}>— Admin</span>
        </div>
        <a href="/" style={{ color: '#F4C400', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>← Back to website</a>
      </div>

      <div style={{ background: '#FEF3CD', borderBottom: '1px solid #F4C400', padding: '10px 24px', textAlign: 'center', fontSize: '13px', color: '#7A5C00' }}>
        ⚠️ This page has no password. Anyone with this exact link can make changes. Don't share it publicly.
      </div>

      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '36px 24px 100px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#8A8578', marginTop: '60px' }}>Loading your website's data…</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px', marginBottom: '40px' }}>
              <TabButton
                active={activeTab === 'pricing'}
                onClick={() => setActiveTab('pricing')}
                icon="💰"
                title="Prices & Discounts"
                subtitle={`${tiers.length} price${tiers.length === 1 ? '' : 's'} set across your programs`}
              />
              <TabButton
                active={activeTab === 'gallery'}
                onClick={() => setActiveTab('gallery')}
                icon="🖼️"
                title="Gallery Photos"
                subtitle={`${photos.length} photo${photos.length === 1 ? '' : 's'} live on your website`}
              />
            </div>

            {activeTab === 'pricing' && (
              <section>
                <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '24px', color: '#0B0B0C', marginBottom: '6px', textTransform: 'uppercase' }}>Prices &amp; Discounts</h2>
                <p style={{ color: '#8A8578', fontSize: '14px', marginBottom: '28px', maxWidth: '560px' }}>
                  Set an "Original price" to show it crossed out, or switch on "Make it FREE" to show FREE instead. Changes go live the moment you hit Save.
                </p>

                {PROGRAM_ORDER.map((key) => {
                  const rows = tiers.filter((t) => t.program_key === key)
                  return (
                    <div key={key} style={{ marginBottom: '36px' }}>
                      <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '15px', color: '#0B0B0C', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px', paddingBottom: '10px', borderBottom: '2px solid #EFEBE0' }}>
                        {PROGRAM_LABELS[key]}
                      </h3>
                      {rows.length === 0 && (
                        <p style={{ color: '#B0AA98', fontSize: '13px', marginBottom: '14px', fontStyle: 'italic' }}>No price shown yet for this program.</p>
                      )}
                      {rows.map((tier) => (
                        <TierRow key={tier.id} tier={tier} onSave={saveTier} onDelete={deleteTier} />
                      ))}
                      <button style={btnGhost} onClick={() => addTier(key)}>+ Add a price for {PROGRAM_LABELS[key]}</button>
                    </div>
                  )
                })}
              </section>
            )}

            {activeTab === 'gallery' && (
              <section>
                <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '24px', color: '#0B0B0C', marginBottom: '6px', textTransform: 'uppercase' }}>Gallery Photos</h2>
                <p style={{ color: '#8A8578', fontSize: '14px', marginBottom: '24px', maxWidth: '560px' }}>
                  These are the photos in your "What Transformation Looks Like" section. Add new ones or remove old ones any time.
                </p>

                <div style={{ marginBottom: '28px' }}>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFilePick} style={{ display: 'none' }} id="photo-upload" />
                  <label htmlFor="photo-upload" style={{ ...btnPrimary, display: 'inline-block' }}>
                    {uploading ? 'Uploading…' : '+ Add New Photo'}
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '18px' }}>
                  {photos.map((photo) => (
                    <PhotoCard key={photo.id} photo={photo} onSave={savePhoto} onDelete={deletePhoto} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <Toast message={toast.message} kind={toast.kind} />
    </div>
  )
}
