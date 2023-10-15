import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nom d'utilisateur requis"],
    },
    email: {
      type: String,
      required: [true, "E-mail requis"],
      unique: [true, "E-mail existe déjà"],
    },
    password: {
      type: String,
      required: [true, "Mot de passe requis"],
    },
    pic: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
