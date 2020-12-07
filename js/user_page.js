function changeMembership() {
    actualUser.prime = !actualUser.prime;
    updateMessages();
}

function sentPackage() {
    let shift = queue.shift();

    if (shift) {
        SearchBinaryTree.searchNode(users.root, shift.user).value.queue.shift();
    }

    updateTable();
}

function addPackage() {
    let personalQueue = actualUser.queue;
    let name = document.getElementById('name').value;
    let start = parseInt(document.getElementById('start').value);
    let end = parseInt(document.getElementById('end').value);

    let pack = document.getElementById('price-option').checked ? pathToObject(dijsktra(start, end, 'price', actualUser.prime)) : pathToObject(dijsktra(start, end, 'time', actualUser.prime));

    generalQueue.push({ user: actualUser.phone, value: { name: name, path: pack.path, from: pack.from, to: pack.to, prime: actualUser.prime, price: pack.price, time: pack.time } });
    queue.push({ value: { name: name, path: pack.path, from: pack.from, to: pack.to, prime: actualUser.prime, price: pack.price, time: pack.time } });

    alert('Paquete agregado.');
    updateGlobal();
    location.reload();
}