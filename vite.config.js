import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    base: './',
    server: {
        port: 3000,
        proxy: {
            '/images': {
                target: 'http://192.168.1.67:9000',
                changeOrigin: true,
            },
            '/api': {
                target: 'http://192.168.1.67:8000',
                changeOrigin: true,
                configure: function (proxy, _options) {
                    proxy.on('error', function (err, _req, _res) {
                        console.log('proxy error', err);
                    });
                    proxy.on('proxyRes', function (proxyRes, req, _res) {
                        console.log('Received Response from Target:', proxyRes.statusCode, req.url);
                    });
                },
            },
        },
    },
});
