interface Window {
  _env_: {
    ENVIRONMENT: "test" | "dev" | "prod";
    LIBRARY_SEARCH_URL: string;
  }
}

/*
interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: "test" | "dev" | "prod";
  readonly VITE_SEARCH_ENDPOINT: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
*/
