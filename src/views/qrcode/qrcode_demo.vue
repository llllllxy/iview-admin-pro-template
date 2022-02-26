<template>
    <Card>
        <p slot="title">使用qrcodejs2生成二维码</p>
        <div style="width: 256px;margin: 0 auto;">
            <div ref="qrcodeRef"></div>
        </div>
    </Card>
</template>
<script>
    import QRCode from 'qrcodejs2'

    export default {
        name: 'qrcode_demo',
        data() {
            return {}
        },
        mounted() {
            const qrcodeText = '我是一个二维码'
            const qrcode = new QRCode(this.$refs.qrcodeRef, {
                text: qrcodeText,
                width: 256,
                height: 256,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            })
            qrcode.clear()
            qrcode.makeCode(qrcodeText)
        }
    }
</script>
