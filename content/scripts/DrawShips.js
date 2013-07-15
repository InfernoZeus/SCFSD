function DrawShips() {
    $("table#ShipOutput").html("");
    $("dl#ships dd input[type=number]").each(function () {
        var shipInputBox = $(this);
        var shipName;
        var shipClassName;
        //Validate ship names
        shipName = shipInputBox.attr("id");
        shipName = shipName.replace("ShipNumber", "");
        shipClassName = shipName;
        if (shipName == "s300Series") { shipName = "300 Series"; }
        var numberToDraw = shipInputBox.val();
        if (numberToDraw > 0) {
            OutputShip(shipName, numberToDraw, shipClassName);
        }
    });
    HandleOptionalParams();
}
function OutputShip(shipName, numberToDraw, shipClassName) {
    var htmlWriter = [];
    htmlWriter.push("<tr class='ShipBox' id='" + shipClassName + "'>");
    htmlWriter.push("<td class='ShipName'>" + shipName + "</td>");
    htmlWriter.push("<td class='ShipContainer'>");
    for (var i = 0; i < numberToDraw; i++) {
        htmlWriter.push("<div class='Ship fLeft " + shipClassName + "'></div>");
    }
    htmlWriter.push("</td>");
    htmlWriter.push("</tr>");
    $("table#ShipOutput").append(htmlWriter.join(''));
}
function HandleOptionalParams() {
    var logoPos = $("select#LogoPosition").val();
    var logoWidth = $("input#LogoWidth").val();
    var logoHeight = $("input#LogoHeight").val();
    if (logoWidth && logoHeight) {
        $("#holder").css("width", logoWidth + "px");
        $("#holder").css("height", logoHeight + "px");
    }
    switch (logoPos) {
        case "Left":
            $("#holder").css("float", "left");
            $("#holder").css("margin", "0 0 0 155px");
            break;
        case "Right":
            $("#holder").css("float", "right");
            $("#holder").css("margin", "0 155px 0 0");
            break;
        case "Middle":
            $("#holder").css("float", "none");
            $("#holder").css("margin", "0");
            break;
    }
}
$(document).ready(function () {
    var holder = document.getElementById('holder'),
    state = document.getElementById('status');


    holder.ondragover = function () { this.className = 'hover'; return false; };
    holder.ondragend = function () { this.className = ''; return false; };
    holder.ondrop = function (e) {
        this.className = '';
        e.preventDefault();

        var file = e.dataTransfer.files[0],
      reader = new FileReader();
        reader.onload = function (event) {
            console.log(event.target);
            holder.style.background = 'url(' + event.target.result + ') no-repeat center';
            holder.style.border = 'none';
        };
        reader.readAsDataURL(file);

        return false;
    };
});