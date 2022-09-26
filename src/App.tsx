import { useEffect, useState } from "react";

import { Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

import AppProvider from "~/AppProvider";

import { useProvinces, useDistricts, useSubdistricts, useVillages } from "~/hooks";

function MainApp() {
  const [provinceCode, setProvinceCode] = useState<string>("");
  const handleProvinceCodeChange = (event: SelectChangeEvent) => {
    setProvinceCode(event.target.value as string);
  };

  const [districtCode, setDistrictCode] = useState<string>("");
  const handleDistrictCodeChange = (event: SelectChangeEvent) => {
    setDistrictCode(event.target.value as string);
  };
  useEffect(() => {
    setDistrictCode("");
  }, [provinceCode]);

  const [subdistrictCode, setSubdistrictCode] = useState<string>("");
  const handleSubdistrictCodeChange = (event: SelectChangeEvent) => {
    setSubdistrictCode(event.target.value as string);
  };
  useEffect(() => {
    setSubdistrictCode("");
  }, [districtCode]);

  const [villageCode, setVillageCode] = useState<string>("");
  const handleVillageCodeChange = (event: SelectChangeEvent) => {
    setVillageCode(event.target.value as string);
  };
  useEffect(() => {
    setVillageCode("");
  }, [subdistrictCode]);

  const { data: provinces } = useProvinces();
  const { data: districts } = useDistricts(provinceCode);
  const { data: subdistricts } = useSubdistricts(districtCode);
  const { data: villages } = useVillages(subdistrictCode);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" my={4}>
        React TS SWR x Regions of Indonesia
      </Typography>

      <Grid container spacing={2} my={4}>
        <Grid item xs={12} md={6} xl={3}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="provinces-label">Province</InputLabel>
            <Select
              labelId="provinces-label"
              id="provinces-input"
              value={provinceCode}
              label="Province"
              onChange={handleProvinceCodeChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {(provinces || []).map((province) => (
                <MenuItem key={province.code} value={province.code}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} xl={3}>
          <FormControl variant="standard" disabled={provinceCode === ""} fullWidth>
            <InputLabel id="districts-label">District</InputLabel>
            <Select
              labelId="districts-label"
              id="districts-input"
              value={districtCode}
              label="District"
              onChange={handleDistrictCodeChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {(districts || []).map((district) => (
                <MenuItem key={district.code} value={district.code}>
                  {district.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} xl={3}>
          <FormControl variant="standard" disabled={districtCode === ""} fullWidth>
            <InputLabel id="subdistricts-label">Subdistrict</InputLabel>
            <Select
              labelId="subdistricts-label"
              id="subdistricts-input"
              value={subdistrictCode}
              label="Subdistrict"
              onChange={handleSubdistrictCodeChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {(subdistricts || []).map((subdistrict) => (
                <MenuItem key={subdistrict.code} value={subdistrict.code}>
                  {subdistrict.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} xl={3}>
          <FormControl variant="standard" disabled={subdistrictCode === ""} fullWidth>
            <InputLabel id="villages-label">Village</InputLabel>
            <Select labelId="villages-label" id="villages-input" value={villageCode} label="Village" onChange={handleVillageCodeChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {(villages || []).map((village) => (
                <MenuItem key={village.code} value={village.code}>
                  {village.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
}

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;
