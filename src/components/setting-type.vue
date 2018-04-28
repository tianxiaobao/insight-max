<template>
	<div class="item">
        <span class="left" v-if="prop.title">{{prop.title}}</span>
        <div class="right">
            <select class="u-select w100" :value = "prop.data[0].key" @change="change($event.target.value, prop)">
            	<option v-for = "(item, index) in prop.data" :value="item.key">{{item.val}}</option>
            </select>
        </div>
    </div>
</template>
<script>
	export default {
	    props: {
	        prop: {
	            type: Object
	        }
	    },
	    data () {
	        return {

	        };
	    },
	    methods:{
	        change (value, prop) {
	            this.$emit('input', value);
	            this.$emit('change', value, prop);
	        }
	    }
	};
</script>