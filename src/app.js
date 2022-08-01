import express from "express";
import userRouter from "./routers/users.routers";
import loginRouter from "./routers/login.routers";

const app = express();

app.use(express.json());

app.use("/login", loginRouter);
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Fumegou o trenzinho da alegria");
});

export default app;
