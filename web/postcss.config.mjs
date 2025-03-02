/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // @TODO: try to solve vercel build error
    "@tailwindcss/postcss": {
      optimize: { minify: false }
    }
  }
};

export default config;
