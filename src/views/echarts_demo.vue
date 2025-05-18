<template>

  <div>

    <div id="chart" style="height: 800px;width: 1000px;"/>
  </div>


</template>

<script setup>
import {onMounted} from "vue";
import * as echarts from 'echarts'


onMounted(() => {

  /*右侧图表数据*/
  let nodesM = [
    {
      name: '服务器',
      img: 'fwq.jpg',
      state: '1'
    }
  ];

  let nodesM2 = [
    {
      name: '服务器1',
      img: 'fwq.jpg'
    }
  ];
  //左侧图表数据
  let nodes = [
    {
      name: '存储设备1',
      img: 'cc.png',
      state: '1'
    },
    {
      name: '存储设备2',
      img: 'cc.png',
      state: '1'
    },
    {
      name: '防火墙',
      img: 'fhq.png',
      state: '0'
    },
    {
      name: '网络设备1',
      img: 'wlsb.png',
      state: '1'
    },
    {
      name: '网络设备2',
      img: 'wlsb.png',
      state: '0'
    },
    {
      name: '网络设备3',
      img: 'wlsb.png',
      state: '1'
    },
    {
      name: '网络设备4',
      img: 'wlsb.png',
      state: '1'
    }
  ];

  let charts = {
    nodes: [],
    links: [],
    linesData: [],
    linesData2: []
  };
  let x = 0;
  let y = 0;
  let dataMap = new Map();
  for (let j = 0; j < nodes.length; j++) {
    let node = {
      name: nodes[j].name,
      value: [x, y],
      symbolSize: 40,
      symbol: 'image://images/' + nodes[j].img,
      itemStyle: {
        normal: {
          color: '#12b5d0',
        }
      }
    };
    dataMap.set(nodes[j].name, [x, y]);
    charts.nodes.push(node);
    y += 2;
  }
  //右侧数据显示
  for (let k = 0; k < nodesM.length; k++) {
    let node = {
      name: nodesM[k].name,
      value: [x + 4, y / 2],
      symbolSize: 60,
      symbol: 'image://images/' + nodesM[k].img
    };
    dataMap.set(nodesM[k].name, [x + 4, y / 2]);
    charts.nodes.push(node)
  }

  for (let k = 0; k < nodesM2.length; k++) {
    let node = {
      name: nodesM2[k].name,
      value: [x + 4+4, y / 2],
      symbolSize: 60,
      symbol: 'image://images/' + nodesM2[k].img
    };
    dataMap.set(nodesM2[k].name, [x + 4+4, y / 2]);
    charts.nodes.push(node)
  }

  //画线
  let labelName = '';
  let labelColor = ''
  for (let i = 0; i < nodes.length; i++) {
    //通过传输状态state 显示传输文字提示
    if (nodes[i].state === '1') {
      labelName = '数据传输中'
      labelColor = '#0fff17'
    } else {
      labelName = '暂停传输'
      labelColor = 'red'
    }
    let link = {
      source: nodes[i].name,
      target: nodesM[0].name,
      label: {
        normal: {
          show: true,
          formatter: labelName,
          color: labelColor
        }
      },
      lineStyle: {
        normal: {
          // color: '#d1d1d1'
          color: labelColor
        }
      }
    };
    charts.links.push(link);

    //判断传输状态1 传输动效改变线条颜色
    if (nodes[i].state === '1') {
      // link.lineStyle.normal.color = '#0fff17';
      let lines = [
        {
          coord: dataMap.get(nodes[i].name)
        },
        {
          coord: dataMap.get(nodesM[0].name)
        }
        ];
      charts.linesData.push(lines)
    }

    {
      // link.lineStyle.normal.color = '#0fff17';
      let lines = [
        {
          coord: dataMap.get(nodesM[0].name)
        },
        {
          coord: dataMap.get(nodesM2[0].name)
        }
      ];
      charts.linesData.push(lines)
    }
  }



  // 划线2
  for (let i = 0; i < nodesM.length; i++) {
    //通过传输状态state 显示传输文字提示
    if (nodesM[i].state === '1') {
      labelName = '数据传输中'
      labelColor = '#0fff17'
    } else {
      labelName = '暂停传输'
      labelColor = 'red'
    }
    let link = {
      source: nodesM[i].name,
      target: nodesM2[0].name,
      label: {
        normal: {
          show: true,
          formatter: labelName,
          color: labelColor
        }
      },
      lineStyle: {
        normal: {
          // color: '#d1d1d1'
          color: labelColor
        }
      }
    };
    charts.links.push(link);

    //判断传输状态1 传输动效改变线条颜色
    if (nodesM[i].state === '1') {


      // link.lineStyle.normal.color = '#0fff17';
      let lines = [
        {
          coord: dataMap.get(nodesM[0].name)
        },
        {
          coord: dataMap.get(nodesM2[0].name)
        }
      ];
      charts.linesData2.push(lines)
    }
  }


  let option = {
    title: {
      text: '网络拓扑图',
      textStyle: {
        fontWeight: 'normal',
        color: "#FFF"
      }
    },
    backgroundColor: "#1b2735",
    xAxis: {
      show: false,
      type: 'value'
    },
    yAxis: {
      show: false,
      type: 'value'
    },
    series: [{
      type: 'graph',
      layout: 'none',
      coordinateSystem: 'cartesian2d',
      symbolSize: 50,
      label: {
        normal: {
          show: true,
          position: 'bottom',
          color: '#FFF'
        }
      },
      lineStyle: {
        normal: {
          width: 2,
          shadowColor: 'none',
          curveness: '0.1'
        }

      },
      edgeSymbolSize: 8,
      data: charts.nodes,
      links: charts.links,
      itemStyle: {
        normal: {
          label: {
            show: true,
            formatter: function (item) {
              return item.data.name
            }
          }
        }
      }
    },
      {
        name: 'A',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        effect: {
          show: true,
          trailLength: 0,
          symbol: 'arrow',
          color: '#0fff17',
          symbolSize: 8
        },
        lineStyle: {
				//箭头曲线 curveness (0-1)
          curveness: '0.1'
        },
        // data: charts.linesData
      }

      ,
      {
        name: 'B',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        effect: {
          show: true,
          trailLength: 0,
          symbol: 'arrow',
          color: '#0fff17',
          symbolSize: 8
        },
        lineStyle: {
				// curveness (0-1)
          curveness: '0.1'
        },
        // data: charts.linesData2
      }

    ]
  };

  console.log('charts.linesData'+JSON.stringify(charts.linesData2))
  console.log('charts.linesData2'+JSON.stringify(charts.linesData))
  let dom = document.getElementById("chart");
  let myChart = echarts.init(dom);
  myChart.setOption(option);
  window.onresize = myChart.resize;

  // let myChart = echarts.init(document.getElementById('chart'))
})

</script>
