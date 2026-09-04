// React twin of Pic.astro for island components (blog grids, related posts).
// Blog covers are authored at 1400×763; pass width/height when a card uses a
// different asset so the browser can reserve the right box.
export default function Pic({ src, alt, width = 1400, height = 763, loading = 'lazy', fetchpriority, className, style, sizes }) {
  const webp = /\.jpe?g$/i.test(src || '') ? src.replace(/\.jpe?g$/i, '.webp') : null;
  return (
    <picture>
      {webp && <source type="image/webp" srcSet={webp} sizes={sizes} />}
      <img src={src} alt={alt} width={width} height={height} loading={loading} decoding="async" {...(fetchpriority ? { fetchpriority } : {})} className={className} style={style} sizes={sizes} />
    </picture>
  );
}
