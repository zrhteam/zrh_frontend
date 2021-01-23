<template>
    <div style="">
        <BaseScatterChart/>
        <div id="container">
            <RefChart v-for="(chartData, index) in chartDataList"
                      :chartData="chartData"
                      :key="chartData.chartKey"/>
        </div>
    </div>
</template>

<script>
    import BaseScatterChart from "@/components/mychart/BaseScatterChart/BaseScatterChartIndex.vue";
    import RefChart from "@/components/mychart/RefChart/RefChartIndex.vue";
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
                chartDataList: 'get_analyze/renderChartDataList'
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
