<template>
  <div>
    <van-dialog
      :title="title"
      confirmButtonText="关闭"
      confirmButtonColor="#323233"
      v-model="openCloseDialog"
    >
      <slot></slot>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'vantDialog',
  data() {
    return {

    }
  },
  props: {
    title: {
      required: true,
      type: String,
      default: ''
    },
    dialogVisible: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  computed: {
    openCloseDialog: {
      get() {
        return this.dialogVisible
      },
      set(value) {
        this.$emit('update:dialogVisible', false)
      }
    }
  }
}
</script>