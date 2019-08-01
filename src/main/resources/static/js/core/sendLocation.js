  // var webMethodBase="http://localhost:4001";   
   //var webMethodBase="http://206.81.1.133:4002";
   var webMethodBase="";
   var tiempoRecarga = 5;//cada 10 segundos.
    $(document).ready(function () {
    	
    	getLocalizacion();
    	recargar(tiempoRecarga);
    });
    
    function getLocalizacion(){
    	
    	if(navigator.geolocation){
            
            navigator.geolocation.getCurrentPosition(function localizacion(posicion){
            	var lat=posicion.coords.latitude;
            	var lon=posicion.coords.longitude;
            	
            	lat=lat.toFixed(4);
            	lon=lon.toFixed(4);
            	consumo(lat,lon);            	
            	
        	},function error(){
        		console.log("Error en obtencion del la localizacion");
        		$.getJSON('https://ipinfo.io/geo', function(response) {
					var loc = response.loc.split(',');
//					var coords = {
//						latitude : loc[0],
//						longitude : loc[1]
//					};
					consumo(loc[0], loc[1]);
				});
        	});
        }else{
           alert("El navegador no soporta la geolicalización");
        }
    	
    }
    
    function consumo(latitude,longitude) {
    	console.log(latitude+" "+longitude);
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
            	console.log("Error al intentar hacer consumo de servicio saveLocation");
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