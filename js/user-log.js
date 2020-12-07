if (!sessionStorage.users) {
    let usersData = { root: { value: { phone: 6862787785, name: 'Beto Munguia', password: 'corgi123', admin: true } } };
    SearchBinaryTree.addNode(usersData.root, { value: { phone: 6865782862, name: 'Miguel Lopez', queue: [], password: 'shiba123', prime: true } });
    SearchBinaryTree.addNode(usersData.root, { value: { phone: 6643283484, name: 'Jose Valenzuela', queue: [], password: 'frog123', prime: false } });

    let generalQueue = [];

    let personalQueue = SearchBinaryTree.searchNode(usersData.root, 6865782862).value.queue;
    generalQueue.push({ user: 6865782862, value: { name: 'CEL', path: 'Apizolaya, Zacatecas - Guanajuato, Guanajuato - CD. Mexico - Oaxaca, Oaxaca - Tuxtla Guitierrez, Chiapas - Campeche, Campeche', from: 0, to: 1, prime: true, price: 216, time: 10 } });
    personalQueue.push({ value: { name: 'CEL', path: 'Apizolaya, Zacatecas - Guanajuato, Guanajuato - CD. Mexico - Oaxaca, Oaxaca - Tuxtla Guitierrez, Chiapas - Campeche, Campeche', from: 0, to: 1, prime: true, price: 216, time: 10 } });
    generalQueue.push({ user: 6865782862, value: { name: 'Amazon', path: 'Zihuatanejo, Guerrero - CD. Mexico', from: 18, to: 2, prime: true, price: 120, time: 6 } });
    personalQueue.push({ value: { name: 'Amazon', path: 'Zihuatanejo, Guerrero - CD. Mexico', from: 18, to: 2, prime: true, price: 120, time: 6 } });

    personalQueue = SearchBinaryTree.searchNode(usersData.root, 6643283484).value.queue;
    generalQueue.push({ user: 6643283484, value: { name: 'Consola', path: 'Mulege, B.C.S. - Ensenada, B.C. - Mexicali, B.C.', from: 11, to: 4, prime: false, price: 225, time: 12 } });
    personalQueue.push({ value: { name: 'Consola', path: 'Mulege, B.C.S. - Ensenada, B.C. - Mexicali, B.C.', from: 11, to: 4, prime: false, price: 225, time: 12 } });
    generalQueue.push({ user: 6643283484, value: { name: 'Tetera', path: 'Puerto Vallarta, Jalisco - Gualajara, Jalisco - Guanajuato, Guanajuato - CD. Mexico - Oaxaca, Oaxaca - Tuxtla Guitierrez, Chiapas', from: 14, to: 17, prime: false, price: 315, time: 20 } });
    personalQueue.push({ value: { name: 'Tetera', path: 'Puerto Vallarta, Jalisco - Gualajara, Jalisco - Guanajuato, Guanajuato - CD. Mexico - Oaxaca, Oaxaca - Tuxtla Guitierrez, Chiapas', from: 14, to: 17, prime: false, price: 315, time: 20 } });

    sessionStorage.generalQueue = JSON.stringify(generalQueue);
    sessionStorage.users = JSON.stringify(usersData);
}

let users = JSON.parse(sessionStorage.users);

function signUp() {
    let name = document.getElementById('name').value;
    let phone = Number(document.getElementById('phone').value);
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (name == '' || phone == '' || password == '') {
        alert("Debe llenar todos los campos.");
        return;
    }
    if (phone.toString().length != 10 || Object.is(phone, NaN)) {
        alert("El telefono debe ser un número de 10 dígitos.");
        return;
    }

    if (password != confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    let user = { value: { phone: phone, name: name, queue: [], password: password, prime: false } };
    SearchBinaryTree.addNode(users.root, user);
    alert("Registro Exitoso");

    sessionStorage.actualUser = JSON.stringify(user.value.phone);
    sessionStorage.users = JSON.stringify(users);

    window.location.replace("./user_page.html");
}

function logIn() {
    let phone = Number(document.getElementById('phone').value);
    let password = document.getElementById('password').value;

    if (phone == '' || password == '' || phone.toString().length != 10 || Object.is(phone, NaN)) {
        alert("Usuario no Encontrado");
        return;
    }

    let user = SearchBinaryTree.searchNode(users.root, phone);

    if (user == 'Not Found') {
        alert("Usuario no Encontrado");
        return;
    }

    if (user.value.password != password) {
        alert("Contraseña Incorrecta");
        return;
    }

    sessionStorage.actualUser = JSON.stringify(user.value.phone);
    sessionStorage.users = JSON.stringify(users);

    window.location.replace("./user_page.html");
}