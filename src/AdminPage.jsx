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
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: kind === 'error' ? '#C0392B' : '#1A1A1A',
        color: kind === 'error' ? '#fff' : '#F4C400',
        border: '1px solid rgba(244,196,0,0.3)',
        padding: '14px 28px',
        borderRadius: '999px',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '14px',
        fontWeight: 500,
        zIndex: 200,
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      }}
    >
      {message}
    </div>
  )
}

const inputStyle = {
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '15px',
  padding: '10px 12px',
  borderRadius: '6px',
  border: '1px solid #ddd',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}

const labelStyle = {
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '12px',
  fontWeight: 600,
  color: '#666',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  display: 'block',
  marginBottom: '6px',
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
  padding: '10px 22px',
  cursor: 'pointer',
}

const btnGhost = {
  fontFamily: 'DM Sans, sans-serif',
  fontWeight: 500,
  fontSize: '13px',
  color: '#666',
  background: 'transparent',
  border: '1px solid #ccc',
  borderRadius: '999px',
  padding: '9px 18px',
  cursor: 'pointer',
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
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr auto auto auto', gap: '12px', alignItems: 'end', padding: '16px', background: '#fff', borderRadius: '8px', border: '1px solid #eee', marginBottom: '10px' }}>
      <div>
        <label style={labelStyle}>What's this called?</label>
        <input style={inputStyle} value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. 20 min session" />
      </div>
      <div>
        <label style={labelStyle}>Original price (₹) — optional</label>
        <input style={{ ...inputStyle, opacity: free ? 0.4 : 1 }} disabled={free} type="number" value={original} onChange={(e) => setOriginal(e.target.value)} placeholder="e.g. 2000" />
      </div>
      <div>
        <label style={labelStyle}>Price to show (₹)</label>
        <input style={{ ...inputStyle, opacity: free ? 0.4 : 1 }} disabled={free} type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 1500" />
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#444', whiteSpace: 'nowrap', paddingBottom: '10px' }}>
        <input type="checkbox" checked={free} onChange={(e) => setFree(e.target.checked)} style={{ width: '18px', height: '18px' }} />
        Make it FREE
      </label>
      <button style={{ ...btnPrimary, opacity: dirty ? 1 : 0.4, cursor: dirty ? 'pointer' : 'default' }} disabled={!dirty || saving} onClick={handleSave}>
        {saving ? 'Saving…' : 'Save'}
      </button>
      <button style={btnGhost} onClick={() => onDelete(tier.id)}>Remove</button>
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
    <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #eee', overflow: 'hidden' }}>
      <img src={photo.image_data} alt="" style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label style={labelStyle}>Caption</label>
          <input style={inputStyle} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="e.g. Lost 8kg · 3 months" />
        </div>
        <div>
          <label style={labelStyle}>Service tag</label>
          <input style={inputStyle} value={service} onChange={(e) => setService(e.target.value)} placeholder="e.g. Lifestyle Coaching" />
        </div>
        <div>
          <label style={labelStyle}>Small extra detail</label>
          <input style={inputStyle} value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="e.g. Built around real meals" />
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <button style={{ ...btnPrimary, flex: 1, opacity: dirty ? 1 : 0.4, cursor: dirty ? 'pointer' : 'default' }} disabled={!dirty || saving} onClick={handleSave}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button style={btnGhost} onClick={() => onDelete(photo.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
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
    <div style={{ minHeight: '100vh', background: '#F7F5F0', fontFamily: 'DM Sans, sans-serif' }}>
      <div style={{ background: '#0B0B0C', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '20px', color: '#FFF' }}>
          TRANSFORM<span style={{ color: '#F4C400' }}>RS</span> <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400, fontSize: '14px' }}>— Admin</span>
        </div>
        <a href="/" style={{ color: '#F4C400', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>← Back to website</a>
      </div>

      <div style={{ background: '#FEF3CD', borderBottom: '1px solid #F4C400', padding: '10px 24px', textAlign: 'center', fontSize: '13px', color: '#7A5C00' }}>
        ⚠️ This page has no password. Anyone with this exact link can make changes. Don't share it publicly.
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px 100px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#666', marginTop: '60px' }}>Loading your website's data…</p>
        ) : (
          <>
            <section style={{ marginBottom: '56px' }}>
              <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '26px', color: '#0B0B0C', marginBottom: '4px' }}>Prices &amp; Discounts</h2>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
                Set an "Original price" to show it crossed out, or tick "Make it FREE" to show FREE instead of any price. Changes go live the moment you hit Save.
              </p>

              {PROGRAM_ORDER.map((key) => {
                const rows = tiers.filter((t) => t.program_key === key)
                return (
                  <div key={key} style={{ marginBottom: '28px' }}>
                    <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '16px', color: '#0B0B0C', textTransform: 'uppercase', marginBottom: '10px' }}>
                      {PROGRAM_LABELS[key]}
                    </h3>
                    {rows.length === 0 && (
                      <p style={{ color: '#999', fontSize: '13px', marginBottom: '10px' }}>No price shown yet for this program.</p>
                    )}
                    {rows.map((tier) => (
                      <TierRow key={tier.id} tier={tier} onSave={saveTier} onDelete={deleteTier} />
                    ))}
                    <button style={btnGhost} onClick={() => addTier(key)}>+ Add a price for {PROGRAM_LABELS[key]}</button>
                  </div>
                )
              })}
            </section>

            <section>
              <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '26px', color: '#0B0B0C', marginBottom: '4px' }}>Gallery Photos</h2>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
                These are the photos in your "What Transformation Looks Like" section. Add new ones or remove old ones any time.
              </p>

              <div style={{ marginBottom: '24px' }}>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFilePick} style={{ display: 'none' }} id="photo-upload" />
                <label htmlFor="photo-upload" style={{ ...btnPrimary, display: 'inline-block' }}>
                  {uploading ? 'Uploading…' : '+ Add New Photo'}
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '16px' }}>
                {photos.map((photo) => (
                  <PhotoCard key={photo.id} photo={photo} onSave={savePhoto} onDelete={deletePhoto} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      <Toast message={toast.message} kind={toast.kind} />
    </div>
  )
}
