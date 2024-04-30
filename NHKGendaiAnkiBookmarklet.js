export default () => {
    let url = window.decodeURI(window.location.toString());
    if (url.match(/^https:\/\/www.nhk.jp\//) == null) {
        alert("This is not NHK「ニュースで学ぶ現代英語」");
        return;
    }
    let releaseDate = new Date(document.getElementsByClassName('release-date')[0].innerText.replace("初回放送日：", "").replace(/[年月]/g, "-").replace("日", ""));
    let year = releaseDate.getFullYear();
    let month = ("00" + (releaseDate.getMonth() + 1)).slice(-2);
    let day = ("00" + (releaseDate.getDate())).slice(-2);
    let onAirDate = releaseDate.getFullYear() + ("00" + (releaseDate.getMonth() + 1)).slice(-2) + ("00" + (releaseDate.getDate())).slice(-2);
    console.log(onAirDate);
    let d = new Date(year + '-' + month + '-' + day);
    let dayList = ['日', '月', '火', '水', '木', '金', '土'];
    let titleDate = year + '-' + month + '-' + day + ' (' + dayList[releaseDate.getDay()] + ') ';
    let jTitle = document.getElementsByClassName('title')[0].innerText;
    let eTitle = document.getElementsByClassName('gc-article-text')[0].getElementsByTagName("div")[0].getElementsByTagName("p")[0].getElementsByTagName("strong")[0].innerText;
    let titeLine = `${titleDate} <a href="${url}"><br>${jTitle}</a><br>${eTitle}`;
    /*
    2024-04-22 (月) <a href="https://www.nhk.jp/p/rs/77RQWQX1L6/episode/re/P8M3MQ16X4"><br>大使館突入でメキシコがエクアドルと断交</a><br>MEXICO CUTS DIPLOMATIC TIES WITH ECUADOR OVER EMBASSY RAID
        var d = new Date(year + '-' + month + '-' + day);
        var dayList =['日','月','火','水','木','金','土'];
        var titleLine = year + '-' + month + '-' + day + ' (' + dayList[d.getDay()] + ') ';
    */
        //let releaseDate = document.getElementsByClassName('release-date')[0].innerText;


    //let body = document.getElementsByClassName('sc-jtggT');
    //let chapter = document.getElementsByClassName('sc-gmeYpB');

    /* 抜き出したニュース記事をテキスト形式に整形する */
    //let text = `${jTitle}\n`;
    //text += `${eTitle}\n\n`;
    //text += `${date_time}\n\n`;
    let sentences = document.querySelectorAll("#article-1 > div.gc-article-text > div > p");
    //text += `${sentences.length}\n`;
    for (let i = 0; i < sentences.length / 7; i++) {
        let eLine = sentences[i * 7].querySelector("strong").innerText;
        let jLine = `${sentences[i * 7 + 1].innerText}`;
        let sentenseNo = ("0" + (i + 1)).slice(-2);
        let text += `<details><summary>${jLine}<br></summary><br><div>${eLine}</div>[sound:NHKGendai${onAirDate}_${sentenseNo}.aac]</details><hr>`;
    }
    let insert = document.querySelector("#app > div.main-content-wrapper > div:nth-child(1) > section > div.tabs-wrapper > div.tabs-contents > section:nth-child(4) > section > div.episode-detail-article-contents");
    let addedElement = document.createElement("div");
    addedElement.className = 'added';
    addedElement.innerHTML = titeLine + text;
    insert.appendChild(addedElement);

    alert(text);
}