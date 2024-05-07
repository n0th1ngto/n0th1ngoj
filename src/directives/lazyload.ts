import type { DirectiveBinding } from 'vue'

const lazyLoad = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const options = {
      rootMargin: '100px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.setAttribute('src', binding.value)
          observer.unobserve(el)
        }
      })
    }, options)
    observer.observe(el)
  }
}

export default lazyLoad
