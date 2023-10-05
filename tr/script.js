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
    var diferencaUmGrauElement = document.getElementById('diferencaUmGrau');

    resultadoDistanciaCElement.style.color = ''; // Reset color
    resultadoDistanciaCElement.innerHTML = 'Mesafe: ' + distanciaC.toFixed(2) + 'm';

    resultadoAzimuteCElement.innerHTML = 'Azimut: ' + alphaCGraus.toFixed(2) + '°';

    // Calcular a diferença em metros para um aumento de 1 grau no azimuteC
    var novoAzimuteC = alphaCGraus + 1; // Aumento de 1 grau
    var novoAlphaCRad = novoAzimuteC * (Math.PI / 180);
    var novoXC = distanciaC * Math.sin(novoAlphaCRad);
    var novoYC = distanciaC * Math.cos(novoAlphaCRad);
    var diferencaMetros = Math.sqrt(Math.pow(novoXC - xC, 2) + Math.pow(novoYC - yC, 2));

    diferencaUmGrauElement.innerHTML = 'Her 1´de bir = ' + diferencaMetros.toFixed(2) + 'daha fazla metre';
}

// Salvar Coordenadas do Alvo...
const dataForm = document.getElementById('data-form');
const dataTable = document.getElementById('data-table');
const editButton = document.getElementById('edit-button');
const deleteButton = document.getElementById('delete-button');
const clearButton = document.getElementById('clear-button');
let editRowIndex = null;
// Função para salvar dados no localStorage
function saveData(nome, distanciaA, azimuteA) {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    data.push({ nome, distanciaA, azimuteA });
    localStorage.setItem('data', JSON.stringify(data));
}
// Função para carregar dados da localStorage e atualizar a tabela
function loadData() {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    const tbody = dataTable.querySelector('tbody');
    tbody.innerHTML = '';
    data.forEach((item, index) => {
        const newRow = tbody.insertRow();
        newRow.insertCell(0).textContent = item.nome;
        newRow.insertCell(1).textContent = item.distanciaA;
        newRow.insertCell(2).textContent = item.azimuteA;
        const actionsCell = newRow.insertCell(3);
        actionsCell.innerHTML = `<button class="edit-button" data-index="${index}"><i class="far fa-edit"></i> Düzenlemek için</button> <button class="delete-button" data-index="${index}"><i class="far fa-trash-alt"></i> Silmek</button>`;
    });
    // Adicionar eventos de clique para editar e excluir
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            editRowIndex = parseInt(button.getAttribute('data-index'));
            const data = JSON.parse(localStorage.getItem('data')) || [];
            const item = data[editRowIndex];
            document.getElementById('nome').value = item.nome;
            document.getElementById('azimuteA').value = item.azimuteA;
            document.getElementById('distanciaA').value = item.distanciaA;
            editButton.style.display = 'inline-block';
            deleteButton.style.display = 'inline-block';
        });
    });
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const index = parseInt(button.getAttribute('data-index'));
            const data = JSON.parse(localStorage.getItem('data')) || [];
            data.splice(index, 1);
            localStorage.setItem('data', JSON.stringify(data));
            loadData();
        });
    });
}
// Carregar dados ao iniciar a página
loadData();
dataForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const distanciaA = document.getElementById('distanciaA').value;
    const azimuteA = document.getElementById('azimuteA').value;
    if (editRowIndex === null) {
        // Adicionar uma nova linha à tabela
        saveData(nome, distanciaA, azimuteA);
    } else {
        // Atualizar a linha existente
        const data = JSON.parse(localStorage.getItem('data')) || [];
        data[editRowIndex] = { nome, distanciaA, azimuteA };
        localStorage.setItem('data', JSON.stringify(data));
        editRowIndex = null;
    }
    // Limpar os campos do formulário
    dataForm.reset();
    loadData();
});

clearButton.addEventListener('click', function () {
    localStorage.removeItem('data');
    loadData();
});

function toggleInformacoes() {
    var informacoesAdicionais = document.getElementById("informacoesAdicionais");
    var botaoMostrarOcultar = document.getElementById("mostrarOcultar");

    if (informacoesAdicionais.style.display === "none" || informacoesAdicionais.style.display === "") {
        informacoesAdicionais.style.display = "block";
        botaoMostrarOcultar.textContent = "Ek bilgileri gizlemek için burayı tıklayın";
    } else {
        informacoesAdicionais.style.display = "none";
        botaoMostrarOcultar.textContent = "Ek bilgi göstermek için burayı tıklayın";
    }
}