const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://hasnainalimj:hasnainalimj@mjcluster-6fsmx.mongodb.net/test?retryWrites=true&w=majority",
    // "mongodb://localhost/todo",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Db Connected"))
  .catch(err => console.error(err));
