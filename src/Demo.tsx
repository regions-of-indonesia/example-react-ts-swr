import { useCallback, useEffect, useMemo, useState } from "react";

import type { CodeName } from "@regions-of-indonesia/client";

import { Select } from "./components/core";
import type { SelectItem, SelectValue } from "./components/core";

import { useProvinces, useDistricts, useSubdistricts, useVillages } from "~/libs/regions-of-indonesia/hooks";

function codeNameToSelectItemMapFn({ code, name }: CodeName): SelectItem {
  return { label: name, value: code };
}
function codeNamesToSelectItems(arr?: CodeName[]) {
  return Array.isArray(arr) ? arr.map(codeNameToSelectItemMapFn) : [];
}

function Demo() {
  const [provinceCode, setProvinceCode] = useState<SelectValue | null>(null);
  const handleProvinceCodeChange = useCallback((details: SelectValue | null) => {
    setProvinceCode(details);
  }, []);

  const [districtCode, setDistrictCode] = useState<SelectValue | null>(null);
  const handleDistrictCodeChange = useCallback((details: SelectValue | null) => {
    setDistrictCode(details);
  }, []);

  const [subdistrictCode, setSubdistrictCode] = useState<SelectValue | null>(null);
  const handleSubdistrictCodeChange = useCallback((details: SelectValue | null) => {
    setSubdistrictCode(details);
  }, []);

  const [villageCode, setVillageCode] = useState<SelectValue | null>(null);
  const handleVillageCodeChange = useCallback((details: SelectValue | null) => {
    setVillageCode(details);
  }, []);

  useEffect(() => {
    setDistrictCode(null);
  }, [provinceCode]);
  useEffect(() => {
    setSubdistrictCode(null);
  }, [districtCode]);
  useEffect(() => {
    setVillageCode(null);
  }, [subdistrictCode]);

  const { data: provinces, isValidating: loadingProvinces } = useProvinces();
  const { data: districts, isValidating: loadingDistricts } = useDistricts(provinceCode?.value);
  const { data: subdistricts, isValidating: loadingSubdistricts } = useSubdistricts(districtCode?.value);
  const { data: villages, isValidating: loadingVillages } = useVillages(subdistrictCode?.value);

  const provincesData = useMemo(() => codeNamesToSelectItems(provinces), [provinces]);
  const districtsData = useMemo(() => codeNamesToSelectItems(districts), [districts]);
  const subdistrictsData = useMemo(() => codeNamesToSelectItems(subdistricts), [subdistricts]);
  const villagesData = useMemo(() => codeNamesToSelectItems(villages), [villages]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-2 md:p-3 xl:p-4">
      <div>
        <Select
          label="Province"
          placeholder="Select province"
          data={provincesData}
          value={provinceCode}
          onChange={handleProvinceCodeChange}
          disabled={false}
          loading={loadingProvinces}
          empty={provincesData.length === 0}
        />
      </div>

      <div>
        <Select
          label="District"
          placeholder="Select district"
          data={districtsData}
          value={districtCode}
          onChange={handleDistrictCodeChange}
          disabled={provinceCode === null}
          loading={loadingDistricts}
          empty={districtsData.length === 0}
        />
      </div>

      <div>
        <Select
          label="Subdistrict"
          placeholder="Select subdistrict"
          data={subdistrictsData}
          value={subdistrictCode}
          onChange={handleSubdistrictCodeChange}
          disabled={districtCode === null}
          loading={loadingSubdistricts}
          empty={subdistrictsData.length === 0}
        />
      </div>

      <div>
        <Select
          label="Village"
          placeholder="Select village"
          data={villagesData}
          value={villageCode}
          onChange={handleVillageCodeChange}
          disabled={subdistrictCode === null}
          loading={loadingVillages}
          empty={villagesData.length === 0}
        />
      </div>
    </div>
  );
}

export default Demo;
