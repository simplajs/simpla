module.exports = {
  suites: ['.test/'],
  plugins: {
    sauce: {
      disabled: true,
      browsers: [
        'mac/chrome',
        'windows/chrome',
        'mac/firefox',
        'windows/firefox',
        'mac/safari',
        'any/iPhone',
        'any/android',
        'windows 10/internet explorer',
        'windows 10/MicrosoftEdge',
      ]
    }
  }
};
