const jwt = require("jsonwebtoken");
const db = require("../db");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const results = await db.query(
        `SELECT userid, name, email, role FROM users WHERE userid = ${decoded.id}`
      );
      req.user = results.rows[0];
      next();
    } catch (error) {
      res.json({ status: 401, message: "Not Authorized to Add User" });
    }
  }
};

module.exports = protect;
