// A small set of accessible-contrast background colors, picked
// deterministically from the user's name/email so the same person always
// gets the same color.
const PALETTE = ['#2563eb', '#7c3aed', '#db2777', '#d97706', '#059669', '#0891b2', '#dc2626', '#4f46e5']

function colorFor(seed) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  return PALETTE[Math.abs(hash) % PALETTE.length]
}

function initialFor(user) {
  const source = user.firstName || user.username || user.email || '?'
  return source.trim().charAt(0).toUpperCase()
}

const isRealPhoto = (url) => /^https?:\/\//i.test(url || '')

function Avatar({ user, size = 28 }) {
  if (isRealPhoto(user.profile_picture)) {
    return (
      <img
        className="navbar-avatar"
        style={{ width: size, height: size }}
        src={user.profile_picture}
        alt=""
        referrerPolicy="no-referrer"
      />
    )
  }

  const seed = user.email || user.username || user.firstName || 'user'
  return (
    <span
      className="navbar-avatar navbar-avatar-fallback"
      style={{ width: size, height: size, background: colorFor(seed) }}
      aria-hidden="true"
    >
      {initialFor(user)}
    </span>
  )
}

export default Avatar
