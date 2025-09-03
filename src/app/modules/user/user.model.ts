import { model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import { IUser, Role } from "./user.interface";
import { envVars } from "../../config/env";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(Role), default: Role.RIDER },
    isBlocked: { type: Boolean, default: false },
    cancelCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcryptjs.genSalt(Number(envVars.BCRYPT_SALT_ROUND));
//   this.password = await bcryptjs.hash(this.password, salt);
//   next();
// });

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as Partial<IUser>;
  if (update.password) {
    const salt = await bcryptjs.genSalt(Number(envVars.BCRYPT_SALT_ROUND));
    update.password = await bcryptjs.hash(update.password, salt);
    this.setUpdate(update);
  }
  next();
});

userSchema.methods.toJSON = function () {
  const obj: any = this.toObject();
  delete obj.password;
  return obj;
};

const User = model<IUser>("User", userSchema);

export default User;
