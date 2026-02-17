LOGO FILES — How to use
========================

This folder holds the site logos. The app is already set to use them.

  logo.svg  → Header and footer (main horizontal logo)
  icon.svg  → Browser tab favicon (square icon)

BLENDING ON THE PAGE
- The header and footer logo use "dark:invert" in dark mode so a black
  logo appears white and blends with the dark theme.
- On light pages the logo stays dark.

TO REPLACE WITH YOUR OWN LOGOS
1. Put your files here with the same names: logo.svg and icon.svg
   (or use .png — then update lib/logo.ts to point to .png)
2. For best blending: use a logo that is dark (black/dark gray) on
   transparent or light background. It will auto-invert in dark mode.
3. Favicon (icon.svg): square image, e.g. 180x180 or 32x32.

ONE PLACE TO CHANGE PATHS
- All paths are defined in:  lib/logo.ts
- Change LOGO.main or LOGO.icon there if you use different filenames.
