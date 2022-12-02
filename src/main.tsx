import { createRoot } from "react-dom/client";

import "~/main.css";

import App from "~/App";

import { subscribe } from "~/store/theme";

subscribe();

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
