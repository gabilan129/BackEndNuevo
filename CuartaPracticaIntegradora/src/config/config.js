const dotenv = require("dotenv");
const { Command } = require("commander");

const program = new Command();

program
  .option("--test", "Variable para correr los test", false)
  .option("-p <port>", "Puerto del servidor", 9090)
  .option("--mode <mode>", "Modo de trabajo", "develop");
program.parse();

console.log("Mode Option: ", program.opts().mode);
const environment = program.opts().mode;

if (environment === "production") {
  dotenv.config({ path: "src/.env.production" });
} else {
  dotenv.config({ path: "src/.env.development" });
}

module.exports = {
  port: process.env.PORT,
  environment: environment,
  mongourl: process.env.MONGOURL,
  sessionsecret: process.env.SESSIONSECRET,
  clientid: process.env.CLIENTID,
  clientsecret: process.env.CLIENTSECRET,
  callbackurl: process.env.CALLBACKURL,
  runTests: program.opts().test,
};

const CLIENTID = process.env.CLIENTID;
const CLIENTSECRET = process.env.CLIENTSECRET;
const CALLBACKURL = process.env.CALLBACKURL;
