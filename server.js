const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Sample data
const data = {
  "users": [
    {
      "user_id": "1",
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "password": "hashed_password",
      "preferences": ["Action", "Comedy"],
      "watchlist": ["501", "502"],
      "watched_movies": ["503"]
    },
    {
      "user_id": "2",
      "name": "Bob Smith",
      "email": "bob.smith@example.com",
      "password": "hashed_password",
      "preferences": ["Drama", "Sci-Fi"],
      "watchlist": ["504"],
      "watched_movies": ["505", "506"]
    }
  ],
  "movies": [
    {
      "movie_id": "501",
      "title": "Space Adventure",
      "description": "An intergalactic journey to save humanity.",
      "genres": ["Sci-Fi", "Adventure"],
      "director": "Jane Doe",
      "cast": ["Actor A", "Actor B"],
      "release_date": "2023-06-15",
      "duration": 120,
      "rating": 4.8
    },
    {
      "movie_id": "502",
      "title": "Laugh Out Loud",
      "description": "A comedy that will keep you laughing till the end.",
      "genres": ["Comedy"],
      "director": "John Smith",
      "cast": ["Actor C", "Actor D"],
      "release_date": "2022-11-12",
      "duration": 105,
      "rating": 4.3
    }
  ],
  "watchlists": [
    {
      "user_id": "1",
      "movie_id": "501",
      "added_date": "2024-10-20"
    },
    {
      "user_id": "2",
      "movie_id": "504",
      "added_date": "2024-11-01"
    }
  ],
  "reviews": [
    {
      "review_id": "601",
      "movie_id": "501",
      "user_id": "1",
      "rating": 4.5,
      "comment": "Amazing visuals and storyline, loved it!",
      "date": "2024-11-02"
    },
    {
      "review_id": "602",
      "movie_id": "502",
      "user_id": "2",
      "rating": 4.0,
      "comment": "Hilarious from start to finish!",
      "date": "2024-11-03"
    }
  ]
};

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.json(data.users);  // This will return the users data
});

// Get all users
app.get('/users', (req, res) => {
  res.json(data.users);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const user = data.users.find(u => u.user_id === req.params.id);
  user ? res.json(user) : res.status(404).send("User not found");
});

// Get all movies
app.get('/movies', (req, res) => {
  res.json(data.movies);
});

// Get movie by ID
app.get('/movies/:id', (req, res) => {
  const movie = data.movies.find(m => m.movie_id === req.params.id);
  movie ? res.json(movie) : res.status(404).send("Movie not found");
});

// Get all watchlists
app.get('/watchlists', (req, res) => {
  res.json(data.watchlists);
});

// Get watchlist by user ID
app.get('/watchlists/:userId', (req, res) => {
  const watchlist = data.watchlists.filter(w => w.user_id === req.params.userId);
  watchlist.length ? res.json(watchlist) : res.status(404).send("Watchlist not found");
});

// Get all reviews
app.get('/reviews', (req, res) => {
  res.json(data.reviews);
});

// Get review by ID
app.get('/reviews/:id', (req, res) => {
  const review = data.reviews.find(r => r.review_id === req.params.id);
  review ? res.json(review) : res.status(404).send("Review not found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
