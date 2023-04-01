let carro = [];
const counterCart = document.getElementById("counterCart");
const navbarEmail = document.querySelector(".navbar-email");
const desktopMenu = document.querySelector(".desktop-menu");
const cantidadCounter = document.querySelector(".cantidadCounter");
const menuBurger = document.querySelector(".menu");
const mobileMenu = document.querySelector(".mobile-menu");
let productsList = [];
const menuCarritoIcon = document.querySelector(".navbar-shopping-cart");
const asideCar = document.querySelector("#shoppingCartContainer");
const cardsContainer = document.querySelector(".cards-container");

const orderContent = document.querySelector(".my-order-content");
const productDetail = document.getElementById("productDetail");

//Prueba
const btnAumentar = document.createElement("button");
const btnDisminuir = document.createElement("button");
navbarEmail.addEventListener("click", toggleDesktopMenu);
menuBurger.addEventListener("click", toggleMobileMenu);
menuCarritoIcon.addEventListener("click", toggleAsideCar);

function toggleDesktopMenu() {
  console.log("click");
  productDetail.classList.add("inactive");
  desktopMenu.classList.toggle("inactive");
  asideCar.classList.add("inactive");
}
function toggleMobileMenu() {
  console.log("click2");
  productDetail.classList.add("inactive");
  mobileMenu.classList.toggle("inactive");
  asideCar.classList.add("inactive");
}

function totalProductsCart(arr) {
  counterCart.innerText = arr.reduce(
    (acc, product) => acc + product.cantidad,
    0
  );
}

function toggleAsideCar() {
  console.log(carro);
  productDetail.classList.add("inactive");
  orderContent.innerHTML = "";
  carro.forEach((product) => {
    const pCantidad = document.createElement("p");
    const priceCart = document.createElement("p");
    const shoppingCart = document.createElement("div");
    shoppingCart.classList.add("shopping-cart");

    const figureCart = document.createElement("figure");
    //figureCart.classList.add("figure-cart");
    const imgCart = document.createElement("img");
    imgCart.setAttribute("src", product.image);
    //imgCart.className = "img-cart";
    figureCart.appendChild(imgCart);

    const pCart = document.createElement("p");
    pCart.innerText = product.name;

    const divCantidad = document.createElement("div");

    btnAumentar.innerText = "+";
    btnAumentar.addEventListener("click", () => aumentarCantidad(product));
    btnDisminuir.innerText = "-";
    btnDisminuir.addEventListener("click", () => disminuirCantidad(product));
    divCantidad.appendChild(pCantidad);
    divCantidad.appendChild(btnAumentar);
    divCantidad.appendChild(btnDisminuir);
    divCantidad.classList.add("divCantidad");

    priceCart.innerText = "$" + product.price * product.cantidad;

    const imgCloseCart = document.createElement("img");
    imgCloseCart.setAttribute("src", "./icons/icon_close.png");
    //Eliminar producto
    imgCloseCart.addEventListener("click", () => eliminarProducto());

    shoppingCart.append(
      figureCart,
      pCart,
      divCantidad,
      priceCart,
      imgCloseCart
    );
    orderContent.appendChild(shoppingCart);
  });
  const orderTotal = document.createElement("div");
  orderTotal.classList.add("order");
  const pTotal = document.createElement("p");
  const spanTotal = document.createElement("span");
  spanTotal.innerText = "Total";
  pTotal.appendChild(spanTotal);

  const total = carro.reduce(
    (acc, product) => acc + product.price * product.cantidad,
    0
  );
  const priceTotal = document.createElement("p");
  priceTotal.innerText = "$" + total;
  orderTotal.append(pTotal, priceTotal);

  const btnCheckout = document.createElement("button");
  btnCheckout.innerText = "Checkout";
  btnCheckout.classList.add("primary-button");

  orderContent.append(orderTotal, btnCheckout);
  mobileMenu.classList.add("inactive");
  asideCar.classList.toggle("inactive");
  desktopMenu.classList.add("inactive");
}

const aumentarCantidad = (product) => {
  product.cantidad++;
  product.stock--;
  if (product.cantidad > 0) {
    btnDisminuir.disabled = false;
  }
  if (product.stock === 0) {
    btnAumentar.disabled = true;
  }
  totalProductsCart(carro);
  cantidadCounter.innerText = product.cantidad;
};

function disminuirCantidad(product) {
  product.cantidad--;
  product.stock++;
  if (product.stock > 0) {
    btnAumentar.disabled = false;
  }
  product.cantidad === 0 ? (btnDisminuir.disabled = true) : false;
  totalProductsCart(carro);
  cantidadCounter.innerText = product.cantidad;
}

// haciendo que con la function DOMContentLoaded al cargar al APP, se ejecute la data, y la renderizacion de los productos.
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  renderProduct();
});

// function para traer la data desde el archivo externo con FETCH.
async function fetchData() {
  const res = await fetch("/js/data.json");
  const data = await res.json();
  productsList = data;
  renderProduct();
}

function toggleProductDetail(product) {
  productDetail.classList.remove("inactive");
  productDetail.innerHTML = "";
  const encontrado = productsList.find(
    (findProduct) => findProduct.id === product.id
  );
  console.log(encontrado);
  const divDetClose = document.createElement("div");
  divDetClose.classList.add("product-detail-close");

  const iconDetClose = document.createElement("img");
  iconDetClose.setAttribute("src", "./icons/icon_close.png");

  divDetClose.appendChild(iconDetClose);
  divDetClose.addEventListener("click", () => {
    productDetail.classList.add("inactive");
  });

  const imgProDetail = document.createElement("img");
  imgProDetail.setAttribute("id", "imgProductDetail");
  imgProDetail.setAttribute("src", encontrado.image);

  const divProInfo = document.createElement("div");
  divProInfo.classList.add("product-info");
  const pDetail1 = document.createElement("p");
  pDetail1.innerText = encontrado.price;
  const pDetail2 = document.createElement("p");
  pDetail2.innerText = encontrado.name;
  const pDetail3 = document.createElement("p");
  pDetail3.innerText =
    "With its practical position, this bike also fulfills a decorative function, add your hall or workspace.";

  const btnAddDetCart = document.createElement("button");
  btnAddDetCart.classList.add("primary-button", "add-to-cart-button");
  const imgAddDetCart = document.createElement("img");
  imgAddDetCart.setAttribute("src", "./icons/bt_add_to_cart.svg");
  btnAddDetCart.appendChild(imgAddDetCart);
  btnAddDetCart.addEventListener("click", () => agregarAlCarrito(product));

  divProInfo.append(pDetail1, pDetail2, pDetail3, btnAddDetCart);

  productDetail.append(divDetClose, imgProDetail, divProInfo);
}

function renderProduct() {
  productsList.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productImg = document.createElement("img");
    productImg.setAttribute("src", product.image);
    productImg.addEventListener("click", () => toggleProductDetail(product));
    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    const productInfoDiv = document.createElement("div");
    const productPrice = document.createElement("p");
    productPrice.innerText = "$" + product.price;
    const productName = document.createElement("p");
    productName.innerText = product.name;
    productInfoDiv.append(productPrice, productName);
    const productInfoFigure = document.createElement("figure");
    const btnImg = document.createElement("button");
    btnImg.classList.add("btnImg");
    const productImgCart = document.createElement("img");
    productImgCart.setAttribute("src", "./icons/bt_add_to_cart.svg");
    btnImg.appendChild(productImgCart);
    productInfoFigure.appendChild(btnImg);
    btnImg.addEventListener("click", () => agregarAlCarrito(product));
    productInfo.appendChild(productInfoDiv);
    productInfo.appendChild(productInfoFigure);
    productCard.appendChild(productImg);
    productCard.appendChild(productInfo);
    cardsContainer.appendChild(productCard);
  });
}

function agregarAlCarrito(product) {
  const repeat = carro.some((repeatProduct) => repeatProduct.id === product.id);
  if (repeat) {
    carro.map((prod) => prod.id === product.id && prod.cantidad++);
  } else {
    carro.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      cantidad: product.cantidad,
      stock: product.stock,
    });
  }
  counterCart.classList.add("classCounterCart");
  totalProductsCart(carro);
}
renderProduct(productsList);
