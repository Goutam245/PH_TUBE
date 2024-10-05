function getTimestring (time){
    const Hour = parseInt(time/ 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt  (remainingSecond / 60 );
    remainingSecond = remainingSecond % 60;
    return `${Hour} hour ${minute} minute ${remainingSecond} second ago`
}
const removeactiveclass = () => {
   const buttons = document.getElementsByClassName("category-btn")
   console.log(buttons)
   for(let btn of buttons){
    btn.classList.remove('active')
   }
}
// 1- Fetch, Load and Show categorieson HTMl

// Create loadcatagories
const loadcatagories =() => {
    // Fetch the data
    fetch ("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) =>  Displaycatagories(data.categories))
    .catch((error) => console.log(error))
    
}

const loadVideos =(searchText = '') => {
    // Fetch the data
    fetch (`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) =>  displayvideos(data.videos))
    .catch((error) => console.log(error))
    
};

const loadcatagoryvideos = (id) => {
    //alert(id)
    fetch (`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) =>  {
        // Sobike active class remove korao
          removeactiveclass()
        // id er class k actie korao
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add("active")
        displayvideos(data.category)
    })
    .catch((error) => console.log(error))
};

const loadDetails =async(videoId) =>{
    console.log(videoId)
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(uri)
    const data = await res.json()
    displaydetails(data.video)
};
const displaydetails = (video) => {
  console.log(video)
  const detailscontainer = document.getElementById('modal-content')
  detailscontainer.innerHTML= `
   <img src= ${video.thumbnail} />
   <p>${video.description}</p>
  `

  // Way-1
  document.getElementById('showModalData').click()
}
/**
 * 
 *const cardDemo = {
    
        "category_id": "1001",
        "video_id": "aaaa",
        "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
        "title": "Shape of You",
        "authors": [
            {
                "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
                "profile_name": "Olivia Mitchell",
                "verified": ""
            }
        ],
        "others": {
            "views": "100K",
            "posted_date": "16278"
        },
        "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
    
}
 */

const displayvideos =(videos) => {
    const videoContainer = document.getElementById("videos")
    videoContainer.innerHTML=  ""
     
    if(videos.length == 0){
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
        <div class = "min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src = "assest/Icon.png" />
        <h2 class="text-center text-xl font-bold" > No Content Here in this category</h2>
        </div>
        `
        return
    }
    else{
        videoContainer.classList.add('grid')
    }

    videos.forEach((video)=>{
       // console.log(video)
        const card = document.createElement("div")
        card.classList = "card card-compact";
        card.innerHTML =
        `
        <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class = "h-full w-full object-cover"
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0 ? "" : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${getTimestring(video.others.posted_date)}</span>`
      }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
      
    <div>
    <img class="w-10 h-10 rounded-full object-cover" src = ${video.authors[0].profile_picture}/>
    </div>
    <div>
    <h2 class ="font-bold">${video.title}</h2>
    <div class= "flex items-center gap-2">
    <p class= "text-gray-400">${video.authors[0].profile_name}</p>
    ${video.authors[0].verified === true ? '<img class ="w-5" src ="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>' : ''}
    </div>
    
    <p> <button onclick="loadDetails('${video.video_id}')" class ="btn btn-sm btn-info">details</button></p>
    </div>
    
  </div>
        `

        videoContainer.append(card)
        
    })
   
}
// Create Displaycatagories
 const Displaycatagories = (categories) =>{
    const catagoryContainer = document.getElementById('categories');
      categories.forEach((item)=> {
        console.log(item);

        //Create A Button
         
        const buttoncontainer =document.createElement('div');
        buttoncontainer.innerHTML =
        `
        <button id="btn-${item.category_id}" onclick ="loadcatagoryvideos(${item.category_id})" class= "btn category-btn ">
        ${item.category}
        </button>
        `
     
       

        // Add button to category container
        catagoryContainer.append(buttoncontainer);

      });
 }

 document.getElementById('search-input').addEventListener('keyup', (e)=>{
   loadVideos(e.target.value)
 })
loadcatagories()
loadVideos()