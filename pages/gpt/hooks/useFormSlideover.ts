import type { GPTUser } from '~/types'

export function useFormSlideover() {
  const isOpen = ref(false)
  const formData = ref<GPTUser | null>(null)

  function setFormData(params: GPTUser | null) {
    formData.value = params
  }
  function open(params: GPTUser) {
    isOpen.value = true
    setFormData(params)
  }

  function close() {
    isOpen.value = false
  }

  return {
    formData,
    open,
    setFormData,
    isOpen,
    close,
  }
}
