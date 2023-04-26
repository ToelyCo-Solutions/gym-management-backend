const pool = require("../database.js");

const addTrainee = async (response, body) => {
  const client = await pool.connect();

  try {
    const trainee = JSON.parse(body);

    pool.query(`SELECT * FROM trainee`, (err, res) => {
      if (!err) {
        const getAllDataForId = `trainee${res.rowCount + 1}`;

        const query = `INSERT INTO trainee
        (app_no, name, age, image, blood_group, ph_no, work, fee_status, fee_plan, joining_date, dob)
        VALUES('${getAllDataForId}','${trainee.name}', ARRAY[${trainee.age}], '${trainee.image}',
        '${trainee.blood_group}', '${trainee.ph_no}', '${trainee.work}', '${trainee.fee_status}',
        '${trainee.fee_plan}', ARRAY['${trainee.joining_date}'::DATE], ARRAY['${trainee.dob}'::DATE])`;

        pool.query(query, (err, res) => {
          if (!err) {
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(
              JSON.stringify({ msg: "Trainee added successfully" })
            );
            response.end();
          } else {
            response.writeHead(500, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ msg: "Error executing query" }));
            response.end();
          }
        });
      }
    });
  } catch (err) {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.write(JSON.stringify({ msg: "Not found" }));
    response.end();
  } finally {
    client.release(); // release the connection back to the pool
  }
};

const getAllTrainee = async (response) => {
  const client = await pool.connect();

  try {
    pool.query(`SELECT * FROM trainee`, (err, res) => {
      if (!err) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify({ data: res.rows }));
        response.end();
      } else {
        response.writeHead(500, { "Content-Type": "application/json" });
        response.write(JSON.stringify({ msg: "Error executing query" }));
        response.end();
      }
    });
  } catch (err) {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.write(JSON.stringify({ msg: "Not found" }));
    response.end();
  } finally {
    client.release(); // release the connection back to the pool
  }
};

module.exports = {
  addTrainee,
  getAllTrainee,
};
