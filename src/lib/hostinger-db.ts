import "server-only";

import mysql, { type Pool } from "mysql2/promise";

const globalForMySql = globalThis as typeof globalThis & {
  skySkrabersMySqlPool?: Pool;
};

const requiredEnvironmentValue = (name: string) => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing database configuration: ${name}`);
  return value;
};

function createPool() {
  const portValue = requiredEnvironmentValue("HOSTINGER_DB_PORT");
  const port = Number(portValue);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("Invalid database configuration: HOSTINGER_DB_PORT");
  }

  const sslMode = requiredEnvironmentValue("HOSTINGER_DB_SSL_MODE").toLowerCase();
  if (sslMode !== "required" && sslMode !== "disabled") {
    throw new Error("Invalid database configuration: HOSTINGER_DB_SSL_MODE");
  }

  const sslCa = process.env.HOSTINGER_DB_SSL_CA?.replace(/\\n/g, "\n").trim();

  return mysql.createPool({
    host: requiredEnvironmentValue("HOSTINGER_DB_HOST"),
    port,
    database: requiredEnvironmentValue("HOSTINGER_DB_NAME"),
    user: requiredEnvironmentValue("HOSTINGER_DB_USER"),
    password: requiredEnvironmentValue("HOSTINGER_DB_PASSWORD"),
    ssl: sslMode === "required"
      ? {
          ca: sslCa || undefined,
          minVersion: "TLSv1.2",
          rejectUnauthorized: true,
        }
      : undefined,
    waitForConnections: true,
    connectionLimit: 3,
    maxIdle: 3,
    idleTimeout: 60_000,
    queueLimit: 20,
    connectTimeout: 10_000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    supportBigNumbers: true,
    bigNumberStrings: true,
  });
}

export function getHostingerDbPool() {
  if (!globalForMySql.skySkrabersMySqlPool) {
    globalForMySql.skySkrabersMySqlPool = createPool();
  }

  return globalForMySql.skySkrabersMySqlPool;
}
