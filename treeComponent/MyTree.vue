<template>
  <el-tree 
    :data="allData"
    default-expand-all
    render-content="render"
  ></el-tree>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      allData: []
    };
  },
  //开始加载mounted就已经开始执行了，所以数据还没拿到，页面渲染就没有数据，所以要用到数据监听
  watch: {
    //需要监控父组件传递的data属性，如果有更新就重新渲染
    data() {
      //数据更新就需要重新渲染
      this.transformData();
    }
  },
  methods: {
      isParent(data){
          return data.type === "parent"
      },
    //   render函数 利用jsx语法写dom结构
      render(h,{node,data,store}){
          return (<div>
            {
                this.isParent(data)?
                // 双 双元云运算法
                    node.expanded?
                        <i class="el-icon-folder-opened"></i>:
                        <i class="el-icon-folder"></i>:
                    <i class="el-icon-document"></i>
            }
            {data.name}
          </div>)
      },
    transformData() {
      // 需要根据数据进行克隆，克隆后的数据进行操作(不进行克隆直接操作的话会影响原来的数据)
      let AllData = _.cloneDeep(this.data);
      let treeMapList = AllData.reduce((memo, current) => {
        current.label = current.name;
        memo[current["id"]] = current;
        return memo;
      }, {});

      let result = AllData.reduce((arr, current) => {
        let pid = current.pid;
        let parent = treeMapList[pid];
        if (parent) {
          parent.children
            ? parent.children.push(current)
            : (parent.children = [current]);
        } else if (pid === 0) {
          arr.push(current);
        }
        return arr;
      }, []);
      this.allData = result;
    }
  },
  mounted() {
    this.transformData();
  }
};
</script>