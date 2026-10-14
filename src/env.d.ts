/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  /** MapTiler key for the location maps (publishable, origin-restricted). See docs/maps.md. */
  readonly PUBLIC_MAPTILER_KEY?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
