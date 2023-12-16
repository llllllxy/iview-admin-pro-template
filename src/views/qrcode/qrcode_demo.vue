<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="help-buoy"></Icon>
        二维码生成插件qrcodejs2
      </p>

      <img id="logoImg" :src="require('@/assets/main/logo-small.png')" style="display: none"  alt=""/>

      <Button type="primary"  @click="createQrcode1" style="margin-right:5px;">普通二维码</Button>

      <Button type="primary"  @click="createQrcode2" style="margin-right:5px;">带背景带文字二维码</Button>

      <Button type="primary"  @click="createQrcode3" style="margin-right:5px;">带LOGO二维码</Button>

    </Card>

    <Modal v-model="showModal1" :title="modalTitle1" width="450px" closable>
      <div style="text-align: center" v-if="showModal1">
        <div style="margin-left: 120px" id="qrCode1" ref="qrCodeRef1"></div>
      </div>

      <div slot="footer">
        <Button type="primary" size="large" long  @click="download1">下载</Button>
      </div>
    </Modal>

    <Modal v-model="showModal2" :title="modalTitle2" width="450px" closable>
      <div style="text-align: center" v-if="showModal2">
        <div style="display: none" class="qrCode2" id="qrCode2" ref="qrCodeRef2"></div>
        <canvas id="myCanvas2"></canvas>
      </div>

      <div slot="footer">
        <Button type="primary" size="large" long  @click="download2">下载</Button>
      </div>
    </Modal>

    <Modal v-model="showModal3" :title="modalTitle3" width="450px" closable>
      <div style="text-align: center" v-if="showModal3">
        <div style="display: none" class="qrCode3" id="qrCode3" ref="qrCodeRef3"></div>
        <canvas id="myCanvas3"></canvas>
      </div>

      <div slot="footer">
        <Button type="primary" size="large" long  @click="download3">下载</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  name: 'qrcode_demo',

  data () {
    return {
      showModal1: false,
      modalTitle1: '普通二维码',

      showModal2: false,
      modalTitle2: '带背景带文字二维码',

      showModal3: false,
      modalTitle3: '带LOGO二维码'
    }
  },
  mounted () {
  },
  methods: {
    createQrcode1 () {
      this.showModal1 = true
      this.$nextTick(() => {
        // 二维码生成
        let qrcode = new QRCode(this.$refs.qrCodeRef1, {
          text: 'https://www.baidu.com/', // text必须是字符串
          width: 180,
          height: 180,
          colorDark: '#333333', // 二维码颜色
          colorLight: '#ffffff', // 二维码背景色
          correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
        })
      })
    },
    createQrcode2 () {
      this.showModal2 = true
      this.$nextTick(() => {
        // 二维码生成
        let qrcode = new QRCode(this.$refs.qrCodeRef2, {
          text: 'https://www.baidu.com/', // text必须是字符串
          width: 256,
          height: 256,
          colorDark: '#333333', // 二维码颜色
          colorLight: '#ffffff', // 二维码背景色
          correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
        })

        let qrcodeImg = document.getElementById('qrCode2').children[0]
        let myCanvas = document.getElementById('myCanvas2')

        myCanvas.width = 300
        myCanvas.height = 420

        let ctx = myCanvas.getContext('2d')
        // 绘制canvas背景
        ctx.fillStyle = '#80D96F'
        ctx.fillRect(0, 0, myCanvas.width, myCanvas.height)
        // 将二维码绘制上去
        ctx.drawImage(qrcodeImg, 22, 50, 256, 256)
        // 绘制文字描述（水平居中）
        ctx.fillStyle = '#FFFFFF'
        ctx.font = '30px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('一张二维码', myCanvas.width / 2, 368)
      })
    },
    createQrcode3 () {
      this.showModal3 = true
      this.$nextTick(() => {
        // 二维码生成
        let qrcode = new QRCode(this.$refs.qrCodeRef3, {
          text: 'https://www.baidu.com/', // text必须是字符串
          width: 256,
          height: 256,
          colorDark: '#333333', // 二维码颜色
          colorLight: '#ffffff', // 二维码背景色
          correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
        })

        let qrcodeImg = document.getElementById('qrCode3').children[0]
        let myCanvas = document.getElementById('myCanvas3')
        let logoImg = document.getElementById('logoImg')

        myCanvas.width = 300
        myCanvas.height = 420

        let ctx = myCanvas.getContext('2d')
        // 绘制canvas背景
        ctx.fillStyle = '#80D96F'
        ctx.fillRect(0, 0, myCanvas.width, myCanvas.height)
        // 将二维码绘制上去
        ctx.drawImage(qrcodeImg, 22, 50, 256, 256)

        // 绘制LOGO
        ctx.drawImage(logoImg, 118, 150, 64, 64)

        // 绘制文字描述（水平居中）
        ctx.fillStyle = '#FFFFFF'
        ctx.font = '30px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('一张二维码', myCanvas.width / 2, 368)
      })
    },
    download1 () {
      let myCanvas = document.getElementById('qrCode1').children[0]
      let a = document.createElement('a')
      a.href = myCanvas.toDataURL('image/png')
      a.download = '生成的二维码'
      a.click()
    },
    download2 () {
      let myCanvas = document.getElementById('myCanvas2')
      let a = document.createElement('a')
      a.href = myCanvas.toDataURL('image/png')
      a.download = '生成的二维码'
      a.click()
    },
    download3 () {

    }
  }

}
</script>

<style scoped>

</style>
