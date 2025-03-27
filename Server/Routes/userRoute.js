import { Router } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { user } from "../Models/users.js";
import { movie } from "../Models/users.js";
import { theater } from "../Models/users.js";
import { auth } from "../Middleware/auth.js"
import { booking } from "../Models/users.js";
import { Review } from "../Models/users.js";
dotenv.config();
const userRoute = Router();


userRoute.post("/signup", async (req, res) => {
  try {
    const { email, userName, password, profilePic } = req.body;

    // Check if the user already exists
    const existingUser = await user.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Determine user role
    const userRole = email === "admin@bookify.com" ? "admin" : "user";

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the user
    const newUser = new user({
      email,
      userName,
      password: hashedPassword, // Store the hashed password
      profilePic,
      userRole
    });

    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});





userRoute.post("/api/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Find user by username
    const existingUser = await user.findOne({ userName });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: existingUser._id, userName: existingUser.userName, userRole: existingUser.userRole },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Set token in HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });

    // Send user data (including profilePic) to frontend
    res.json({
      message: "Login successful",
      user: {
        userName: existingUser.userName,
        userRole: existingUser.userRole,
        profilePic: existingUser.profilePic, // Send profile picture
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// Get User Details
userRoute.get("/user/me", auth, async (req, res) => {
  try {
      const foundUser = await user.findById(req.user.id).select("-password");

      if (!foundUser) {
          return res.status(404).json({ message: "User not found" });
      }

      res.json({ user: foundUser });
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server error" });
  }
});



userRoute.get("/getTheaters", async (req, res) => {
  try {
    const theaters = await theater.find();
    res.status(200).json(theaters);
  } catch {
    res.status(500).json({ message: "Failed to fetch theaters" });
  }
});

userRoute.get("/getMovies", async (req, res) => {
  try {
    const movies = await movie.find();
    res.json(movies);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

userRoute.post("/booking", auth, async (req, res) => {
  try {
    const { TheaterId, Username, TheaterName, MovieName, MovieId, Seat, Time } = req.body;
    const existingTheater = await throwheater.findOne({ theaterId: TheaterId });
    if (!existingTheater) {
      res.status(400).send("Theater doesn't exist");
    } else {
      const existingMovie = await movie.findOne({ movieId: MovieId, time: Time });
      if (!existingMovie) {
        res.status(400).send("No movie in this time period");
      } else {
        let totalPrice = 0;
        for (let i = 0; i < Seat.length; i++) {
          const seatNumber = Seat[i];
          const Seats = existingMovie.seats.find((seats) => seats.seatNumber === seatNumber);
          if (!Seats) {
            return res.status(400).send(`Seat ${seatNumber} does not exist.`);
          }
          if (Seats.isBooked) {
            res.status(400).send(`Seat ${seatNumber} already booked.`);
          } else {
            totalPrice += Seats.price;
            Seats.isBooked = true;
            existingMovie.markModified("seats");
          }
        }
        await existingMovie.save();
        const ticket = new ticket({ username: Username, theaterName: TheaterName, movieName: MovieName, time: Time, seats: Seat, totalprice: totalPrice });
        await ticket.save();
        res.status(200).send(`Booking successful. Total price: ${totalPrice}`);
      }
    }
  } catch {
    res.status(500).send("Internal Server error");
  }
});

userRoute.get("/getTicket", async (req, res) => {
  try {
    const name = req.query.username;
    const result = await ticket.find({ username: name });
    if (result) {
      res.status(200).json({ result });
    } else {
      res.status(404).json({ msg: "No history found" });
    }
  } catch {
    res.status(500).send("Internal Server Error");
  }
});

userRoute.get("/bookings", async (req, res) => {
  try {
    const bookings = await booking.find();
    res.status(200).json(bookings);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

userRoute.get("/api/seats/:movie/:theater", async (req, res) => {
  try {
    const { movie, theater } = req.params;
    console.log("API called with:", req.params);
    console.log("Fetching seats for:", movie, theater);

    const show = await booking.findOne({ movie: movie, theater: theater });

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.json({ seats: show.seats, times: show.time });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});





userRoute.get("/movies", async (req, res) => {
    try {
        const movies = await movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Error fetching movies" });
    }
});

userRoute.get("/api/bookings", async (req, res) => {
    const { movie, theater, time } = req.query;
    const booking = await booking.findOne({ movie, theater, time });

    if (!booking) {
        return res.status(404).json({ error: "No booking found" });
    }

    res.json({ seats: booking.seats });
});

userRoute.get("/api/theaters/:movieName", async (req, res) => {
  try {
    const { movieName } = req.params;

    // Find bookings that match the movie
    const bookings = await booking.find({ movie: movieName });

    if (!bookings.length) {
      return res.status(404).json({ message: "No theaters found for this movie" });
    }

    // Extract theater names from the bookings
    const theaterNames = bookings.map((b) => b.theater);

    // Find theaters that match the extracted names
    const theaters = await theater.find({ theaterName: { $in: theaterNames } });

    res.json(theaters); // ✅ Return theater name & image
  } catch (error) {
    console.error("Error fetching theaters:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




userRoute.get("/api/shows/:movie/:theater", async (req, res) => {
  try {
    const { movie, theater } = req.params;
    const shows = await booking.find({ movie, theater });

    if (!shows || shows.length === 0) {
      return res.status(404).json({ message: "No shows found", times: [] });
    }

    const times = [...new Set(shows.map((show) => show.time))];
    res.json({ times });
  } catch (error) {
    console.error("Error fetching time slots:", error);
    res.status(500).json({ message: "Server error", times: [] });
  }
});


userRoute.get("/api/seats/:movie/:theater/:time", async (req, res) => {
  try {
    const { movie, theater, time } = req.params;

    // Find the show for the given movie, theater, and time
    const show = await booking.findOne({ movie, theater, time });

    if (!show) {
      return res.status(404).json({ message: "Show not found", seats: [] });
    }

    // Return the seats with the latest booking status
    res.json({ seats: show.seats });
  } catch (error) {
    console.error("Error fetching seats for time:", error);
    res.status(500).json({ message: "Server error", seats: [] });
  }
});



userRoute.get("/api/theaters", async (req, res) => {
    try {
        const theaters = await theater.find();
        res.json(theaters);
    } catch (error) {
        res.status(500).json({ error: "Error fetching theaters" });
    }
});

userRoute.get("/theater/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Theater ID" });
  }
  try {
    const theater = await theater.findById(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }
    res.json(theater);
  } catch (error) {
    console.error("Error fetching theater:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



userRoute.get("/api/timeslots", async (req, res) => {
  try {
    const { movie, theater } = req.query;
    const bookings = await booking.find({ movie, theater }).select("time");
    if (!bookings.length) {
      return res.status(404).json({ message: "No time slots available" });
    }
    res.json(bookings.map((b) => b.time));
  } catch {
    res.status(500).json({ message: "Error fetching time slots" });
  }
});



userRoute.post("/api/book", async (req, res) => {
  try {
    const { movie, theater, time, seats: selectedSeats, user: userId } = req.body;

    // Validate required fields
    const requiredFields = { movie, theater, time, selectedSeats, userId };
    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({ 
          message: `Missing required field: ${field}` 
        });
      }
    }

    // Find the show
    const show = await booking.findOne({ 
      movie: decodeURIComponent(movie),
      theater: decodeURIComponent(theater), 
      time 
    });

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    // Validate seats
    const invalidSeats = selectedSeats.filter(seatNumber => 
      !show.seats.some(s => s.seatNumber === seatNumber)
    );

    if (invalidSeats.length > 0) {
      return res.status(400).json({ 
        message: `Invalid seats selected: ${invalidSeats.join(", ")}` 
      });
    }

    // Check seat availability
    const unavailableSeats = selectedSeats.filter(seatNumber => {
      const seat = show.seats.find(s => s.seatNumber === seatNumber);
      return seat?.isBooked;
    });

    if (unavailableSeats.length > 0) {
      return res.status(400).json({ 
        message: `Seats already booked: ${unavailableSeats.join(", ")}` 
      });
    }

    // Update seats
    show.seats = show.seats.map(seat => 
      selectedSeats.includes(seat.seatNumber)
        ? { ...seat, isBooked: true }
        : seat
    );

    // Find user
    const foundUser = await user.findById(userId);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create ticket
    const newTicket = {
      movie: decodeURIComponent(movie),
      theater: decodeURIComponent(theater),
      time,
      seats: selectedSeats.map(seatNumber => {
        const seat = show.seats.find(s => s.seatNumber === seatNumber);
        return { seatNumber, price: seat.price };
      }),
      totalPrice: selectedSeats.reduce((sum, seatNumber) => {
        const seat = show.seats.find(s => s.seatNumber === seatNumber);
        return sum + (seat ? seat.price : 0);
      }, 0),
    };

    // Save changes
    await Promise.all([
      show.save(),
      user.findByIdAndUpdate(userId, {
        $push: { tickets: newTicket }
      })
    ]);

    res.status(201).json({ 
      message: "Booking successful!", 
      ticket: newTicket 
    });

  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
});





// Ensure your review endpoints match
userRoute.get('/get-reviews/:movieName', async (req, res) => {
  try {
    const reviews = await Review.find({ 
      movieName: decodeURIComponent(req.params.movieName) 
    }).sort({ createdAt: -1 });
    
    res.json({ reviews }); // Wrap in object
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Add review endpoint with auth middleware
userRoute.post('/add-review', auth, async (req, res) => { // Add auth here
  try {
    const { movieName, rating, reviewText } = req.body;
    
    // Get user from auth middleware
    const currentUser = await user.findById(req.user.id);
    
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newReview = new Review({
      movieName,
      rating,
      reviewText,
      userName: currentUser.userName, // Get from verified user
      createdAt: new Date()
    });

    await newReview.save();
    res.status(201).json({ review: newReview });
  } catch (error) {
    console.error('Review submission error:', error);
    res.status(500).json({ 
      error: 'Failed to submit review',
      details: error.message // Add error details for debugging
    });
  }
});

userRoute.get("/api/user/me", auth, async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const foundUser = await user.findById(req.user.id)
      .select("-password -tickets -__v");

    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        id: foundUser._id,
        username: foundUser.userName, // Maintain existing casing
        email: foundUser.email,
        profilePic: foundUser.profilePic,
        role: foundUser.userRole // Match your schema
      }
    });
  } catch (error) {
    console.error("User me error:", error);
    res.status(500).json({ error: "Server error" });
  }
});


userRoute.get("/user", auth, async (req, res) => {
  try {
      const userData = await user.findById(req.user.id).select("userName");
      if (!userData) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json({ 
          username: userData.userName,
          role: userData.role 
      });
  } catch (error) {
      console.error("User route error:", error);
      res.status(500).json({ message: "Server error" });
  }
});





// Update user profile
userRoute.put("/user/update", auth, async (req, res) => {
  try {
    const { username, email, profilePic } = req.body;

    const updatedUser = await user.findByIdAndUpdate(
      req.user.id,
      { userName: username, email, profilePic },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});


userRoute.get("/user/tickets", auth, async (req, res) => {
  try {
    const foundUser = await user.findById(req.user.id).select("tickets"); // ✅ Use "user" (lowercase)

    if (!foundUser) return res.status(404).json({ msg: "User not found" });

    res.json({ tickets: foundUser.tickets });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ msg: "Server error" });
  }
});


userRoute.get("/api/theater/:id", async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) return res.status(404).json({ message: "Theater not found" });

    res.json(theater);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update theater by ID
userRoute.put("/api/editTheater/:id", async (req, res) => {
  try {
    const { theaterName, location, image } = req.body;

    const updatedTheater = await Theater.findByIdAndUpdate(
      req.params.id,
      { theaterName, location, image },
      { new: true }
    );

    if (!updatedTheater) return res.status(404).json({ message: "Theater not found" });

    res.json({ message: "Theater updated successfully", updatedTheater });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});




export default userRoute;
