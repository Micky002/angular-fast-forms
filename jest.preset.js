const nxPreset = require('@nrwl/jest/preset').default;

if (process.env.CI) {
  nxPreset.reporters = [
    [
      'jest-junit',
      {
        outputDirectory: './reports/test',
        outputName: 'test-report',
        uniqueOutputName: 'true',
        suiteName: 'Jest tests',
        classNameTemplate: '{classname} / {title}',
        titleTemplate: '{classname} / {title}',
        ancestorSeparator: ' / ',
        usePathForSuiteName: 'true',
      }
    ]
  ]
}

module.exports = {
  ...nxPreset
};
