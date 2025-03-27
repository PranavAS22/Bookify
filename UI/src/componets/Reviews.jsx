import React, { useState, useEffect } from "react";

const Reviews = ({ movieName }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:7200/get-reviews/${encodeURIComponent(movieName)}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch reviews");
        }

        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieName]);

  // Handle review submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    try {
      setError(null);
      const response = await fetch("http://localhost:7200/add-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          movieName,
          rating: Number(rating),
          reviewText: newReview,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Review submission failed");
      }

      setReviews([...reviews, responseData.review]);
      setNewReview("");
      setRating(5);
    } catch (error) {
      setError(error.message);
      console.error("Review submission error:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-4 text-purple-500">Loading reviews...</div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-purple-600 mb-6">
        Reviews for {movieName}
      </h2>

      {/* Review Form - Always Visible */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-purple-700 font-medium mb-2">
            Your Rating
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          >
            {[5, 4, 3, 2, 1].map((num) => (
              <option key={num} value={num}>
                {num} Stars
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-purple-700 font-medium mb-2">
            Your Review
          </label>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review..."
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 h-32"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-600 text-center">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="p-4 border border-purple-100 rounded-lg bg-purple-50"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-purple-700">
                  {review.userName}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-sm">
                    {review.rating}/5
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="text-gray-700">{review.reviewText}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
