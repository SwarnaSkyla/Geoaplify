const apiKey=`311fb5d971e64b8b8ee0d54fb6cfe605`;


const currentZone=document.getElementById("current-zone");
const addressValue=document.getElementById("input");
const result=document.getElementById("Zoneresult");
const errorRes = document.getElementById("error-container")
const resultContainer=document.querySelector(".result-container");

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
}
else{
    alert("Geolocation is not supported in this browser");
}

//Show cuurret time zone

async function showPosition(position){
    let lat=position.coords.latitude;
    let lon=position.coords.longitude;


    let url=`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${apiKey}`


    let response=await fetch(url);
    let data= await response.json();
    
    //  console.log(data);
    if(data.length!=0){
        let timeZone=data.results[0].timezone.name;
        let dst=data.results[0].timezone.offset_DST;
        let dstSeconds=data.results[0].timezone.offset_DST_seconds;
        let std=data.results[0].timezone.offset_STD;
       
        let stdSeconds=data.results[0].timezone.offset_STD_seconds;
    

        let country=data.results[0].country;
        let city=data.results[0].city;
        let postcode=data.results[0].postcode;


        currentZone.innerHTML=`<div>Name of Timezone:${timeZone}</div>
                                    <div class="span">
                                        <span>lat:${lat}</span>
                                        <span>lon:${lon}</span>
                                    </div>
                                    <div>Offset STD:${std}</div>
                                    <div>Offset STD seconds:${stdSeconds}</div>
                                    <div>Offset DST:${dst}</div>
                                    <div>Offset DST seconds:${dstSeconds}</div>
                                    <div>Country${country}</div>
                                    <div>Post code:${postcode}</div>
                                    <div>City:${city}</div>`;
    
    
    }
    else{
        alert("No location founded");
    }
}

function error(error){
    switch(error.code){
        case error.PERMISSION_DENIED:
            alert("Denied request for geolocation");
            break;
        case error.POSITION.UNAVAILABLE:
            alert("Information is not available");
            break;
        case error.TIMEOUT:
            alert("Time - out");
            break;
        case error.UNKNOWN_ERROR:
            alert("Some error occured");
            break;
    }
}




async function fetchAddress(){

    if(addressValue.value){
        if(errorRes.style.display==="block"){
            errorRes.style.display="none";
        }
        let address=addressValue.value;

        let url=`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;


        let response=await fetch(url);
        let data=await response.json();

        if(data.features.length!==0){
            result.innerHTML="";
            resultContainer.style.display="block";


            let name=data.features[0].properties.timezone.name;
            let lat=data.features[0].properties.lat;
            let lon=data.features[0].properties.lon;
            let std=data.features[0].properties.timezone.offset_STD;
            let stdseconds=data.features[0].properties.timezone.offset_STD_seconds;


            let dst=data.features[0].properties.timezone.offset_DST;
       
       
            let dstseconds=data.features[0].properties.timezone.offset_DST_seconds
       
            let country=data.features[0].country;
            let city=data.features[0].city;

            let postcode=data.features[0].postcode;

            result.innerHTML=`<div>Name of Timezone:${name}</div>
                                <div class="span">
                                    <span>lat:${lat}</span>
                                    <span>lon:${lon}</span>
                                </div>
                                <div>Offset STD:${std}</div>
                                <div>Offset STD seconds:${stdseconds}</div>
                                <div>Offset DST:${dst}</div>
                                <div>Offset DST seconds:${dstseconds}</div>
                                <div>Country${country}</div>
                                <div>Post code ${postcode}</div>
                                <div>City:${city}</div>`;

       
       
       
       
        }
        else{
            errorRes.style.display="block";
            resultContainer.style.display="none";
        }
    }
    else{
        if(resultContainer.style.display==="block"){
            resultContainer.style.display="none";
        }
        errorRes.style.display="block";
    }
}























