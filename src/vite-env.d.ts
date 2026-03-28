/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHER_API_URL?: string;
  readonly VITE_EXPOSE_PORT?: string;
  readonly VITE_DEV_PORT?: string;
  readonly REACT_APP_WEATHER_API_URL?: string;
  readonly REACT_APP_EXPOSE_PORT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
