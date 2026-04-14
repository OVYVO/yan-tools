<script setup lang="ts">
/**
 * 全站背景粒子 + 连线动效（Canvas 2D）。
 * 与 .bento-backdrop 同层；pointer-events: none；z-index 0。
 * prefers-reduced-motion: reduce 时不渲染画布。
 */
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    particleCount?: number
    linkDistance?: number
  }>(),
  {
    particleCount: 72,
    linkDistance: 110,
  },
)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const prefersReducedMotion = usePreferredReducedMotion()

type Particle = { x: number; y: number; vx: number; vy: number; bx: number; by: number }

let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let width = 0
let height = 0
let dpr = 1
let rafId = 0
let running = false

const mouse = { x: -1e6, y: -1e6, inside: false }

function isDarkMode(): boolean {
  return document.documentElement.classList.contains('dark')
}

function palette() {
  const dark = isDarkMode()
  return {
    particle: dark ? 'rgba(148,163,184,0.28)' : 'rgba(100,116,139,0.32)',
    line: dark ? 'rgba(148,163,184,0.11)' : 'rgba(100,116,139,0.15)',
    lineAccent: dark ? 'rgba(56,189,248,0.24)' : 'rgba(14,165,233,0.22)',
  }
}

function initParticles() {
  const n = Math.min(
    props.particleCount,
    Math.max(24, Math.floor((width * height) / 18000)),
  )
  particles = []
  for (let i = 0; i < n; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      bx: Math.random() * Math.PI * 2,
      by: Math.random() * Math.PI * 2,
    })
  }
}

function resize() {
  const c = canvasRef.value
  if (!c || !ctx) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = window.innerWidth
  height = window.innerHeight
  c.width = Math.floor(width * dpr)
  c.height = Math.floor(height * dpr)
  c.style.width = `${width}px`
  c.style.height = `${height}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  initParticles()
}

function tick() {
  if (!ctx || !running) return
  const { particle, line, lineAccent } = palette()
  const linkDist = props.linkDistance
  const linkDistSq = linkDist * linkDist
  const mouseR = 140
  const mouseRSq = mouseR * mouseR

  ctx.clearRect(0, 0, width, height)

  for (const p of particles) {
    p.bx += 0.0022 + Math.sin(p.by) * 0.0004
    p.by += 0.0019
    p.vx += Math.sin(p.bx) * 0.008
    p.vy += Math.cos(p.by) * 0.008
    p.vx *= 0.985
    p.vy *= 0.985

    if (mouse.inside) {
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dsq = dx * dx + dy * dy
      if (dsq < mouseRSq && dsq > 1) {
        const d = Math.sqrt(dsq)
        const f = ((mouseR - d) / mouseR) * 0.45
        p.vx += (dx / d) * f
        p.vy += (dy / d) * f
      }
    }

    p.x += p.vx
    p.y += p.vy
    if (p.x < 0 || p.x > width) {
      p.x = Math.max(0, Math.min(width, p.x))
      p.vx *= -0.6
    }
    if (p.y < 0 || p.y > height) {
      p.y = Math.max(0, Math.min(height, p.y))
      p.vy *= -0.6
    }
  }

  function midNearMouse(ax: number, ay: number, bx: number, by: number): boolean {
    if (!mouse.inside) return false
    const mx = (ax + bx) / 2 - mouse.x
    const my = (ay + by) / 2 - mouse.y
    return mx * mx + my * my < mouseRSq * 0.65
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i]
      const b = particles[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const dsq = dx * dx + dy * dy
      if (dsq > linkDistSq) continue
      const d = Math.sqrt(dsq)
      const t = 1 - d / linkDist
      let alpha = t * t * 0.85
      if (midNearMouse(a.x, a.y, b.x, b.y)) alpha += 0.35 * (1 - d / linkDist)
      const near = midNearMouse(a.x, a.y, b.x, b.y)
      ctx.strokeStyle = near ? lineAccent : line
      ctx.globalAlpha = Math.min(0.55, alpha * 0.42)
      ctx.lineWidth = near ? 1.05 : 0.75
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
      ctx.globalAlpha = 1
    }
  }

  for (const p of particles) {
    ctx.fillStyle = particle
    ctx.globalAlpha = 0.9
    ctx.beginPath()
    ctx.arc(p.x, p.y, 1.35, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
  }

  rafId = requestAnimationFrame(tick)
}

let onMove: (e: MouseEvent) => void
let onDocLeave: () => void
let onResize: () => void
let onVisibility: () => void

function start() {
  if (running || !canvasRef.value || prefersReducedMotion.value) return
  ctx = canvasRef.value.getContext('2d', { alpha: true })
  if (!ctx) return
  resize()
  running = true
  onMove = (e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    mouse.inside = true
  }
  onDocLeave = () => {
    mouse.inside = false
  }
  onResize = () => {
    resize()
  }
  onVisibility = () => {
    if (document.visibilityState === 'hidden') {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = 0
    } else if (running && !rafId) {
      rafId = requestAnimationFrame(tick)
    }
  }
  window.addEventListener('mousemove', onMove, { passive: true })
  document.documentElement.addEventListener('mouseleave', onDocLeave)
  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVisibility)
  rafId = requestAnimationFrame(tick)
}

function stop() {
  running = false
  if (rafId) cancelAnimationFrame(rafId)
  rafId = 0
  if (onMove) window.removeEventListener('mousemove', onMove)
  if (onDocLeave) document.documentElement.removeEventListener('mouseleave', onDocLeave)
  if (onResize) window.removeEventListener('resize', onResize)
  if (onVisibility) document.removeEventListener('visibilitychange', onVisibility)
  ctx = null
}

onMounted(() => {
  if (!prefersReducedMotion.value) start()
})

onUnmounted(() => {
  stop()
})

watch(prefersReducedMotion, (reduced) => {
  if (reduced) stop()
  else start()
})

watch(
  () => [props.particleCount, props.linkDistance],
  () => {
    if (running && ctx) resize()
  },
)
</script>

<template>
  <canvas
    v-if="!prefersReducedMotion"
    ref="canvasRef"
    class="pointer-events-none fixed inset-0 z-0 h-full w-full"
    aria-hidden="true"
  />
</template>
