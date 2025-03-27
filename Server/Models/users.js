import { Schema } from "mongoose";
import { model } from "mongoose";


const userSchema = new Schema({
    email: { type: String, unique: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userRole: { type: String, default: "user" },
    profilePic: String,
    tickets: [{
      movie: String,
      theater: String,
      time: String,
      seats: [{
        seatNumber: String,
        price: Number
      }],
      totalPrice: Number
    }]
  });
  
  const user = model("Users", userSchema);
  
  export { user };
  




  const theaterSchema = new Schema({
    theaterName: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    image: { type: String, required: true } // Base64 Image
  });
  
  const theater = model("Theater", theaterSchema);
  export  {theater};




const movieSchema = new Schema({
  movieName: { type: String, required: true, unique: true },
  genre: { type: String, required: true },
  duration: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true }, // Base64 stored as a string
  language: { type: String, required: true },
  cast: [{ type: String, required: true }],
  director: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
});

const movie = model("Movie", movieSchema);

export {movie};


const bookingSchema = new Schema({
    movie: { type: String, required: true },
    theater: { type: String, required: true },
    time: { type: String, required: true },
    seats: [{
        seatNumber: String,
        isBooked: { type: Boolean, default: false },
        price: Number
    }]
});

const booking = model("Booking", bookingSchema);
export { booking };

const reviewSchema = new Schema({
    movieName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, required: true },
    userName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
  const Review = model("Review", reviewSchema);
  
  export { Review };


