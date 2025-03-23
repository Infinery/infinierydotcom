const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 5000

// Enable CORS
app.use(cors())
app.use(express.json())

// MongoDB connection string
const MONGODB_URI =
  "mongodb+srv://sriram:sri8248950703@movies.q0bqf.mongodb.net/movies?retryWrites=true&w=majority&appName=movies"

console.log("Connecting to MongoDB...")
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message)
    process.exit(1)
  })

// Define Movie Schema based on the actual document structure
const movieSchema = new mongoose.Schema(
  {
    title: String,
    release_date: String,
    runtime: Number,
    adult: Boolean,
    backdrop_path: String,
    homepage: String,
    original_language: String,
    overview: String,
    poster_path: String,
    tagline: String,
    genres: String,
    production_countries: String,
    spoken_languages: String,
    average_rating: Number,
  },
  { strict: false },
)

const Movie = mongoose.model("Movie", movieSchema)

// Root Route
app.get("/", (req, res) => {
  res.json({ status: "✅ Server is running" })
})

// Movies API with Pagination & Search
app.get("/api/movies", async (req, res) => {
  try {
    console.log("📥 Request received at /api/movies")

    // Pagination parameters
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 50

    // Build comprehensive filter query
    const query = {}

    // Language filter
    if (req.query.language) {
      query.original_language = req.query.language
    }

    // Minimum rating filter
    if (req.query.minRating) {
      query.average_rating = { $gte: Number.parseFloat(req.query.minRating) }
    }

    // Adult content filter
    if (req.query.adult !== undefined) {
      query.adult = req.query.adult === "true"
    }

    // Country filter (case-insensitive, partial match)
    if (req.query.country) {
      query.production_countries = {
        $regex: req.query.country,
        $options: "i",
      }
    }

    // Release year filter for string date format "YYYY-MM-DD"
    if (req.query.year) {
      const year = Number.parseInt(req.query.year)
      
      // Create a date string for the beginning of the specified year
      const startDate = `${year}-01-01`
      
      // Use a gte (greater than or equal) comparison
      query.release_date = {
        $gte: startDate
      }
      
      console.log(`🔍 Searching for release dates from ${year} and newer (dates >= ${startDate})`)
    }

    // Runtime filter
    if (req.query.runtime) {
      const runtime = Number.parseInt(req.query.runtime)
      query.runtime = {
        $gte: runtime - 15,
        $lte: runtime + 15,
      }
    }

    // Genre filter (case-insensitive, partial match)
    if (req.query.genre) {
      query.genres = {
        $regex: req.query.genre,
        $options: "i",
      }
    }

    // Log the final query for debugging
    console.log("🔍 Final MongoDB query:", JSON.stringify(query, null, 2))

    // Sorting options
    const sortOptions = {
      rating: { average_rating: -1 },
      title: { title: 1 },
      release_date: { release_date: -1 },
      runtime: { runtime: -1 },
    }

    // Default sort by rating if not specified
    const sortBy = req.query.sortBy || "rating"
    const sort = sortOptions[sortBy] || sortOptions.rating

    // Count total matching documents
    const total = await Movie.countDocuments(query)
    console.log(`📊 Total matching movies: ${total}`)

    // Fetch paginated and filtered results
    const movies = await Movie.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)

    console.log(`📤 Returning ${movies.length} movies`)

    res.json({
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      movies,
    })
  } catch (error) {
    console.error("❌ Error in /api/movies:", error)
    res.status(500).json({ error: "Failed to load data", details: error.message })
  }
})

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
})