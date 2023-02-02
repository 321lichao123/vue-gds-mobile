<template>
  <div class="user-profile-page">
    <div class="tool">
      <van-icon name="setting-o" />
    </div>
    <div class="profile">
      <span class="profile-photo">
        <van-image
          width="40"
          height="40"
          :src="userInfo.avatar"
        />
      </span>
      <span class="profile-name">{{userInfo.userName}}</span>
    </div>
    <div class="profile-money-info">
      <div>
        <div class="money-title">余额</div>
        <div class="money-num">{{userInfo.imt}} CC</div>
      </div>
      <div>
        <div class="money-title">冻结余额</div>
        <div class="money-num">0</div>
      </div>
      <div>
        <div class="money-title">CC</div>
        <div class="money-num">{{userInfo.exchangeAz}} az</div>
      </div>
    </div>
    <div class="trade-table">
      <van-cell-group inset style="margin-bottom: 10px">
        <!-- <van-cell title="我的资产" is-link>
           <template #icon>
            <i class="iconfont icon-zichanguanli"></i>
          </template>
        </van-cell> -->
        <van-cell title="收付款方式" is-link @click="openDialog(1)">
          <template #icon>
            <i class="iconfont icon-fukuan"></i>
          </template>
        </van-cell>
        <van-cell title="置换发布" is-link @click="openDialog(2)">
          <template #icon>
            <i class="iconfont icon-fukuan"></i>
          </template>
        </van-cell>
        <van-cell title="置换订单" is-link @click="openDialog(3)">
          <template #icon>
            <i class="iconfont icon-fukuan"></i>
          </template>
        </van-cell>
        <div v-if="userInfo.role === 2">
          <van-cell title="承兑发布" is-link @click="openDialog(4)">
            <template #icon>
              <i class="iconfont icon-fukuan"></i>
            </template>
          </van-cell>
          <van-cell title="承兑订单" is-link @click="openDialog(5)">
            <template #icon>
              <i class="iconfont icon-fukuan"></i>
            </template>
          </van-cell>
        </div>
        <!-- <van-cell title="我的发布的" is-link>
          <template #icon>
            <i class="iconfont icon-fabu"></i>
          </template>
        </van-cell> -->
        <van-cell title="交易订单" is-link>
          <template #icon>
            <i class="iconfont icon-jiaoyirizhi"></i>
          </template>
        </van-cell>
        <van-cell title="CC手续费" is-link>
          <template #icon>
            <i class="iconfont icon-fuwushouxufei"></i>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group inset>
        <van-cell title="身份认证"></van-cell>
        <van-cell title="版本更新"></van-cell>
      </van-cell-group>
    </div>
    <vant-dialog
      :dialogObj.sync="dialogObj"
      :dialogVisible.sync="dialogVisible"
    >
      <div v-if="showDialogContent('payWaySlot')">
        <div class="pay-box">
          <div class="pay-way">
            <span>微信账号：</span>
            <span>{{userInfo.vxAccount}}</span>
          </div>
          <div class="pay-img">
            <van-image
              width="150"
              height="150"
              :src="userInfo.vxPayImg"
              @click="previewImg(userInfo.vxPayImg)"
            />
          </div>
        </div>
        <div class="pay-box">
          <div class="pay-way">
            <span>支付宝账号：</span>
            <span>{{userInfo.zfbAccount}}</span>
          </div>
          <div class="pay-img">
            <van-image
              width="150"
              height="150"
              :src="userInfo.zfbPayImg"
              @click="previewImg(userInfo.zfbPayImg)"
            />
          </div>
        </div>
      </div>
      <div v-if="showDialogContent('replacePublish')">
        <div>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              class="list-content"
              v-for="(item, index) in list"
              :key="index" 
            >
              <div>
                <div class="parameter">{{item.eachImt}}</div>
                <div>单价</div>
              </div>
              <div>
                <div class="parameter">{{item.totalNum}}</div>
                <div>总量</div>
              </div>
              <div>
                <div class="parameter">{{item.createTime | dateTime}}</div>
                <div>发布时间</div>
              </div>
            </div>
          </van-list>
        </div>
      </div>
      <div v-if="showDialogContent('replaceOrder')">
        <div>
          <van-tabs v-model="activeBuyWay" @click="changeTranslationRecordList">
            <van-tab title="买入" :name="0" />
            <van-tab title="卖出" :name="1" />
          </van-tabs>
          <van-list
            v-model="loading"
            :finished="translatFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              class="list-content"
              v-for="(item, index) in replaceListObj[activeBuyWay]"
              :key="index" 
            >
              <div>
                <div class="parameter">{{item.eachImt}}</div>
                <div>单价</div>
              </div>
              <div>
                <div class="parameter">{{item.buyNum}}</div>
                <div>总量</div>
              </div>
              <div>
                <div class="parameter">{{item.createTime | dateTime}}</div>
                <div>发布时间</div>
              </div>
            </div>
          </van-list>
        </div>
      </div>
      <div v-if="showDialogContent('acceptPublish')">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="list-content"
            v-for="(item, index) in list"
            :key="index" 
          >
            <div>
              <div class="parameter">{{item.eachPrice}}</div>
              <div>单价</div>
            </div>
            <div>
              <div class="parameter">{{item.pubImt}}</div>
              <div>总量</div>
            </div>
            <div>
              <div class="parameter">{{item.createTime | dateTime}}</div>
              <div>发布时间</div>
            </div>
          </div>
        </van-list>
      </div>
      <div v-if="showDialogContent('acceptOrder')">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="list-content"
            v-for="(item, index) in list"
            :key="index" 
          >
            <div class="application-info">
              <div>
                <div class="parameter">{{item.buyNum}}</div>
                <div>申购数量</div>
              </div>
              <div>
                <div class="parameter">{{item.buyer && item.buyer.slice(-4)}}</div>
                <div>申购人</div>
              </div>
              <div>
                <div class="parameter">{{item.createTime | dateTime}}</div>
                <div>申购时间</div>
              </div>
              <div>
                <div class="parameter textover">{{item.remark }}</div>
                <div>付款备注</div>
              </div>
            </div>
            <div class="opter-btn">
              <van-button
                class="sell-btn"
                round
                size="small"
                color='linear-gradient(to right, #52a856 , #46bec8)'
                @click="agreeSell(item)"
              >同意</van-button>
              <van-button
                class="sell-btn"
                round
                size="small"
                color='linear-gradient(to right, #ee4635, #f09b21)'
                @click="sellBtn(item)"
              >拒绝</van-button>
            </div>
          </div>
        </van-list>
      </div> 
    </vant-dialog>
    <van-image-preview
      v-model="imgSHow"
      :images="showImages"
      :showIndex='false'
      @onClose="closeShowImg"
    />
  </div>
</template>
<script>
import vantDialog from "@/components/vantDialog.vue";
import { queryUserInfo, getSelfExchangeInfoList, queryAcceptancePubListBySelf, queryPurchaseList, queryTranslationRecordList, sendImt2Buyer } from '@/request/api'
import { mapState } from 'vuex'
import { Toast } from 'vant';
export default {
  components: {
    vantDialog
  },
  data() {
    return {
      userInfo: {},
      dialogVisible: false,
      imgSHow: false,
      showImages: [],
      slotName: '',
      dialogObj: {},
      loading: false,
      finished: false,
      list: [],
      page0: 1,
      page1: 1,
      activeBuyWay: 0,
      replaceListObj: {
        0: {list: [], finished: false},
        1: {list: [], finished: false},
      }
    };
  },
  mounted() {
    this.queryUserInfoMethod()
  },
  computed: {
    ...mapState(['token', 'uid']),
    showDialogContent() {
      return function(slotName) {
        return this.dialogObj.slotName === slotName
      }
    },
    translatFinished() {
      const obj = this.replaceListObj[this.activeBuyWay]
      return obj ? obj.finished : false
    }
  },
  methods: {
    queryUserInfoMethod() {
      queryUserInfo({token: this.token, uid: this.uid}).then(res => {
        if(res.status === 1000) {
          this.userInfo = {...res.data}
          this.$store.dispatch('setUserInfo', res.data)
        }
      }).catch(err => {
        Toast.fail(err.desc)
      })
    },
    previewImg(url) {
      this.showImages.push(url)
      this.imgSHow = true
    },
    closeShowImg() {
      this.imgSHow = false
      this.showImages = []
    },
    openDialog(key) {
      let map = {
        1: {title: '收付款方式', slotName: 'payWaySlot', method: ''},
        2: {title: '置换发布', slotName: 'replacePublish', method: 'getExchangeInfoListMethod'},
        3: {title: '置换订单', slotName: 'replaceOrder', method: 'queryTranslationRecordListMethod'},
        4: {title: '承兑发布', slotName: 'acceptPublish', method: 'queryAcceptancePubListBySelfMethod'},
        5: {title: '承兑订单', slotName: 'acceptOrder', method: 'queryPurchaseListMethod'},
      }
      this.list = []
      this.loading = true
      this.dialogObj = map[key]
      this.onLoad(key)
      this.dialogVisible =true
    },
    getExchangeInfoListMethod() {
      getSelfExchangeInfoList({
        uid: this.uid,
        token: this.token
      }).then(res => {
        if(res.status === 1000) {
          this.list = [...res.data]
        }
      }).finally(() => {
        this.loading = false;
        this.finished = true;
      })
    },
    changeTranslationRecordList() {
      this.queryTranslationRecordListMethod()
    },
    queryTranslationRecordListMethod() {
      const tId = this[`page${this.activeBuyWay}`]
      queryTranslationRecordList({
        tId,
        token: this.token,
        payWay: this.activeBuyWay
      }).then(res => {
        if(res.status === 1000) {
          if(tId === 1) {
            this.replaceListObj[this.activeBuyWay].list = [...res.data]
          } else {
            this.replaceListObj[this.activeBuyWay].list.push(...res.data)
          }
          console.log(this.replaceListObj, '---this.replaceListObj');
        }
      }).finally(() => {
        this.loading = false;
        // 数据全部加载完成
        const obj = this.replaceListObj[this.activeBuyWay]
        if(!obj.list.length) {
          obj.finished = true;
        }
      })
    },
    queryAcceptancePubListBySelfMethod() {
      queryAcceptancePubListBySelf({token: this.token}).then(res  => {
        if(res.status === 1000) {
          this.list = [...res.data]
        }
      }).finally(() => {
        this.loading = false;
        this.finished = true;
      })
    },
    queryPurchaseListMethod() {
      queryPurchaseList({
        token: this.token
      }).then(res => {
        if(res.status === 1000) {
          this.list = [...res.data]
        }
      }).finally(() => {
        this.loading = false;
        this.finished = true;
      })
    },
    onLoad() {
      const method = this.dialogObj.method
      method && this[method]()
    },
    agreeSell(record) {
      sendImt2Buyer({token: this.token, acceptanceExchangeId: record.id}).then(res => {
        if(res.status === 1000) {
          Toast.success('操作成功')
          this.queryPurchaseListMethod()
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
.user-profile-page {
  padding: 20px 10px 0;
  background-color: #f1f1f1;
  height: 100vh;
  font-size: 16px;
  .tool {
    text-align: right;
    color: #8d8d8d;
    font-size: 16px;
  }
  .profile {
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    .profile-photo {
      width: 40px;
      height: 40px;
      display: inline-block;
      margin-right: 10px;
    }
  }
  .profile-money-info {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    .money-title {
      padding-bottom: 10px;
      color: #888888;
      font-size: 14px;
    }
  }
  .trade-table {
    color: #292929;
    font-weight: 600;
    .iconfont {
      margin-right: 10px;
    }
  }
  /deep/ .van-cell-group--inset {
    margin: 0;
  }
  /deep/.van-dialog__content {
    padding: 0 20px;
  }
  .pay-box {
    // padding: 0 20px;
    margin-bottom: 15px;
    .pay-way {
      margin-bottom: 15px;
    }
    .pay-img {
      text-align: center;
    }
  }
  .list-content {
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    color: #686868;
    &:first-of-type {
      border-top: 1px solid #ccc;
    }
  }
  .parameter {
    height: 20px;
    font-size: 12px;
  }
  .application-info {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    padding-right: 10px;
    > div {
      font-size: 12px;
      width: 50%;
    }
  }
  .opter-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .sell-btn {
      width: 80px;
      margin-bottom: 10px;
    }
  }
  .textover {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
