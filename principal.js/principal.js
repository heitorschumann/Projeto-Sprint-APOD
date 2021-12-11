// get elements from HTML

const button = $("#submitDate");
const title = $("#title");
const mediaField = $("#imgVideo");
const picDate = $("#picTaken")
const divTxt = $("#texts");
const explanation = $("#explanation");
const credits = $("#credits");
const footerBtn = $("#footerBtn");
const footer = $("#footer");

let objAPOD;


// added event to button
button.click(function(event){
    event.preventDefault();
    getInfoApi();
});

// hide/display the footer
footerBtn.click(function(){
    if(footer.is(":visible")){
        footer.hide(600);

    }else{
        footer.show(600); 
    }
});


// get object from api and print it on HTML
function getInfoApi(){
    let date = $('#datePicker').val();

    $.ajax({url: `https://api.nasa.gov/planetary/apod?api_key=8aASIqdiCowNlb4OcsCA7IbCrYhNsz4TLDuIIudS&date=${date}`,

    success: function(result){
        objAPOD = result;
        console.log(objAPOD);
        title.html(objAPOD.title);
        title.removeClass("hide");
        explanation.html(objAPOD.explanation);
        divTxt.removeClass("hide");
        picDate.html(objAPOD.date);
        picDate.removeClass("hide");
        credits.html(`Copyright: ${objAPOD.copyright}`);
        
        if(objAPOD.copyright == undefined){
            credits.addClass("hide");
        }else{
            credits.removeClass("hide");
        }
        

        if(objAPOD.media_type != "video"){
            mediaField.html(`<img id="image" src="${objAPOD.url}" alt=""></img> `)
        }else{
            mediaField.html(`<iframe id="video" src="${objAPOD.url}" alt=""></img>`)
        }    
    },
    error: function(result) {
        objAPOD = result;
        console.log(objAPOD);
        title.html(`Error: ${objAPOD.status} ${objAPOD.statusText}`);
        title.removeClass("hide");
        credits.html(objAPOD.responseJSON.msg);
        divTxt.removeClass("hide");
    }

})

}
