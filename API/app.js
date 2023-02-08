const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./utils/database");

app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

app.get("/api/todo", (req, res) => {
    db.excute("SELECT * FROM tbl_todo")
        .then((data) => {
            let [row] = data;
            res.json({
                message: "success",
                data
            })
        })

});

app.listen(5000, () => {
    console.log(("server is running on htttp://localhost:5000"));
})