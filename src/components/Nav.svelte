<script>
    export let location;
    
    const moveToHome = () => {
        window.location.hash ="/"
    }

    const moveToMyPage = () =>{
      window.location.hash = "/my";
    }
</script>

<footer>
    <div class="footer-block" >
      <button class="footer-icons" on:click={moveToHome}>
        <div class="footer-icons_img">
          {#if location === "home"}
          <img src="asset/home.svg" alt="home" />
          {:else}
          <img src="asset/emptyHome.svg" alt="home" />
          {/if}
        </div>
        <div class="footer-icons_desc">홈</div>
      </button>
      <div class="footer-icons">
        <div class="footer-icons_img">
          <img src="asset/doc.svg" alt="document" />
        </div>
        <div class="footer-icons_desc">동네생활</div>
      </div>
      <div class="footer-icons">
        <div class="footer-icons_img">
          <img src="asset/location.svg" alt="location" />
        </div>
        <div class="footer-icons_desc">내 근처</div>
      </div>
      <div class="footer-icons">
        <div class="footer-icons_img">
          <img src="asset/chat.svg" alt="chating" />
        </div>
        <div class="footer-icons_desc">채팅</div>
      </div>
      <button class="footer-icons" on:click={moveToMyPage}>
        <div class="footer-icons_img">
          {#if location === "my"}
           <img src="asset/fullUser.svg" alt="user">
          {:else}
           <img src="asset/user.svg" alt="user" />
          {/if}
        </div>
        <div class="footer-icons_desc">나의 당근</div>
      </button>
    </div>
</footer>