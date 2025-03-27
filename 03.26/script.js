document.addEventListener("DOMContentLoaded", function () {
    const cpfInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const form = document.querySelector('form');

    // Cria elemento de feedback para o CPF
    const cpfFeedback = document.createElement('span');
    cpfFeedback.style.color = '#b13e3e';
    cpfFeedback.style.fontSize = '0.9rem';
    cpfFeedback.style.display = 'none'; // Oculta inicialmente
    cpfInput.parentNode.insertBefore(cpfFeedback, cpfInput.nextSibling);

    // Cria elemento de feedback para a senha
    const passwordFeedback = document.createElement('span');
    passwordFeedback.style.color = '#b13e3e';
    passwordFeedback.style.fontSize = '0.9rem';
    passwordFeedback.style.display = 'none'; // Oculta inicialmente
    passwordInput.parentNode.insertBefore(passwordFeedback, passwordInput.nextSibling);

    // Formatação do CPF enquanto digita
    cpfInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
        if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

        // Adiciona os pontos e o traço
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        e.target.value = value;
    });

    // Validação do CPF no evento blur (quando sai do campo)
    cpfInput.addEventListener('blur', function (e) {
        const cpf = e.target.value.replace(/\D/g, ""); // Limpa o formato
        if (cpf.length === 11 && !validarCPF(cpf)) {
            cpfFeedback.textContent = "⚠️ CPF inválido.";
            cpfFeedback.style.display = 'block';
            cpfInput.style.border = '2px solid #b13e3e';
        } else {
            cpfFeedback.style.display = 'none';
            cpfInput.style.border = '2px solid #4ad751';
        }
    });

    // Validação de senha no evento blur
    passwordInput.addEventListener('blur', function (e) {
        const password = e.target.value;
        if (!/^\d{6}$/.test(password)) {
            passwordFeedback.textContent = "⚠️ A senha deve conter exatamente 6 dígitos.";
            passwordFeedback.style.display = 'block';
            passwordInput.style.border = '2px solid #b13e3e';
        } else {
            passwordFeedback.style.display = 'none';
            passwordInput.style.border = '2px solid #4ad751';
        }
    });

    // Função para validar o CPF
    function validarCPF(cpf) {
        if (/^(\d)\1+$/.test(cpf)) return false; // Verifica se todos os números são iguais

        let soma = 0;
        let resto;

        // Primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        // Segundo dígito verificador
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    // Impede o envio do formulário se o CPF ou a senha forem inválidos
    form.addEventListener('submit', function (e) {
        const cpf = cpfInput.value.replace(/\D/g, "");
        const password = passwordInput.value;

        if (!validarCPF(cpf)) {
            alert("⚠️ CPF inválido. Por favor, corrija antes de continuar.");
            e.preventDefault();
        } else if (!/^\d{6}$/.test(password)) {
            alert("⚠️ A senha deve conter exatamente 6 dígitos.");
            e.preventDefault();
        }
    });
});
