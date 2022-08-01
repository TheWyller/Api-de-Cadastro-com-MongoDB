import User from "../database/models/User";

const deleteUserServices = async (id, userId) => {
  const admFind = await User.findById(userId).exec();

  if (admFind.isAdm && id !== admFind.id) {
    return await deleteUser(id);
  } else if (id === admFind.id) {
    return await deleteUser(id);
  } else {
    throw new Error("Missing admin permissions");
  }
};

export default deleteUserServices;

async function deleteUser(id) {
  await User.deleteOne({ _id: id }).exec();

  return { message: "User deleted with success" };
}
