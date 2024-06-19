import type { GPTUser } from '~/types/api'

export function useFormSlideover() {
  const isOpen = ref(false)
  const formData = ref<GPTUser>({})

  function setFormData(params: GPTUser) {
    formData.value = params
  }

  function close() {
    isOpen.value = false
  }

  return {
    formData,
    setFormData,
    isOpen,
    close,
  }
}
