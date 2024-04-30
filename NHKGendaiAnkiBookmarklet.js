export default () => {  
//javascript:(function() {
    /* 現在のWebページのURLを取得する */
    let url = window.decodeURI(window.location.toString());
    /* 現在のWebページがYahoo!ニュースの記事ページかどうか判定する */
    if (url.match(/^https:\/\/www.nhk.jp\//) != null) {
        let jTitle = document.getElementsByClassName('title')[0].innerText;
        let eTitle = document.getElementsByClassName('gc-article-text')[0].getElementsByTagName("div")[0].getElementsByTagName("p")[0].getElementsByTagName("strong")[0].innerText;
        let releaseDate = document.getElementsByClassName('release-date')[0].innerText;
        let onAirDate = new Date(releaseDate.replace("初回放送日：","").replace(/[年月]/g,"-").replace("日",""));
        console.log(onAirDate);
        //let body = document.getElementsByClassName('sc-jtggT');
        //let chapter = document.getElementsByClassName('sc-gmeYpB');
       
        /* 抜き出したニュース記事をテキスト形式に整形する */
        let text = `${jTitle}\n`;
        text += `${eTitle}\n\n`;
        //text += `${date_time}\n\n`;
        let sentences = document.querySelectorAll("#article-1 > div.gc-article-text > div > p");
        //text += `${sentences.length}\n`;
        for (let i = 0; i < sentences.length ; i +=7 ) {
            let eLine = sentences[i].querySelector("strong").innerText;
            let jLine = `${sentences[i+1].innerText}`;
            text += `<details><summary>${jLine}<br></summary><br><div>${eLine}</div>[sound:NHKGendai20240422_01.aac]</details><hr>`;
        }
        let insert = document.querySelector("#app > div.main-content-wrapper > div:nth-child(1) > section > div.tabs-wrapper > div.tabs-contents > section:nth-child(4) > section > div.episode-detail-article-contents");
        let addedElement = document.createElement("div");
        addedElement.className = 'added';
        addedElement.innerText = text;
        insert.appendChild(addedElement);

        alert(text);
    }
}