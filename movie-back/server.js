const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const UserRoutes = require('./routes/userRoutes')
const MovieRoutes = require('./routes/movieRoutes')
const SeriesRoutes = require('./routes/seriesRoutes')
const EpisodeRoutes = require('./routes/episodeRoutes')
const ActorRoutes = require('./routes/actorRoutes')
const ErrorRoutes = require('./routes/errorRoutes')
const MyListRoutes = require('./routes/myListRoutes')
const CommentRoutes = require('./routes/commentRoutes')
const RatingRoutes = require('./routes/ratingRoutes')
const app = express()


dotenv.config()
app.use(cors())
app.use(express.json())

app.use('/api/user', UserRoutes)
app.use('/api/movies', MovieRoutes)
app.use('/api/series', SeriesRoutes)
app.use('/api/episode', EpisodeRoutes)
app.use('/api/actors', ActorRoutes)
app.use('/api/error', ErrorRoutes)
app.use('/api/myList', MyListRoutes)
app.use('/api/comment', CommentRoutes)
app.use('/api/rating', RatingRoutes)

app.get('/health', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    status: 'ok',
    timeStamps: Date.now(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  }
  res.status(200).json(healthCheck)
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB, {

}).then(() => {
    console.log("mongoDB connected Successfuly")
    app.listen(process.env.PORT, () => {
        console.log(`server is runnug on port: ${PORT}`)
    })
}).catch((err) => {
    console.error("MongoDB connection error:", err)
    process.exit(1)
})
