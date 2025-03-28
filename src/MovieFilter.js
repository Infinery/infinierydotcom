"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./styles/MovieFilter.css" // Import the CSS file

const MovieFilter = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Filter states
  const [language, setLanguage] = useState("")
  const [minRating, setMinRating] = useState(0)
  const [adult, setAdult] = useState(false)
  const [ageVerified, setAgeVerified] = useState(false)
  const [country, setCountry] = useState("")
  const [releaseYear, setReleaseYear] = useState("")
  const [runtime, setRuntime] = useState("")
  const [genre, setGenre] = useState("")
  const [sortBy, setSortBy] = useState("rating")

  // Available options for filters
  const [availableLanguages, setAvailableLanguages] = useState([])
  const [availableGenres, setAvailableGenres] = useState([])
  const [availableCountries, setAvailableCountries] = useState([])
  const [availableYears, setAvailableYears] = useState([])

  useEffect(() => {
    // Load filter options only (not the full dataset)
    setLoading(true)

    fetch("./filter-options.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load filter options")
        }
        return response.json()
      })
      .then((data) => {
        setAvailableLanguages(data.languages || [])
        setAvailableGenres(data.genres || [])
        setAvailableCountries(data.countries || [])
        setAvailableYears(data.years || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error loading filter options:", error)
        setError("Failed to load movie database options. Please try again.")
        setLoading(false)
      })
  }, [])

  // Handle adult content toggle changes
  const handleAdultContentChange = (checked) => {
    setAdult(checked)

    // If turning off adult content, also reset age verification
    if (!checked) {
      setAgeVerified(false)
    }
  }

  const filterMovies = () => {
    // If adult content is selected but age not verified, don't proceed
    if (adult && !ageVerified) {
      alert("Please confirm you are 21+ years old to include adult content")
      return
    }

    // Collect search criteria to pass to results page
    const searchCriteria = {
      language: language || "",
      minRating: minRating > 0 ? minRating : 0,
      adult: adult,
      country: country || "",
      releaseYear: releaseYear || "",
      runtime: runtime || "",
      genre: genre || "",
      sortBy: sortBy || "rating",
    }

    // Navigate to results page with search criteria
    navigate("/results", { state: { searchCriteria } })
  }

  // Reset all filters
  const resetFilters = () => {
    setLanguage("")
    setMinRating(0)
    setAdult(false)
    setAgeVerified(false)
    setCountry("")
    setReleaseYear("")
    setRuntime("")
    setGenre("")
    setSortBy("rating")
  }

  if (error) {
    return (
      <div className="movie-filter error-container">
        <div className="error-card">
          <h2 className="error-title">Error Loading Movies</h2>
          <p className="error-message">{error}</p>
          <button className="error-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="movie-filter movie-filter-container">
      <div
        className="marquee"
        style={{ backgroundColor: "#ffcc00", color: "#000", padding: "10px", textAlign: "center", cursor: "pointer" }}
        onClick={() => navigate("/domain-sale")}
      >
        <marquee behavior="scroll" direction="left" style={{ fontWeight: "bold", fontSize: "1.2em" }}>
          This domain is available for sale. Click to know more.
        </marquee>
      </div>
      <div className="movie-filter-inner">
        <h1
          className="movie-filter-title"
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            borderRadius: "5px",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
            marginTop: "20px",
          }}
        >
          infimovies.com
        </h1>

        <div className="movie-filter-card">
          <h2 className="movie-filter-card-title">Find Movies</h2>

          <div className="movie-filter-grid">
            {/* Language selector */}
            <div className="form-group">
              <label className="form-label">Language</label>
              <select className="form-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="">All Languages</option>
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang === "en"
                      ? "English"
                      : lang === "fr"
                        ? "French"
                        : lang === "es"
                          ? "Spanish"
                          : lang === "de"
                            ? "German"
                            : lang === "ja"
                              ? "Japanese"
                              : lang === "it"
                                ? "Italian"
                                : lang === "zh"
                                  ? "Chinese"
                                  : lang === "ko"
                                    ? "Korean"
                                    : lang === "ru"
                                      ? "Russian"
                                      : lang === "hi"
                                        ? "Hindi"
                                        : lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating slider */}
            <div className="form-group">
              <label className="form-label">Minimum Rating: {minRating}</label>
              <div className="range-container">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(Number.parseFloat(e.target.value))}
                  className="range-slider"
                />
                <div className="range-marks">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
            </div>

            {/* Adult content toggle with age verification */}
            <div className="form-group">
              <div className="toggle-container">
                <label className="toggle-switch">
                  <input type="checkbox" checked={adult} onChange={(e) => handleAdultContentChange(e.target.checked)} />
                  <span className="toggle-slider"></span>
                </label>
                <span className="form-label">Include Adult Content</span>
              </div>

              {/* Age verification checkbox - now as a separate div below the toggle */}
              {adult && (
                <div
                  className="age-verification"
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <label
                    className="checkbox-container"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      maxWidth: "100%",
                      flexWrap: "nowrap",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={ageVerified}
                      onChange={(e) => setAgeVerified(e.target.checked)}
                      style={{ marginTop: "3px" }}
                    />
                    <span
                      className="age-text"
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.2",
                        flexShrink: 1,
                      }}
                    >
                      I'm 21+ years and I'm aware that it may produce adult content
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Country selector */}
            <div className="form-group">
              <label className="form-label">Country</label>
              <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">All Countries</option>
                {availableCountries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Genre selector */}
            <div className="form-group">
              <label className="form-label">Genre</label>
              <select className="form-select" value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="">All Genres</option>
                {availableGenres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Release year dropdown */}
            <div className="form-group">
              <label className="form-label">Release Year (and newer)</label>
              <select className="form-select" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)}>
                <option value="">All Years</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Runtime presets */}
            <div className="form-group">
              <label className="form-label">Runtime</label>
              <select className="form-select" value={runtime} onChange={(e) => setRuntime(e.target.value)}>
                <option value="">Any Length</option>
                <option value="90">Short (~90 min)</option>
                <option value="120">Average (~120 min)</option>
                <option value="150">Long (~150 min)</option>
                <option value="180">Very Long (180+ min)</option>
              </select>
            </div>

            {/* Sort options */}
            <div className="form-group">
              <label className="form-label">Sort By</label>
              <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="rating">Highest Rating</option>
                <option value="release_date">Newest First</option>
                <option value="title">Title (A-Z)</option>
                <option value="runtime">Longest First</option>
              </select>
            </div>
          </div>

          <div className="button-container">
            <button className="btn btn-primary" onClick={filterMovies} disabled={loading}>
              {loading ? "Loading..." : "Find Movies"}
            </button>
            <button className="btn btn-secondary" onClick={resetFilters} disabled={loading}>
              Reset All
            </button>
          </div>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="loading-container">
            <div className="loading-content">
              <div className="loading-spinner"></div>
              <p className="loading-text">Loading filter options...</p>
            </div>
          </div>
        )}

        {/* Ready to search message when not loading */}
        {!loading && (
          <div className="ready-container">
            <p className="ready-title">Select your filters and click "Find Movies" to see recommendations</p>
            <p className="ready-subtitle">Find your perfect movie from our extensive database</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieFilter

