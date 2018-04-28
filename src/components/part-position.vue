<style>
	 .m-setting .right .coo{
        width: 86px;
        margin-right: 10px;
    }
    
    .m-setting .right .coo input{
        width: 100%;
    }

    .m-setting .right .coo .tt{
        text-align: center;
        line-height: 18px;
    }
</style>

<template>
    <div class="item clearfloat">
        <span class="left">坐标</span>
        <div class="right">
            <div class="coo fl">
                <input type="number" min="0" v-model.number="position.x" @change="updatePositon">
                <div class="tt">横坐标</div>
            </div>
            <div class="coo fl">
                <input type="number" min="0" v-model.number="position.y" @change="updatePositon">
                <div class="tt">纵坐标</div>
            </div>
        </div>
    </div>
</template>
<script>
	export default{
	    props:['position'],
	    methods:{
	        updatePositon () {
	            this.$emit('updatePositon');
	        }
	    }
	};    
</script>