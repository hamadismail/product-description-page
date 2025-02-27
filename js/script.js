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
const btnCart = document.getElementById('add-to-cart');
btnCart.addEventListener('click', e => {
  const checkoutContainer = document.getElementById('checkout-container');
  const quantity = parseInt(document.getElementById('quantity').innerText);

  if (quantity > 0) {
    checkoutContainer.classList.remove('hidden');
    cartCnt += quantity;
    document.getElementById('cart-count').innerText = cartCnt;

    const selectedColorBtn = document.querySelector(
      'button.border-purple-600.w-6'
    );
    const selectedSizeBtn = document.querySelector(
      'button.border-purple-600:not(.w-6)'
    );

    const selectedColor = selectedColorBtn.id.split('-')[0];
    const selectedSize = selectedSizeBtn.innerText.split(' ')[0];
    const selectedPrice = parseInt(
      selectedSizeBtn.innerText.split(' ')[1].split('$')[1]
    );

    cartItems.push({
      image: selectedColor + '.png',
      title: 'Classy Modern Smart Watch',
      color: selectedColor,
      size: selectedSize,
      price: quantity * selectedPrice,
    });

    console.log(cartItems);
  } else {
    alert('Please select allest 1 item...');
  }
});
