// import defaultTheme from 'tailwindcss/defaultTheme'

// export default {
//   content: [
//     './components/**/*.{js,vue,ts}',
//     './layouts/**/*.vue',
//     './pages/**/*.vue',
//     './plugins/**/*.{js,ts}',
//     './app.vue',
//     './error.vue',
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
//       },
//     },
//   },
// }

import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
      },
    },
  },
}
