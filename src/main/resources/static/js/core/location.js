    //var webMethodBase="http://localhost:4001"; 
    var webMethodBase=""; 
    var tiempoRecarga = 10;//cada 10 segundos.
    var lati="";
    var long="";    
    var marker;
    $(document).ready(function () {
    	recargar(tiempoRecarga);
    });
    
    function recargar(segundos) {
        var tiempoMinuto = (1000)*segundos;
        setInterval(function () {
        	setPositionMarker();
        }, tiempoMinuto);
    }
    
    function procesar(){
    	alert("test");
    }
    function consumo() {
        var params = new Object();
        params.name = "Juan";
        var parameters=JSON.stringify(params);
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: webMethodBase+"/getLocation",
            //data: JSON.stringify(params),
            data: {"name":'Juan'},
            //data: parameters,
            //dataType: "json",
            dataType: "text",
            async: false,
            
            success: function (data, textStatus) {
                if (textStatus == "success") {
                    //alert("Desde El Server: "+data);
                    var d=data.split(",");
                    lati=d[0];
                    long=d[1];
                }
            },
            error: function (request, status, error) {
                alert(jQuery.parseJSON(request.responseText).Message);
            }
        });
    }
    
    function iniciar(){    	
    	consumo();   	
    	var coord={lat: parseFloat(lati), lng: parseFloat(long)};
    	
    	var mapa = new google.maps.Map(document.getElementById('map'), {
            center: coord,
            zoom: 15
          });
  
    	image = 'http://x.com/x_icon.gif';
    	marker = new google.maps.Marker({
            position:coord,
            map:mapa,
            icon: image,
            title:"Hello World!"
          });
    	
    	setPositionMarker();    	
    }
    
    function setPositionMarker(){
       consumo();
       var coord={lat: parseFloat(lati), lng: parseFloat(long)};
       marker.setPosition(coord);	
    	
    }
    
    
    
    
    
    
    