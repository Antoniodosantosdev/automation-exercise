const checkoutElements = {
  inputEmail: '[data-qa="login-email"]',
  passwordInput: '[data-qa="login-password"]',
  loginButton: '[data-qa="login-button"]',
 
  // Produto
  productSelector: ".productinfo",
  quantityInput: "#quantity",
  addToCartButton: ".cart",
  continueShoppingButton: "Continue Shopping",
  viewCartButton: "View Cart",
  proceedToCheckout: "Proceed To Checkout",
  addressName: "#address_delivery .address_firstname",
  cartQuantityButton: (productId) =>
    `#product-${productId} .cart_quantity button`,
  cartDescriptionName: (productId) =>
    `#product-${productId} .cart_description a`,
  cartPrice: (productId) => `#product-${productId} .cart_price p`,

  // --- Pagamento
  textareaMensagem: '[name="message"]',
  placeOrderButton: "Place Order",
  cardName: '[data-qa="name-on-card"]',
  cardNumber: '[data-qa="card-number"]',
  cardCVC: '[data-qa="cvc"]',
  cardMonth: '[data-qa="expiry-month"]',
  cardYear: '[data-qa="expiry-year"]',
  payButton: '[data-qa="pay-button"]',

  // --- Pós-pagamento
  orderConfirmedMessage: "Congratulations! Your order has been confirmed!",
  downloadInvoiceButton: "Download Invoice",
};

export default checkoutElements;