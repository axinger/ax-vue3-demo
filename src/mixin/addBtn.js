import { ref } from "vue";
export default function(){
    let num = ref(1)
    let addNum = ()=>{
        num.value++
    }
    return {
        num,
        addNum
    }
}
