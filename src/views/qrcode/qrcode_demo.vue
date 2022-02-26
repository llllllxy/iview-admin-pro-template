<template>
    <Card>
        <p slot="title">使用qrcodejs2生成二维码</p>
        <div style="width: 256px;margin: 0 auto;">
            <!--logoSrc为logo的url地址(使用require的方式)；text为需要转换为二维码的内容-->
            <vue-qr :logoSrc="imageUrl" :text="qrcodeText" :size="256"></vue-qr>
        </div>
    </Card>
</template>
<script>
    import vueQr from 'vue-qr'
    import logoSmall from '@/assets/main/logo-small.png'

    export default {
        name: 'qrcode_demo',
        components: {
            vueQr
        },
        data() {
            return {
                imageUrl: logoSmall,
                qrcodeText: '使用qrcodejs2生成二维码'
            }
        }
    }
</script>
