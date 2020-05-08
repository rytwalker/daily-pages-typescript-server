import app from "./index";

const PORT: string | number = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`\n App is running on Port: ${PORT} \n`);
});
