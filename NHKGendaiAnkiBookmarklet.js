export default () => {
    let url = window.decodeURI(window.location.toString());
    if (url.match(/^https:\/\/www.nhk.jp\//) == null) {
        alert("This is not NHK「ニュースで学ぶ現代英語」");
        return;
    }
    let releaseDate = new Date(document.getElementsByClassName('release-date')[0].innerText.replace("初回放送日：", "").replace(/[年月]/g, "-").replace("日", ""));
    //console.log("releaseDate: ",releaseDate);
    let year = releaseDate.getFullYear();
    let month = ("00" + (releaseDate.getMonth() + 1)).slice(-2);
    let day = ("00" + (releaseDate.getDate())).slice(-2);
    let onAirDate = releaseDate.getFullYear() + ("00" + (releaseDate.getMonth() + 1)).slice(-2) + ("00" + (releaseDate.getDate())).slice(-2);
    //console.log("onAirDate: ",onAirDate);
    let d = new Date(year + '-' + month + '-' + day);
    let dayList = ['日', '月', '火', '水', '木', '金', '土'];
    let titleDate = year + '-' + month + '-' + day + ' (' + dayList[releaseDate.getDay()] + ') ';
    let jTitle = document.getElementsByClassName('title')[0].innerText;
    let eTitle = document.getElementsByClassName('gc-article-text')[0].getElementsByTagName("div")[0].getElementsByTagName("p")[0].getElementsByTagName("strong")[0].innerText;
    let titleLine = `${titleDate} <a href="${url}"><br>${jTitle}</a><br>${eTitle}`;

    let sentences = document.querySelectorAll("#article-1 > div.gc-article-expanded > div.gc-article-text > div > p");
    let text = "";
    console.log("# of sentences: ",sentences.length);
    for (let i = 0; i < sentences.length; i++) {
        console.log("i: ",i);
        let sentenseNo = sentences[i].innerText.match(/^センテンス(\d+)/);
        console.log("sentencesNo: ",sentenseNo);
        if (sentenseNo != null) {
            console.log("sentencesNo1: ",sentenseNo[1]);
            let eLine = sentences[i].querySelector("strong").innerText;
            let jLine = sentences[i + 1].innerText;
            let sentenseNo1 = ("0" + sentenseNo[1]).slice(-2);
            text += `<details><summary>${jLine}<br></summary><br><div>${eLine}</div>[sound:NHKGendai${onAirDate}_${sentenseNo1}.aac]</details><hr>`;
            i += 2;
        }
    }
    //let insert = document.querySelector("#app > div.main-content-wrapper > div:nth-child(1) > section > div.tabs-wrapper > div.tabs-contents > section:nth-child(4) > section > div.episode-detail-article-contents");
    let insert = document.querySelector("#article-1 > div.gc-article-expanded > div.gc-article-text > div");
    let titleLineDiv = document.createElement("textarea");
    titleLineDiv.cols = 90;
    titleLineDiv.rows = 50;
    titleLineDiv.style.backgroundColor = "#ffffff";
    titleLineDiv.value = `python3 /Users/kobaya4/Documents/GitHub/NHKEnNews/NHKGendaiEigo.py '${titleLine}' "${text}"`;
    insert.appendChild(titleLineDiv);

    let addCard = {
        "action": "addNotes",
        "version": 6,
        "params": {
            "notes": [
                    {
                    "deckName": "NHKニュースで学ぶ現代英語",
                    "modelName": "NHKニュースで学ぶ現代英語",
                    "fields": {
                        "Title": "{Title}",
                        "Front": "{Front}",
                        "Back": "{Back}"
                    },
                    "options": {"allowDuplicate": true},
                    "tags": []
                } 
            ]
        }
    }
    let note = JSON.parse(JSON.stringify(addCard.params.notes[0]))
    addCard.params.notes.length = 0;
    note.fields.Title = titleLine;
    note.fields.Front = text;
    note.fields.Back = titleLine;
    addCard.params.notes.push(JSON.parse(JSON.stringify(note)));
    //データを送信
    let xhr = new XMLHttpRequest;       //インスタンス作成
    xhr.onload = function () {        //レスポンスを受け取った時の処理（非同期）
        let res = xhr.responseText;
        if (res.length > 0) alert(res);
    };
    xhr.onerror = function () {       //エラーが起きた時の処理（非同期）
        alert("error!");
    }
    xhr.open('post', 'http://localhost:8765', true);    //(1)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(addPermission,undefined,4));    //送信実行
}