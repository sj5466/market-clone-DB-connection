<script>
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { user$ } from "../store";
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const loginWithGoogle =async () =>{
        try{
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
            user$.set(user);
            localStorage.setItem("token",token);
        }catch(error){
           console.log(error);
        }
        
        // 아래 형식을 위에 구문으로 대체함
        // signInWithPopup(auth, provider)
        // .then((result) => {
        //     // This gives you a Google Access Token. You can use it to access the Google API.
        //     const credential = GoogleAuthProvider.credentialFromResult(result);
        //     const token = credential.accessToken;
        //     // The signed-in user info.
        //     const user = result.user;
        //     // IdP data available using getAdditionalUserInfo(result)
        //     // ...
        // }).catch((error) => {
        //     // Handle Errors here.
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // The email of the user's account used.
        //     const email = error.customData.email;
        //     // The AuthCredential type that was used.
        //     const credential = GoogleAuthProvider.credentialFromError(error);
        //     // ...
        // });
    }
    
</script>

<div>
    {#if $user$}
        <div>{$user$}</div>
    {/if}
    <div>로그인하기</div>
    <button class="login-btn" on:click={loginWithGoogle}>
       <img class="google-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThia7UIb2-xPy1OluC6hsJt4lup7GY7J-PUA&s" alt="">
        <div>Google로 시작하기</div>
    </button>
</div>

<style>
.login-btn{
    width: 200px;
    height: 50px;
    border: 1px solid gray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
}
.google-img{
    width: 20px;
}
</style>
<!-- <form id="login-form" action="/signup" method="POST">
    <div>로그인 페이지</div>
    <div>
        <label for="id">아이디</label>
        <input type="text" id="id" name="id" required />
    </div>
    <div>
        <label for="password">패스워드</label>
        <input type="password" id="password" name="password" required />
    </div>
    <div>
        <button type="submit">로그인</button>
    </div>
<div id="login-info"></div>
</form> -->