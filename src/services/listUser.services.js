import User from "../database/models/User";

const listUserServices = async (userId) => {
  const userFind = await User.findById(userId).exec();

  if (userFind.isAdm) {
    return userFind;
  } else {
    const { id, name, email, isAdm, createdOn, updatedOn } = userFind;
    return { id, name, email, isAdm, createdOn, updatedOn };
  }
};

export default listUserServices;
