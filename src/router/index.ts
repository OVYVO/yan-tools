import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/HomePage.vue'),
          meta: {
            title: '首页',
            description: '个人前端工具站：数据格式、编码、文本、CSS 等纯浏览器端小工具。',
          },
        },
        {
          path: 'category/:category',
          name: 'category',
          component: () => import('@/pages/CategoryPage.vue'),
          meta: { title: '分类' },
        },
        {
          path: 'tools/:slug',
          name: 'tool',
          component: () => import('@/pages/ToolPage.vue'),
          meta: { title: '工具' },
        },
        {
          path: 'search',
          name: 'search',
          component: () => import('@/pages/SearchPage.vue'),
          meta: {
            title: '搜索',
            description: '在本地索引中搜索工具名称、标签与简介。',
          },
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/pages/AboutPage.vue'),
          meta: {
            title: '关于',
            description: '关于个人前端工具站与使用说明。',
          },
        },
        {
          path: 'changelog',
          name: 'changelog',
          component: () => import('@/pages/ChangelogPage.vue'),
          meta: {
            title: '更新日志',
            description: '站点与工具的更新记录。',
          },
        },
        {
          path: 'privacy',
          name: 'privacy',
          component: () => import('@/pages/PrivacyPage.vue'),
          meta: {
            title: '隐私说明',
            description: '本地数据处理与隐私说明。',
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFoundPage.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
