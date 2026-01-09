import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/string.ts', 'src/number.ts', 'src/array.ts', 'src/object.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
});
