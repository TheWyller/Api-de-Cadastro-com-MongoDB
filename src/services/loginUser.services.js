import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../database/models/User";

const loginUserServices = async (email, password) => {
  const userData = await User.find({ email: email });

  if (!userData[0].email) {
    throw new Error("Wrong email/password");
  }

  const passwordMatch = bcrypt.compareSync(password, userData[0].password);

  if (!passwordMatch) {
    throw new Error("Wrong email/password");
  }

  const token = jwt.sign(
    { id: userData[0]._id.valueOf() },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h",
      subject: userData[0]._id.valueOf(),
    }
  );
  return token;
};

export default loginUserServices;
