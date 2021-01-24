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
    Vue.prototype.handleTreeNodeClick = function (data, node) {//全局函数5,点击树形控件，查看页面权限，决定页面展示
        if (this.$store.state.get_login.grant_data.data.user_grant === '项目') {
            if ((node.level == 1) || (node.level == 2)) {
                alert("您没有权限")
            } else if (node.level == 3) {
                this.prjNodeClick(data.label)
                document.getElementById('prj_subpart').style.display = 'block'
                document.getElementById('check_part').style.display = 'none'
                document.getElementById('map_1').style.display = 'none'
                document.getElementById('map_2').style.display = 'block'
                document.getElementById('prj_charts').style.display = 'block'
                document.getElementById('check_charts').style.display = 'none'
            } else if (node.level == 4) {
                this.checkNodeClick(data.label)
                //首先要判断当前是在数据大屏页面还是在主页面
                if (document.getElementById("prj_small").style.display === 'none') {//在主页面
                    document.getElementById("prj_subpart").style.display = 'none'
                    document.getElementById("prj_charts").style.display = 'none'
                    document.getElementById("check_charts").style.display = 'block'
                    document.getElementById("check_part").style.display = 'block'
                } else {
                    document.getElementById("prj_subpart").style.display = 'none'
                    document.getElementById("prj_charts").style.display = 'none'
                    document.getElementById("check_charts").style.display = 'block'
                    document.getElementById("check_part").style.display = 'block'
                    // document.getElementById("large1").style.display = 'none'
                    // document.getElementById("large2").style.display = 'none'
                }
            }
        } else if (this.$store.state.get_login.grant_data.data.user_grant === '区域') {
            if (node.level == 1) {
                alert("您没有权限")
            } else if (node.level == 2) {
                this.regionNodeClick(data.label)
                document.getElementById('region').style.display = 'block'
                document.getElementById('prj_part').style.display = 'none'
            } else if (node.level == 3) {//区域=》项目
                this.prjNodeClick(data.label)
                //首先要判断当前是在数据大屏页面还是在主页面=》不用再判断了，大屏页面没有树形控件
                document.getElementById('region').style.display = 'none'
                document.getElementById('prj_part').style.display = 'block'
                document.getElementById("prj_subpart").style.display = 'block'
                document.getElementById("check_part").style.display = 'none'
            } else if (node.level == 4) {//区域=》检查
                this.checkNodeClick(data.label)
                document.getElementById('region').style.display = 'none'
                document.getElementById('prj_part').style.display = 'block'
                document.getElementById("prj_subpart").style.display = 'none'
                document.getElementById("check_part").style.display = 'block'
            }
        } else if (this.$store.state.get_login.grant_data.data.user_grant === '总部') {
            if (node.level == 1) {//总部=》总部
                this.headNodeClick(data.label)
                document.getElementById('head_quarter').style.display = 'block'
                document.getElementById('region_part').style.display = 'none'
            } else if (node.level == 2) {//总部=》区域
                this.regionNodeClick(data.label)
                // console.log("检查", data)
                // console.log(node)
                //首先要判断当前是在数据大屏页面还是在主页面=>不需要再判断了，大屏页面不要树形控件
                document.getElementById('head_quarter').style.display = 'none'
                document.getElementById('region_part').style.display = 'block'
                document.getElementById('region').style.display = 'block'
                document.getElementById('prj_part').style.display = 'none'
                //为了画出多边形，要重新封装该区域的数据
                let r_p = [];
                for (let i in data['children']) {
                    // alert(data['children'][i])
                    console.log(data['children'][i]['pos'])
                }
                var container = L.DomUtil.get('map_3');
                if (container != null) {
                    container._leaflet_id = null;
                }
                this.map = new L.map("map_3");
                // this.map.setView([30,30], 6)
                // this.map = L.map("map_3", {
                //   center: [34, 107], // 地图中心
                //   zoom: 4, //缩放比列
                //   zoomControl: false, //禁用 + - 按钮
                //   // doubleClickZoom: false, // 禁用双击放大
                //   attributionControl: false // 移除右下角leaflet标识
                // });
                // this.map.panTo(data.pos[0], data.pos[1])
            } else if (node.level == 3) {//总部=》项目
                this.prjNodeClick(data.label)
                document.getElementById("head_quarter").style.display = 'none'
                document.getElementById('region_part').style.display = 'block'
                document.getElementById('region').style.display = 'none'
                document.getElementById('prj_part').style.display = 'block'
                document.getElementById("prj_subpart").style.display = 'block'
                document.getElementById('check_part').style.display = 'none'
            } else if (node.level == 4) {//总部=》检查
                this.checkNodeClick(data.label)
                document.getElementById("head_quarter").style.display = 'none'
                document.getElementById('region_part').style.display = 'block'
                document.getElementById('region').style.display = 'none'
                document.getElementById('prj_part').style.display = 'block'
                document.getElementById("prj_subpart").style.display = 'none'
                document.getElementById('check_part').style.display = 'block'
            }
        } else if (this.$store.state.get_login.grant_data.data.user_grant = "超级用户") {
            // this.headNodeClick(data.label)
            if (node.level == 1) {//总部=》总部
                this.headNodeClick(data.label)
                document.getElementById('head_quarter').style.display = 'block'
                document.getElementById('region_part').style.display = 'none'
            } else if (node.level == 2) {//总部=》区域
                this.regionNodeClick(data.label)
                // console.log("检查", data)
                // console.log(node)
                //首先要判断当前是在数据大屏页面还是在主页面=>不需要再判断了，大屏页面不要树形控件
                document.getElementById('head_quarter').style.display = 'none'
                document.getElementById('region_part').style.display = 'block'
                document.getElementById('region').style.display = 'block'
                document.getElementById('prj_part').style.display = 'none'
                //为了画出多边形，要重新封装该区域的数据
                let r_p = [];
                for (let i in data['children']) {
                    // alert(data['children'][i])
                    console.log(data['children'][i]['pos'])
                }
                var container = L.DomUtil.get('map_3');
                if (container != null) {
                    container._leaflet_id = null;
                }
                this.map = new L.map("map_3");
                // this.map.setView([30,30], 6)
                // this.map = L.map("map_3", {
                //   center: [34, 107], // 地图中心
                //   zoom: 4, //缩放比列
                //   zoomControl: false, //禁用 + - 按钮
                //   // doubleClickZoom: false, // 禁用双击放大
                //   attributionControl: false // 移除右下角leaflet标识
                // });
                // this.map.panTo(data.pos[0], data.pos[1])
            } else if (node.level == 3) {//总部=》项目
                this.prjNodeClick(data.label)
                document.getElementById("head_quarter").style.display = 'none'
                document.getElementById('region_part').style.display = 'block'
                document.getElementById('region').style.display = 'none'
                document.getElementById('prj_part').style.display = 'block'
                document.getElementById("prj_subpart").style.display = 'block'
                document.getElementById('check_part').style.display = 'none'
            } else if (node.level == 4) {//总部=》检查
                this.checkNodeClick(data.label)
                document.getElementById("head_quarter").style.display = 'none'
                document.getElementById('region_part').style.display = 'block'
                document.getElementById('region').style.display = 'none'
                document.getElementById('prj_part').style.display = 'block'
                document.getElementById("prj_subpart").style.display = 'none'
                document.getElementById('check_part').style.display = 'block'
            }
        }
    };
};