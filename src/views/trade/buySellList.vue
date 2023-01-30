<template>
  <div class="buy-sell-page">
    <div class="price-btns">
      <van-button>1 ~ 20</van-button>
      <van-button>21 ~ 50</van-button>
      <van-button>51 ~ 300</van-button>
      <van-button>300以上</van-button>
    </div>
    <div class="goods-list">
      
    </div>
  </div>
</template>
<script>
import { Button } from 'vant';
export default {
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      active: 2
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
</style>
