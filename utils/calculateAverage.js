const calculateAverage = (newRating, averageRating, numberOfRatings) => 
  (newRating + (averageRating * numberOfRatings)) / (numberOfRatings+1);

module.exports = { calculateAverage };
