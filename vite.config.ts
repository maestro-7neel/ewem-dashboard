import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project sites live under /<repository-name>/.
// In local development, Netlify, or a username.github.io root site, use '/'.
const nodeEnv = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {}
const repositoryName = nodeEnv.GITHUB_REPOSITORY?.split('/')[1]
const base = nodeEnv.GITHUB_ACTIONS === 'true' && repositoryName && !repositoryName.endsWith('.github.io')
  ? `/${repositoryName}/`
  : '/'

export default defineConfig({
  base,
  plugins: [react()],
})
