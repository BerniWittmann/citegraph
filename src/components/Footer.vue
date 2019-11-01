<template>
  <el-row class="footer-wrap">
    <el-col :span="24" class="footer-col">
      <el-row class="footer">
        <el-col :lg="12" :md="12" :sm="12" :xs="24">
          <p class="footer-paragraph">
            <router-link :to="{ name: 'home' }">{{ $t('footer.home') }}</router-link>
          </p>
          <p class="footer-paragraph">
            <router-link :to="{ name: 'about' }">{{ $t('footer.about') }}</router-link>
          </p>
        </el-col>
        <el-col :lg="{span: 7, offset: 5}" :md="{span: 7, offset: 5}" :sm="{span: 7, offset: 5}"
                :xs="{span: 24}">
          <p class="footer-paragraph">
            {{ $t('footer.version', { version: version }) }}
          </p>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.footer-wrap {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  & > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    & > a {
      align-self: flex-start
    }
  }
  .footer {
    padding: 30px 20vw;
    background: $footer_bg_color;
    color: $footer_text_color;
    margin: 0;
    .footer-paragraph {
      font-size: 14px;
      &, p {
        color: inherit;
        -webkit-margin-before: 0;
        -webkit-margin-after: 0.4em;
      }
      &, a {
        &, &:hover, &:visited, &:focus, &:active {
          color: inherit;
          text-decoration: none;
        }
        -webkit-margin-before: 0;
        -webkit-margin-after: 0.4em;
      }
    }
  }
}
</style>
<script>
import packageInfo from '@/../package.json'

export default {
  name: 'Footer',
  computed: {
    version () {
      return packageInfo.version
    }
  }
}
</script>
