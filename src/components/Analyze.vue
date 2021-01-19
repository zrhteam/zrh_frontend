<template>
    <div style="">
        <BaseScatterChart/>
        <div id="container">
            <RefChart v-for="(insight, index) in insightList"
                      :pid="insight.pid"
                      :type="insight.type"
                      :chartKey="insight.chartKey"
                      :key="insight.chartKey"/>
        </div>
    </div>
</template>

<script>
    import BaseScatterChart from "@/components/mychart/baseScatterChart/BaseScatterChartIndex.vue";
    import RefChart from "@/components/mychart/refChart/RefChartIndex.vue";
    import {mapGetters} from "vuex";

    export default {
        name: "Analyze",
        components: {RefChart, BaseScatterChart},
        data() {
            return {
            }
        },
        methods: {
        },
        computed: {
            ...mapGetters({
                insightList: 'get_analyze/renderChartDataList'
            })
        }
    }
</script>

<style scoped>
    #container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
</style>
