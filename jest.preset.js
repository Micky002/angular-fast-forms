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
      },
    ],
  ];
}

module.exports = {
  ...nxPreset,
  coverageReporters: ['lcov'],
  coveragePathIgnorePatterns: ['.*.mock.ts'],
  /* TODO: Update to latest Jest snapshotFormat
   * By default Nx has kept the older style of Jest Snapshot formats
   * to prevent breaking of any existing tests with snapshots.
   * It's recommend you update to the latest format.
   * You can do this by removing snapshotFormat property
   * and running tests with --update-snapshot flag.
   * Example: "nx affected --targets=test --update-snapshot"
   * More info: https://jestjs.io/docs/upgrading-to-jest29#snapshot-format
   */
  snapshotFormat: { escapeString: true, printBasicPrototype: true },
};
