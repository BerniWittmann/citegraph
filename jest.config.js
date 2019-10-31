module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    '!**shims*',
    '!src/plugins/*',
    '!src/main.ts'
  ],
  coverageReporters: ['text-summary']
}
