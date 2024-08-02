const db = require("../database/connect.js");

class Entry {
  constructor(post_id, title, content, user_id) {
    this.post_id = post_id;
    this.title = title;
    this.content = content;
    this.user_id = user_id;
  }

  static async showAll() {
    const posts = await db.query("Select * from post;");

    if (posts.rows.length === 0) throw new Error("No entry found");

    return posts.rows.map((p) => new Entry(p));
  }

  static async showOneById(id) {
    const post = await db.query("Select * from post WHERE post_id = $1", [id]);

    if (post.rows.length === 0) throw new Error("No entry found");

    return new Entry(post.rows);
  }

  static async create(data) {
    const newPost = await db.query(
      "INSERT INTO post (title,content,user_id) VALUES ($1 , $2 , $3 ) RETURNING * ;",
      [data.title, data.content, data.user_id]
    );

    if (newPost.rows.length === 0) throw new Error("Error creating a new post");

    return new Entry(newPost.rows);
  }

  async destroy() {
    const deletedPost = db.query("DELETE FROM post WHERE post_id = $1 ", [
      this.id,
    ]);

    if (deletedPost.rows.length === 0)
      throw new Error("Error creating a new post");

    return new Entry(deletedPost.rows);
  }
}

module.exports = Entry;
