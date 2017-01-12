/**
 * Created by saiful on 1/12/17.
 */
var _ = require("lodash"),
    uuid = require("node-uuid"),
    rooms = require("./data/rooms.json");

module.exports = function (app) {
    app.get("/admin/rooms", function (req, res) {
        res.render('room.jade', {
            title: "Admin Rooms",
            rooms: rooms
        });
    });


//route to /admin/room/add  where add chat room
    app.get("/admin/rooms/add", function (req, res) {
        res.render('add.jade');
    });


//add chatroom to rooms.json
//redirect to /admin/rooms
//bodyParser is used to get POST value
    app.post('/admin/rooms/add', function (req, res) {
        var room = {
            name: req.body.name,
            id: uuid.v4()
        };

        rooms.push(room);

        res.redirect("/admin/rooms");
    });

//delete chat room
//get uuid from url
//redirect to /admin/rooms
    app.get('/admin/rooms/delete/:id', function (req, res) {
        var roomId = req.params.id;
        rooms = rooms.filter(p => p.id != roomId);
        res.redirect("/admin/rooms");

    });

//edit chatroom
    app.get('/admin/rooms/edit/:id', function (req, res) {
        var roomId = req.params.id;
        var room = _.find(rooms,r => r.id === roomId);
        if(!room){
            res.sendStatus(404);
            return;
        }
        res.render("edit.jade",{room});
    });
    app.post('/admin/rooms/edit/:id', function (req, res) {
        var roomId = req.params.id;
        var room = _.find(rooms,r => r.id === roomId);
        if(!room){
            res.sendStatus(404);
            return;
        }
        room.name = req.body.name;
        res.redirect("/admin/rooms");
    });
}