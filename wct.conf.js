module.exports = {
  suites: ['.test/'],
  plugins: {
    sauce: {
      disabled: true,
      commandTimeout: 600,
      idleTimeout: 300,
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
