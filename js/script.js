// color switcher
const rignBtns = document.querySelectorAll('.ring-button');

for (const ringBtn of rignBtns) {
  ringBtn.addEventListener('click', e => {
    for (const border of rignBtns) {
      border.classList.remove('border-purple-600');
      border.classList.add('border-gray-300');
    }

    ringBtn.classList.add('border-purple-600');

    const color = e.target.id.replace('-color', '');

    const productImage = document.getElementById('product-image');
    productImage.src = `../images/${color}.png`;
  });
}

// size selector
function selectWristSize(s) {
  const sizes = ['S', 'M', 'L', 'XL'];

  for (const size of sizes) {
    const button = document.getElementById(`size-${size}`);
    if (size === s) {
      button.classList.add('border-purple-600');
    } else {
      button.classList.remove('border-purple-600');
    }
  }
}

// quantity selector
const btnQuantity = document.querySelectorAll('.quantity-button');

for (const btn of btnQuantity) {
  btn.addEventListener('click', e => {
    const sign = e.target.innerText;
    const quantity = sign === '+' ? 1 : -1;

    const quantityContainer = document.getElementById('quantity');
    const currenQuantity = parseInt(quantityContainer.innerText);
    quantityContainer.innerText = Math.max(0, currenQuantity + quantity);
  });
}

// Add to cart
let cartCnt = 0;
let cartItems = [];
let totalPrices = 0;
const totalPriceElement = document.createElement('tr');
totalPriceElement.classList.add('font-semibold');

const btnCart = document.getElementById('add-to-cart');
btnCart.addEventListener('click', e => {
  const checkoutContainer = document.getElementById('checkout-container');
  const quantity = parseInt(document.getElementById('quantity').innerText);

  if (quantity > 0) {
    const selectedColorBtn = document.querySelector(
      'button.border-purple-600.w-6'
    );
    const selectedSizeBtn = document.querySelector(
      'button.border-purple-600:not(.w-6)'
    );

    if (!selectedSizeBtn) {
      alert('Please select a size...');
      return;
    }

    const selectedColor = selectedColorBtn.id.split('-')[0];
    const selectedSize = selectedSizeBtn.innerText.split(' ')[0];
    const selectedPrice = parseInt(
      selectedSizeBtn.innerText.split(' ')[1].split('$')[1]
    );

    checkoutContainer.classList.remove('hidden');
    cartCnt += quantity;
    document.getElementById('cart-count').innerText = cartCnt;

    // Capitalize Color String
    const firstLetter = selectedColor[0];
    const remainingLetter = selectedColor.slice(1);
    const firstLetterCap = firstLetter.toUpperCase();
    const capitalizedWord = firstLetterCap + remainingLetter;

    cartItems.push({
      image: `../images/${selectedColor}.png`,
      title: 'Classy Modern Smart Watch',
      color: capitalizedWord,
      size: selectedSize,
      quantity: quantity,
      price: quantity * selectedPrice,
    });
  } else {
    alert('Please select allest 1 item...');
  }

  // Calculating total items
  for (const price of cartItems) {
    totalPrices += price.price;
  }

  totalPriceElement.innerHTML = `
  <td class="py-2 px-4">Total</td>
  <td></td>
  <td></td>
  <td class="py-2 px-4 text-center">${cartCnt}</td>
  <td class="col-span-3 py-2 px-4 text-center">$${totalPrices}</td>
  `;
});

// Checkout modal
document.getElementById('checkout-btn').addEventListener('click', e => {
  document.getElementById('cart-modal').classList.remove('hidden');

  const cartContainer = document.getElementById('cart-items');

  for (let i = 0; i < cartItems.length; i++) {
    const row = document.createElement('tr');
    row.classList.add('border-b');
    const item = cartItems[i];
    row.innerHTML = `
    <td> 
      <div class="flex items-center space-x-2"> 
        <img class ="h-10 w-12 object-cover rounded-md my-1" src='${item.image}'>
        <span class="font-semibold">${item.title}</span>
      </div>
    </td>
    <td class="py-2 px-4 text-center">${item.color}</td>
    <td class="py-2 px-4 text-center">${item.size}</td>
    <td class="py-2 px-4 text-center">${item.quantity}</td>
    <td class="py-2 px-4 text-center">$${item.price}</td>
    `;
    cartContainer.appendChild(row);
  }
  cartContainer.appendChild(totalPriceElement);
  cartItems = [];
});

document.getElementById('continue-shopping').addEventListener('click', () => {
  document.getElementById('cart-modal').classList.add('hidden');
});

document.getElementById('checkout').addEventListener('click', () => {
  alert(`Please pay amount $${totalPrices}`);
});
