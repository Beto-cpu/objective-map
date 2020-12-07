let locations = ["Apizolaya, Zacatecas", "Campeche, Campeche", "CD. Mexico", "Ciudad Victoria, Tamaulipas", "Ensenada, B.C.", "Gualajara, Jalisco", "Guanajuato, Guanajuato", "La Babia, Coahuila", "Los mochis, Sinaloa", "Mexicali, B.C.", "Morelia, Michoacan", "Mulege, B.C.S.", "Nogales, Sonora", "Parritas, Chihuahua", "Puerto Vallarta, Jalisco", "Oaxaca, Oaxaca", "Tepic, Nayarit", "Tuxtla Guitierrez, Chiapas", "Zihuatanejo, Guerrero"];

let graph = new Map([
    [0, [{ cityConnection: 6, price: 50, time: 5 }, { cityConnection: 7, price: 30, time: 6 }, { cityConnection: 8, price: 100, time: 10 }]],
    [1, [{ cityConnection: 17, price: 35, time: 3 }]],
    [2, [{ cityConnection: 6, price: 60, time: 3 }, { cityConnection: 15, price: 35, time: 3 }, { cityConnection: 18, price: 150, time: 8 }]],
    [3, [{ cityConnection: 7, price: 20, time: 4 }]],
    [4, [{ cityConnection: 9, price: 150, time: 7 }, { cityConnection: 11, price: 75, time: 5 }, { cityConnection: 12, price: 30, time: 3 }]],
    [5, [{ cityConnection: 6, price: 60, time: 4 }, { cityConnection: 14, price: 70, time: 4 }]],
    [6, [{ cityConnection: 0, price: 50, time: 5 }, { cityConnection: 2, price: 60, time: 3 }, { cityConnection: 5, price: 200, time: 8 }, { cityConnection: 10, price: 55, time: 4 }]],
    [7, [{ cityConnection: 0, price: 30, time: 6 }, { cityConnection: 3, price: 20, time: 4 }, { cityConnection: 13, price: 100, time: 5 }]],
    [8, [{ cityConnection: 0, price: 100, time: 10 }, { cityConnection: 12, price: 100, time: 4 }]],
    [9, [{ cityConnection: 4, price: 150, time: 7 }]],
    [10, [{ cityConnection: 6, price: 55, time: 4 }, { cityConnection: 18, price: 50, time: 3 }]],
    [11, [{ cityConnection: 4, price: 75, time: 5 }, { cityConnection: 14, price: 250, time: 10 }]],
    [12, [{ cityConnection: 4, price: 30, time: 3 }, { cityConnection: 8, price: 100, time: 4 }, { cityConnection: 13, price: 80, time: 3 }]],
    [13, [{ cityConnection: 7, price: 100, time: 5 }, { cityConnection: 12, price: 80, time: 3 }]],
    [14, [{ cityConnection: 5, price: 70, time: 4 }, { cityConnection: 11, price: 250, time: 10 }, { cityConnection: 16, price: 70, time: 4 }]],
    [15, [{ cityConnection: 2, price: 35, time: 3 }, { cityConnection: 17, price: 90, time: 6 }, ]],
    [16, [{ cityConnection: 14, price: 70, time: 4 }]],
    [17, [{ cityConnection: 1, price: 35, time: 3 }, { cityConnection: 15, price: 90, time: 6 }]],
    [18, [{ cityConnection: 2, price: 150, time: 8 }, { cityConnection: 10, price: 50, time: 3 }]]
]);


/**
 * 
 * @param {integer} start - idicates where the package is from
 * @param {integer} end - indicates to where the package is going
 * @param {string} parameter - indicates if the path is looking for the cheaper or the faster path
 * @param {boolean} prime - indicates if the package is or not a priority shipping, that affects its price and days of shipping
 */
function dijsktra(start, end, parameter, prime) {
    let vertices = new Map();
    let unVisited = [];

    for (let element of graph) {
        unVisited.push({ value: element[0] });
        vertices.set(element[0], unVisited[unVisited.length - 1]);
    }
    unVisited[start].pathPrice = 0;
    unVisited[start].pathTime = 0;

    while (unVisited.length > 0) {
        bubble(unVisited, parameter);
        relaxation(unVisited.shift().value, vertices, parameter, prime);
    }

    let stack = new Stack();

    for (let actual = vertices.get(end); true; actual = vertices.get(actual.lastVertex)) {
        stack.push(actual);
        if (actual.value == start) {
            break;
        }
    }

    return stack;
}

/**
 * 
 * @param {array} unVisited - vertices that need to be evaluated in dijkstra
 * @param {string} parameter - indicates if the ordering is being done according to the time or the price
 */
function bubble(unVisited, parameter) {
    if (parameter == 'time') {
        for (let i = 2; i < unVisited.length; i++) {
            var auxiliar;

            for (let j = 0; j < unVisited.length - 1; j++) {
                if (unVisited[j + 1].pathTime == undefined) {
                    continue;
                }
                if (unVisited[j].pathTime == undefined || unVisited[j].pathTime > unVisited[j + 1].pathTime) {
                    auxiliar = unVisited[j];
                    unVisited[j] = unVisited[j + 1];
                    unVisited[j + 1] = auxiliar;
                }
            }
        }
    } else {
        for (let i = 2; i < unVisited.length; i++) {
            var auxiliar;

            for (let j = 0; j < unVisited.length - 1; j++) {
                if (unVisited[j + 1].pathPrice == undefined) {
                    continue;
                }
                if (unVisited[j].pathPrice == undefined || unVisited[j].pathPrice > unVisited[j + 1].pathPrice) {
                    auxiliar = unVisited[j];
                    unVisited[j] = unVisited[j + 1];
                    unVisited[j + 1] = auxiliar;
                }
            }
        }
    }
}

/**
 * 
 * @param {integer} v - actual vertex
 * @param {map} vertices - relates the objects that represents the vertices with their location value 
 * @param {string} parameter - indicates if the path is looking for the cheaper or the faster path
 * @param {boolean} prime - indicates if the package is or not a priority shipping, that affects its price and days of shipping
 */
function relaxation(v, vertices, parameter, prime) {
    let timeDiscount = prime ? 2 : 0;
    let priceDiscount = prime ? 0.8 : 1;

    for (let edge of graph.get(v)) {
        if (parameter == 'time') {
            if (vertices.get(edge.cityConnection).pathTime == undefined ||
                vertices.get(v).pathTime + (edge.time - timeDiscount) < vertices.get(edge.cityConnection).pathTime) {
                vertices.get(edge.cityConnection).pathTime = vertices.get(v).pathTime + (edge.time - timeDiscount);
                vertices.get(edge.cityConnection).lastVertex = v;

                vertices.get(edge.cityConnection).pathPrice = vertices.get(v).pathPrice + edge.price * priceDiscount;
                vertices.get(edge.cityConnection).lastVertex = v;
            }

        } else {
            if (vertices.get(edge.cityConnection).pathPrice == undefined ||
                vertices.get(v).pathPrice + (edge.price * priceDiscount) < vertices.get(edge.cityConnection).pathPrice) {
                vertices.get(edge.cityConnection).pathPrice = vertices.get(v).pathPrice + (edge.price * priceDiscount);
                vertices.get(edge.cityConnection).lastVertex = v;

                vertices.get(edge.cityConnection).pathTime = vertices.get(v).pathTime + (edge.time - timeDiscount);
                vertices.get(edge.cityConnection).lastVertex = v;
            }
        }
    }
}

/**
 * 
 * @param {stack} path - contains the locations that a package have to passed for to get to a place
 */
function pathToText(path) {
    let text = ['', ''];
    while (path.size() > 0) {
        if (path.size() != 1) {
            text[0] += locations[path.pop().value] + " - ";
        } else {
            text[0] += locations[path.peek().value];
            text[1] += `Envio de ${path.peek().pathTime} dias por $${path.pop().pathPrice}`;
        }
    }
    return text;
}

/**
 * 
 * @param {stack} path - contains the locations that a package have to passed for to get to a place
 * @param {boolean} prime - one of the characteristic if the package
 */
function pathToObject(path, prime) {
    let obj = { path: '', from: path.peek().value, prime: prime };

    while (path.size() > 0) {
        if (path.size() != 1) {
            obj.path += locations[path.pop().value] + " - ";
        } else {
            obj.path += locations[path.peek().value];
            obj.to = path.peek().value;

            obj.time = path.peek().pathTime;
            obj.price = path.pop().pathPrice;
        }
    }

    return obj;
}