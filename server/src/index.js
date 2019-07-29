const app = require("express")();
const graphqlHTTP = require("express-graphql");
const {GraphQLSchema} = require("graphql");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const {errorType} = require("./helpers/error");
const query = require("./api/query");
const mutation = require("./api/mutation");
const schema = new GraphQLSchema({query, mutation});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
mongoose.connection.on("error", e => console.error(e));
mongoose.connection.once("open", e => console.log("Database connected!"));

app.get("/", (req, res) => res.send({
  status: true,
  message: "Service Running",
  author: "Tomy Budiman"
}));

// GraphQl
app.use("/api", graphqlHTTP({
  schema,
  pretty: true,
  graphiql: process.env.NODE_ENV === "development",
  customFormatErrorFn: (err) => {
    console.error(err);
    return errorType[err.message];
  }
}));

const listen = app.listen(process.env.PORT || "8000", () => {
  console.log(`Server started at port ${listen.address().port}`);
});
