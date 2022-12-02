import { RegionsOfIndonesiaClient, log, delay, cache } from "@regions-of-indonesia/client";
import { createLocalForageDriver } from "@regions-of-indonesia/localforage";

const client = new RegionsOfIndonesiaClient({
  baseURL: {
    dynamic: "https://regions-of-indonesia.deta.dev",
    static: "https://regions-of-indonesia.github.io/static-api",
  },
  middlewares: [
    log(),
    delay({
      ms: 1000,
    }),
    cache({
      driver: createLocalForageDriver(),
    }),
  ],
  static: true,
});

export default client;
