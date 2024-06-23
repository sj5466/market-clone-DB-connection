
<script>
  import { onMount } from "svelte";
  import Nav from "../components/Nav.svelte"
  import { getDatabase, ref, onValue } from "firebase/database";

  const db = getDatabase();
  const itemsRef = ref(db, 'items/');

  let hour = new Date().getHours().toString();
  let min = new Date().getMinutes().toString(); 
  hour = hour.padStart(2,"0");
  min = min.padStart(2,"0");

  $: items = []

  onMount(()=>{
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      items = Object.values(data).reverse();
    });
  });

  const calcTime = (timestamp) =>{
    //  UTC 시간으로 등록 돼 있으니까 -9 를 해줌
    const curTime = new Date().getTime() -9 * 60 *60 *1000;
    const time = new Date(curTime - timestamp);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    
    if(hour > 0) return `${hour}시간 전`
    else if (minute > 0) return `${minute}분 전`
    else if (second > 0) return `${second}초 전`
    else return '방금전'
  }

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
    {#each items as item}
    <div class="item-list">
      <div class="item-list_img">
        <img src={item.imgUrl} alt={item.title}>
      </div>
      <div class="item-list_info">
        <div class="item-list_info_title">{item.title}</div>
        <div class="item-list_info_meta">{item.place} {calcTime(item.insertAt)}</div>
        <div class="item-list_info_price">{item.price}</div>
        <div>{item.description}</div>
      </div>
    </div>
    {/each}
    <a class="wirte-btn" href="#/write" target="_blank">+ 글쓰기</a>
  </main>
  <Nav location="home"/>
 
<div class="media-info-msg">화면 사이즈를 줄여주세요</div>