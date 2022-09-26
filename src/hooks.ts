import { createSWR } from "@regions-of-indonesia/swr";

import client from "./client";

const { useProvinces, useDistricts, useSubdistricts, useVillages } = createSWR(client);

export { useProvinces, useDistricts, useSubdistricts, useVillages };
