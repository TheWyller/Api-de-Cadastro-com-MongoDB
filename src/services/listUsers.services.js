import User from "../database/models/User";

const listUsersServices = async () => {
  const allUsers = await User.find({});
  return allUsers;
};

export default listUsersServices;
