export default () => {  
    alert("aaaaaaaa");
    let title = document.title;
    let href = document.location.href;
    let canonical = get_canonical();
    console.log('ページタイトル=%s \n href=%s \n カノニカルURL=%s', title, href, canonical);
    alert('ページタイトル：'+title +"\n現在のURL："+href + "\nカノニカルURL：" + canonical);

    function get_canonical(){
      let links = document.getElementsByTagName("link");
      for ( let i in links) {
        if (links[i].rel) {
          if (links[i].rel.toLowerCase() == "canonical") {
            return links[i].href;
          }
        }
      }
      return "";
    }
}