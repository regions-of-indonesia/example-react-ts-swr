import { persistentMap } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";

type ThemeMode = "light" | "dark";

type ThemeStoreState = {
  mode: ThemeMode;
};

const ThemeStore = persistentMap<ThemeStoreState>("regions-of-indonesia:example-react-ts:theme", { mode: "light" });

function useThemeStore() {
  return useStore(ThemeStore);
}

function toggleThemeMode() {
  ThemeStore.setKey("mode", ThemeStore.get().mode === "light" ? "dark" : "light");
}

function subscribe() {
  document.documentElement.dataset.mode = ThemeStore.get().mode;

  return ThemeStore.subscribe(({ mode }) => {
    document.documentElement.dataset.mode = mode;
  });
}

export { useThemeStore };
export { toggleThemeMode };
export { subscribe };
export default ThemeStore;
