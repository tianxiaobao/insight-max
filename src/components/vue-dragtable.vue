<template>
    <div class="vue-dragtable-container">
        <table id="vue-dragtable">
            <thead>
                <tr>
                    <th v-for="item,$index in dragTableData.header" @mousedown="bindResize($event, $index)" @mouseleave="unbindResize">
                        <!--div :class="'resize' + $index" class="tablecell" :style="{width: width[$index] + 'px'}"-->
                        <div class="tablecell"
                            :class="'resize' + $index" 
                            :style="{width: Math.max(w/dragTableData.header.length, 200) + 'px'}">
                            {{ item }}
                        </div>
                        <!--div class="movebar" @mousedown="bindResize($event, $index)"></div-->
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in dragTableData.value">
                    <td v-for="data,$index in item">
                        <div class="tablecell"
                            :class="'resize' + $index" 
                            :style="{width: Math.max(w/dragTableData.header.length, 200) + 'px'}">
                            {{ data }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="tip-text" v-show="dragTableData.loading && !finished">正在加载数据...</div>
        <div class="tip-text" v-show="finished">已加载全部</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'vue-dragtable',
    props: {
        step: {
            type: Number,
            required: false,
            default: 20
        },
        max: {
            type: Number,
            required: false,
            default: 1000
        }
    },
    mounted () {
        this.$emit('loadData');
        this.w = document.getElementsByClassName('vue-dragtable-container')[0].clientWidth;
        // bin scroll
        const container = document.getElementsByClassName('vue-dragtable-container')[0];
        container.addEventListener('scroll', this.scroll);
        // bin document mouseup
        document.addEventListener('mouseup', this.unbindResize);
    },
    data () {
        return {
            index: null,
            targetElement: null,
            init: true,
            width: [],
            w: 0
        };
    },
    methods: {
        scroll (e) {
            if (!this.dragTableData.loading && !this.finished && e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight && e.target.scrollTop > 0) {
                this.dragTableData.loading = true;
                this.$emit('loadData', { currentCount: this.count, step: this.step });
                e.target.scrollTop = e.target.scrollTop - 10;
            }
        },
        bindResize (e, index) {
            if (e.target.clientWidth - e.offsetX < 10) {
                this.index = index;
                this.targetElement = e.target;
                this.targetElement.addEventListener('mousemove', this.resize);
            }
        },
        resize (e) {
            if (e.offsetX > 10) {
                const className = `resize${this.index}`;
                const items = document.getElementsByClassName(className) || [];
                for (let i = 0; i < items.length; i++) {
                    items[i].style.width = `${e.offsetX - 32}px`;
                }
                // this.width[this.index] =  e.offsetX - 32;
            } else if (e.offsetX < 10) {
                this.targetElement.removeEventListener('mousemove', this.resize);
            }
        },
        unbindResize () {
            if (this.targetElement) {
                this.targetElement.removeEventListener('mousemove', this.resize);
            }
        }
    },
    computed: {
        ...mapGetters(['dragTableData']),
        finished () {
            if (this.dragTableData.value) {
                return this.dragTableData.value.length >= Math.min(this.max, this.dragTableData.total);
            } else {
                return false;
            }
        }
    }
};
</script>
<style scoped>
    #vue-dragtable {
        border-collapse: collapse;
    }
    #vue-dragtable th div.tablecell, #vue-dragtable td div.tablecell {
        white-space: nowrap;
        overflow: hidden;
        padding: 10px;
        text-overflow: ellipsis;
        text-align: left;
        display: inline-block;
    }
    #vue-dragtable th, #vue-dragtable td{
        border: 1px solid #dde5eb;
        white-space: nowrap;
        text-align: left;
    }
    #vue-dragtable thead tr, #vue-dragtable tbody tr:nth-child(even) {
        background-color: #f3f7fb;
    }
    .vue-dragtable-container {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    #vue-dragtable th:after {
        height: 37px;
        width: 21px;
        display: inline-block;
        cursor: ew-resize;
        content: '1';
        vertical-align: top;
        color: transparent;
        position: relative;
        left: 11px;
    }
    .tip-text {
        color: #ccc;
        padding: 10px;
        text-align: center;
    }
    .tablecell {
        width: 20%;
    }
</style>
