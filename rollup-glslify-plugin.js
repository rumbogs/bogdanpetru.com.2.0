import { createFilter } from '@rollup/pluginutils'; // eslint-disable-line import/no-extraneous-dependencies
import { dirname } from 'path';
import tokenize from 'glsl-tokenizer'; // eslint-disable-line import/no-extraneous-dependencies
import string from 'glsl-token-string'; // eslint-disable-line import/no-extraneous-dependencies
import trim from 'glsl-token-whitespace-trim'; // eslint-disable-line import/no-extraneous-dependencies
import glsl from 'glslify'; // eslint-disable-line import/no-extraneous-dependencies

export default function glslify() {
  const filter = createFilter(['**/*.glsl'], []);

  return {
    name: 'glslify',
    transform(code, id) {
      if (!filter(id)) return;

      const generatedCode = glsl.compile(code, { basedir: dirname(id), transform: ['glslify-import'] });
      const tokens = tokenize(generatedCode);
      trim(tokens, true);
      const trimmed = string(tokens);

      return { // eslint-disable-line consistent-return
        code: `export default ${JSON.stringify(trimmed)};`,
        map: { mappings: '' },
      };
    },
  };
}
