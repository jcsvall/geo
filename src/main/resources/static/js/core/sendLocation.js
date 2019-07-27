  // var webMethodBase="http://localhost:4001";   
   var webMethodBase="http://206.81.1.133:4002";
   var tiempoRecarga = 10;//cada 10 segundos.
    $(document).ready(function () {
    	
    	getLocalizacion();
    	recargar(tiempoRecarga);
    });
    
    function getLocalizacion(){
    	
    	if(navigator.geolocation){
            
            navigator.geolocation.getCurrentPosition(function localizacion(posicion){
            	var lat=posicion.coords.latitude;
            	var lon=posicion.coords.longitude;
            	
            	consumo(lat,lon);            	
            	
        	},function error(){
        		alert("Error");
        	});
        }else{
           alert("El navegador no soporta la geolicalización");
        }
    	
    }
    
    function consumo(latitude,longitude) {
    	$("#ll").html(latitude+" "+longitude);
        
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: webMethodBase+"/saveLocation",            
            data: {"latitude" :latitude,"longitude":longitude},            
            dataType: "text",
            async: false,            
            success: function (data, textStatus) {
                if (textStatus == "success") {
                	asignarFecha();
                }
            },
            error: function (request, status, error) {
            	console.log(request);
            	//alert(request+"--"+status+"--"+error);
                //alert(jQuery.parseJSON(request.responseText).Message);
            }
        });
    }
    
    function recargar(segundos) {
        var tiempoMinuto = (1000)*segundos;
        setInterval(function () {
        	getLocalizacion();
        }, tiempoMinuto);
    }
    
    function asignarFecha(){
    	var d = new Date();//d.getUTCHours()
    	var dateTime=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    	$("#time").html(dateTime);
    }