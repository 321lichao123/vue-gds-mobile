<template>
  <div>
    <van-dialog
      show-cancel-button
      v-model="dialogVisible"
      :title="title"
      @confirm="confirm"
      @cancel="cancel"
    >
    <van-form>
      <van-field label="数量">
        <template #input>
          <van-stepper 
            v-model="form.totalNum"
            :min="0"
            :disable-plus="disablePlus"
            @change="calculateTotal"
          />
        </template>
      </van-field>
      <van-field
        type="number"
        label="单价"
        v-model="form.eachImt"
        @input="calculateTotal"
      />
      <van-field
        type="number"
        label="总价"
        readonly
        v-model="form.az"
      />
    </van-form>
    </van-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  data() {
    return {
      form: {
        totalNum: 0,
        eachImt: 0,
        az: 0
      }
    }
  },
  props: ['btnType', 'buySellShow', 'sellMaxNum'],
  computed: {
    ...mapState(['token', 'uid']),
    title() {
      return this.btnType === 0 ? '买入' : '卖出'
    },
    disablePlus() {
      return this.sellMaxNum && this.sellMaxNum <= this.form.totalNum
    },
    dialogVisible: {
      get() {
        return this.buySellShow
      },
      set() {
        this.$emit('update:buySellShow', false)
      }
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm', this.form)
      this.cancel()
    },
    cancel() {
      this.form = {
        totalNum: 0,
        eachImt: 0,
        az: 0
      }
    },
    calculateTotal() {
      let {totalNum, eachImt, az} = this.form
      az = totalNum * eachImt
      this.form.az = az
    },
  }
}
</script>