<template>
  <div class="notice-page">
    <van-empty description="暂未开放" />
  </div>
</template>
<script>
import { Empty } from 'vant';
export default {
  components: {
    [Empty.name]: Empty,
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
</style>
