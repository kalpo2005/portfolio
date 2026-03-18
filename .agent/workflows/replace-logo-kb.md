---
description: Replace KB text logo with SVG image logo
---
This workflow guides you through replacing the text-based "KB" logo with an SVG file, then verifying the changes in the live DOM.

1. Locate the new logo file
   - Ensure you have the `logo.svg` (or your specific `.svg` file) placed correctly in the `image/` directory (e.g., `image/logo.svg`).

2. Find and replace all instances of the "KB" space logo
   - Locate the HTML element containing the text logo. It's usually within the `<nav>` or `<header>` section, looking like `<a href="#" class="logo">KB</a>` or similar.
   - Replace the text "KB" with an `<img>` tag pointing to the SVG:
     ```html
     <a href="#" class="logo">
       <img src="./image/logo.svg" alt="Logo" class="nav-logo" />
     </a>
     ```
   - Update any CSS specific to the new `.nav-logo` class to ensure it correctly sizes and aligns the image (e.g., setting `height` or `width`). Let's ensure no text-specific CSS (like `font-size` or `letter-spacing` meant for "KB") interferes.

3. Start the development server
// turbo
   `npm run dev` or open the HTML file to run the local server.

4. Check the Live DOM
   - Open your browser's Developer Tools (F12 or Ctrl+Shift+I).
   - Inspect the navbar element where the logo should be.
   - Verify the `<img>` tag is correctly rendered in the DOM and the `src` attribute correctly points to the existing SVG file.
   - Ensure there are no 404 errors in the Network or Console tabs regarding the logo file.

5. Check Twice (Visual & Responsive QA)
   - Do a visual check on Desktop view: Is the logo positioned correctly?
   - Do a visual check on Mobile view: Try resizing the screen to ensure the logo scales properly and doesn't overlap with the hamburger menu.
   - Check the dark/light mode if applicable: Ensure the SVG has appropriate contrast.
