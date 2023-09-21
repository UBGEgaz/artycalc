        function calcular() {
            // Obter valores dos campos de entrada para o ponto A
            var dA = parseFloat(document.getElementById('distanciaA').value);
            var alphaA = parseFloat(document.getElementById('azimuteA').value);

            // Obter valores dos campos de entrada para o ponto B
            var dB = parseFloat(document.getElementById('distanciaB').value);
            var alphaB = parseFloat(document.getElementById('azimuteB').value);

            // Converter os ângulos de graus para radianos
            var alphaARad = alphaA * (Math.PI / 180);
            var alphaBRad = (alphaB - 180) * (Math.PI / 180); // Aplicando o deslocamento de -180 graus

            // Calcular as coordenadas x e y do ponto C em relação ao ponto A
            var xC = dA * Math.sin(alphaARad) + dB * Math.sin(alphaBRad);
            var yC = dA * Math.cos(alphaARad) + dB * Math.cos(alphaBRad);

            // Calcular a distância e o ângulo de azimute para o ponto C
            var distanciaC = Math.sqrt(xC * xC + yC * yC);
            var alphaC = Math.atan2(xC, yC);

            // Converter o ângulo de radianos para graus
            var alphaCGraus = alphaC * (180 / Math.PI);

            // Ajustar o ângulo para estar dentro do intervalo de 0 a 360 graus
            if (alphaCGraus < 0) {
                alphaCGraus += 360;
            }

            // Exibir os resultados
        var resultadoDistanciaCElement = document.getElementById('resultadoDistanciaC');
        var resultadoAzimuteCElement = document.getElementById('resultadoAzimuteC');

        resultadoDistanciaCElement.style.color = ''; // Reset color
        resultadoDistanciaCElement.innerHTML = 'Distância: ' + distanciaC.toFixed(2) + 'm';

        if (distanciaC > 350) {
            resultadoDistanciaCElement.style.color = 'red';
            resultadoDistanciaCElement.innerHTML += ' <span style="color: red;"> - Fora do alcance</span>';
        }

        resultadoAzimuteCElement.innerHTML = 'Azimute: ' + alphaCGraus.toFixed(2) + '°';
    }