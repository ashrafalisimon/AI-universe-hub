const url = 'https://openapi.programming-hero.com/api/ai/tools';
const itemsHTML = document.getElementById('items');

const seeAllBtn =document.getElementById('see-all-item');
const modalSection = document.getElementById('modal');


fetch(url)
    .then(res=>res.json())
    .then(data=>getData(data.data.tools))

const updateElement =(element)=>{
    itemsHTML.innerHTML +=`
        <div data-id="${element.id}" class="w-96 p-4 border border-slate-200 rounded-xl">
        <img class="h-48 rounded-lg" src="${element.image}" alt="">
        <h3 class="text-xl font-bold mt-2">Features</h3>
        <ol class="list-decimal ps-6">
            <li>${element.features[0]}</li>
            <li>${element.features[1]}</li>
            <li>${element.features[2]}</li>
        </ol>
        <hr class="my-2 ">
        <div class="flex justify-between items-center">
            <div>
                <h2 class="text-2xl font-bold">${element.name}</h2>
                <p class="text-md "><i class="fa-solid fa-calendar-days"></i> <span> ${element.published_in}</span> </p>
            </div>
            <button class=" bg-red-100 rounded-full w-10 h-10 text-red-500 hover:bg-red-200 see-button "><i class="fa-solid fa-arrow-right"></i></button>
        </div>
     </div>
        
        `;
}

const getData = (data)=>{
    const dataLimit = data.slice(0,6);
    // console.log(data);

    for(element of dataLimit){
        updateElement(element);
   
    }
    seeAllBtn.addEventListener('click', ()=>{
        itemsHTML.innerHTML ="";
        for(element of data){
            updateElement(element);
       
        }
    })
} 

const getDetails = (e)=>{
    if(e.target.classList.contains('see-button')){
        let itemId =e.target.parentElement.parentElement;
        // console.log(itemId.dataset.id);
        const detailstemUrl = `https://openapi.programming-hero.com/api/ai/tool/${itemId.dataset.id}`;
        fetch(detailstemUrl)
        .then(res => res.json())
        .then(data => getModalDetails(data.data))
    }
 }

 const getModalDetails = (data)=>{
    // console.log(data);
    modalSection.classList.remove('hidden');

    document.getElementById('description').innerText = data.description;
    document.getElementById('price1').innerText = data.pricing[0].price;
    document.getElementById('price2').innerText = data.pricing[1].price;
    document.getElementById('price3').innerText = data.pricing[2].price;
    document.getElementById('plan1').innerText = data.pricing[0].plan;
    document.getElementById('plan2').innerText = data.pricing[1].plan;
    document.getElementById('plan3').innerText = data.pricing[2].plan;
    document.getElementById('features1').innerText = data.features[1].feature_name;
    document.getElementById('features2').innerText = data.features[2].feature_name;
    document.getElementById('features3').innerText = data.features[3].feature_name;
    document.getElementById('integration1').innerText = data.integrations[0];
    document.getElementById('integration2').innerText = data.integrations[1];
    document.getElementById('integration3').innerText = data.integrations[2];
    document.getElementById('details-img').src = data.image_link[0];
    document.getElementById('hedaing').innerText = data.input_output_examples[0].input;
    document.getElementById('para').innerText = data.input_output_examples[0].output;


 }

 itemsHTML.addEventListener('click', getDetails);


document.getElementById('close-btn').addEventListener('click', ()=>{
    modalSection.classList.add('hidden');
})

