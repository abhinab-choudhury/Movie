import mongoose from 'mongoose';

const WishListsSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    content: [
      {
        content_id: {
          type: String,
          require: true,
        },
        title: {
          type: String,
          require: true,
        },
        description: {
          type: String,
          require: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const WishLists = mongoose.Schema('wishlist', WishListsSchema);
export default WishLists;
