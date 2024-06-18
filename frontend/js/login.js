const form = document.querySelector('#login-form');

let accessToken = null;

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

    accessToken = data.access_token;
    console.log(accessToken,"accessToken");
    
    const info = document.querySelector('#login-info');
    info.innerText = "로그인 되었습니다."
    
    window.location.pathname = "/";

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