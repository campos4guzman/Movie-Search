//Global Variables
var pagina=1;
var blockScroll=false;
var from=0;
var bus="";
var cont=0;

//Click on the search button
$("document").ready( function(){
        $("#boton").click(secondSearchB);
});

//Enter on the search button
$("#bus").keypress(function(e) {
        if(e.which==13) {
           secondSearchB();
        }
});

//Back To Top Button
$(document).ready(function(){
	$(window).scroll(function () {
			if ($(this).scrollTop() > 50) {
				$('#backbt').fadeIn();
			}else{
				$('#backbt').fadeOut();
			}
		});
		// scroll body to 0px on click
		$('#backbt').click(function () {
			$('body,html').animate({
				scrollTop: 0
			},400);
			return false;
		});
});


//Loading elements when the scroll touch bottom
$(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100){
                if(blockScroll==false){
                        pagina=pagina+1;
                        secondSearchS();
                }
        }
});


//color fix nav when scroll
$(function(){
        $(window).on('scroll', function () {
                if ( $(window).scrollTop() > 10 ) {
                        $('.navbar').addClass('active');
                }
                else{
                        $('.navbar').removeClass('active');
                }
        });
})




//Principal functions
function secondSearchB(){
        cont++;
        pagina=1;
        from=$("#from").val();
        bus=$("#bus").val();
        if(from==""){
                var link="https://www.omdbapi.com/?s="+bus+"&page="+pagina+"&apikey=eb9052e";
        }
        else{
                var link="https://www.omdbapi.com/?s="+bus+"&page="+pagina+"&y="+from+"&apikey=eb9052e";
        }
        localStorage.setItem("busqueda"+cont, bus);
        localStorage.setItem("from"+cont, from);
        $("#peliculas").empty();
        getPelis(link);
}

function secondSearchS(){
        from=$("#from").val();
        bus=$("#bus").val();
        if(from==""){
                var link="https://www.omdbapi.com/?s="+bus+"&page="+pagina+"&apikey=eb9052e";
        }
        else{
                var link="https://www.omdbapi.com/?s="+bus+"&page="+pagina+"&y="+from+"&apikey=eb9052e";
        }
        getPelis(link);
}

function getPelis(l){
        if(blockScroll==false){
                        blockScroll=true;
                        $.getJSON(l).done(function(datos){
                                var resu=datos["Search"];
                                $.each(resu, function () {
                                        var titulo=this["Title"];
                                        var id=this["imdbID"];
                                        var portada=this["Poster"];
                                        if(portada!="N/A"){
                                                setPortada(portada,titulo,id);
                                        }
                                });
                                blockScroll=false;
                        });
        }
};


function setDetalle(titulo,an,puntuacion,director,gen,actores,portada,plot){
        $(".modal-header").empty();
        $(".modal-header").append(
                "<div class='row'>"+
                        "<div class='col-md-10'>"+
                                '<h5>'+titulo+'</h5>'+
                        "</div>"+
                        "<div class='col-md-2'>"+
                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                        "</div>"+
                "</div>"
        );
        $(".modal-body").empty();
        $(".modal-body").append(
                "<div class='row'>"+
                        "<div class='col-lg-5 col-sm-12 col-12'>"+   
                                '<img src='+portada+'height:100px width:100px class="img-fluid">'+
                        "</div>&nbsp;&nbsp;&nbsp;"+
                        "<div class='col-lg-6 col-sm-12 col-12'>"+   
                                "<p>Release: "+an+"</p>"+
                                "<p>Genre: "+gen+"</p>"+
                                '<p>imdbRating: '+puntuacion+'/10</p>'+
                                "<p>Director: "+director+"</p>"+
                                "<p>Actors: "+actores+"</p>"+
                                "<hr/>"+
                                "<p>"+plot+"</p>"+
                        "</div>"+
                "</div>"
        );
}

function setPortada(portada,titulo,id){
        divjose=$('<div class="col-lg-3 col-sm-4 text-center">');
        divjose.attr(id);
        divjose.click(function(){
                $.getJSON("https://www.omdbapi.com/?i="+id+"&apikey=eb9052e").done(function(datos){
                        var titulo=datos["Title"];
                        var portada=datos["Poster"];
                        var an=datos["Released"];
                        var puntuacion=datos["imdbRating"];
                        var director=datos["Director"];
                        var gen=datos["Genre"];
                        var actores=datos["Actors"];
                        var plot=datos["Plot"];
                        setDetalle(titulo,an,puntuacion,director,gen,actores,portada,plot);
                });
        });
        divjose.append(
                '<img src='+portada+' data-toggle="modal" data-target="#largeModal">'+
                "<p>"+titulo+"</p>"
        );
        $("#peliculas").append(divjose);
}




