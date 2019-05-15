// Hamburger
$(document).ready(function() {
  $(".sidenav").sidenav();
});

//Modal
$(document).ready(function() {
  $(".modal").modal();
});

// Database
const data = [
  {
    name: "Pepperoni Pizza",
    prize: 20,
    quantity: 1,
    img: "assets/img/1.png",
    added: false,
    id: 1
  },
  {
    name: "Veggie Pizza",
    prize: 15,
    quantity: 1,
    img: "assets/img/2.png",
    added: false,
    id: 2
  },
  {
    name: "Margareti",
    prize: 25,
    quantity: 1,
    img: "assets/img/3.png",
    added: false,
    id: 3
  },
  {
    name: "Three Cheese Pizza",
    prize: 22,
    quantity: 1,
    img: "assets/img/4.png",
    added: false,
    id: 4
  },
  {
    name: "Crazy Pizza",
    prize: 18,
    quantity: 1,
    img: "assets/img/5.png",
    added: false,
    id: 5
  },
  {
    name: "The wheel",
    prize: 20,
    quantity: 1,
    img: "assets/img/1.png",
    added: false,
    id: 6
  },
  {
    name: "Mushrooms Pizza",
    prize: 10,
    quantity: 1,
    img: "assets/img/3.png",
    added: false,
    id: 7
  },
  {
    name: "Gralic Pizza",
    prize: 23,
    quantity: 1,
    img: "assets/img/5.png",
    added: false,
    id: 8
  }
];

// USER
const wrapper = document.querySelector("#wrapper"),
  tbody = document.querySelector("#table"),
  total = document.querySelector("#total"),
  shopCart = [];

// Gjen totalin
function totalPrize() {
  let tots = 0;
  shopCart.forEach(e => {
    tots += e.prize * e.quantity;
    total.textContent = tots;
  });
  total.textContent = tots;
}

// Create Cards
const createCard = () => {
  data.forEach(e => {
    const col = document.createElement("div"),
      card = document.createElement("div"),
      cardImage = document.createElement("div"),
      img = document.createElement("img"),
      addToCart = document.createElement("a"),
      cardIcon = document.createElement("i"),
      cardContent = document.createElement("div"),
      cardName = document.createElement("span"),
      cardPrize = document.createElement("span");

    col.classList.add("col", "s12", "m4", "l3");
    col.appendChild(card);
    card.classList.add("card");
    card.append(cardImage, cardContent);
    // Card Head
    cardImage.classList.add("card-image");
    cardImage.append(img, addToCart);
    img.setAttribute("src", e.img);
    addToCart.classList.add(
      "btn-floating",
      "halfway-fab",
      "waves-effect",
      "waves-light",
      "red"
    );
    addToCart.appendChild(cardIcon);
    cardIcon.classList.add("fas", "fa-cart-plus");

    addToCart.addEventListener("click", () => {
      if (e.added === false) {
        e.added = true;
        tbody.innerHTML = "";
        shopCart.push(e);
        createItemCart();
        cart.classList.add("pulse");
      } else {
        shopCart.forEach(i => {
          if (e.name === i.name) {
            i.quantity++;
            table.innerHTML = "";
            createItemCart();
          }
        });
      }
    });

    //Card Body
    cardContent.classList.add("card-content");
    cardContent.append(cardName, cardPrize);
    cardName.classList.add("truncate");
    cardName.textContent = e.name;
    cardPrize.textContent = `$${e.prize}`;
    wrapper.appendChild(col);
  });
};

// Krijon Item ne cart
const createItemCart = () => {
  shopCart.forEach(e => {
    const tr = document.createElement("tr"),
      tdName = document.createElement("td"),
      tdQuantity = document.createElement("td"),
      tdQuantityInput = document.createElement("input"),
      tdPrize = document.createElement("td"),
      tdRemove = document.createElement("td"),
      remove = document.createElement("a"),
      removeIcon = document.createElement("i");

    tr.append(tdName, tdQuantity, tdPrize, tdRemove);
    tdName.textContent = e.name;
    tdQuantity.appendChild(tdQuantityInput);
    tdQuantityInput.setAttribute("type", "number");
    tdQuantityInput.value = e.quantity;
    tdPrize.textContent = `$${e.prize * Number(tdQuantityInput.value)}`;
    tdQuantityInput.addEventListener("change", () => {
      if (tdQuantityInput.value >= 1) {
        tdPrize.textContent = `$${e.prize * Number(tdQuantityInput.value)}`;
        e.quantity = Number(tdQuantityInput.value);
        totalPrize();
      } else {
        tdQuantityInput.value = 1;
        tdPrize.textContent = `$${e.prize * Number(tdQuantityInput.value)}`;
        e.quantity = Number(tdQuantityInput.value);
        totalPrize();
      }
    });
    tdRemove.appendChild(remove);
    remove.appendChild(removeIcon);
    remove.classList.add("btn", "red", "waves-effect", "waves-light");
    remove.addEventListener("click", () => {
      shopCart.forEach(removes => {
        if (e.id === removes.id) {
          removes.added = false;
          removes.quantity = 1;
          shopCart.splice(shopCart.indexOf(removes), 1);
          tdRemove.parentElement.remove();
          totalPrize();
        }
      });
    });
    removeIcon.classList.add("fas", "fa-trash");
    tbody.append(tr);
    totalPrize();
  });
};

cart.addEventListener("click", e => {
  cart.classList.remove("pulse");
});

// Check out
const next = document.querySelector(".next"),
  back = document.querySelector(".back"),
  checkout = document.querySelector(".checkout"),
  table = document.querySelector("table");

// Next Check out
next.addEventListener("click", () => {
  next.textContent = "Check out";
  back.style.display = "inline-block";
  table.style.display = "none";
  checkout.style.display = "block";
});
// Back Check out
back.addEventListener("click", () => {
  next.textContent = "Next";
  back.style.display = "none";
  table.style.display = "table";
  checkout.style.display = "none";
});

createCard();
