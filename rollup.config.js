import typescript from 'rollup-plugin-typescript2'
import del from 'rollup-plugin-delete'
import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'playground/src/component-lib/index.js',
        format: 'esm',
        banner: '/* eslint-disable */'
      },
      {
        file: 'playground-ts/src/component-lib/index.js',
        format: 'esm',
        banner: '/* eslint-disable */'
      },
      { file: pkg.main, format: 'cjs', sourcemap: true, },
      { file: pkg.module, format: 'esm', sourcemap: true, }
    ],
    plugins: [
      del({ targets: ['dist/*', 'playground/src/component-lib', 'playground-ts/src/component-lib'] }),
      typescript()
    ],
    external: Object.keys(pkg.peerDependencies || {})
  }
]