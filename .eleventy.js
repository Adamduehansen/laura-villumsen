module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets/main.js');
  eleventyConfig.addPassthroughCopy('src/assets/add-icon.svg');
  eleventyConfig.addPassthroughCopy('src/assets/arrow_left.png');
  eleventyConfig.addPassthroughCopy('src/assets/arrow_right.png');
  eleventyConfig.addPassthroughCopy('src/robots.txt');

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
  };
};
