const fetchTitle = (id) => {
    //const api = 'AIzaSyACJNJ2tVcA5slF7KKvBMB0EE7pEyUqaO0';
    const api2 = 'AIzaSyAsfCGrp5M1i5v0_Qbe7Tkajyrm-YfRn3w';
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&fields=items(id%2Csnippet)&key=${api2}`).then(res => {
        res.json().then(responce => {
            let div = document.querySelector(".video");

            let title = document.createElement("h3");
            title.innerText = responce.items[0].snippet.title;
            document.querySelector("title").innerText = responce.items[0].snippet.title;
            div.append(title);
        });
    });
}
const setVideo = (id) => {
    let video = document.querySelector("iframe");
    video.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=0`;
    fetchTitle(id);
}
const getLocalSorage = () => {
    const arr = JSON.parse(localStorage.getItem("youKey")) || [];
    setVideo(arr[0].id);
}
getLocalSorage();
