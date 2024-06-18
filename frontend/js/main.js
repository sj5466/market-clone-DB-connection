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

const renderData = (data) =>{
  const main = document.querySelector("#main");
  //  데이터를 최신 순으로 가져옴
  data.reverse().forEach(async item => {
    // image 생성
     const res = await fetch(`/image/${item.id}`);
     const block = await res.blob();
     const url =URL.createObjectURL(block);

    // html 생성
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="item-list_img">
        <img src="${url}" alt="image" />
      </div>
      <div class="item-list_info">
        <div class="item-list_info_title">${item.title}</div>
        <div class="item-list_info_meta">${item.place} ${calcTime(item.insertAt)}</div>
        <div class="item-list_info_price">${item.price}</div>
      </div>
    `
    div.classList.add('item-list');
    main.appendChild(div)
  });
  console.log(data,"data");
}

const fetchList = async () =>{
  const res = await fetch("/items");
  
  if(res.status === 401){
    alert("로그인이 필요합니다.");
    window.location.pathname ="/login.html";
    return
  }
  const data = await res.json()
  renderData(data);
}

fetchList();