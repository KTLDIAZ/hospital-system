export default class Enviroment {
  static get secret () {
    return process.env.JWT_SECRET!
  }

  static get db_connection () {
    return process.env.DB_CONNECTION!
  }
}