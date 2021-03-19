<template>
    <div id="search_module">
        <div id="loginOut" v-show = "isLogin">
            <v-button @click="loginOut" type="warning" id="loginOutBtn">loginOut</v-button>
        </div>
        <div class='search'>
            <div id="searchByName">
                <span>component_name:</span>
                <input type="component_name" name="component_name" id="component_name" v-model="component_name">
                <button @click="getInfo" type="submit" id="getInfoBtn" value=search_module>submit</button>
                </br>
                </br>
                </br>
                <span>module:</span>
                <textarea id="output" name="output" rows="6" cols="37"></textarea>
                <svg></svg>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'SearchModule',
    data() {
        return {
            component_name: '',
            isLogin: true,
            dataset: []
        }
     },
    methods: {
        getInfo () {
            let params = new URLSearchParams();

            params.append('component_name', this.component_name);
            axios.post(`http://localhost:5000/api/search_module`, params)
                .then((ret) => {
                    var jsonObj = JSON.parse(JSON.stringify(ret));
                    console.log(JSON.stringify(jsonObj));
                    this.info = ret.status
                    if(ret.data.length === 0){
                        alert("您的输入有误，请重新输入！")
                    }
                    else{// debugger
                        this.dataset = ret.data
                        var content = document.getElementById("output")
                        content.value = ""
                        for (var i = 0; i < this.dataset.length; i++) {
                            this.dataset[i]["value"] = 1
                            content.value = content.value + this.dataset[i].belonged_equipment + " "
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error.response)
                })
        },
        drawPie(){// 之前的d3版本是"d3": "^3.4.5",
            document.querySelector('svg').innerHTML = '';
            var svg = d3.select('svg');
            debugger
            // var color = d3.schemeCategory10;
            function getColor(idx){
                var color = ['#A9E2F3', '#58D3F7', '#58ACFA', '#2E9AFE', '#0080FF', '#5858FA', '#AC58FA', '#FA58F4']
                return color[idx % color.length];
            }
            // 这样的值是不能直接绘制图形的，例如绘制饼图的一部分，需要知道一段弧度的起始位置和终止角度，这些值都不存在于数组的dataset中，因此需要用到布局
            // 布局的作用就是：计算出适合于作图的数据
            var pie = d3.pie()
	        .sort(null)
	        .value(function(d){
		        return d.value;
	        });
	    //debugger
        var piedata = pie(this.dataset)
        console.log(piedata)//5个整数倍转换成了5个对象，每个对象都有：起始角度（startAngle）和终止角度（endAngle），还有原数据（属性名称为 data）。这些都是绘图需要的数据。
        // 绘制图形
        // 为了根据转换后的piedata绘图，还需要一样工具：生成器
        // 弧生成器
        var outerRadius = 120;
        var innerRadius = 0;
        var arc = d3.arc()//弧生成器；
                    .innerRadius(innerRadius)//设置内半径
                    .outerRadius(outerRadius)//设置外半径
        // 先添加g，再添加path
        var arcs = svg.selectAll('g')
                      .data(piedata)
                      .enter()
                      .append('g')
                      .attr("transform", "translate(200,200)");
        // 接下来给每个g添加path
        arcs.append('path')
            .attr('fill', function (d, i) {
                //return color[i]
                return getColor(i);
            })
            .attr('d', function (d) {
                return arc(d)
            })
        // 添加文本
        arcs.append("text")
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")//水平居中；
            .text(function (d) {
                return d.data.belonged_equipment;
            });
        },
        loginOut(){
            this.$cookies.remove("username")
            this.$cookies.remove("password")
            this.isLogin = false
            this.$router.push({path: '/login'});
        }
    },
    watch: {
        dataset: function(){
            this.drawPie()
        }
    },
    created() {
        if(this.$cookies.isKey("username") === false){
            this.isLogin = false
            this.$router.push({path: '/login'});
        }
        this.getInfo()
    }
}
</script>
<style scoped>
	#search_module{
	    width: 100%;
	    height: 100%;
	    position: relative;
	    background-image: url(../../particles/bg.jpg);
	    background-position: 50% 50%;
	    background-size: cover;
	    background-repeat: no-repeat;
	    margin-left: auto;
	    margin-right: auto;
	}
	.search{
	    z-index: 2;
        position: absolute;
        width: 500px;
        border-radius: 5px;
        height: 260px;
        background: white;
        box-shadow: 0px 0px 5px #333333;
        top: 50%;
        left: 50%;
        margin-top: -300px;
        //margin-top: -100px;
        margin-left: -250px;
        transition: all 1s;
        -moz-transition: all 1s; /* Firefox 4 */
        -webkit-transition: all 1s; /* Safari 鍜� Chrome */
        -o-transition: all 1s; /* Opera */
	}
	#searchByName {
        margin-top: 60px;
        padding-left: 40px;
        box-sizing: border-box;
        color: #333333;
        margin-bottom: 50px;
    }
    #loginOut {
        text-align: right
    }
    svg {
        height: 318px;
        width: 460px;
      /* // display: block;*/
        margin: 0;
        z-index: 2
    }
    text {
        fill: #fff;
    }
</style>