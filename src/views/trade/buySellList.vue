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
    <div class="goods-list" v-for="(item, index) in dataSource" :key="index">
      <div class="goods-left">
        <div class="goods-code goods-title">{{userCode}}</div>
        <div class="goods-infos">
          <div>
            <div class="goods-count">{{item.totalNum || 0}}</div>
            <div class="goods-title">订单数量(GT)</div>
          </div>
          <div>
            <div class="goods-count">{{item.eachImt || 0}}</div>
            <div class="goods-title">单价</div>
          </div>
          <div>
            <div class="goods-count">{{item.actualPayImt || 0}}</div>
            <div class="goods-title">预计金额(GX)</div>
          </div>
        </div>
      </div>
      <div class="sell-area">
        <div class="goods-title">成交: <span>{{item.dealAZ || 0}}</span></div>
        <van-button
          class="sell-btn"
          round
          size="small"
          color="linear-gradient(to right, #ee4635, #f09b21)"
          @click="sellBtn(item)"
        >出售</van-button>
      </div>
    </div>
    <sellDialog 
      :btnType="2"
      :buySellShow.sync="buySellShow"
      :sellMaxNum="sellObj.totalNum"
      @confirm='confirm'
    />
  </div>
</template>
<script>
import { getExchangeInfoList, chargeImtOrAZ } from '@/request/api'
import { mapState } from 'vuex'
import sellDialog from './sellDialog'
import { Toast } from 'vant'
export default {
  components: {
    sellDialog
  },
  data() {
    return {
      numType: 0,
      btnsArr: [
        {key: 0, title: '1 ~ 20'},
        {key: 1, title: '21 ~ 50'},
        {key: 2, title: '51 ~ 300'},
        {key: 3, title: '300以上'},
      ],
      dataSource: [],
      buySellShow: false,
      // sellMaxNum: 0,
      sellObj: {}
    };
  },
  props: ['btnType'],
  computed: {
    ...mapState(['token', 'uid']),
    changeBtnColor() {
      return function(val) {
        return this.numType === val ? '#2294f2' : '#dfdfdf'
      }
    },
    setBtnTextColor() {
      return function(val) {
        return {color: this.numType === val ? '#dbfbfd' : '#686868'}
      }
    },
    userCode() {
      return this.uid && this.uid.toString().slice(-4)
    }
  },
  created() {
    this.getExchangeInfoListMethod()
  },
  methods: {
    clickBtn(val) {
      this.numType = val
      this.getExchangeInfoListMethod()
    },
    sellBtn(record) {
      // this.buyUid = record.uid
      // this.sellMaxNum = record.totalNum
      this.sellObj = {...record}
      this.buySellShow = true
    },
    getExchangeInfoListMethod() {
      let params = {
        type: this.btnType,
        numType: this.numType,
        token: this.token
      }
      return getExchangeInfoList(params).then(res => {
        if(res.status === 1000) {
          this.dataSource = res.data
        }
      })
    },
    confirm(value) {
      const {uid: buyUid, id: eId} = this.sellObj
      let params = {
        token: this.token,
        type: 1,
        numType: this.numType,
        buyUid,
        sellUid: this.uid,
        eId,
        az: value.totalNum
      }
      chargeImtOrAZ(params).then(res => {
        if(res.status === 1000) {
          Toast.success('交易成功')
          this.getExchangeInfoListMethod()
        }
      }).catch(err => {
        Toast.fail(err.desc)
      })
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
