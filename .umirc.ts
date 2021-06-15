import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
    routes,
    hash: true,
    ignoreMomentLocale: true,
    nodeModulesTransform: {
        type: 'none',
    },
    dva: {
        immer: true,
    },
    // ssr: {},
    exportStatic: {},
    dynamicImport: {},
});
