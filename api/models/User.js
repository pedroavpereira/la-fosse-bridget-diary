const db = require("../database/connect");

class User {
  constructor({ user_id, username, password }) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
  }

  static async findByUsername(username) {
    const query = await db.query(
      "SELECT * FROM user_account WHERE username = $1",
      [username]
    );

    if (query.rows.length !== 1) throw new Error("Unable to authenticate");

    return new User(query.rows[0]);
  }

  static async create({ username, password }) {
    if (!username || !password) {
      throw new Error("Please provide all required credentials");
    }

    const query = await db.query(
      "INSERT INTO user_account (username , password ) VALUES ($1 , $2 ) RETURNING *;",
      [username, password]
    );

    console.log(query.rows);
    if (query.rows.length === 0) throw new Error("Unable to create user");

    return new User(query.rows[0]);
  }
}

module.exports = User;
