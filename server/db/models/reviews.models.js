import mongoose from 'mongoose';

const ReviewsSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    content_id: {
      type: String,
      default: null,
      require: true,
    },
    review: {
      type: String,
      trim: true,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model('review', ReviewsSchema);
export default Reviews;
