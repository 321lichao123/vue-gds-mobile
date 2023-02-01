<template>
  <div class="trade-page">
    <div>
      <div class="top-info">
        <div class="header">
          GDS交易所
          <i class="iconfont">&#xe636;</i>
        </div>
        <div class="today-price-info">
          <div>
            <div class="items">今日参考价</div>
            <div>
              <span class="today-price">{{dayPriceObj.averagePrice || 0}}</span>
              <span class="unit">GX</span>
            </div>
          </div>
          <div>
            <div class="items">
              <span>昨日价格</span>
              <span class="today-price">{{dayPriceObj.yesterdayPrice || 0}}</span>
              <span class="unit">GX</span>
            </div>
            <div>
              <span style="margin-right: 5px;">涨幅</span>
              <span class="today-price">{{dayPriceObj.upRatio || 0}}</span>
              <span class="unit">%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="today-trade-total">
        <div>
          <div class="trade-total">{{dayPriceObj.exchangeNum || 0}}</div>
          <div>今日交易量</div>
        </div>
        <div>
          <div class="trade-total">{{dayPriceObj.buyNum || 0}}</div>
          <div>当前购买量</div>
        </div>
      </div>
      <div class="current-balance">
        <span>可用余额</span>
        <span class="balance">0.95GT</span>
      </div>
      <div class="trade-button">
        <van-button
          class="btn btn1"
          type="primary"
          size='small'
          color='linear-gradient(to right, #52a856 , #46bec8)'
          @click="buySellClick(0)"
        >买入</van-button>
        <van-button
          class="btn"
          type="primary"
          size='small'
          color='linear-gradient(to right, #ee4635, #f09b21)'
          @click="buySellClick(1)"
        >卖出</van-button>
      </div>
    </div>
    <div class="goods-list">
      <van-sticky>
        <van-tabs
          v-model="active"
          background="#f4f4f4"
          line-width="50%"
          title-active-color="#626aa4"
          title-inactive-color="#999999"
        >
          <van-tab title="购买列表">
            <buy-sell-list
              ref="buySellList"
              :btnType="btnType"
            />
          </van-tab>
          <van-tab title="出售列表">
            <van-empty description="暂未开放" />
          </van-tab>
        </van-tabs>
      </van-sticky>
    </div>
    <sellDialog
      :btnType="btnType"
      :buySellShow.sync="buySellShow"
    />
  </div>
</template>
<script>
import buySellList from './buySellList'
import sellDialog from './sellDialog'
import { getTopShow, queryUserInfo, publishExchangeInfo } from '@/request/api'
import { mapState } from 'vuex'
import { Toast } from 'vant'
export default {
  components: {
    buySellList,
    sellDialog
  },
  data() {
    return {
      active: 2,
      dayPriceObj: {},
      exchangeAz: 0,
      buySellShow: false,
      btnType: 0,
    };
  },
  computed: {
    ...mapState(['token', 'uid']),
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getTopShow({}).then(res => {
        this.dayPriceObj = {...res.data}
      })
      queryUserInfo({token: this.token, uid: this.uid}).then(res => {
        this.exchangeAz = res.data.exchangeAz
      })
    },
    buySellClick(type) {
      this.btnType = type
      this.buySellShow = true
    },
    confirm(value) {
      this.publishExchangeInfoMethod(value)
    },
    publishExchangeInfoMethod(value) {
      let params = {
        token: this.token,
        type: this.btnType,
        uid: this.uid,
      }
      params = Object.assign(params, {...value})
      return publishExchangeInfo(params).then(res => {
        if(res.status === 1000) {
          Toast.success('买入成功');
          this.$refs.buySellList.getExchangeInfoListMethod(0)
        } else {
          Toast.fail(res.desc);
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
.trade-page {
  background-color: #fefefe;
  height: 100vh;
  font-size: 16px;
}
.top-info {
  background-color: #4969e2;
  padding-bottom: 40px;
}
.header {
  color: #fff;
  font-size: 20px;
  text-align: center;
  height: 60px;
  line-height: 60px;
}
.header i {
  float: right;
}
.today-price-info {
  display: flex;
  justify-content: space-around;
  color: #fff;
  width: 100%;
}
.today-price-info .items {
  margin-bottom: 10px;
  height: 42px;
  line-height: 42px;
}
.today-price {
  font-size: 30px;
  margin: 0 5px;
}
.today-trade-total {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  height: 80px;
  margin: -20px auto 20px;
  border-radius: 5px;
  background-color: #fefefe;
  box-shadow: 0px 1px 2px 1px #f2f2f2;
}
.trade-total {
  margin-bottom: 5px;
  color: #768cd3;
  text-align: center;
  font-weight: 600;
}
.current-balance {
  text-align: center;
  margin: 20px 0;
}
.current-balance .balance {
  color: #c0847b;
  margin-left: 15px;
}
.trade-button {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.trade-button .btn {
  border: none;
  width: 40%;
  border-radius: 15px;
}
.btn1 {
  margin-right: 5%;
}
.van-hairline--top-bottom::after {
  border-width: 0 0 1px 0;
}
.goods-list {
  padding-bottom: 80px;
  background-color: #fefefe;
}
</style>
