const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const PORT = process.env.PORT || 3003; 
const users = require("./routes/users");

app.use(cors());
app.use(express.json());
// routes 
app.use("/auth", users);

// db.sequelize ... 
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening PORT ${PORT}`);
    })
});


app.get("/", (req, res) => {
    res.send("hello world");
})