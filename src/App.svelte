<script>
  import Router from "svelte-spa-router";
  import Login from "./pages/Login.svelte";
  import Main from "./pages/Main.svelte";
  import Signup from "./pages/Signup.svelte";
  import Write from "./pages/Write.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import Loading from "./pages/Loading.svelte";
  import "./css/style.css";
  import { user$ } from "./store";
  import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";  
  import { onMount } from "svelte";
  import Mypage from "./pages/Mypage.svelte";

  let isLoading = true;

  const auth = getAuth();

  const checkLogin = async () =>{
    
    const token = localStorage.getItem("token");
    if (!token) return isLoading = false;

    const credential = GoogleAuthProvider.credential(null, token);
    const result = await signInWithCredential(auth, credential);
    const user = result.user;
    user$.set(user);
    isLoading = false;
    console.log(user,'user!!!');
  }

  onMount(() => checkLogin());
  
  const routes ={
    '/' :Main,
    // '/login' : Login,
    '/signup' :Signup,
    '/write' : Write,
    '/my' : Mypage,
    '*' : NotFound
  }


</script>
{#if isLoading}
  <Loading />
{:else if !$user$}
  <Login />
{:else}
  <Router routes={routes}/>
{/if}
