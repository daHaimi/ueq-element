import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from "@rollup/plugin-json";
import litSass from "@ponday/rollup-plugin-lit-sass";

export default [
  {
    input: './src/ueq-element.webcomponent.ts',
    output: {
      file: './lib/ueq-element.esm.js',
      format: 'esm',
    },
    inlineDynamicImports: true,
    plugins: [
      nodeResolve(),
      json(),
      typescript(),
      litSass()
    ],
  },
]
