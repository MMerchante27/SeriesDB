$(document).ready(function() { //Cuando la página se ha cargado por completo
    //Ponemos el foco en el primer input
    $(".auto-focus").focus();
    $("form").on("submit", function() { //Cuando se intenta enviar el formulario    

        //Validación del título
        var title = $.trim($("#title").val());

        if (title == "") {
            alert("El título no puede ser vacío");
            return false
        }

        //Validación del URL
        var url = $.trim($("#cover_url").val());
        var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ig;

        if (url != "" && pattern.test(url) == false) {
            alert("La URL de la carátula no es válida");
            return false;
        }

        //Validación categorías
        var selectedCategories = $('input[name="category"]:checked');
        if (selectedCategories.size() == 0) {
            alert("Selecciona al menos una categoría");
            return false;
        }

        $.ajax({
            method: 'post',
            url: "/api/series/",
            data: JSON.stringify({
                title: title,
                url: url
            }),
            dataType: 'json',
            contentType: 'application/json',
            success: function() {
                reloadSeries();
                alert("Guardado con éxito");
            },
            error: function() {
                alert("Se ha producido un error");
            }
        });

        return false; //Permito envío de formulario
    });


    function reloadSeries() {
        console.log("Cargando series");
        $.ajax({
            url: "/api/series/",
            success: function(data) {
                console.log("Series recuperadas:", data);
                var html = " ";
                for (var i in data) {
                    var id = data[i].id;
                    var title = data[i].title;
                    var url = data[i].url || "";
                    html += "<li>";
                    html += title;
                    if (url.length > 0) {
                        html += " (" + url + ")";
                    }
                    html += '<button data-serieid="' + id + '">Eliminar</button>';
                    html += "</li>";
                }
                $("#seriesList").html(html); //innerHTML = html
            }
        });

    }


    $("#reloadSeriesButton").on("click", reloadSeries);

    reloadSeries();

    $("#seriesList").on("click","button", function(){ //Propaga el evento del padre al hijo
        console.log("Elimino la serie");
        var self = this; //referencia que se hace al botón de eliminar. Se usa self para poder usarlo dentro de ajax
        var id = $(self).data("serieid"); //Cojo el valor del atributo data-serieid del botón
        $.ajax({
            url: "api/series/" + id,
            method: "delete",
            success: function(){
               $(self).parent().remove(); 
               alert("Borrado con éxito");
            },
            error: function(){
                alert("No se ha podido borrar la serie");
            }
        })
    });
});
