import mongoose from 'mongoose';

const VotesSchema = mongoose.Schema(
  {
    content_id: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Votes = mongoose.model('vote', VotesSchema);
export default Votes;
