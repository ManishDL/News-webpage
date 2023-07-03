const apikey="2656581ff6064c08b2517a55a19fe38a";
const url1="https://newsapi.org/v2/everything?q="

window.addEventListener("load",() => fetchnews("india"));

async function fetchnews(query){
    const res=await fetch(`${url1}${query}&apiKey=${apikey}`);
    const data=await res.json();
    // console.log(data);
    binddata(data.articles);
}
function binddata(articles)
{
    const card_container=document.getElementById("cards-container");
    const child=document.getElementById("template");
    card_container.innerHTML="";
    articles.forEach(element => {
        if(!element.urlToImage)return;
        const card_clone=child.content.cloneNode(true);
        filldata(card_clone,element);
        card_container.appendChild(card_clone);
    });
}
function filldata(card_clone,article)
{
    const imgsrc=card_clone.getElementById("imgsrc");
    const card_title=card_clone.getElementById("news-title");
    const card_content=card_clone.getElementById("news-desc");
    const card_src=card_clone.getElementById("news-src")

    imgsrc.src=article.urlToImage;
    card_title.innerHTML=article.title;
    card_content.innerHTML=article.description;
    card_src.innerHTML=article.source.name;
    card_clone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}
const ipl=document.getElementById("IPL");
const eco=document.getElementById("economics");
const fin=document.getElementById("finance");
let current=null;
function clicked(id)
{
    fetchnews(id);
    const navitem=document.getElementById(id);
    current?.classList.remove("active");
    current=navitem;
    current.classList.add("active");
}
const search_text=document.getElementById("input-txt");
const button=document.getElementById("input-btn1");
button.addEventListener("click",()=>{
    const query=search_text.value;
    if(!query)return;
    fetchnews(query);
    current?.classList.remove("active");
})



