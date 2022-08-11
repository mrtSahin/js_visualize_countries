const buttonPopulation = document.querySelector('.button-population')
const buttonLanguage = document.querySelector('.button-languages')
const text = document.querySelectorAll('p')
const lis=document.querySelectorAll('li')
const divs = document.querySelectorAll('div')
const spans = document.querySelectorAll('span')
const h4 = document.querySelector('h4') // World yazısı
const a =document.querySelector('a') // dünyada toplam nufüs ve dil sayısının yazıldığı öğe
let url='https://restcountries.com/v2/all'


// api yakalama işlemi---------------------------------------------------------------------------
async function fetchCountries(api){
    let response = await fetch(api);
    if(response.status===200){ // 200 ise sıkıntı yok anlamına gelir
        let data = await response.json()
        return data
    }
    else{ // 200 değilse ekrana hata mesajı basacak
        let hata = document.createElement('h1')
        hata.className='hata'
        document.body.appendChild(hata)
    }

}


// veri geldikten sonra nüfus ve dil fonksiyonlarını çalıştırma ve buton dinleme-----------------
// buton işlemlerini burda yapıyoruz çünkü veri gelmeden buton işlemi yapmamızın bi anlamı yok.--
fetchCountries(url).then((data)=>{
    //console.log(data)
    let [numberCountry,totalPopulation]=population(data) // ülke sayısı ve toplam nüfusu dönüyor
    spans[0].textContent=numberCountry
    buttonPopulation.addEventListener('click',()=>{
        //console.log(mostPopulation)
        h4.style.display='grid'
        divs[1].className='open-div'
        divs[2].className='close-div'
        text[1].className='p-open'
        text[2].className='p-close'
        a.innerHTML=totalPopulation

    })



    let totalLanguageNumber = langauge(data)
    buttonLanguage.addEventListener('click',()=>{
        //console.log(mostPopulation)
        h4.style.display='grid'
        divs[1].className='close-div'
        divs[2].className='open-div'
        text[1].className='p-close'
        text[2].className='p-open'
        a.innerHTML=totalLanguageNumber 
    })
});


// nufüs işlemleri fonksiyonu--------------------------------------------------------------------
function population(data){
    data.sort((a,b)=>b.population-a.population) 
    const mostPopulation=[]
    let totalPopulation=0
    let numberCountry=0
    for(let i=0;i<10;i++){ // nüfusa göre sıralanmış ülkelerşn ilk 10 ununu aldı
        mostPopulation[i]=data[i]
        if(mostPopulation[i].name=='Russian Federation'){
            mostPopulation[i].name='Russia'
        }
        if(mostPopulation[i].name=='United States of America'){
            mostPopulation[i].name='USA'
        }
    }
    data.forEach(country => { // toplam nufüsü hesaplamak ve ülke sayısını hesaplama
        totalPopulation+=country.population
        numberCountry++
    });

    let ratio=0
    for(let i=0;i<10;i++){
            lis[i].innerHTML=mostPopulation[i].name
            ratio=(parseInt(mostPopulation[i].population)/totalPopulation)*100 // ülke nüfusunun dünya nüfusuna oranı
            ratio=ratio.toFixed(2)
            ratio=ratio+'%'
            lis[i+10].style.width=ratio //body de toplam 40, div içerisinde toplam 20 tane li var. bunlardan ilk 10 tanesine ülke ismini ikinci 10 tanesine ise 
            // oranlı bir şekilde çizgisini çekiyor ve nüfusu yazıyoruz.
            // burda ikinci 10' daki li lerin arka planını renkli yapıp, genişliğini ratio olarak tanımlıyor ve bu sayede oran çizgisini oluşturmuş oluyoruz.
            spans[i+1].innerHTML=mostPopulation[i].population // li lerin içindeki span lara ise nüfusu yazıyoruz
            spans[i+1].className='list-span'
            //console.log(ratio)
    }
    //console.log(totalPopulation)
    //console.log(spans)
    return [numberCountry,totalPopulation]
}


// dil işlemleri fonksiyonu----------------------------------------------------------------------
function langauge(data){
    const languages=[]
    const countLang=[]
    
    data.forEach(country=>{// dünyadaki bütün dilleri alır
        country.languages.forEach(lang=>{
            languages.push(lang.name)
        })
    })

    const languagesSet=new Set(languages) // bir dil birden falza ülke içerisinde olduğundan 
    //liste içerisinde çok kez var hepsini 1 adete indirmek için set oluşturuyoruz
    //console.log(languagesSet) // dünyada konuşulan diller
        
    languagesSet.forEach(lang=>{ // bir dilin kaç farklı ülke içerisinde olduğunu bulur(dizi içerisinde kaç kere geçtiğini bulur)
        let numberArray=languages.filter(arayLang=>arayLang==lang)// dizi içerisinde 10 kere geçiyorsa numberArray dizisinde 10 tane bu elemandan olmuş oluyor
        let obje={name:lang,count:numberArray.length} // uzunluğuyla birlikte kaydedebilmek için her birine özel obje oluşturuyor ve diziye ekliyoruz 
        countLang.push(obje)
    })
    //console.log(countLang)
    countLang.sort((a,b)=>b.count-a.count)
    const finalCount=[]
    for(let i=0;i<10;i++){ // dünyada en konuşulan 10 dili konuşulduğu ülke sayısıyla birlikte bu diziye ekliyoruz
        finalCount[i]=countLang[i]
    }
    //console.log(finalCount)
    let ratio2=0
    for(let i=20;i<30;i++){// toplam 40 li olduğunu söylemiştik ilk 20 sini nüfus ila alakalı bölümde kullandık.geriye kalan 20 yi burda kullanıcaz
        // o yüzden saymaya 0 dan değilde 20 den başlıyoruz

        lis[i].innerHTML=finalCount[i-20].name // finalCount dizisi 10 elemana sahip ve burda sayamay 0 dan başlamamız gerektiğinden dolayı i-20 yapıyoruz
        ratio2=(finalCount[i-20].count/languagesSet.size)*100
        ratio2=ratio2.toFixed(2)
        ratio2=ratio2+'%'
        lis[i+10].style.width=ratio2 // 30 ve 40 arasınaki li lerde oranı gösteriyoruz
        spans[i-9].innerHTML=finalCount[i-20].count
        spans[i-9].className='list-span'
        //console.log(ratio)
    }
    return languagesSet.size
}