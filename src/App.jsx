import React, { useState } from 'react'
import "./App.css"
import bgImage from './bg-it.jpg'

const TELEGRAM_BOT_TOKEN = '8964366947:AAGQw8VIkNyMz5bcyeRV4kZTQtzvNGk9Rtk'

const TELEGRAM_CHAT_ID = '8525568976'

const REGIONS = [
  'Toshkent shahar',
  'Toshkent viloyati',
  'Andijon',
  'Farg\'ona',
  'Namangan',
  'Samarqand',
  'Buxoro',
  'Xorazm',
  'Navoiy',
  'Qashqadaryo',
  'Surxondaryo',
  'Jizzax',
  'Sirdaryo',
  'Qoraqalpog\'iston',
]

const App = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [telegram, setTelegram] = useState('')
  const [region, setRegion] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const isTashkent = region === 'Toshkent shahar'
  const regionChosenButBlocked = region !== '' && !isTashkent

  const validate = () => {
    if (name.trim().length < 2) return 'Ismingizni to\'liq kiriting'
    if (!/^\+?\d{9,13}$/.test(phone.replace(/[\s-]/g, ''))) return 'Telefon raqamni to\'g\'ri kiriting'
    if (!/^@?[a-zA-Z0-9_]{5,32}$/.test(telegram.trim())) return 'Telegram username\'ni to\'g\'ri kiriting (masalan: @username)'
    if (!region) return 'Hududingizni tanlang'
    if (!isTashkent) return 'Kechirasiz, ro\'yxatdan faqat Toshkent shahar aholisi o\'tishi mumkin'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (v) {
      setErrorMsg(v)
      setStatus('error')
      return
    }
    setErrorMsg('')
    setStatus('sending')

    const normalizedTelegram = telegram.trim().startsWith('@') ? telegram.trim() : `@${telegram.trim()}`

    const text =
      `🆕 Yangi ro'yxatdan o'tish\n\n` +
      `👤 Ism: ${name}\n` +
      `📞 Telefon: ${phone}\n` +
      `💬 Telegram: ${normalizedTelegram}\n` +
      `📍 Hudud: ${region}`

    try {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.description || 'Xatolik yuz berdi')
      setStatus('success')
      setName('')
      setPhone('')
      setTelegram('')
      setRegion('')
    } catch (err) {
      setErrorMsg('Yuborishda xatolik yuz berdi. Qaytadan urinib ko\'ring.')
      setStatus('error')
    }
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: '#0F3B3E', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        .display-font { font-family: 'Marcellus', serif; }
        .mono-font { font-family: 'JetBrains Mono', monospace; }
        .girih-strip {
          height: 14px;
          width: 100%;
          background-image: repeating-linear-gradient(135deg, #D9A441 0 3px, transparent 3px 10px),
                             repeating-linear-gradient(45deg, #D9A441 0 3px, transparent 3px 10px);
          background-size: 20px 14px;
          opacity: 0.9;
        }
        .bg-photo {
          position: absolute;
          inset: -24px;
          background-image: url(${bgImage});
          background-size: cover;
          background-position: center 30%;
          filter: blur(5px) brightness(0.7) contrast(1.08) saturate(1.2) hue-rotate(-6deg);
          transform: scale(1.08);
          z-index: 0;
        }
        .bg-tint {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 24% 18%, rgba(217,164,65,0.22) 0%, transparent 52%),
            radial-gradient(circle at 78% 82%, rgba(27,138,143,0.4) 0%, transparent 58%);
          mix-blend-mode: color;
          z-index: 0;
        }
        .bg-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 32%, rgba(6,26,28,0.72) 100%);
          z-index: 0;
        }
        .bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(9,38,40,0.5) 0%, rgba(15,59,62,0.28) 45%, rgba(9,38,40,0.58) 100%);
          z-index: 0;
        }
        .field-input {
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .field-input:focus {
          outline: none;
          border-color: #1B8A8F;
          box-shadow: 0 0 0 3px rgba(27,138,143,0.18);
        }
        .submit-btn {
          transition: transform 0.15s ease, background 0.2s ease;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
        }
        .submit-btn:active:not(:disabled) {
          transform: translateY(0px);
        }
        .star-corner {
          position: absolute;
          opacity: 0.14;
        }
      `}</style>

      <div className="bg-photo" />
      <div className="bg-tint" />
      <div className="bg-vignette" />
      <div className="bg-overlay" />


      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 460, background: '#FBF6EC', borderRadius: 16, overflow: 'hidden', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.45)' }}>
        {/* top ornamental strip */}
        <div className="girih-strip" style={{ background: 'linear-gradient(90deg, #0F3B3E, #1B8A8F)' }} />

        {/* corner star motif */}
        <svg className="star-corner" style={{ top: 20, right: 20 }} width="70" height="70" viewBox="0 0 100 100">
          <polygon points="50,4 61,38 96,38 68,59 79,94 50,73 21,94 32,59 4,38 39,38" fill="#0F3B3E" />
        </svg>

        <div style={{ padding: '40px 36px 32px' }}>
          <div style={{ marginBottom: 6, letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 11, fontWeight: 600, color: '#1B8A8F' }}>
            Toshkent shahri uchun
          </div>
          <h1 className="display-font" style={{ fontSize: 32, color: '#12312F', margin: '0 0 8px', lineHeight: 1.15 }}>
            Ro'yxatdan o'tish
          </h1>
          <p style={{ color: '#5B6B69', fontSize: 14.5, margin: '0 0 28px', lineHeight: 1.5 }}>
            Ma'lumotlaringiz to'g'ridan-to'g'ri bizning jamoamizga yuboriladi. Faqat Toshkent shahar aholisi ro'yxatdan o'ta oladi.
          </p>

          {status === 'success' ? (
            <div style={{ background: '#E9F5EC', border: '1px solid #A9D8B4', borderRadius: 10, padding: '20px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>✅</div>
              <div className="display-font" style={{ fontSize: 19, color: '#1F5B33', marginBottom: 4 }}>Muvaffaqiyatli yuborildi</div>
              <p style={{ fontSize: 13.5, color: '#3E6C4C', margin: '0 0 16px' }}>Tez orada siz bilan bog'lanamiz.</p>
              <button
                onClick={() => setStatus('idle')}
                className="submit-btn"
                style={{ background: '#12312F', color: '#FBF6EC', border: 'none', padding: '10px 20px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}
              >
                Yana bittasini yuborish
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 18 }}>
                <label htmlFor="name" style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#12312F', marginBottom: 6, letterSpacing: '0.02em' }}>
                  Ismingizni kiriting
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masalan: Aziz Karimov"
                  className="field-input"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', border: '1.5px solid #D8D0BF', borderRadius: 8, fontSize: 14.5, background: '#fff', color: '#12312F' }}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label htmlFor="number" style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#12312F', marginBottom: 6, letterSpacing: '0.02em' }}>
                  Telefon raqam kiriting
                </label>
                <input
                  id="number"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="field-input"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', border: '1.5px solid #D8D0BF', borderRadius: 8, fontSize: 14.5, background: '#fff', color: '#12312F' }}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label htmlFor="telegram" style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#12312F', marginBottom: 6, letterSpacing: '0.02em' }}>
                  Telegram username kiriting
                </label>
                <input
                  id="telegram"
                  type="text"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="@username"
                  className="field-input"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', border: '1.5px solid #D8D0BF', borderRadius: 8, fontSize: 14.5, background: '#fff', color: '#12312F' }}
                />
              </div>

              <div style={{ marginBottom: regionChosenButBlocked ? 10 : 24 }}>
                <label htmlFor="region" style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#12312F', marginBottom: 6, letterSpacing: '0.02em' }}>
                  Yashash hududingiz
                </label>
                <select
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="field-input"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', border: '1.5px solid #D8D0BF', borderRadius: 8, fontSize: 14.5, background: '#fff', color: '#12312F' }}
                >
                  <option value="">Tanlang...</option>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {regionChosenButBlocked && (
                <div style={{ background: '#FBEBE9', border: '1px solid #EFB6AF', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#9A3B32', marginBottom: 18 }}>
                  Kechirasiz, ro'yxatdan faqat <strong>Toshkent shahar</strong> aholisi o'tishi mumkin.
                </div>
              )}

              {status === 'error' && errorMsg && !regionChosenButBlocked && (
                <div style={{ background: '#FBEBE9', border: '1px solid #EFB6AF', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#9A3B32', marginBottom: 18 }}>
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending' || regionChosenButBlocked}
                className="submit-btn"
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  background: status === 'sending' || regionChosenButBlocked ? '#9BB3B1' : '#1B8A8F',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14.5,
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  cursor: status === 'sending' || regionChosenButBlocked ? 'not-allowed' : 'pointer',
                }}
              >
                {status === 'sending' ? 'Yuborilmoqda...' : 'Ro\'yxatdan o\'tish'}
              </button>
            </form>
          )}
        </div>

        {/* bottom ornamental strip */}
        <div className="girih-strip" style={{ background: 'linear-gradient(90deg, #1B8A8F, #0F3B3E)' }} />
      </div>
    </div>
  )
}

export default App
