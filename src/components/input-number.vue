<style type="text/css">
	.item div.right .error{color:#f00;border-color:#f00;}
</style>
<template>
	<div class="item">
        <span class="left" v-if="prop.title">{{prop.title}}</span>
        <div class="right">
            <input type="number" :value="prop.value || 0" :max="max" :min="min" @change="change($event.target.value, prop)" :class = "{'error':flag}">
            <div><label v-show = "flag" class = "error">请输入{{max}}（包含{{max}}以下正整数）</label></div>
        </div>
    </div>
</template>
<script>
	export default {
	    name: 'input-number',
	    props: {
	        prop: {
	            type: Object
	        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        }
	    },
	    data () {
	        return {
	            val: this.value,
	            flag: false
	        };
	    },
	    methods: {
	        change (value, prop) {
	            if(value > this.max) {
	                this.flag = true;
	                this.prop.value = value;
	                return;
	            }else{
	                this.flag = false;
	                this.prop.value = value;
	            }
	            this.$emit('input', value);
	            this.$emit('change', value, prop);
	        }
	    }
	};
</script>