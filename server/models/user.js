import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
});

userSchema.pre('save', function (next, done) {
  const user = this;

  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      if (err) return next(err);
      user.password = hashedPassword;
      next();
    });
  });
});

export default mongoose.model('User', userSchema);
