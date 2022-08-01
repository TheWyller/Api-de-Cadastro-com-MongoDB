import User from "../database/models/User";

const admCheckMiddleware = async (request, response, next) => {
  const id = request.userId;

  const userFind = await User.findById(id).exec();

  if (userFind.isAdm) {
    return next();
  } else {
    return response.status(401).json({ message: "Unauthorized" });
  }
};

export default admCheckMiddleware;
