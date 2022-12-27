//FETCH SEARCH RESULT START
let btn = document.getElementById("submit");
let arr = [];
document.getElementById("search").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});

btn.addEventListener("click", () => {
    document.getElementById("container").innerHTML = null;
    document.getElementById("hrr").style.display = "none";
    document.getElementById("main").style.marginTop = "70px";
    setStyleForSearchResult();
    const key = document.getElementById("search").value;
    fetchData(key);
});

//FETCHING API
const fetchData = (key) => {
    //const api = 'PRIVATE_KEY';
    const api2 = 'PRIVATE_KEY2';

    const url = `https://youtube.googleapis.com/youtube/v3/search/?part=snippet&key=${api2}&type=video&q=${key}&maxResults=20`;

    fetch(url).then(res => {
        res.json().then(responce => {
            setToUi(responce.items);
        });
    });
}

//SET DATA TO UI START
const setToUi = (list) => {
    filterDesign();
    list.forEach(element => {
        const { snippet: { title, description, channelTitle, publishTime, thumbnails: { high: { url } } }, id: { videoId } } = element;

        const main = document.createElement("div");
        main.id = "Mainflex";

        const imgDiv = document.createElement("div");
        imgDiv.id = "imgDiv";
        const img = document.createElement("img");
        img.src = url;
        imgDiv.addEventListener("click", () => {
            setLocal(videoId);
            location.href = "result.html";
        });
        const subDiv = document.createElement("div");
        const heading = document.createElement("h3");
        heading.innerText = title;

        const publish = document.createElement("p");
        publish.id = "publish";
        publish.innerText = publishTime;

        const channel = document.createElement("p");
        channel.innerText = channelTitle;

        const dec = document.createElement("p");
        dec.innerText = description;

        imgDiv.append(img);
        subDiv.append(heading, publish, channel, dec);
        main.append(imgDiv, subDiv);

        document.getElementById("container").append(main);
    });
}

//SET DATA TO UI END

//FETCH SEARCH RESULT END

//HOME PAGE


const fetchDataForHomePage = () => {
    //const api = 'PRIVATE_KEY';
    const api2 = 'PRIVATE_KEY2';
    const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics&metrics=views&chart=mostPopular&regionCode=IN&maxResults=20&key=${api2}`;

    fetch(url).then(res => {
        res.json().then(responce => {
            setUiToHomePage(responce.items);
        });
    });
}
fetchDataForHomePage();
const setUiToHomePage = (list) => {
    //console.log(list);
    document.getElementById("container").innerHTML = null;
    setStyle();
    //let template = "";
    list.forEach(element => {
        const { id, snippet: { channelTitle, publishedAt, channelId, title, thumbnails: { high: { url } } }, contentDetails: { duration }, statistics: { viewCount } } = element;

        const gridDiv = document.createElement("div");
        gridDiv.id = "gridDiv";

        const gridImg = document.createElement("div");
        gridImg.id = "gridImg";
        const img = document.createElement("img");
        img.id = "click";
        img.src = url;
        gridImg.append(img);
        gridImg.addEventListener("click", () => {
            setLocal(id);
            location.href = "result.html";
        });

        const divv = document.createElement("div");
        divv.id = "divv";
        const dur = document.createElement("p");
        dur.id = "duration";
        dur.innerText = formatDuration(duration);
        divv.append(dur);

        const tit = document.createElement("h3");
        tit.innerText = title;
        const channeT = document.createElement("p");
        channeT.innerText = channelTitle;

        const flexGridDiv = document.createElement("div");
        flexGridDiv.id = "flexGridDiv";
        const view = document.createElement("p");
        view.innerText = numFormatter(viewCount) + " " + "views";
        const pub = document.createElement("p");
        pub.innerText = publishedAt;
        flexGridDiv.append(view, pub);

        gridDiv.append(gridImg, divv, tit, channeT, flexGridDiv);
        document.getElementById("container").append(gridDiv);
        // console.log(channelTitle, publishedAt, title, url, duration, viewCount);
    });
}


const setStyle = () => {
    let container = document.getElementById("container");
    container.style.padding = "10px 24px";
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(4,1fr)";
    container.style.gap = "12px";
}

const setStyleForSearchResult = () => {
    let container = document.getElementById("container");
    container.style.padding = "16px 16px";
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(1,1fr)";
}
function formatDuration(x) {
    let time = eval(x.replace('PT', '').replace('H', '*3600+').replace('M', '*60+').replace('S', '+').slice(0, -1));
    let hours = Math.floor(time / 60);
    let minutes = time % 60;
    return hours + ":" + minutes;
}

function numFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K';
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num < 900) {
        return num;
    }
}

const setLocal = (id) => {
    const obj = {
        id: id
    }
    arr.push(obj);

    localStorage.setItem("youKey", JSON.stringify(arr));
    arr = [];
}

function showFiltersUi() {
    const div = document.createElement("div");
    div.id = "filterDiv";

    let input = document.getElementById("search").value;
   //const api = 'PRIVATE_KEY';
    const api2 = 'PRIVATE_KEY2';

    const div1 = document.createElement("div");
    const upload = document.createElement("h3");
    upload.innerText = "UPLOAD DATE";
    const week = document.createElement("p");
    week.innerText = "This Week";
    week.id = "fweek";
    week.addEventListener("click", () => {
        var d = new Date();
        d.setDate(d.getDate() - 7);
        let date = d.toISOString();
        const url = `https://youtube.googleapis.com/youtube/v3/search/?part=snippet&key=${api2}&type=video&q=${input}&maxResults=20&publishedAfter=${date}`;
        fetchFilterData(url);
    });
    const month = document.createElement("p");
    month.innerText = "This Month";
    month.id = "fmonth";

    month.addEventListener("click", () => {
        var d = new Date();
        d.setDate(d.getDate() - 30);
        let date = d.toISOString();
        const url = `https://youtube.googleapis.com/youtube/v3/search/?part=snippet&key=${api2}&type=video&q=${input}&maxResults=20&publishedAfter=${date}`;
        fetchFilterData(url);
    });


    div1.append(upload, week, month);

    const div2 = document.createElement("div");
    const type = document.createElement("h3");
    type.innerText = "TYPE";
    const video = document.createElement("p");
    video.innerText = "Video";
    video.id = "fvideo";

    const playlist = document.createElement("p");
    playlist.innerText = "Playlist";
    playlist.id = "fplaylist";
    playlist.addEventListener("click", () => {
        const url = `https://youtube.googleapis.com/youtube/v3/search/?part=snippet&key=${api2}&type=playlist&q=${input}&maxResults=20`;
        fetchFilterData(url);
    });

    div2.append(type, video, playlist);

    const div3 = document.createElement("div");
    const duration = document.createElement("h3");
    duration.innerText = "DURATION";
    const under4 = document.createElement("p");
    under4.innerText = "Under 4 minutes";
    under4.id = "funder4";
    under4.addEventListener("click", () => {
        const url = `https://youtube.googleapis.com/youtube/v3/search/?part=snippet&key=${api2}&type=video&q=${input}&maxResults=20&videoDuration=short`;
        fetchFilterData(url);
    });

    const under4to20 = document.createElement("p");
    under4to20.innerText = "4-20 minutes";
    under4to20.id = "f20min";
    under4to20.addEventListener("click", () => {
        const url = `https://youtube.googleapis.com/youtube/v3/search/?part=snippet&key=${api2}&type=video&q=${input}&maxResults=20&videoDuration=medium`;
        fetchFilterData(url);
    });

    div3.append(duration, under4, under4to20);

    div.append(div1, div2, div3);
    document.getElementById("container").append(div);

    let filter = document.getElementById("filter");
    filter.addEventListener("click", () => {
        let filDiv = document.getElementById("filterDiv");
        if (filDiv.style.display === "none") {
            filDiv.style.display = "flex";
        }
        else {
            filDiv.style.display = "none";
        }
    });
}

function filterDesign() {
    const filter = document.createElement("div");
    filter.id = "filter";
    const img1 = document.createElement("img");
    img1.src = "icons/filter.png";
    const fil = document.createElement("p");
    fil.innerText = "FILTERS";
    const hr = document.createElement("hr");
    filter.append(img1, fil);
    document.getElementById("container").append(filter, hr);
    showFiltersUi();
}
function fetchFilterData(url) {
    fetch(url).then(res => {
        res.json().then(responce => {
            document.getElementById("container").innerHTML = null;
            setToUi(responce.items);
        });
    })
}
