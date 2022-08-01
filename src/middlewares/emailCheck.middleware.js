import User from "../database/models/User";

const emailCheckMiddleware = async (request, response, next) => {
  const { email } = request.body;

  const userData = await User.find({ email: email });

  if (userData[0]) {
    return response.status(400).json({ message: "E-mail already registered" });
  }

  return next();
};

export default emailCheckMiddleware;
