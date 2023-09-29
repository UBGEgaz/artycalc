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

       /* if (distanciaC > 350) {
            resultadoDistanciaCElement.style.color = 'red';
            resultadoDistanciaCElement.innerHTML += ' <span style="color: red;"> - Fora do alcance</span>';
        }
*/
        resultadoAzimuteCElement.innerHTML = 'Azimute: ' + alphaCGraus.toFixed(2) + '°';
    }

// Salvar Coordenadas do Alvo...

const dataForm = document.getElementById('data-form');
const dataTable = document.getElementById('data-table');
const editButton = document.getElementById('edit-button');
const deleteButton = document.getElementById('delete-button');
let editRowIndex = null;

// Função para salvar os dados no localStorage
function saveDataToLocalStorage() {
    const data = [];
    const rows = dataTable.rows;

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const nome = row.cells[0].textContent;
        const azimuteA = row.cells[1].textContent;
        const distanciaA = row.cells[2].textContent;
        data.push({ nome, azimuteA, distanciaA });
    }

    localStorage.setItem('dados', JSON.stringify(data));
}

// Função para carregar dados do localStorage
function loadSavedData() {
    const savedData = JSON.parse(localStorage.getItem('dados') || '[]');

    for (const { nome, azimuteA, distanciaA } of savedData) {
        const newRow = dataTable.insertRow();
        newRow.insertCell(0).textContent = nome;
        newRow.insertCell(1).textContent = azimuteA;
        newRow.insertCell(2).textContent = distanciaA;
        const actionsCell = newRow.insertCell(3);

        actionsCell.innerHTML = '<button class="edit-button">Editar</button> <button class="delete-button">Excluir</button>';
    }
}

// Carregar dados do localStorage quando a página é carregada
loadSavedData();

dataForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const azimuteA = document.getElementById('azimuteA').value;
    const distanciaA = document.getElementById('distanciaA').value;

    if (editRowIndex === null) {
        // Adicionar uma nova linha à tabela
        const newRow = dataTable.insertRow();
        newRow.insertCell(0).textContent = nome;
        newRow.insertCell(1).textContent = azimuteA;
        newRow.insertCell(2).textContent = distanciaA;
        const actionsCell = newRow.insertCell(3);

        actionsCell.innerHTML = '<button class="edit-button">Editar</button> <button class="delete-button">Excluir</button>';

        // Adicionar eventos de clique para editar e excluir
        const editBtn = actionsCell.querySelector('.edit-button');
        editBtn.addEventListener('click', function () {
            editRowIndex = newRow.rowIndex;
            document.getElementById('nome').value = nome;
            document.getElementById('azimuteA').value = azimuteA;
            document.getElementById('distanciaA').value = distanciaA;
            editButton.style.display = 'inline-block';
            deleteButton.style.display = 'inline-block';
        });

        const deleteBtn = actionsCell.querySelector('.delete-button');
        deleteBtn.addEventListener('click', function () {
            dataTable.deleteRow(newRow.rowIndex);
            saveDataToLocalStorage(); // Atualizar dados após a exclusão
        });

        // Limpar os campos do formulário
        dataForm.reset();

        // Salvar os dados no localStorage
        saveDataToLocalStorage();
    } else {
        // Atualizar a linha existente
        const row = dataTable.rows[editRowIndex];
        row.cells[0].textContent = nome;
        row.cells[1].textContent = azimuteA;
        row.cells[2].textContent = distanciaA;
        editButton.style.display = 'none';
        deleteButton.style.display = 'none';
        editRowIndex = null;
        dataForm.reset();

        // Salvar os dados atualizados no localStorage
        saveDataToLocalStorage();
    }
});

editButton.addEventListener('click', function () {
    editRowIndex = null;
    dataForm.reset();
    editButton.style.display = 'none';
    deleteButton.style.display = 'none';
});

deleteButton.addEventListener('click', function () {
    dataTable.deleteRow(editRowIndex);
    editRowIndex = null;
    dataForm.reset();
    editButton.style.display = 'none';
    deleteButton.style.display = 'none';

    // Salvar os dados após a exclusão
    saveDataToLocalStorage();
});