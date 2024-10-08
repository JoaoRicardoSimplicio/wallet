module.exports = {
  development: {
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    username: "wallet-development",
    password: "123456",
    database: "wallet-development"
  },
  test: {
  },
  production: {
  },
  local: {
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    username: "wallet-local",
    password: "123456",
    database: "wallet-local"
  }
};
