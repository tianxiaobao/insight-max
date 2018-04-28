<template>
	<div class="item clearfloat">
        <span class="left">{{name}}</span>
        <div class="right">
            <set-color :color="value"  @change="change"></set-color>
        </div>
    </div>
</template>
<script>
	import setColor from './set-color.vue';
	export default {
	    name: 'setting-number',
	    props: ['value','name'],
	    components: {setColor},
	    methods: {
	        change (value) {
	            this.$emit('input', value.color);
	            this.$emit('change');
	        }
	    }
	};
</script>