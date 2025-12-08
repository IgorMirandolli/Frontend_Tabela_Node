import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])

    function addItem(item) {
        items.value.push(item)
    }

    function clearCart() {
        items.value = []
    }

    return {
        items,
        addItem,
        clearCart
    }
})
