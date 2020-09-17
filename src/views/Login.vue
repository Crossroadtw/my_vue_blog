<template>
    <div class="Login">
      <div class="login_wi">
      <div><el-input type="text" class="inputstyle" id="u" name="u" value="" tabindex="1"></el-input></div>
        <br>
      <div><el-input type="password" class="inputstyle" id="p" name="p" value="" maxlength="16" tabindex="2"></el-input></div>
        <br>
      <div style="padding: 0 5%"><a class="uncheck" id="p_low_login_enable" href="javascript:void(0);" tabindex="5"></a><label >下次自动登录</label></div>
      <br>
        <div><el-input type="submit" tabindex="6" value="登 录" class="btn" id="login_button"></el-input></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped>
.login_wi {
  width: 330px;
  height: 336px;
  background: white;
}
.Login {
  height: 100%;
  width: 100%;
  min-height: 550px;
}
.inputstyle {
  top: 0px;
  padding: 3% 12% 3% 3%;
  left: 0px;
  border-radius: 3px;
  width: 80%;
}
.uncheck {
  height: 16px;
  width: 16px;
  border: 1px solid #357bc1;
  float: left;
  outline: none;
}
.btn {
  height: 40px;
  line-height: 39px;
  width: 80%;
  outline: none;
  font-weight: normal;
  color: #fff;
  font-size: 18px;
  /*padding: 10px 40px 10px 10px;*/
  padding: 3% 12% 3% 3%;
  border: none;
}
</style>
