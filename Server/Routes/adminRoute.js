import { Router } from "express"
import dotenv from "dotenv"
import { adminCheck } from "../Middleware/adminCheck.js";
import { auth } from "../Middleware/auth.js";
import { theater } from "../Models/users.js";
import { movie } from "../Models/users.js";
import multer from "multer";
import { booking } from "../Models/users.js";
import fs from "fs";



dotenv.config()
const adminRoute=Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); 
    },
});

const upload = multer({ storage });



adminRoute.post("/api/addMovie", async (req, res) => {
    try {
      const { movieName, genre, duration, releaseDate, description, language, cast, director, poster } = req.body;
  
      // Create a new movie object
      const newMovie = new movie({
        movieName,
        genre,
        duration,
        releaseDate,
        description,
        language,
        cast,
        director,
        poster, // Stored as Base64
      });
  
      // Save to database
      await newMovie.save();
  
      res.status(201).json({ message: "Movie added successfully!" });
    } catch (error) {
      console.error("Error adding movie:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

adminRoute.post("/api/addTheater", auth,  async (req, res) => {
    try {
        const { theaterName, location, image, ratings, contactInfo } = req.body;

        // Check if the theater name already exists
        const existingTheater = await theater.findOne({ theaterName });
        if (existingTheater) {
            return res.status(400).json({ message: "Theater already exists" });
        }

        // Create and save the new theater
        const newTheater = new theater({
            theaterName,
            location,
            image, // Base64 image
            ratings,
            contactInfo,
        });

        await newTheater.save();
        res.status(201).json({ message: "Theater added successfully", data: newTheater });
        console.log("Theater added successfully");
    } catch (error) {
        console.error("Error adding theater:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


adminRoute.put("/api/editTheater/:id", async (req, res) => {
    try {
        const { theaterName, location, image } = req.body;
        const updatedTheater = await theater.findByIdAndUpdate(
            req.params.id,
            { theaterName, location, image },
            { new: true }
        );

        if (!updatedTheater) {
            return res.status(404).json({ message: "Theater not found" });
        }

        res.status(200).json({ message: "Theater updated successfully", data: updatedTheater });
    } catch (error) {
        console.error("Error updating theater:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

adminRoute.put("/movies/:id", async (req, res) => {
    try {
      const updatedMovie = await movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedMovie);
    } catch (error) {
      res.status(500).json({ error: "Failed to update movie" });
    }
  });
  
  // Delete Movie
  adminRoute.delete("/movies/:id", async (req, res) => {
    try {
      await movie.findByIdAndDelete(req.params.id);
      res.json({ message: "Movie deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete movie" });
    }
  });




const predefinedSeats = [
    { seatNumber: "A1", isBooked: false, price: 180 }, { seatNumber: "A2", isBooked: false, price: 180 }, { seatNumber: "A3", isBooked: false, price: 180 }, { seatNumber: "A4", isBooked: false, price: 180 }, { seatNumber: "A5", isBooked: false, price: 180 }, { seatNumber: "A6", isBooked: false, price: 180 },
    { seatNumber: "B1", isBooked: false, price: 180 }, { seatNumber: "B2", isBooked: false, price: 180 }, { seatNumber: "B3", isBooked: false, price: 180 }, { seatNumber: "B4", isBooked: false, price: 180 }, { seatNumber: "B5", isBooked: false, price: 180 }, { seatNumber: "B6", isBooked: false, price: 180 },
    { seatNumber: "C1", isBooked: false, price: 180 }, { seatNumber: "C2", isBooked: false, price: 180 }, { seatNumber: "C3", isBooked: false, price: 180 }, { seatNumber: "C4", isBooked: false, price: 180 }, { seatNumber: "C5", isBooked: false, price: 180 }, { seatNumber: "C6", isBooked: false, price: 180 },
    { seatNumber: "D1", isBooked: false, price: 180 }, { seatNumber: "D2", isBooked: false, price: 180 }, { seatNumber: "D3", isBooked: false, price: 180 }, { seatNumber: "D4", isBooked: false, price: 180 }, { seatNumber: "D5", isBooked: false, price: 180 }, { seatNumber: "D6", isBooked: false, price: 180 },
    { seatNumber: "E1", isBooked: false, price: 200 }, { seatNumber: "E2", isBooked: false, price: 200 }, { seatNumber: "E3", isBooked: false, price: 200 }, { seatNumber: "E4", isBooked: false, price: 200 }, { seatNumber: "E5", isBooked: false, price: 200 }, { seatNumber: "E6", isBooked: false, price: 200 },
    { seatNumber: "F1", isBooked: false, price: 200 }, { seatNumber: "F2", isBooked: false, price: 200 }, { seatNumber: "F3", isBooked: false, price: 200 }, { seatNumber: "F4", isBooked: false, price: 200 }, { seatNumber: "F5", isBooked: false, price: 200 }, { seatNumber: "F6", isBooked: false, price: 200 },
    { seatNumber: "G1", isBooked: false, price: 200 }, { seatNumber: "G2", isBooked: false, price: 200 }, { seatNumber: "G3", isBooked: false, price: 200 }, { seatNumber: "G4", isBooked: false, price: 200 }, { seatNumber: "G5", isBooked: false, price: 200 }, { seatNumber: "G6", isBooked: false, price: 200 },
    { seatNumber: "H1", isBooked: false, price: 200 }, { seatNumber: "H2", isBooked: false, price: 200 }, { seatNumber: "H3", isBooked: false, price: 200 }, { seatNumber: "H4", isBooked: false, price: 200 }, { seatNumber: "H5", isBooked: false, price: 200 }, { seatNumber: "H6", isBooked: false, price: 200 },
    { seatNumber: "I1", isBooked: false, price: 200 }, { seatNumber: "I2", isBooked: false, price: 200 }, { seatNumber: "I3", isBooked: false, price: 200 }, { seatNumber: "I4", isBooked: false, price: 200 }, { seatNumber: "I5", isBooked: false, price: 200 }, { seatNumber: "I6", isBooked: false, price: 200 },
    { seatNumber: "J1", isBooked: false, price: 200 }, { seatNumber: "J2", isBooked: false, price: 200 }, { seatNumber: "J3", isBooked: false, price: 200 }, { seatNumber: "J4", isBooked: false, price: 200 }, { seatNumber: "J5", isBooked: false, price: 200 }, { seatNumber: "J6", isBooked: false, price: 200 },
    { seatNumber: "K1", isBooked: false, price: 220 }, { seatNumber: "K2", isBooked: false, price: 220 }, { seatNumber: "K3", isBooked: false, price: 220 }, { seatNumber: "K4", isBooked: false, price: 220 }, { seatNumber: "K5", isBooked: false, price: 220 }, { seatNumber: "K6", isBooked: false, price: 220 },
    { seatNumber: "L1", isBooked: false, price: 220 }, { seatNumber: "L2", isBooked: false, price: 220 }, { seatNumber: "L3", isBooked: false, price: 220 }, { seatNumber: "L4", isBooked: false, price: 220 }, { seatNumber: "L5", isBooked: false, price: 220 }, { seatNumber: "L6", isBooked: false, price: 220 }
];

adminRoute.post("/bookings",auth,  async (req, res) => {
    const { movie, theater, time } = req.body;

  
    const existingBooking = await booking.findOne({ theater, time });
    if (existingBooking) {
        return res.status(400).json({ message: "This time slot is already booked in this theater." });
    }

    try {
        const newBooking = new booking({
            movie,
            theater,
            time,
            seats: predefinedSeats
        });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: "Error adding booking" });
    }
});


adminRoute.put("/editMovie/:id",auth,adminCheck, async (req, res) => {
    try {
      const updatedMovie = await movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedMovie);
    } catch (error) {
      res.status(500).json({ error: "Error updating movie" });
    }
  });

adminRoute.patch("/editscreen",auth,adminCheck,async(req,res)=>{

    const  {TheaterId,Location}= req.body;
    const  cechkt=await theater.findOne({theaterId:TheaterId})
   
   if(cechkt){
    cechkt.location=Location
    await cechkt.save();
    res.status(200).send("Location changed")
   }
   else{
    res.status(404).send("Theater unavilabe")
   }
})

adminRoute.post("/api/addTheater", async (req, res) => {
    try {
      const { theaterName, location, image } = req.body;
  
      // Check if the theater already exists
      const existingTheater = await Theater.findOne({ theaterName });
      if (existingTheater) {
        return res.status(400).json({ message: "Theater already exists" });
      }
  
      const newTheater = new Theater({ theaterName, location, image });
      await newTheater.save();
  
      res.status(201).json({ message: "Theater added successfully", data: newTheater });
    } catch (error) {
      console.error("Error adding theater:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  
adminRoute.patch("/editsmovie",auth,adminCheck,async(req,res)=>{

            const  {MovieId,MovieName}= req.body;
            const  cechkm=await movie.findOne({movieId:MovieId})
           
           if(cechkm){
            cechkm.movieName=MovieName
            await cechkm.save();
            res.status(200).send("Movie Name changed")
           }
           else{
            res.status(404).send("Theater unavilabe")
           }
        })

    


export {adminRoute}