<template>
  <div class="buy-sell-page">
    <div class="price-btns">
      <van-button
        v-for="(item, index) in btnsArr"
        :key="index"
        round
        size="small"
        :color="changeBtnColor(item.key)" 
        :style="setBtnTextColor(item.key)"
        :text="item.title"
        @click="clickBtn(item.key)" 
      />
    </div>
    <div class="goods-list">
      <div class="goods-left">
        <div class="goods-code goods-title">076</div>
        <div class="goods-infos">
          <div>
            <div class="goods-count">15</div>
            <div class="goods-title">订单数量(GT)</div>
          </div>
          <div>
            <div class="goods-count">14.08</div>
            <div class="goods-title">单价</div>
          </div>
          <div>
            <div class="goods-count">211.20</div>
            <div class="goods-title">预计金额(GX)</div>
          </div>
        </div>
      </div>
      <div class="sell-area">
        <div class="goods-title">成交: <span>4</span></div>
        <van-button
          class="sell-btn"
          round
          size="small"
          color="linear-gradient(to right, #ee4635, #f09b21)"
          @click="sell"
        >出售</van-button>
      </div>
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
      clickBtnActive: 1,
      btnsArr: [
        {key: 1, title: '1 ~ 20'},
        {key: 2, title: '21 ~ 50'},
        {key: 3, title: '51 ~ 300'},
        {key: 4, title: '300以上'},
      ]
    };
  },
  computed: {
    changeBtnColor() {
      return function(val) {
        return this.clickBtnActive === val ? '#2294f2' : '#dfdfdf'
      }
    },
    setBtnTextColor() {
      return function(val) {
        return {color: this.clickBtnActive === val ? '#dbfbfd' : '#686868'}
      }
    }
  },
  created() {},
  methods: {
    clickBtn(val) {
      this.clickBtnActive = val
    }
  }
};
</script>
<style lang="less" scoped>
.buy-sell-page {
  padding: 20px 10px 0;
}
.price-btns {
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 20px;
  button {
    width: 80px;
  }
}
.goods-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #efefef;
}
.goods-left {
  flex: 1;
  margin-right: 10px;
}
.goods-code {
  padding-bottom: 10px;
}
.goods-infos {
  display: flex;
  justify-content: space-between;
}
.goods-count {
  color: #d97272;
}
.goods-title {
  color: #959396;
}
.sell-area {
  text-align: center;
}
.sell-btn {
  width: 80px;
}
</style>
