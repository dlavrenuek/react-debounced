import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    external: ['ms'],
    plugins: [
      typescript(),
    ],
    output: [
      {
        dir: 'dist',
        format: 'es',
        sourcemap: true,
      },
    ],
  },
];
