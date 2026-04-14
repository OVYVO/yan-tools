#!/usr/bin/env node
/**
 * 本地模拟 GitHub Pages 的 base / 站点 URL，与 CI 中逻辑一致。
 * 优先级：已有环境变量 VITE_BASE / VITE_SITE_URL > GITHUB_REPOSITORY > git remote origin > package.json name
 */
import { execSync, spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

function resolveGitHubPagesEnv() {
  if (process.env.VITE_BASE && process.env.VITE_SITE_URL) {
    return {
      VITE_BASE: process.env.VITE_BASE,
      VITE_SITE_URL: process.env.VITE_SITE_URL,
    }
  }

  let owner = process.env.GITHUB_OWNER
  let repo = process.env.GITHUB_REPO

  if (process.env.GITHUB_REPOSITORY) {
    const parts = process.env.GITHUB_REPOSITORY.split('/')
    owner = parts[0]
    repo = parts[1]
  } else {
    try {
      const url = execSync('git remote get-url origin', {
        encoding: 'utf8',
        cwd: root,
      }).trim()
      const ssh = url.match(/^git@github\.com:([^/]+)\/([^/.]+?)(?:\.git)?$/i)
      const https = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/.]+?)(?:\.git)?$/i)
      const m = ssh || https
      if (m) {
        owner = m[1]
        repo = m[2]
      }
    } catch {
      // 无 git 或 remote
    }
  }

  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
  if (!owner) owner = process.env.GITHUB_OWNER || 'YOUR_GITHUB_USERNAME'
  if (!repo) repo = pkg.name || 'yan-tools'

  const repoLc = repo.toLowerCase()
  const expectedUserSite = `${owner.toLowerCase()}.github.io`
  const isUserPage = repoLc === expectedUserSite

  const viteBase = isUserPage ? '/' : `/${repo}/`
  const siteUrl = isUserPage
    ? `https://${owner}.github.io`
    : `https://${owner}.github.io/${repo}`.replace(/\/+$/, '')

  return {
    VITE_BASE: process.env.VITE_BASE ?? viteBase,
    VITE_SITE_URL: process.env.VITE_SITE_URL ?? siteUrl,
  }
}

function run(cmd, args, env) {
  const r = spawnSync(cmd, args, {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, ...env },
    shell: false,
  })
  process.exit(r.status ?? 1)
}

const sub = process.argv[2] || 'build'
const pagesEnv = resolveGitHubPagesEnv()

if (process.env.DEBUG_GH_PAGES) {
  console.error('[gh-pages]', pagesEnv)
}

if (sub === 'build') {
  run('pnpm', ['exec', 'vite', 'build'], pagesEnv)
}

if (sub === 'preview') {
  const b = spawnSync('pnpm', ['exec', 'vite', 'build'], {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, ...pagesEnv },
  })
  if (b.status !== 0) process.exit(b.status ?? 1)
  run('pnpm', ['exec', 'vite', 'preview'], pagesEnv)
}

console.error(`用法: node scripts/gh-pages.mjs <build|preview>`)
process.exit(1)
