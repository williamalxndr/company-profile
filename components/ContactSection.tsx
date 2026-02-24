"use client";

export default function ContactSection() {
  const phone = "6287873876744"; 
  const message = encodeURIComponent("Hi Qleos! I'd like to discuss a project.");
  const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;

  return (
    <>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap');

        .cs-section {
            font-family: 'DM Sans', sans-serif;
            min-height: 100vh;
            background: radial-gradient(
                circle at 50% 30%,
                #fff 0%,
                #fff 40%,
                #fff5f5 100%
            );
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            padding: 6rem 2rem;
        }

        /* subtle red glow */
        .cs-section::after {
            content: "";
            position: absolute;
            width: 700px;
            height: 700px;
            background: radial-gradient(circle, rgba(220,0,0,0.08) 0%, transparent 70%);
            top: -200px;
            right: -200px;
            pointer-events: none;
        }

        .cs-content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 2rem;
            max-width: 600px;
        }

        .cs-label {
            font-size: 1.2rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: rgba(220,0,0,0.5);
        }

        .cs-headline {
            font-size: clamp(2.8rem, 5vw, 4.5rem);
            font-weight: 800;
            line-height: 1.1;
            color: #dc0000;
            letter-spacing: -0.03em;
        }

        .cs-body {
            font-size: 1rem;
            color: rgba(120,0,0,0.7);
            line-height: 1.7;
            max-width: 420px;
        }

        .cs-contact-items {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            align-items: center;
        }

        .cs-contact-item {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            font-size: 0.9rem;
            color: rgba(120,0,0,0.75);
        }

        .cs-wa-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            background: linear-gradient(135deg, #dc0000, #b80000);
            color: #fff;
            font-family: 'DM Sans', sans-serif;
            font-size: 1rem;
            font-weight: 700;
            text-decoration: none;
            padding: 1rem 2.5rem;
            border-radius: 999px;
            letter-spacing: 0.01em;
            transition: all 0.25s ease;
            box-shadow: 0 8px 32px rgba(220,0,0,0.25);
            margin-top: 0.5rem;
        }

        .cs-wa-btn:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(220,0,0,0.35);
        }

        .cs-wa-btn:active {
            transform: translateY(-1px);
        }

        .cs-wa-icon {
            width: 22px;
            height: 22px;
            flex-shrink: 0;
        }

        @media (max-width: 480px) {
            .cs-headline { font-size: 2.4rem; }
            .cs-wa-btn { padding: 0.9rem 2rem; font-size: 0.9rem; }
        }
        `}</style>

      <section className="cs-section" id="contact">
        <div className="cs-content">
          <p className="cs-label">Contact</p>

          <h2 className="cs-headline">
            Let's Build<br />Something Great
          </h2>

          <p className="cs-body">
            Have a project in mind? We'd love to hear about it.
            Chat with us directly on WhatsApp.
          </p>

          <div className="cs-contact-items">
            <div className="cs-contact-item">
              <span>📍</span>
              <span>Jakarta, Indonesia</span>
            </div>
            <div className="cs-contact-item">
              <span>✉️</span>
              <span>qleos.lab@gmail.com</span>
            </div>
          </div>

          <a
            className="cs-wa-btn"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* WhatsApp SVG icon */}
            <svg className="cs-wa-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 3C8.82 3 3 8.82 3 16c0 2.48.69 4.8 1.89 6.78L3 29l6.39-1.87A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Z" fill="white" fillOpacity="0.2"/>
              <path d="M16 3C8.82 3 3 8.82 3 16c0 2.48.69 4.8 1.89 6.78L3 29l6.39-1.87A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Zm6.28 18.3c-.26.73-1.52 1.4-2.08 1.48-.56.08-1.08.37-3.65-.76-3.08-1.35-5.06-4.5-5.21-4.71-.15-.21-1.24-1.65-1.24-3.14 0-1.5.78-2.23 1.06-2.54.27-.3.6-.38.8-.38l.57.01c.18 0 .43-.07.67.51.26.62.87 2.12.95 2.28.08.15.13.33.03.54-.1.2-.15.33-.3.51-.14.18-.3.4-.43.54-.14.15-.29.31-.12.61.17.3.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.31 1.41.3.15.47.12.64-.07.18-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.34.08.13.08.73-.18 1.46Z" fill="white"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}