import * as bcrypt from "bcryptjs";
import User from "../database/models/User";

const createUserServices = async (name, email, password, isAdm) => {
  const hashedPass = await bcrypt.hash(password, 10);

  const date = new Date();

  const newUser = {
    name,
    email,
    password: hashedPass,
    isAdm,
    createdOn: date.toISOString(),
    updatedOn: date.toISOString(),
  };

  const user = new User({ ...newUser });

  user.save(function (err) {
    if (err) return undefined;
  });

  const { _id, createdOn, updatedOn } = user;

  const newUserMod = { _id, name, email, isAdm, createdOn, updatedOn };
  return newUserMod;
};

export default createUserServices;
