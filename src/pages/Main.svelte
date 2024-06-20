
<script>
    let hour = new Date().getHours().toString();
    let min = new Date().getMinutes().toString(); 
    hour = hour.padStart(2,"0")
    min = min.padStart(2,"0")
</script>

<header id="header">
    <div class="info-bar">
      <div class="info-bar_time">{hour}:{min}</div>
      <div class="info-bar_icons">
        <img src="asset/chart-icon.svg" alt="chart icon" />
        <img src="asset/wifi.svg" alt="wifi" />
        <img src="asset/barttery.svg" alt="barttery" />
      </div>
    </div>
    <div class="menu-bar">
      <div class="menu-bar_location">
        <div>역삼 1동</div>
        <div class="menu-bar_location-icon">
          <img src="asset/arrow.svg" alt="arrow" />
        </div>
      </div>
      <div class="menu-bar_icons">
        <img src="asset/search.svg" alt="search" />
        <img src="asset/menu.svg" alt="menu" />
        <img src="asset/alert.svg" alt="alert" />
      </div>
    </div>
  </header>
  <main id="main">
    <a class="wirte-btn" href="#/write" target="_blank">+ 글쓰기</a>
  </main>
  <footer>
    <div class="footer-block">
      <div class="footer-icons">
        <div class="footer-icons_img">
          <img src="asset/home.svg" alt="home" />
        </div>
        <div class="footer-icons_desc">홈</div>
      </div>
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
      <div class="footer-icons">
        <div class="footer-icons_img">
          <img src="asset/user.svg" alt="user" />
        </div>
        <div class="footer-icons_desc">나의 당근</div>
      </div>
    </div>
</footer>
<div class="media-info-msg">화면 사이즈를 줄여주세요</div>