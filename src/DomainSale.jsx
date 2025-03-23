"use client"

import { useState, useEffect } from "react"

const SimplifiedDomainSalePage = () => {
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

  // Responsive styles
  const isMobile = windowWidth < 768

  // Function to open Gmail directly
  const openGmail = (e) => {
    e.preventDefault();
    
    // Check if mobile
    if (/Android|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)) {
      // For Android devices - direct Gmail app intent
      window.location.href = "intent://mailto:query.infimovies@gmail.com?subject=Regarding%20Domain%20Purchase#Intent;scheme=mailto;package=com.google.android.gm;end";
    } else {
      // Fallback to Gmail web interface
      window.open("https://mail.google.com/mail/u/0/?fs=1&to=query.infimovies@gmail.com&su=Regarding+Domain+Purchase&body=I'm+interested+in+purchasing+this+domain.&tf=cm", "_blank");
    }
  };

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
            href="https://mail.google.com/mail/u/0/?fs=1&to=query.infimovies@gmail.com&su=Regarding+Domain+Purchase&tf=cm"
            className="cta-button"
            onClick={openGmail}
            target="_blank"
            rel="noopener noreferrer"
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

export default SimplifiedDomainSalePage