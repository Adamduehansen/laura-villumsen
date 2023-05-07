module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets/main.js');
  eleventyConfig.addPassthroughCopy('src/assets/add-icon.svg');

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
  };
};
