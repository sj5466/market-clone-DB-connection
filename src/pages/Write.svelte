<script>
    import { getDatabase, ref, set,push } from "firebase/database";
    import Nav from "../components/Nav.svelte";
    import { getStorage, ref as refImage, uploadBytes, getDownloadURL } from "firebase/storage";

    let title; 
    let price;
    let description;
    let place;
    let files;

    const db = getDatabase();
    const storage = getStorage();

    function writeUserData(imgUrl) {
        push(ref(db, 'items/'), {
            title,
            price,
            description,
            place,
            insertAt : new Date().getTime(),
            imgUrl
        });
        window.location.hash = "/";
    }
    
    const uploadFile = async () => {
        const file = files[0]
        const fileName = file.name
        const imgRef = refImage(storage, fileName)
        await uploadBytes(imgRef,file);
        const url = await getDownloadURL(imgRef);
        return url;
    };

    const handleSubmit = async () =>{
        const url = await uploadFile();
        writeUserData(url);
    }
</script>

<form id="write-form" on:submit|preventDefault={handleSubmit}>
    <div style="margin-bottom: 5px">
        <label for="image">이미지</label>
        <input type="file" bind:files id="image" name="image" />
    </div>
    <div style="margin-bottom: 5px">
        <label for="title">제목</label>
        <input type="text" id="title" name="title" bind:value={title}/>
    </div>
    <div style="margin-bottom: 5px">
        <label for="price">가격</label>
        <input type="number" id="price" name="price" bind:value={price}/>
    </div>
    <div style="margin-bottom: 5px">
        <label for="description">설명</label>
        <input type="text" id="description" name="description" bind:value={description}/>
    </div>
    <div style="margin-bottom: 5px">
        <label for="place">장소</label>
        <input type="text" id="place" name="place" bind:value={place}/>
    </div>
    <div>
        <button type="submit" class="write-button">글쓰기 완료</button>
    </div>
</form>
<Nav location="write"/>

<style>
.write-button{
    background-color: tomato !important;
    margin: 10px;
    border-radius: 25px;
    padding: 5px 12px;
    color: #fff;
    cursor: pointer;
}
</style>