<template>
<!--  <div id="register">-->
<!--    <form  style="margin:20px;border:1px solid red" method="post" action="http://localhost:5000/register">-->
<!--        <span>username:</span><input type="text" name="username" id="username"><br/>-->
<!--        <span>password:</span><input type="password" name="password" id="password"><br/>-->
<!--        <button type="submit" id="registerBtn">register</button>-->
<!--    </form>-->
<!--  </div>-->
<!--  <PrjOverview></PrjOverview>-->
  <PrjDataScreen></PrjDataScreen>
<!--  <PrjAnalysis></PrjAnalysis>-->
</template>
<script>
import PrjOverview from "@/components/views/Project/PrjOverview.vue";
import PrjDataScreen from "@/components/views/Project/PrjDataScreen.vue";
import PrjAnalysis from "@/components/views/Project/PrjAnalysis.vue";

export default {
  components: {PrjOverview, PrjAnalysis, PrjDataScreen},
}
</script>