<template>
  <div>
    <MyTree :data="data"></MyTree>
  </div>
</template>

<script>
import { getTreeList } from "./api";
import MyTree from './MyTree'
export default {
  components:{
    MyTree
  },
    async mounted(){
        let {data} =  await getTreeList();
        console.log(data)
        //判断如果是父级就给其添加type属性来给定后面显示的图表
        data.parent.forEach(p=>p.type = "parent")
        // 扁平的数据如何变成多层数据 递归数据
        let AllData = [...data.parent,...data.child]
    }
};
</script>