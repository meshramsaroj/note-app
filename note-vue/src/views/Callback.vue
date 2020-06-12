<template>
  <div class="about">
    <h1>
    your at callback
    </h1>
  </div>
</template>

<script lang="ts">
import router from '../router';
// import IdTokenVerifier from 'idtoken-verifier';

// const verifier = new IdTokenVerifier({
//     issuer: 'https://staging-accounts.castlecraft.in',
//     // jwksURI: '.well-known/jwks'
// });

export default {
  data() {
    if (this.$route.hash){
      const hash = this.$route.hash.substring(1);
      const params: {
        access_token?: string;
        expires_in?: number;
        id_token?: string;
        scope?: string;
      } = {};
      hash.split('&').map(hk => {
        const temp = hk.split('=');
        params[temp[0]] = temp[1];
      });

      const date = new Date();
      date.setSeconds(date.getSeconds() + Number(params.expires_in));
      localStorage.setItem('token_expiry', date.toString());
      localStorage.setItem('access_token', params.access_token);
      localStorage.setItem('scope', params.scope.toString());

      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(0, 4) === 'oidc') {
          localStorage.removeItem(localStorage.key(i));
        }
      }
      router.push('/');
    }

    return {};
  },
};
</script>

