import app from "./app";
import chalk from "chalk";

const PORT: string | number = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log("\n", chalk.blueBright("*********************************"));
  console.log(` App is running on Port: ${chalk.blue.underline(PORT)}`);
  console.log(chalk.blueBright(" *********************************"), "\n");
});
