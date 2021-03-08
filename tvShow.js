const form = document.querySelector('#searchForm');
const main = document.querySelector('#main');
form.addEventListener('submit', async function(e){
    deleteImg();
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params:{ q : searchTerm}}
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    showContent(res.data);
    console.log(res.data);
    form.elements.query.value = '';
})
const showContent = (shows)=>{
    for(let result of shows){
            const box = document.createElement('div');
            box.append(showimage(result));
            box.append(showTitle(result));
            box.append(showGenre(result));
            box.append(showCountry(result));
            box.append(showLanguage(result));
            box.append(showPremiered(result));
            box.append(showStatus(result));
            box.append(showNetwork(result));
            box.append(showOfficialSite(result));
            box.classList.add("intro");
            main.append(box);
    }
}
const deleteImg = ()=>{
    let imgs = document.querySelectorAll('div');
    for(let i of imgs){
        i.remove();
    }
}
const showimage = (result)=>{
    const img = document.createElement('img');
    if(result.show.image){
        img.src = result.show.image.medium;
        return img;
    }else{
        img.src = "noimageavailable.png";
        return img;
    }
}
const showTitle = (result)=>{
    const title = document.createElement('h4');
    title.innerText = result.show.name;
    return title;
}
const showCountry = (result)=>{
    const span = document.createElement('span');
    if(result.show.network){
    span.innerText = `Country: ${result.show.network.country.name}`;
    return span;
    }else if(result.show.network === null){
        span.innerText = 'Country: unknown'
        return span;
    }
}
const showLanguage = (result)=>{
    const span  = document.createElement('span');
    if(result.show.language){
        span.innerText = `Language: ${result.show.language}`;
        return span;
    }
}
const showStatus = (result)=>{
    if(result.show.status){
    const span = document.createElement('span');
    span.innerText = `Status: ${result.show.status}`;
    return span;
    }
}
const showPremiered = (result)=>{
    const span = document.createElement('span');
    if(result.show.premiered){
    span.innerText = `Premiered: ${result.show.premiered}`;
    return span;
    }else{
        span.innerText = 'Premiered: unknown';
        return span;
    }
}
const showOfficialSite = (result)=>{
    const a = document.createElement('a');
    const span = document.createElement('span');
    if(result.show.officialSite){
        a.href = result.show.officialSite;
        a.target = "_blank";
        a.innerText = "Officialsite";
        return a;
    }else{
        span.innerText = 'Officialsite: unknown';
        return span;
    }
}
const showNetwork = (result)=>{
    const span = document.createElement('span');
    if(result.show.network){
    span.innerText = `Network: ${result.show.network.name}`;
    return span;
    }else{
        span.innerText = 'Network: unknown'
        return span;
    }
}
const showGenre = (result)=>{
    const span = document.createElement('span');
    const genre = result.show.genres;
    span.innerText = "Genres: "
    if(genre.length!==0){
        for(let i = 0;i<genre.length;i++){
            span.innerText = span.innerText + `${genre[i]} `;       
        }
        return span;
    }else{
        span.innerText = 'Genres: unknown';
        return span;
    }    
}
