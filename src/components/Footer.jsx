const SOCIAL_LINKS = [
  {
    name: 'Portfolio',
    href: 'https://portfolio-8jmo.onrender.com/',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:abakahjoshua358@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/233532900914',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@abakah_jay',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18a4 4 0 1 0 4-4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/abakah_jay',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" />
      </svg>
    ),
  },
  {
    name: 'Snapchat',
    href: 'https://www.snapchat.com/add/abakah_jay',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c3 0 5 2.2 5 5.5 0 1.6.2 2.7.7 3.4.4.6 1 1 1.8 1.3-.3.7-1.2 1.2-2.5 1.4-.2.7-.4 1.3-.7 1.4-.3.2-1.2 0-2-.1-.9-.1-1.7.9-2.3 1.6-.6-.7-1.4-1.7-2.3-1.6-.8.1-1.7.3-2 .1-.3-.1-.5-.7-.7-1.4-1.3-.2-2.2-.7-2.5-1.4.8-.3 1.4-.7 1.8-1.3.5-.7.7-1.8.7-3.4C7 5.2 9 3 12 3z" />
      </svg>
    ),
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-socials">
          {SOCIAL_LINKS.map(link => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label={link.name}
              title={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <p className="footer-credit">Made with love by Abakah Joshua</p>
        <p className="footer-copyright">&copy; {year} Finance Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer
