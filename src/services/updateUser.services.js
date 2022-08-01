import * as bcrypt from "bcryptjs";
import User from "../database/models/User";

const updateUserServices = async (id, name, email, password, userId) => {
  const admFind = await User.findById(userId).exec();

  if (admFind.isAdm && id !== admFind.id) {
    return await updateUser(id, name, email, password, admFind);
  } else if (id === admFind.id) {
    return await updateUser(id, name, email, password, admFind);
  } else {
    throw new Error("Missing admin permissions");
  }
};

export default updateUserServices;

async function updateUser(id, name, email, password, admFind) {
  const date = new Date();

  const updateUser = {
    updatedOn: date.toISOString(),
  };
  if (name !== undefined) {
    updateUser.name = name;
  }
  if (email !== undefined) {
    updateUser.email = email;
  }
  if (password !== undefined) {
    const hashedPass = await bcrypt.hash(password, 10);
    updateUser.password = hashedPass;
  }
  const allUsers = await User.find({});
  const userIndex = allUsers.findIndex((elem) => elem._id.valueOf() === id);

  if (userIndex === -1) {
    throw new Error("User not found");
  }
  if (admFind.isAdm) {
    await User.updateOne({ _id: admFind }, updateUser).exec();
    const userFind = await User.findById(admFind._id).exec();
    return userFind;
  } else {
    const test = await User.updateOne({ _id: admFind }, updateUser).exec();
    const userFind = await User.findById(admFind._id).exec();
    const { _id, name, email, isAdm, createdOn, updatedOn } = userFind;

    return { _id, name, email, isAdm, createdOn, updatedOn };
  }
}
