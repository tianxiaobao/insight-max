<style>
/*图例方向*/
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
        <span class="left">显示位置</span>
        <div class="right">
            <select class="u-select w100" :value = "orientation[0].key" @change="change($event.target.value)">
                <option v-for = "(item,index) in orientation" :value = "item.key">{{item.val}}</option>
            </select>
        </div>
    </div>
</template>
<script>
	export default{
	    props:['position'],
    data () {
        return {
            orientation:[
                    {key:1,val:"上"},
                    {key:2,val:"下"},
                    {key:3,val:"左"},
                    {key:4,val:"右"}
            ]
        };
    },
	    methods:{
	        change (val) {
	            this.$emit('updatePositon',val);
	        }
	    }
	};
</script>