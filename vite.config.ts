import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import devcert from 'office-addin-dev-certs'

//@ts-ignore
export default defineConfig(async ({ command, mode, isSsrBuild, isPreview }) => {
	return {
		server: mode!=="production"  && {
			//port: process.env?.VITE_PORT,
			https: await devcert.getHttpsServerOptions(),
		},
		plugins: [sveltekit()]
	};
});
