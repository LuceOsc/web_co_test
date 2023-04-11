/* Get objects from DOM */
let llegada = document.getElementById('llegada');
let salida = document.getElementById('salida');
let cuartos = document.getElementById('cuartos');
let adultos = document.getElementById('adultos');
let ninos = document.getElementById('ninos');

/* Set current date to calendar input */
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
llegada.setAttribute('min',today);
salida.setAttribute('min',today);

/* Trigger onchange inputs */
llegada.onchange = function() {
    let llegadaDate = llegada.value;
    salida.setAttribute('min',llegadaDate);
    let splitDate = llegadaDate.split('-');

    document.getElementsByClassName('llegada')[0].textContent = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0];
}

salida.onchange = function() {
    let salidaDate = salida.value;
    let splitDate = salidaDate.split('-');

    document.getElementsByClassName('salida')[0].textContent = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0];
}

/*cuartos.onchange = function() {let cuartosSize = cuartos.value;document.getElementsByClassName('cuartos')[0].textContent = cuartosSize == 1 ? '1 CUARTO' : cuartosSize + ' CUARTOS';}*/

adultos.onchange = function() {
    let adultosSize = adultos.value;

    document.getElementsByClassName('adultos')[0].textContent = adultosSize == 1 ? '1 ADULTO' : adultosSize + ' ADULTOS';
}

ninos.onchange = function() {
    let ninosSize = ninos.value;

    document.getElementsByClassName('ninos')[0].textContent = ninosSize == 1 ? '1 NIÑO' : ninosSize + ' NIÑOS';
}

/* CREAR URL */
function motorUrl(){
    let url = 'https://direct-book.com/properties/theinnatmazatlandirect?locale=es&items[0]';
    url = url + '[adults]=' + adultos.value;
    url = url + '&items[0][children]=' + ninos.value;
    url = url + '&items[0][infants]=0&currency=MXN';
    llegada.value == '' ? url = url + '&checkInDate=' + today : url = url + '&checkInDate=' + llegada.value;

    if(salida.value == ''){
        if(llegada.value == ''){
            let salidaDay = new Date();
            salidaDay.setDate(salidaDay.getDate() + 7);

            let dd1 = String(salidaDay.getDate()).padStart(2, '0');
            let mm1 = String(salidaDay.getMonth() + 1).padStart(2, '0');
            let yyyy1 = salidaDay.getFullYear();

            let salidaFinal = yyyy1 + '-' + mm1 + '-' + dd1;

            url = url + '&checkOutDate=' + salidaFinal;
        } else {
            let llegadaDate = new Date(llegada.value);
            llegadaDate.setDate(llegadaDate.getDate() + 8);    
            
            let dd1 = String(llegadaDate.getDate()).padStart(2, '0');
            let mm1 = String(llegadaDate.getMonth() + 1).padStart(2, '0');
            let yyyy1 = llegadaDate.getFullYear();

            let salidaFinal = yyyy1 + '-' + mm1 + '-' + dd1;

            url = url + '&checkOutDate=' + salidaFinal;
        }
    }else{
        url = url + '&checkOutDate=' + salida.value;
    }
    url = url + '&trackPage=yes';
    console.log(url);
    window.open(url, '_blank');
}