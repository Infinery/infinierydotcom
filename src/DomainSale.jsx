"use client"

import { useState, useEffect } from "react"

const DomainSalePage = () => {
  // Contact information - replace with your own
  const contactEmail = "infinery11@gmail.com"
  const linkedinUrl = "https://www.linkedin.com/in/shivam-jangid"
  const githubUrl = "https://github.com/Infinery"

  // State for copy button text
  const [copyStatus, setCopyStatus] = useState({
    email: "Copy",
    linkedin: "Copy",
    github: "Copy",
  })

  // State for window width to handle responsive design
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)

  // Function to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Function to copy text to clipboard
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      // Update status for this field
      setCopyStatus((prev) => ({
        ...prev,
        [field]: "Copied!",
      }))

      // Reset status after 2 seconds
      setTimeout(() => {
        setCopyStatus((prev) => ({
          ...prev,
          [field]: "Copy",
        }))
      }, 2000)
    })
  }

  // Responsive styles
  const isMobile = windowWidth < 768

  return (
    <div
      style={{
        fontFamily: "'Poppins', 'Segoe UI', Roboto, sans-serif",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        color: "#334155",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background animation */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          zIndex: "-2",
        }}
      ></div>

      {/* Animated circles */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%)",
          top: "-100px",
          right: "-100px",
          zIndex: "-1",
          animation: "float 8s ease-in-out infinite",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244,114,182,0.05) 0%, rgba(244,114,182,0) 70%)",
          bottom: "-200px",
          left: "-100px",
          zIndex: "-1",
          animation: "float 10s ease-in-out infinite 2s",
        }}
      ></div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          
          @keyframes glow {
            0% { box-shadow: 0 0 10px rgba(99,102,241,0.3); }
            50% { box-shadow: 0 0 20px rgba(99,102,241,0.5); }
            100% { box-shadow: 0 0 10px rgba(99,102,241,0.3); }
          }
          
          .pulse {
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
          
          .contact-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            border: 1px solid #e2e8f0;
            margin-bottom: 15px;
          }
          
          .contact-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          }
          
          .copy-btn {
            background-color: #4f46e5;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 8px 12px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .copy-btn:hover {
            background-color: #4338ca;
          }
          
          .feature-card {
            background-color: white;
            border-radius: 12px;
            padding: 24px;
            border: 1px solid rgba(226, 232, 240, 1);
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            cursor: default;
            margin-bottom: 20px;
          }
          
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          }
          
          .cta-button {
            display: inline-block;
            background: linear-gradient(to right, #4f46e5, #6366f1);
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);
          }
          
          .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(79, 70, 229, 0.5);
          }
          
          /* Responsive styles */
          @media (max-width: 768px) {
            .features-container {
              grid-template-columns: 1fr;
            }
            
            .contact-item {
              flex-direction: column;
              align-items: flex-start;
            }
            
            .contact-info {
              margin-bottom: 10px;
              width: 100%;
              word-break: break-all;
            }
            
            .copy-btn-container {
              width: 100%;
              display: flex;
              justify-content: flex-end;
            }
            
            h1 {
              font-size: 2.5rem !important;
            }
            
            h2 {
              font-size: 1.8rem !important;
            }
          }
        `}
      </style>

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: isMobile ? "20px 15px" : "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "90vh",
          width: "100%",
        }}
      >
        {/* Back button */}
        <a
          href="/"
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "#64748b",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: isMobile ? "14px" : "16px",
            transition: "all 0.3s ease",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={isMobile ? "18" : "20"}
            height={isMobile ? "18" : "20"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Movies
        </a>

        {/* Main content */}
        <div
          style={{
            textAlign: "center",
            marginBottom: isMobile ? "20px" : "30px",
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? "2.5rem" : "clamp(2.5rem, 8vw, 4rem)",
              fontWeight: "800",
              marginBottom: "10px",
              background: "linear-gradient(90deg, #4f46e5, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 10px rgba(79, 70, 229, 0.3)",
            }}
            className="pulse"
          >
            Premium Domain For Sale
          </h1>

          <h2
            style={{
              fontSize: isMobile ? "1.8rem" : "clamp(1.5rem, 5vw, 2.5rem)",
              fontWeight: "700",
              color: "#1e293b",
              marginBottom: isMobile ? "20px" : "30px",
            }}
          >
            infimovies.com
          </h2>

          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.2rem",
              lineHeight: "1.6",
              color: "#475569",
              maxWidth: "800px",
              margin: "0 auto",
              marginBottom: isMobile ? "30px" : "40px",
              padding: isMobile ? "0 10px" : "0",
            }}
          >
            Secure this premium domain name for your movie recommendation service, review platform, or entertainment
            business. High search volume, memorable, and industry-specific domain that will instantly connect with your
            audience.
          </p>
        </div>

        {/* Features */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "20px",
            marginBottom: isMobile ? "30px" : "50px",
            width: "100%",
          }}
          className="features-container"
        >
          {[
            { icon: "🎯", title: "Industry Specific", desc: "Perfect for movie businesses" },
            { icon: "🔍", title: "SEO Friendly", desc: "High search volume keywords" },
            { icon: "🧠", title: "Memorable", desc: "Easy to remember and type" },
            { icon: "🚀", title: "Brand Ready", desc: "Launch your business instantly" },
          ].map((feature, index) => (
            <div key={index} className="feature-card">
              <div
                style={{
                  fontSize: "40px",
                  marginBottom: "10px",
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  color: "#1e293b",
                  marginBottom: "8px",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.95rem",
                }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Contact information - Direct display */}
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            marginBottom: isMobile ? "30px" : "40px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: isMobile ? "1.5rem" : "1.8rem",
              color: "#1e293b",
              marginBottom: isMobile ? "15px" : "20px",
            }}
          >
            Contact Information
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {/* Email */}
            <div className="contact-item">
              <div
                className="contact-info"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: isMobile ? "wrap" : "nowrap",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span style={{ fontWeight: "500" }}>Email:</span>
                <span>{contactEmail}</span>
              </div>
              <div className="copy-btn-container">
                <button className="copy-btn" onClick={() => copyToClipboard(contactEmail, "email")}>
                  {copyStatus.email === "Copy" ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      Copy
                    </>
                  ) : (
                    "Copied!"
                  )}
                </button>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="contact-item">
              <div
                className="contact-info"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: isMobile ? "wrap" : "nowrap",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#0e76a8">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span style={{ fontWeight: "500" }}>LinkedIn:</span>
                <span>{linkedinUrl}</span>
              </div>
              <div className="copy-btn-container">
                <button className="copy-btn" onClick={() => copyToClipboard(linkedinUrl, "linkedin")}>
                  {copyStatus.linkedin === "Copy" ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      Copy
                    </>
                  ) : (
                    "Copied!"
                  )}
                </button>
              </div>
            </div>

            {/* GitHub */}
            <div className="contact-item">
              <div
                className="contact-info"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: isMobile ? "wrap" : "nowrap",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#333">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span style={{ fontWeight: "500" }}>GitHub:</span>
                <span>{githubUrl}</span>
              </div>
              <div className="copy-btn-container">
                <button className="copy-btn" onClick={() => copyToClipboard(githubUrl, "github")}>
                  {copyStatus.github === "Copy" ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      Copy
                    </>
                  ) : (
                    "Copied!"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: isMobile ? "30px 20px" : "40px",
            textAlign: "center",
            maxWidth: "800px",
            width: "100%",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            boxShadow: "0 0 15px rgba(99, 102, 241, 0.2)",
            animation: "glow 3s infinite",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "1.5rem" : "1.8rem",
              color: "#1e293b",
              marginBottom: isMobile ? "15px" : "20px",
            }}
          >
            Interested in purchasing this domain?
          </h2>

          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.1rem",
              color: "#475569",
              marginBottom: isMobile ? "25px" : "30px",
            }}
          >
            Contact me directly to discuss pricing and transfer details. All reasonable offers will be considered.
          </p>

          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}&su=Domain Purchase Inquiry: infimovies.com`}
            className="cta-button"
          >
            Make an Offer
          </a>
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: "auto",
            fontSize: "0.9rem",
            color: "#64748b",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} All Rights Reserved
        </footer>
      </div>
    </div>
  )
}

export default DomainSalePage

