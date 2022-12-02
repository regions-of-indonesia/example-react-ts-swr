import { SWRConfig } from "swr";

import { Layout } from "./layouts";

import Demo from "./Demo";

function App() {
  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
      }}
    >
      <Layout title="Regions of Indonesia" subtitle="React SWR Typescript">
        <Demo />
      </Layout>
    </SWRConfig>
  );
}

export default App;
