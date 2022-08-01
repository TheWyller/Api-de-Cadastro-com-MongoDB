import mongoDB from "../mongodb.config";

const User = mongoDB.model("User", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdm: {
    type: Boolean,
    required: true,
  },
  createdOn: String,
  updatedOn: String,
});

export default User;
