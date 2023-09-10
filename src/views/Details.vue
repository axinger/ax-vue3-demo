<script setup>

const list = [
  {"id": 1, "name": "jim"},
  {"id": 2, "name": "tom"},
]


let info = {
  phone: '138xxxx6666',
  address: '中国北京',
}

let message = 'abc'

let games = ['王者荣耀', '糖豆人', '穿越火线']

</script>


<template>

  <div>
    <header>
      插槽<br>
      <slot name="p1"></slot>
      <br>
    </header>

    <section>
      作用域插槽
      多个作用域插槽,必须指定name
      数据在子组件自身，但是根据数据在父组件中生成的结构需要父组件的使用者来决定；
      <div v-for="item in list " :key="item.id">
        <slot :user="item"></slot>
      </div>


      <slot name="info" :info="info" :msg="message"></slot>

      <!-- 将games数据通过传参的方式传递给App -->
      <slot name="games" :games="games"></slot>

    </section>

    <footer>
      插槽2<br>
      <slot name="p2"></slot>
    </footer>
  </div>
</template>

<style scoped>

</style>
