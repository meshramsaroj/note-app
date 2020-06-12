<template>
  <div class="home">
    <button v-bind:click="log()"></button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import storageService from '../services/storage/storage.service';
import loginHelper from '../services/login-helper/login-helper.service';
import LoginService from '../services/login/login.service';
import loginService from '../services/login/login.service';
import { from } from 'rxjs/observable/from';

@Component({
  components: {},
})
export default class Home extends Vue {
  public log() {
    const expiry = localStorage.getItem('token_expiry');
    if (expiry === null) {
      loginHelper.getInfo().subscribe({
        next: (response: any) => {
          if (response.data.message) {
            return;
          }
          storageService.setLocalStorage(response.data);
          from(LoginService.login()).subscribe({
            next: done => {
            },
            error : err => {
            },
          });
        },
        error: error => {
        },
      });
    } else if (new Date(expiry) < new Date()) {
      loginService.renewToken();
      return;
    }
  }
}
</script>
