
import Vue from 'vue'

const requireComponent = require.context(
  '@/components/UI',
  false,
  /[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach((fileName: string) => {
  const componentConfig = requireComponent(fileName)

  const componentName = 'UI' + fileName.replace(/^\.\/(.*)\.\w+$/, '$1')

  Vue.component(componentName, componentConfig.default || componentConfig)
})
