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
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </span>
      <span class="profile-name">九五 13068853210</span>
    </div>
    <div class="profile-money-info">
      <div>
        <div class="money-title">余额</div>
        <div class="money-num">2.6CC</div>
      </div>
      <div>
        <div class="money-title">冻结余额</div>
        <div class="money-num">0</div>
      </div>
      <div>
        <div class="money-title">CC</div>
        <div class="money-num">10.75</div>
      </div>
    </div>
    <div class="trade-table">
      <van-cell-group inset style="margin-bottom: 10px">
        <van-cell title="我的资产" is-link>
           <template #icon>
            <i class="iconfont icon-zichanguanli"></i>
          </template>
        </van-cell>
        <van-cell title="收付款方式" is-link>
          <template #icon>
            <i class="iconfont icon-fukuan"></i>
          </template>
        </van-cell>
        <van-cell title="我的发布的" is-link>
          <template #icon>
            <i class="iconfont icon-fabu"></i>
          </template>
        </van-cell>
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
  </div>
</template>
<script>
import { Image, Cell, CellGroup } from 'vant';
export default {
  components: {
    [Image.name]: Image,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  data() {
    return {
      show: false,
      actions: []
    };
  },
  created() {},
  methods: {
    onSelect() {

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
}
</style>
