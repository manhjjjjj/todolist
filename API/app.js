const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./utils/database");
const bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

app.get("/api/v1/todos", (req, res) => {
    db.execute("SELECT * FROM tbl_todo")
        .then((data) => {
            let [rows] = data;
            res.json({
                message: "success",
                data: rows,
            })
        })

});


app.get("/api/v1/todos/:id", (req, res) => {
    let { id } = req.params;
    db.execute("SELECT * FROM tbl_todo WHERE id = ?", [id])
        .then((data) => {
            let [rows] = data;
            res.json({
                message: "success",
                data: rows,
            })
        })
        .catch((err) => {
            res.status(500).json({
                status:"fail",
                message: err,
            })
        })

});


// CREATE ONE
app.post("/api/v1/todos/:id", (req, res) => {
    let id = Math.floor(Math.random()*1000000)
    let {title, completed}= req.body;
    db.execute("INSERT INTO tbl_todo VALUES (?,?,?)", [id, title, completed])
        .then((data) => {
            // let [rows] = data;
            console.log(data);
            res.json({
                status: "success",
                message:"create one successfully",
            })
        })
        .catch((err) => {
            res.status(500).json({
                status:"fail",
                message: err,
            })
        })
    });

    // UPDATE 
    app.put("/api/v1/todos/:id", (req, res) => {
        let {id} = req.params;
        let {completed}= req.body;
        db.execute("UPDATE tbl_todo SET completed=? WHERE id=?", [ completed,id ])
            .then((data) => {
                // let [rows] = data;
                console.log(data);
                res.json({
                    status: "success",
                    message:"UPDATE one successfully",
                })
            })
            .catch((err) => {
                res.status(500).json({
                    status:"fail",
                    message: err,
                })
            })
    
    });


    // DELETE 
    app.delete("/api/v1/todos/:id", (req, res) => {    
        let {id} = req.params;
        db.execute("DELETE FROM tbl_todo WHERE id=?", [ id ])
            .then((data) => {
                // let [rows] = data;
                console.log(data);
                res.json({
                    status: "success",
                    message:"DELETE one successfully",
                })
            })
            .catch((err) => {
                res.status(500).json({
                    status:"fail",
                    message: err,
                })
            })
    
    });

app.listen(5000, () => {
    console.log(("server is running on htttp://localhost:5000"));
})