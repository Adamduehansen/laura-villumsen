module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets/main.js');

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
  };
};
