const db = require("../database/connect.js");

class Entry {
  constructor({ post_id, title, content, user_id }) {
    this.post_id = post_id;
    this.title = title;
    this.content = content;
    this.user_id = user_id;
  }

  static async showAll(userId) {
    const posts = await db.query("Select * from post WHERE user_id = $1;", [
      userId,
    ]);

    if (posts.rows.length === 0) throw new Error("No entry found");

    return posts.rows.map((p) => new Entry(p));
  }

  static async showOneById({ post_id, user_id }) {
    const post = await db.query(
      "Select * from post WHERE post_id = $1 AND user_id = $2",
      [post_id, user_id]
    );

    if (post.rows.length === 0) throw new Error("No entry found");

    return new Entry(post.rows[0]);
  }

  static async search({ entries, user_id }) {
    const fields = [];
    const values = [];

    entries.forEach((entry, i, arr) => {
      fields.push(
        `${entry[0]} = $${i + 1}${arr.length - 1 === i ? "" : "AND "}`
      );
      values.push(entry[1]);
    });

    const fieldsQuery = fields.join(" ");

    const query = `Select * from post WHERE ${fieldsQuery} AND user_id = $${
      values.length + 1
    }
    `;

    const posts = await db.query(query, [...values, user_id]);

    return posts.rows.map((p) => new Entry(p));
  }

  static async create(data) {
    const newPost = await db.query(
      "INSERT INTO post (title,content,user_id) VALUES ($1 , $2 , $3 ) RETURNING * ;",
      [data.title, data.content, data.user_id]
    );

    if (newPost.rows.length === 0) throw new Error("Error creating a new post");

    return new Entry(newPost.rows[0]);
  }

  async destroy() {
    const deletedPost = db.query("DELETE FROM post WHERE post_id = $1 ", [
      this.id,
    ]);

    if (deletedPost.rows.length === 0)
      throw new Error("Error creating a new post");

    return new Entry(deletedPost.rows[0]);
  }
}

module.exports = Entry;
