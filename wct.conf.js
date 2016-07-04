module.exports = {
  plugins: {
    sauce: {
      disabled: true,
      browsers: [
        'mac/chrome',
        'mac/firefox',
        'mac/safari',
        'any/iPhone',
        'android/chrome',
        'windows 10/internet explorer',
        'windows 10/MicrosoftEdge',
      ]
    }
  }
};
