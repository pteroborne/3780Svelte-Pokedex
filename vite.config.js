import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			// Add the `/static` directory to the Vite serve allow list
			allow: ['..']
		}
	}
});
