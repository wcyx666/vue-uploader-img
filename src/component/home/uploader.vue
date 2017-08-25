<template>
    <div class="vue-uploader">
        <div class="file-list">
            <section v-for="(file, index) of files" class="file-item draggable-item">
                <img :src="file.src" alt="" ondragstart="return false;">
                <span class="file-remove" @click="remove(index)">
                    <img src="../../assets/image/server/close_img.png">
                </span>
            </section>
            <section v-if="status == 'ready'" class="file-item">
                <div @click="add" class="add">
                    <span>
                        <img src="../../assets/image/server/add_img.png">
                    </span>
                </div>
            </section>
        </div>
        <slot></slot>
        <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple">
        <section class="upload-func">
            <div class="operation-box">
                <button @click="submit">上传</button>
            </div>
        </section>
    </div>
</template>
<script>
    export default {
        props: {
            src: {
                type: String,
                required: true
            },
            textarea:String
        },
        data() {
            return {
                status: 'ready',
                files: [],
                point: {},
                uploading: false,
                percent: 0
            }
        },
        methods: {
            add() {
                this.$refs.file.click()
            },
            submit() {
                if (this.files.length === 0) {
                    console.warn('no file!');
                    return
                }
                const formData = new FormData()
                this.files.forEach((item) => {
                    /* 后端接收的其他参数 item.file生成图片对象*/
                    formData.append('test', item.file)
                    formData.append('a', 1)
                    formData.append('b', 1)
                    formData.append('c', 1)
                    formData.append('d', 1)
                    formData.append('e', 1)
                })
                const xhr = new XMLHttpRequest()
                xhr.upload.addEventListener('progress', this.uploadProgress, false)
                xhr.open('POST', this.src, true)
                this.uploading = true
                xhr.send(formData)
                xhr.onload = () => {
                    this.uploading = false
                    if (xhr.status === 200 || xhr.status === 304) {
                        this.status = 'finished'
                        console.log('upload success!')
                    } else {
                        console.log(`error：error code ${xhr.status}`)
                    }
                }
            },
            finished() {
                this.files = []
                this.status = 'ready'
            },
            remove(index) {
                this.files.splice(index, 1)
            },
            fileChanged() {
                const list = this.$refs.file.files;
                console.log(list)
                for (let i = 0; i < list.length; i++) {
                    if (!this.isContain(list[i])) {
                        const item = {
                            name: list[i].name,
                            size: list[i].size,
                            file: list[i]
                        }
                        this.html5Reader(list[i], item)
                        this.files.push(item)
                    }
                }
                this.$refs.file.value = ''
            },
            // 将图片文件转成BASE64格式
            html5Reader(file, item){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result)
                }
                reader.readAsDataURL(file)
            },
            isContain(file) {
                this.files.forEach((item) => {
                    if(item.name === file.name && item.size === file.size) {
                        return true
                    }
                })
                return false
            },
            uploadProgress(evt) {
                const component = this
                if (evt.lengthComputable) {
                    const percentComplete = Math.round((evt.loaded * 100) / evt.total)
                    component.percent = percentComplete / 100
                } else {
                    console.warn('upload progress unable to compute')
                }
            }
        }
    }
</script>
<style>
.vue-uploader {
   width: 100%;
}
.vue-uploader .file-list {
     padding: 0 0.3rem;
    padding-bottom: 0.3rem;
    border-bottom:  0.19rem solid #f3f3f3;
}
.vue-uploader .file-list:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    font-size: 0;
}
.vue-uploader .file-list .file-item {
    width: 1.57rem;
    height: 1.57rem;
    margin-right: 0.15rem;
    position: relative;
    overflow: hidden;
    float: left;
    margin-top: 0.15rem;
    border: 0.02rem solid #e6e6e6;
}
.vue-uploader .file-list .file-item img {
    width: 100%;
}
.file-remove {
    position: absolute;
    width: 0.35rem;
    height: auto;
    right: 0;
    top: 0;
}
.vue-uploader .add span {
    margin-top: 0.48rem;
    margin-left: 0.48rem;
    display: block;
    width: 0.6rem;
    height: 0.6rem;
    overflow: hidden;
}
.vue-uploader .add span img {
    display: block;
    width: 100%;
    height: 100%;
}
.vue-uploader .upload-func {
    padding: 0 0.3rem;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0.23rem;
}
.vue-uploader .upload-func .progress-bar {
    flex-grow: 1;
}
.vue-uploader .upload-func .operation-box button {
    display: block;
    width: 100%;
    height: 0.82rem;
    border-radius: 6px;
    background: #439685;
    font-size: 0.33rem;
    text-align: center;
    line-height: 0.82rem;
    color: #fff;
    border: none;
}
.vue-uploader > input[type="file"] {
    display: none;
}
</style>