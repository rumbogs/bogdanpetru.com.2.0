import multi from '@rollup/plugin-multi-entry';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

import glslify from './rollup-glslify-plugin';

export default {
  input: ['scripts/*.js', 'scripts/shaders/**/*.glsl'],
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  plugins: [
    multi(),
    resolve({ browser: true, preferBuiltins: true }),
    babel({
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3 }]],
    }),
    glslify(),
  ],
};
