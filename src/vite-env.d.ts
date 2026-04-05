declare const __API_URL__: string;

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: "test" | "dev" | "prod";
  readonly VITE_SEARCH_ENDPOINT: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
