import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])

    function addItem(item) {
        items.value.push(item)
    }

    function removeFromCart(id) {
        items.value = items.value.filter(item => item.id !== id)
    }

    function clearCart() {
        items.value = []
    }

    return {
        items,
        addItem,
        removeFromCart,
        clearCart
    }
})
