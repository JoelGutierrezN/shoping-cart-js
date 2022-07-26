
const cart = document.querySelector('#carrito'),
    courseList = document.querySelector('#lista-cursos'),
    emptyCart = document.querySelector('#vaciar-carrito'),
    cartContent = document.querySelector('#lista-carrito tbody');

let cartItems = [];

loadEvents();


//functions

function loadEvents() {
    courseList.addEventListener('click', addCourse);

    cart.addEventListener('click', deleteCourse);

    emptyCart.addEventListener('click', (e) => {
        e.preventDefault();

        cartItems = [];

        cleanData();
    });
}

function addCourse(e) {
    if (e.target.classList.contains('agregar-carrito')) {
        e.preventDefault();
        saveProduct(e.target.parentElement.parentElement);
    }
}

function deleteCourse(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const courseId = e.target.getAttribute('data-id');

        cartItems = cartItems.filter(course => course.id !== courseId);

        renderCart();
    }
}

function saveProduct(course) {
    const dataCourse = {
        id: course.querySelector('a').getAttribute('data-id'),
        img: course.querySelector('img').src,
        name: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        quantity: 1
    }

    const exist = cartItems.some(course => course.id === dataCourse.id);

    if (exist) {
        const courses = cartItems.map(course => {
            if (course.id === dataCourse.id) {
                course.quantity++;
                return course;
            } else {
                return course;
            }
        });

        cartItems = [...courses];
    } else {
        cartItems = [...cartItems, dataCourse];
    }


    renderCart();
}

function renderCart() {

    cleanData();

    cartItems.forEach(course => {
        const { img, name, price, quantity, id } = course;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${img}" width="100px">  
            </td>
            <td> ${name} </td>
            <td> ${price} </td>
            <td> ${quantity} </td>
            <td> 
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        cartContent.appendChild(row);
    });
}

function cleanData() {
    // Inner HTML limpia mas lento
    // cartContent.innerHTML = '';

    while (cartContent.firstChild) {
        cartContent.removeChild(cartContent.firstChild);
    }
}


