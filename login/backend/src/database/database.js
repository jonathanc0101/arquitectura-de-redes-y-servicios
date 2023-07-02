import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    process.env.DATABASE_URL || "postgres://postgres:postgres@db/postgresloginjc"
);
