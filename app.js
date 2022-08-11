
let url='https://restcountries.com/v2/all'
async function fetchCountries(api){
    let response = await fetch(api);
    if(response.status===200){
        let data = await response.json()
        return data
    }
    else{
        let hata = document.createElement('h1')
        hata.className='hata'
        document.body.appendChild(hata)
    }

}

fetchCountries(url).then((data)=>{
    //console.log(data)
    data.sort((a,b)=>b.population-a.population)
    const mostPopulation=[]
    let totalPopulation=0
    let numberCountry=0
    for(let i=0;i<10;i++){
        mostPopulation[i]=data[i]
        if(mostPopulation[i].name=='Russian Federation'){
            mostPopulation[i].name='Russia'
        }
        if(mostPopulation[i].name=='United States of America'){
            mostPopulation[i].name='USA'
        }
    }
    data.forEach(country => {
        totalPopulation+=country.population
        numberCountry++
    });
    console.log(totalPopulation)
    const buttonPopulation = document.querySelector('.button-population')
    const buttonLanguage = document.querySelector('.button-languages')
    const text = document.querySelectorAll('p')
    const lis=document.querySelectorAll('li')
    const divs = document.querySelectorAll('div')
    const spans = document.querySelectorAll('span')
    const h4 = document.querySelector('h4')
    const a =document.querySelector('a')
    //console.log(spans)
    spans[0].textContent=numberCountry

    buttonPopulation.addEventListener('click',()=>{
        //console.log(mostPopulation)
        h4.style.display='grid'
        divs[1].className='open-div'
        divs[2].className='close-div'
        text[1].className='p-open'
        text[2].className='p-close'
        a.innerHTML=totalPopulation
        let ratio=0
        for(let i=0;i<10;i++){
                lis[i].innerHTML=mostPopulation[i].name
                ratio=(parseInt(mostPopulation[i].population)/totalPopulation)*100
                ratio=ratio.toFixed(2)
                ratio=ratio+'%'
                lis[i+10].style.width=ratio
                spans[i+1].innerHTML=mostPopulation[i].population
                spans[i+1].className='list-span'
                //console.log(ratio)
        }
    })
    buttonLanguage.addEventListener('click',()=>{
        //console.log(mostPopulation)
        h4.style.display='grid'
        divs[1].className='close-div'
        divs[2].className='open-div'
        text[1].className='p-close'
        text[2].className='p-open'
        

        const languages=[]
        const countLang=[]
        data.forEach(country=>{
            country.languages.forEach(lang=>{
                languages.push(lang.name)
            })
        })

        const languagesSet=new Set(languages)
        //console.log(languagesSet) // dünyada konuşulan diller
        a.innerHTML=languagesSet.size
        languagesSet.forEach(lang=>{
            let count=languages.filter(arayLang=>arayLang==lang)
            //console.log(countLang.length,lang)
            let obje={name:lang,countt:count.length}
            countLang.push(obje)
        })
        //console.log(countLang)
        countLang.sort((a,b)=>b.countt-a.countt)
        const finalCount=[]
        for(let i=0;i<10;i++){
            finalCount[i]=countLang[i]
        }
        //console.log(finalCount)
        let ratio=0
        for(let i=20;i<30;i++){
            lis[i].innerHTML=finalCount[i-20].name

            ratio=(finalCount[i-20].countt/languagesSet.size)*100
            ratio=ratio.toFixed(2)
            ratio=ratio+'%'
            lis[i+10].style.width=ratio
            spans[i-9].innerHTML=finalCount[i-20].countt
            spans[i-9].className='list-span'
            //console.log(ratio)
        }
    })
});


