import { esbuildPlugin } from '@web/dev-server-esbuild';
import { sassPlugin } from "esbuild-sass-plugin";

export default {
    nodeResolve: true,
    plugins: [
        esbuildPlugin({
            ts: true,
            target: 'esnext',
        }),
        sassPlugin({
            type: 'lit-css',
        })
    ],
};
