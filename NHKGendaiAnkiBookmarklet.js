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

    let sentences = document.querySelectorAll("#article-1 > div.gc-article-text > div > p");
    let text = "";
    for (let i = 0; i < sentences.length / 7; i++) {
        let eLine = sentences[i * 7].querySelector("strong").innerText;
        let jLine = `${sentences[i * 7 + 1].innerText}`;
        let sentenseNo = ("0" + (i + 1)).slice(-2);
        text += `<details><summary>${jLine}<br></summary><br><div>${eLine}</div>[sound:NHKGendai${onAirDate}_${sentenseNo}.aac]</details><hr>`;
    }

    let insert = document.querySelector("#app > div.main-content-wrapper > div:nth-child(1) > section > div.tabs-wrapper > div.tabs-contents > section:nth-child(4) > section > div.episode-detail-article-contents");
    let titleLineDiv = document.createElement("div");
    titleLineDiv.setAttribute("id",'titleline');
    titleLineDiv.innerText = `python3 NHKGendaiEigo.py '${titeLine}' "${text}"`;
    insert.appendChild(titleLineDiv);
    /*
    let btn = document.createElement("button");
    btn.innerHTML = "Ankiへ追加";
    btn.setAttribute("id", "AddCard2Anki");
    insert.appendChild(btn);

    let titleLineDiv = document.createElement("div");
    titleLineDiv.setAttribute("id",'titleline');
    titleLineDiv.innerHTML = titeLine;
    insert.appendChild(titleLineDiv);

    let contentDiv = document.createElement("div");
    contentDiv.setAttribute("id",'content');
    contentDiv.innerHTML = text;
    insert.appendChild(contentDiv);

    alert(text);
    let addCard = {
        "action": "addNote",
        "version": 6,
        "params": {
            "note": {
                    "deckName": "NHKニュースで学ぶ現代英語",
                    "modelName": "NHKニュースで学ぶ現代英語",
                    "fields": {
                        "Title": "{Title}",
                        "Front": "{Front}",
                        "Back": "{Back}"
                    },
                    "options": { "allowDuplicate": true },
                    "tags": []
                }
        }
    }
    document.getElementById('AddCard2Anki').addEventListener("click", () => {
        let titleLine = document.getElementById("titleline").innerHTML;
        let line = document.getElementById("content").innerHTML;
        //let note = JSON.parse(JSON.stringify(addCard.params.note))
        //addCard.params.notes.length = 0;
        addCard.params.note.fields.Title = titleLine;
        addCard.params.note.fields.Front = line;
        addCard.params.note.fields.Back = titleLine;
        //addCard.params.note.push(JSON.parse(JSON.stringify(note)));
        //addCard.params.note.push(JSON.parse(JSON.stringify(note)));
        //データを送信
        let xhr = new XMLHttpRequest;       //インスタンス作成
        xhr.onload = function () {        //レスポンスを受け取った時の処理（非同期）
            let res = xhr.responseText;
            if (res.length > 0) alert(res);
        };
        xhr.onerror = function () {       //エラーが起きた時の処理（非同期）
            alert("error!");
        };
        xhr.open('post', 'http://localhost:8765', true);    //(1)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(addCard,undefined,4));    //送信実行
    }
    )
    */
}