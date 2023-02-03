<template>
  <div class="recycle-page">
    <div class="title">
      自动回收按照5imt/az进行回收
    </div>
    <van-button
      type="primary"
      block
      round 
      @click="dialogVisible = true"
    >回收</van-button>
    <van-dialog
      title="回收数量"
      show-cancel-button
      v-model="dialogVisible"
      @confirm="confirm"
      @close="close"
    >
      <van-field v-model="az" type="number" label="回收az数量" />
    </van-dialog>
  </div>
</template>

<script>
import vantDialog from "@/components/vantDialog.vue";
import { recycleAz } from '@/request/api'
import { Toast } from 'vant';
import { mapState } from 'vuex'
export default {
  name: 'recycle',
  components: {
    vantDialog
  },
  data() {
    return {
      dialogVisible: false,
      az: 0
    }
  },
  computed: {
    ...mapState(['token', 'uid'])
  },
  methods: {
    recycleAzMethod() {
      recycleAz({token: this.token, az: this.az}).then(res => {
        if(res.status === 1000) {
          Toast.success('回收成功')
          this.close()
        }
      }).catch(err => {
        Toast.fail(err.desc)
      })
    },
    confirm() {
      this.recycleAzMethod()
    },
    close() {
      this.az = 0
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.recycle-page {
  background-color: #f1f1f1;
  padding-top: 100px;
  height: 100vh;
  .title {
    // border: 1px solid #ccc;
    margin: 0 auto;
    width: 90%;
    padding: 10px;
    border-radius: 5px;
    // background-color: #fefefe;
    text-align: center;
    margin-bottom: 100px;
  }
  button {
    width: 80%;
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>