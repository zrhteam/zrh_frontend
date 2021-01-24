// 写全局函数
exports.install = function (Vue, options) {
    Vue.prototype.headNodeClick = function (headquarter_name) {//全局函数1,点击树形控件的总部，查询该总部的大屏信息
      let param = new URLSearchParams();
      param.append('headquarter_name', headquarter_name);
      this.$store.commit('get_headquarter/changeParams', {params: param})
      this.$store.dispatch('get_headquarter/getInitRectification')
      this.$store.dispatch('get_headquarter/getInitRiskLevelData')
      this.$store.dispatch('get_headquarter/getInitRiskNumberRank')
      this.$store.dispatch('get_headquarter/getInitImage')
      this.$store.dispatch('get_headquarter/getInitNumberTop')
      this.$store.dispatch('get_headquarter/getInitRiskList')
      this.$store.dispatch('get_headquarter/getInitRiskIndexData')
    };
    Vue.prototype.regionNodeClick = function (region_name) {//全局函数2,点击树形控件的区域，查询该区域的大屏信息
      let param = new URLSearchParams();
      param.append('region_name', region_name);
      this.$store.commit('get_region/changeParams', {params: param})
      this.$store.dispatch('get_region/getInitRegionProjectNumber')
      this.$store.dispatch('get_region/getInitRegionRiskLevel')
      this.$store.dispatch('get_region/getInitRegionHighRisk')
      this.$store.dispatch('get_region/getInitRegionImage')
      this.$store.dispatch('get_region/getInitRegionMajor')
      this.$store.dispatch('get_region/getInitRegionNumberTop')
      // this.$store.dispatch('get_region/getInitRegionSafetyIndex')
      this.$store.dispatch('get_region/getInitRegionRiskRank')
    };
    Vue.prototype.prjNodeClick = function (project_name) {//全局函数3,点击树形控件的项目，查询该项目的大屏信息
        let param = new URLSearchParams();
        param.append('project_name', project_name);
        this.$store.commit('get_project/changeParams', {params: param})
        this.$store.dispatch('get_project/getInitProjectRectification')
        this.$store.dispatch('get_project/getInitProjectRiskLevel')
        this.$store.dispatch('get_project/getInitProjectHistoryPerception')
        this.$store.dispatch('get_project/getInitProjectNumberChange')
        // // 当前未整改高风险隐患列表
        this.$store.dispatch('get_project/getInitPrjRisk')
        // // 当前未整改高风险隐患图片
        this.$store.dispatch('get_project/getInitProjectImage')
        // //占比
        this.$store.dispatch('get_project/getInitProjectSystem')
        this.$store.dispatch('get_project/getInitProjectRegionDistribution')
        this.$store.dispatch('get_project/getInitProjectReason')
        //  历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
        this.$store.dispatch('get_project/getInitProjectRiskTop')
        // this.map.setZoom(4)
        // setTimeout(function () {
        //   this.map.panTo(new L.LatLng(34, 107));
        // }, 100)
    };
    Vue.prototype.checkNodeClick = function (check_code) {//全局函数4,点击树形控件的检查，查询该检查的大屏信息
        let param1 = new URLSearchParams();
        param1.append('check_code', check_code);
        this.$store.commit('get_check/changeParams', {params: param1})
        this.$store.dispatch('get_check/getCheckRectification')
        this.$store.dispatch('get_check/getCheckRiskLevel')
        this.$store.dispatch('get_check/getCheckRiskRatio')
        this.$store.dispatch('get_check/getCheckHighRisk')
        this.$store.dispatch('get_check/getCheckHighImage')
        this.$store.dispatch('get_check/getCheckMajorSystem')
        this.$store.dispatch('get_check/getCheckMajorArea')
        this.$store.dispatch('get_check/getCheckMajorStage')
        this.$store.dispatch('get_check/getCheckRiskTop')
    };
};