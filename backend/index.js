import express from "express";
const app = express();
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";
import morgan from "morgan";
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
dotenv.config();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "poc_schema",
  port: "3306",
});
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);
});
app.get("/get-locations", (req, res) => {
  const { from, searchText, sortBy, order } = req.query;
  console.log(req.query);
  let sql = "";
  if (!searchText) {
    sql = `Select * from location order by ${sortBy} ${order} limit 6 offset ${
      from - 1
    } `;
  } else {
    sql = `Select * from location where country like '%${searchText}%' or country_description like '%${searchText}%' or address like '%${searchText}%' or  city like '%${searchText}%' or state like '%${searchText}%' or address2 like '%${searchText}%' or  branch_id like '%${searchText}%' order by ${sortBy} ${order} limit 6 offset ${
      from - 1
    }`;
  }
  db.execute(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});
app.get("/total-locations", (req, res) => {
  const { searchText } = req.query;
  let sql = "";
  if (!searchText) {
    sql = "Select count(*) as len from location";
  } else {
    sql = `Select count(*) as len from location where country like '%${searchText}%' or country_description like '%${searchText}%' or address like '%${searchText}%' or  city like '%${searchText}%' or state like '%${searchText}%' or address2 like '%${searchText}%' or  branch_id like '%${searchText}%'`;
  }

  db.execute(sql, (err, results) => {
    if (err) {
      res.status(500).send("server Error");
    } else {
      res.status(200).send(results);
    }
  });
});

app.post("/restore-all", (req, res) => {
  const restoreAllQuery =
    "INSERT INTO location (branch_id, lat,lon,address,address2,city,state,country,country_description,zip_code,branch_is_closed,date_created,date_updated) SELECT branch_id, lat,lon,address,address2,city,state,country,country_description,zip_code,branch_is_closed,date_created,date_updated from recently_deleted";
  db.execute(restoreAllQuery, (error, response) => {
    if (error) {
      res.send({ status: 500, message: error.message });
    } else {
      const clearRecentlyDeletedQuery = "TRUNCATE TABLE recently_deleted";
      db.execute(
        clearRecentlyDeletedQuery,
        (errorClearing, responseClearing) => {
          if (errorClearing) {
            res.status(500).send("Error Restoring");
          } else {
            res.status(200).send("Restored All");
          }
        }
      );
    }
  });
});
app.delete("/delete-all", (req, res) => {
  const clearDeletedQuery = "TRUNCATE TABLE recently_deleted";
  db.execute(clearDeletedQuery, (err, response) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send("Permanently Deleted");
    }
  });
});

app.post("/add-location", (req, res) => {
  const {
    branch_id,

    address,
    address2,
    city,
    state,
    zip_code,

    country,
    country_description,
  } = req.body;

  const getByBranchId = "Select * from location where branch_id = ?";

  db.execute(getByBranchId, [branch_id], (err, result) => {
    if (err) {
      res.send({ status: 500, message: "Server Error" });
    } else {
      if (result.length == 0) {
        const query =
          "INSERT INTO location (branch_id, lat,lon,address,address2,city,state,country,country_description,zip_code,branch_is_closed,date_created,date_updated) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?)";

        const date = new Date();

        // Extract the year, month, and day
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed, so add 1
        const day = date.getDate().toString().padStart(2, "0");

        // Combine them in YYYY-MM-DD format
        const date_created = `${year}-${month}-${day}`;
        const date_updated = null;
        db.execute(
          query,
          [
            branch_id.trim(),
            85.120945,
            120.56829,
            address.trim(),
            address2 ? address2.trim() : "",
            city.trim(),
            state.trim(),
            country.trim(),
            country_description.trim(),
            zip_code.trim(),
            false,
            date_created,
            date_updated,
          ],
          (err, result) => {
            if (err) {
              res.send({ status: 500, message: err.message });
            } else {
              res.send({ status: 200, message: "Added Successfully" });
            }
          }
        );
      } else {
        res.send({ status: 500, message: "Branch already exists" });
      }
    }
  });
});
app.put("/update-location", (req, res) => {
  console.log("update called");
  const {
    branch_id,
    address,
    address2,
    city,
    state,
    zip_code,
    country,
    country_description,
  } = req.body;
  const sql =
    "update location set branch_is_closed=?, address=?,address2=?, city=?,state=?,zip_code=?,country=?, country_description=?,date_updated=? where branch_id=?";
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const datevalue = date.getDate().toString().padStart(2, "0");
  const updatedDate = `${year}-${month}-${datevalue}`;

  db.execute(
    sql,
    [
      false,
      address,
      address2 || "",
      city,
      state,
      zip_code,
      country,
      country_description,
      updatedDate,
      branch_id,
    ],
    (err, result) => {
      if (err) {
        res.send({ status: 500, message: err.message });
      } else {
        res.send({ status: 200, message: "Updated Successfully" });
      }
    }
  );
});
app.get("/recently-deleted", (req, res) => {
  const getRecentlyDeleted = "SELECT * from recently_deleted";
  db.execute(getRecentlyDeleted, (err, results) => {
    if (err) {
      res.status(500).message(err.message);
    } else {
      res.status(200).send(results);
    }
  });
});
app.post("/handle-restore", (req, res) => {
  const {
    branch_id,
    branch_is_closed,
    address,
    address2,
    city,
    state,
    zip_code,
    lat,
    lon,
    country,
    country_description,
    date_created,
    date_updated,
  } = req.body;
  const checkAlreadyExist = "SELECT * FROM location where branch_id=?";
  db.execute(checkAlreadyExist, [branch_id], (error, responseOfChecking) => {
    if (error) {
      res.status(500).send("Something went wrong");
    } else {
      if (responseOfChecking.length > 0) {
        res.status(500).send(`Already a branch ${branch_id} exists`);
      } else {
        const removeFromRecentlyDeleted =
          "DELETE FROM recently_deleted where branch_id= ?";
        db.execute(
          removeFromRecentlyDeleted,
          [branch_id],
          (errorRemoving, removedResponse) => {
            if (errorRemoving) {
              res.send({ status: 500, message: errorRemoving.message });
            } else {
              const restoreQuery =
                "INSERT INTO location (branch_id, lat,lon,address,address2,city,state,country,country_description,zip_code,branch_is_closed,date_created,date_updated) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?)";
              db.execute(
                restoreQuery,
                [
                  branch_id,
                  lat,
                  lon,
                  address,
                  address2 || null,
                  city,
                  state,
                  country,
                  country_description,
                  zip_code,
                  branch_is_closed,
                  date_created.substring(0, 10),
                  date_updated ? date_updated.substring(0, 10) : null,
                ],
                (errorRestoring, responseRestoring) => {
                  if (errorRestoring) {
                    res.status(500).send("Something went wrong");
                    console.log(errorRestoring.message);
                  } else {
                    res.status(200).send("Restored Successfully");
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});

app.delete("/delete-location/:branch_id", (req, res) => {
  const { branch_id } = req.params;
  const sqlQuery = "Select * from location where branch_id=?";
  db.execute(sqlQuery, [branch_id], (err, deleteData) => {
    if (err) {
      res.send({ status: 500, message: "No such branch exists" });
    } else {
      const deleteQuery = "delete from location where branch_id=?";
      db.execute(deleteQuery, [branch_id], (errDelete, result) => {
        if (errDelete) {
          res.send({ status: 500, message: "Error Deleting" });
        } else {
          const recently_deleted =
            "INSERT INTO recently_deleted (branch_id, lat,lon,address,address2,city,state,country,country_description,zip_code,branch_is_closed,date_created,date_updated) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?)";

          const {
            branch_id: branchId,
            lat,
            lon,
            address,
            address2,
            city,
            state,
            country,
            country_description,
            zip_code,
            branch_is_closed,
            date_created,
            date_updated,
          } = deleteData[0];
          db.execute(
            recently_deleted,
            [
              branchId,
              lat,
              lon,
              address,
              address2 || null,
              city,
              state,
              country,
              country_description,
              zip_code,
              branch_is_closed,
              date_created,
              date_updated || null,
            ],
            (error, results) => {
              if (error) {
                res.status(500).send(error.message);
                console.log(error.message);
              } else {
                res.status(200).send("Moved to recently deleted");
              }
            }
          );
        }
      });
    }
  });
});

app.delete("/deleteFromRecentlyDeleted/:branch_id/:id", (req, res) => {
  const { branch_id, id } = req.params;
  const deleteQuery = "DELETE FROM recently_deleted where branch_id=? and id=?";
  db.execute(deleteQuery, [branch_id, id], (err, response) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send("Completely deleted");
    }
  });
});
app.listen(8000, () => {
  console.log("Hi There!, Node is running on port 8000");
});
