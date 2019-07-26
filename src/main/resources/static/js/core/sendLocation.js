   var webMethodBase="http://localhost:8080";   
    $(document).ready(function () {
    	//consumo();
    	//alert($("#lat").val());
    	getLocalizacion();
    	//alert($("#lat").val());
    });
    
    function getLocalizacion(){
    	
    	if(navigator.geolocation){
            
            navigator.geolocation.getCurrentPosition(function localizacion(posicion){
            	var lat=posicion.coords.latitude;
            	var lon=posicion.coords.longitude;
            	
            	consumo(lat,lon);
            	$("#lat").val(lat);
            	$("#lon").val(lon);
            	
        	},function error(){
        		alert("Error");
        	});
        }else{
           alert("El navegador no soporta la geolicalización");
        }
    	
    }
    
    function consumo(latitude,longitude) {
    	alert(latitude+","+longitude);
        
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: webMethodBase+"/saveLocation",
            //data: JSON.stringify(params),
            data: {"latitude" :latitude,"longitude":longitude},
            //data: parameters,
            //dataType: "json",
            dataType: "text",
            async: false,
            
            success: function (data, textStatus) {
                if (textStatus == "success") {
                    alert(data);
                }
            },
            error: function (request, status, error) {
            	alert("Error");
                alert(jQuery.parseJSON(request.responseText).Message);
            }
        });
    }