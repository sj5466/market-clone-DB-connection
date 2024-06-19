const form = document.querySelector('#login-form');

const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const sha256Password = sha256(formData.get('password'));
    formData.set('password',sha256Password);

    
    const res = await fetch("/login", {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    const accessToken = data.access_token;
    window.localStorage.setItem("token",accessToken);
    alert("로그인 되었습니다.");
    
    const info = document.querySelector('#login-info');
    info.innerText = "로그인 되었습니다."
    
    window.location.pathname = "/";

    //  과제 : JWT 를 이용해서 만료시간이 지나면 다시 로그인하는 로직 구현

    // const btn = document.createElement("button");
    // btn.innerText = "상품 가져오기"
    // btn.addEventListener("click",async ()=>{
    //     const res = await fetch("/items",{
    //         headers:{
    //             Authorization : `Bearer ${accessToken}`
    //         }
    //     });
    //     const data = await res.json()
    //     console.log(data);
    // })

    // info.appendChild(btn);
}

form.addEventListener("submit",handleSubmit);