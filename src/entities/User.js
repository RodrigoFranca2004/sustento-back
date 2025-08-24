class User {
  constructor({ id, name, email }) {
    if (!email.includes("@")) throw new Error("Invalid email");
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

module.exports = User;
