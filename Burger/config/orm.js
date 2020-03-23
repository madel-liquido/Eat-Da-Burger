var connection = require("../config/connection");

function createQmarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function translateSql(ob) {
    var arr = [];
    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    selectAll: (table, cb) => {
        var dbQuery = "SELECT * FROM " + table + ";";

        connection.query(dbQuery, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    insertOne: (table, cols, vals, cb) => {
        var dbQuery =
            "INSERT INTO " +
            table +
            " (" +
            cols.toString() +
            ") " +
            "VALUES (" +
            createQmarks(vals.length) +
            ") ";

        console.log(dbQuery);
        connection.query(dbQuery, vals, (err, res) => {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    updateOne: (table, objColVals, condition, cb) => {
        var dbQuery =
            "UPDATE " +
            table +
            " SET " +
            translateSql(objColVals) +
            " WHERE " +
            condition;

        console.log(dbQuery);

        connection.query(dbQuery, (err, res) => {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    deleteOne: (table, condition, cb) => {
        var dbQuery = "DELETE FROM " + table + " WHERE " + condition;
        console.log(dbQuery);

        connection.query(dbQuery, (err, res) => {
            if (err) {
                throw err;
            }
            cb(res);
        });
    }
};
module.exports = orm;