interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: "test" | "dev" | "prod"
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}