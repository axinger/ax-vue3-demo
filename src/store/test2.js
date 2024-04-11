import {ref} from 'vue'
import {createGlobalState, useLocalStorage} from '@vueuse/core'

// export const useGlobalState = createGlobalState(
//     () => {
//         const count = ref(0)
//         return { count }
//     }
// )

// 这个直接是当前对象
export const useGlobalState = createGlobalState(
    () => useLocalStorage('count2',  {
        count: 0,
        name: 'VueUse',
    })
)
