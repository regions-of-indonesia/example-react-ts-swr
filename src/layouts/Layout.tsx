import { memo } from "react";
import type { PropsWithChildren } from "react";

import { Github, Moon, Sun } from "~/components/icons";

import { toggleThemeMode, useThemeStore } from "~/store/theme";

type RootProps = PropsWithChildren;

function Root(props: RootProps) {
  return <div className="container mx-auto max-w-screen-xl">{props.children}</div>;
}

type HeaderProps = { title: string; subtitle: string };

function Header(props: HeaderProps) {
  const { title, subtitle } = props;

  const theme = useThemeStore();

  return (
    <div className="px-4 py-4 md:py-6 xl:py-8">
      <h1 className="block text-4xl md:text-5xl xl:text-6xl my-4 text-neutral-900 dark:text-neutral-50 font-bold text-center select-none transition-colors">
        {title}
      </h1>
      <h2 className="block text-xl md:text-2xl xl:text-3xl my-4 text-neutral-900 dark:text-neutral-50 font-medium text-center select-none transition-colors">
        {subtitle}
      </h2>
      <div className="flex justify-center items-center gap-3 my-1 p-3">
        <button
          type="button"
          title="theme mode"
          className="block border border-transparent rounded-full p-1 text-neutral-900 dark:text-neutral-50 focus-visible:border-neutral-500 dark:focus-visible:border-neutral-400 outline-none select-none transition-colors"
          onClick={toggleThemeMode}
        >
          {theme.mode === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <a
          href="https://github.com/regions-of-indonesia"
          title="github"
          className="block border border-transparent rounded-full p-1 text-neutral-900 dark:text-neutral-50 focus-visible:border-neutral-500 dark:focus-visible:border-neutral-400 outline-none select-none transition-colors"
          rel="noreferrer noopener"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

type MainProps = PropsWithChildren;

function Main(props: MainProps) {
  return <div className="px-4 py-4 md:py-6 xl:py-8">{props.children}</div>;
}

function Footer() {
  return (
    <div className="px-4 py-4 md:py-6 xl:py-8">
      <div className="flex justify-center items-center">
        <a
          href="https://regions-of-indonesia.netlify.app"
          className="text-neutral-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 select-none"
        >
          Regions of Indonesia
        </a>
      </div>
    </div>
  );
}

type LayoutProps = PropsWithChildren<{
  title: string;
  subtitle: string;
}>;

const Layout = memo((props: LayoutProps) => {
  const { title, subtitle } = props;
  return (
    <Root>
      <Header title={title} subtitle={subtitle} />
      <Main>{props.children}</Main>
      <Footer />
    </Root>
  );
});

export default Layout;
