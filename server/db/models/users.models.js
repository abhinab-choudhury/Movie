import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(myPlaintextPassword, salt);
  }
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Users = mongoose.model('user', UserSchema);
export default User;
