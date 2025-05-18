<template>

  <div>内容: {{ dataText }}</div>


</template>


<script setup>

import {onMounted, ref} from 'vue'


let dataText = ref("");

onMounted(() => {
  test1()
})

function test1() {
  let socket;
  if (window.WebSocket) {
    let userId = 'abc123'
    let platform = 'mac'
    // const url = 'ws://192.168.31.152:12002' + `/zhongche/plc/ws/${userId}?platform=${platform}`;
    const url = 'ws://192.168.31.152:8080/jeecg-boot' + `/zhongche/dt/ws/${userId}`;

    socket = new WebSocket(url);


    socket.onmessage = (event) => {

      // 确保你正确地读取了message事件的数据部分

      console.log('收到服务器消息:', event.data);
      dataText.value = event.data

    };

    socket.onopen = (msg) => {
      console.log('WebSocket 链接成功..............');
    };
    socket.onclose = (msg) => {
      console.error('WebSocket 断了,正在重新链接..........');
    };
  } else {
    alert('您的浏览器不支持WebSocket协议！');
  }
}


</script>
<style scoped>

</style>
