    var webMethodBase="http://localhost:4001"; 
    var lati="";
    var long="";    
    $(document).ready(function () {
    	//consumo();
    });
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
    	
    	var map = new google.maps.Map(document.getElementById('map'), {
            center: coord,
            zoom: 15
          });
    	
    	var marker = new google.maps.Marker({
            position:coord,
            map:map
          });

    }