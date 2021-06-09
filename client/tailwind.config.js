module.exports = {
  purge: ['./src/**/*.vue'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

// <!-- Dark mode not enabled -->
// <html>
// <body>
//   <!-- Will be white -->
//   <div class="bg-white dark:bg-black">
//     <!-- ... -->
//   </div>
// </body>
// </html>

// <!-- Dark mode enabled -->
// <html class="dark">
// <body>
//   <!-- Will be black -->
//   <div class="bg-white dark:bg-black">
//     <!-- ... -->
//   </div>
// </body>
// </html>
