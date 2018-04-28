<template>
    <div class="mainCon">
        <div class="indexTit">
            <h2 class="fl"><i class="titIcon"></i>数据源</h2>
            <disappear-tips :show="operationTipsS"
                            :level="''"
                            :content="'温馨提示:操作成功'"
                            >
            </disappear-tips>
            <disappear-tips :show="operationTipsF"
                            :level="'danger'"
                            :content="'温馨提示:操作失败'"
                            >
            </disappear-tips>
        </div>
        <!-- 基本信息 begin -->
        <div class="innerCon">
            <div class="statement">
                <datasource-list>
                </datasource-list>
                <common-table>
                </common-table>
            </div>
        </div>
        <!-- 基本信息 end -->
    </div>
</template>
<script>
import disappearTips from './components/disappearTips';
import commonTable from './components/pageComponent/commonTable';
import datasourceList from './components/pageComponent/datasourceList';
export default {
    name: 'datasource',
    components: { disappearTips, commonTable, datasourceList },
    computed: {
        /**
         * [operationTipsF ]
         * @return {[type]} [description]
         */
        operationTipsF () {
            return this.$store.getters.operationFailed;
        },
        operationTipsS () {
            return this.$store.getters.operationSuccess;
        }
    }
};
</script>
<style>
.break-word td {
    word-break: break-word;
}
.vuetip.tip {
    display: block;
}
html{
    overflow-x: auto;
}
</style>
