import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '@/App.vue'
import { homeRoutes } from '@/features/home'

describe('Home navigation', () => {
  it('returns to an empty Home page while keeping the navigation visible', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        ...homeRoutes,
        { path: '/other', component: { template: '<main>Another page</main>' } },
      ],
    })
    await router.push('/other')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })

    try {
      expect(wrapper.get('main').text()).toBe('Another page')

      const navigation = wrapper.get('nav[aria-label="Main navigation"]')
      expect(navigation.findAll('a')).toHaveLength(1)
      const homeLink = navigation.get('a')
      expect(homeLink.text()).toBe('Home')
      await homeLink.trigger('click')
      await flushPromises()

      expect(router.currentRoute.value.name).toBe('home')
      expect(wrapper.get('main').attributes('aria-label')).toBe('Home')
      expect(wrapper.get('main').element.childElementCount).toBe(0)
      expect(wrapper.get('main').text()).toBe('')
      expect(wrapper.get('nav a').attributes('aria-current')).toBe('page')
    } finally {
      wrapper.unmount()
    }
  })
})
