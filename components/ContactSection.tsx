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
            background: #ffffff;
            /* Background pattern halus agar tidak flat */
            background-image: radial-gradient(#dc000005 2px, transparent 2px);
            background-size: 30px 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            padding: 4rem 1.5rem;
        }

        /* Dekorasi lingkaran Merah Putih di background */
        .cs-bg-blob {
            position: absolute;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(220, 0, 0, 0.05) 0%, transparent 70%);
            border-radius: 50%;
            z-index: 1;
        }
        .blob-1 { top: -10%; right: -5%; }
        .blob-2 { bottom: -10%; left: -5%; }

        /* Kotak Estetik Minimalis */
        .cs-card {
            position: relative;
            z-index: 2;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(220, 0, 0, 0.1);
            border-radius: 32px;
            padding: 4rem 2rem;
            max-width: 700px;
            width: 100%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.03);
            text-align: center;
            overflow: hidden;
        }

        /* Aksen Garis Merah Putih di atas kotak */
        .cs-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 6px;
            background: linear-gradient(to right, #dc0000 50%, #f0f0f0 50%);
        }

        .cs-label {
            font-size: 0.9rem;
            font-weight: 800;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: #dc0000;
            margin-bottom: 1.5rem;
            display: block;
        }

        .cs-headline {
            font-size: clamp(2.2rem, 5vw, 3.8rem);
            font-weight: 800;
            line-height: 1.1;
            color: #1a1a1a;
            letter-spacing: -0.04em;
            margin-bottom: 1.5rem;
        }

        .cs-headline span {
            color: #dc0000; /* Highlight merah pada teks */
        }

        .cs-body {
            font-size: 1.1rem;
            color: #555;
            line-height: 1.6;
            max-width: 480px;
            margin: 0 auto 2.5rem auto;
        }

        .cs-footer-info {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
        }

        .cs-info-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.95rem;
            color: #666;
            font-weight: 500;
        }

        .cs-wa-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.8rem;
            background: #dc0000;
            color: #fff;
            padding: 1.2rem 2.8rem;
            border-radius: 100px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            box-shadow: 0 10px 25px rgba(220, 0, 0, 0.2);
        }

        .cs-wa-btn:hover {
            transform: translateY(-5px);
            background: #b80000;
            box-shadow: 0 15px 30px rgba(220, 0, 0, 0.3);
        }

        .cs-wa-icon {
            width: 20px;
            height: 20px;
        }

        @media (max-width: 600px) {
            .cs-card { padding: 3rem 1.5rem; border-radius: 24px; }
            .cs-footer-info { gap: 1rem; flex-direction: column; align-items: center; }
        }
      `}</style>

      <section className="cs-section" id="contact">
        <div className="cs-bg-blob blob-1"></div>
        <div className="cs-bg-blob blob-2"></div>

        <div className="cs-card">
          <span className="cs-label">Contact Us</span>
          
          <h2 className="cs-headline">
            Let's Build Something <span>Great.</span>
          </h2>

          <p className="cs-body">
            Have a project in mind? We'd love to hear about it. 
            Chat with us directly to get started.
          </p>

          <div className="cs-footer-info">
            <div className="cs-info-item">
              <span style={{color: '#dc0000'}}>📍</span> Jakarta, Indonesia
            </div>
            <div className="cs-info-item">
              <span style={{color: '#dc0000'}}>✉️</span> qleos.lab@gmail.com
            </div>
          </div>

          <a
            className="cs-wa-btn"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="cs-wa-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 3C8.82 3 3 8.82 3 16c0 2.48.69 4.8 1.89 6.78L3 29l6.39-1.87A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Z" fill="white" fillOpacity="0.2"/>
              <path d="M16 3C8.82 3 3 8.82 3 16c0 2.48.69 4.8 1.89 6.78L3 29l6.39-1.87A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Zm6.28 18.3c-.26.73-1.52 1.4-2.08 1.48-.56.08-1.08.37-3.65-.76-3.08-1.35-5.06-4.5-5.21-4.71-.15-.21-1.24-1.65-1.24-3.14 0-1.5.78-2.23 1.06-2.54.27-.3.6-.38.8-.38l.57.01c.18 0 .43-.07.67.51.26.62.87 2.12.95 2.28.08.15.13.33.03.54-.1.2-.15.33-.3.51-.14.18-.3.4-.43.54-.14.15-.29.31-.12.61.17.3.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.31 1.41.3.15.47.12.64-.07.18-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.34.08.13.08.73-.18 1.46Z" fill="white"/>
            </svg>
            Talk to us
          </a>
        </div>
      </section>
    </>
  );
}