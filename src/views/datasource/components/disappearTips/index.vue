<!--
    /**
     * [右上角展示操作结果，后续考虑移动到公共组件]
     * @params level    {[String]}      [level, different level display different 
     *                                  color，eg:danger || warning || '']
     * @params content  {[String]}      [提示内容]
     * @params show     {[Boolean]}     [true展示，false不展示]
     */
-->
<template>
    <transition name="fade">
        <div class="fr vuetip" :class="classLevel" @click="hide" v-show="showResult">
            {{ content }}        
        </div>
    </transition>
</template>

<script>
export default {
    name: 'disappear-tips',
    props: {
        level: {
            default: "",
            type: String
        },
        content: {
            default: "",
            type: String
        },
        show: {
            default: false,
            type: Boolean
        }
    },
    computed: {
        // generate class string
        classLevel () {
            return "tip" + (this.level? ('-' + this.level) : '');
        },
        showResult () {
            return this.show;
        }
    },
    methods: {
        hide () {
            this.showResult = false;
        }
    }
};
</script>

<style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity 1s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
</style>