import React, { useState } from "react";
import "./components/Cafe.css";
import img from "./assets/coffeered.png";
import img1 from "./assets/images/c4.jpeg";
import img02 from "./assets/snack1.png";
import img03 from "./assets/snack2.png";






const menuData = [
  { id:1, name:"Signature Latte", price:250, discount:10, rating:"★★★★☆", flavours:"Vanilla, Caramel", imgSrc:"images/coffee1.jpg" },
  { id:2, name:"Caramel Macchiato", price:280, discount:5, rating:"★★★★", flavours:"Caramel, Toffee", imgSrc:"images/coffee2.jpg" },
  { id:3, name:"Hazelnut Latte", price:270, discount:8, rating:"★★★★☆", flavours:"Hazelnut, Nutella", imgSrc:"images/coffee3.jpg" },
  { id:4, name:"Classic Cappuccino", price:230, discount:0, rating:"★★★★", flavours:"—", imgSrc:"images/coffee4.jpg" },
  { id:5, name:"Vanilla Iced Latte", price:260, discount:7, rating:"★★★★☆", flavours:"Vanilla, Ice", imgSrc:"images/coffee5.jpg" },
  { id:6, name:"Mocha Latte", price:290, discount:5, rating:"★★★★☆", flavours:"Chocolate, Coffee", imgSrc:"images/coffee6.jpg" },
  { id:7, name:"Flat White", price:240, discount:0, rating:"★★★★", flavours:"—", imgSrc:"images/coffee7.jpg" },
  { id:8, name:"Espresso Macchiato", price:220, discount:0, rating:"★★★★☆", flavours:"—", imgSrc:"images/coffee8.jpg" },
  { id:9, name:"Iced Americano", price:200, discount:0, rating:"★★★★", flavours:"Ice, Black Coffee", imgSrc:"images/coffee9.jpg" },
  { id:10, name:"Cold Brew", price:230, discount:0, rating:"★★★★☆", flavours:"Smooth, Cold Coffee", imgSrc:"images/coffee10.jpg" },
  { id:11, name:"Matcha Latte", price:260, discount:6, rating:"★★★★☆", flavours:"Matcha, Green Tea", imgSrc:"images/coffee11.jpg" },
  { id:12, name:"Chai Latte", price:240, discount:4, rating:"★★★★", flavours:"Spiced Tea, Cinnamon", imgSrc:"images/coffee12.jpg" },
  { id:13, name:"Affogato", price:300, discount:0, rating:"★★★★☆", flavours:"Espresso + Ice Cream", imgSrc:"images/coffee13.jpg" },
  { id:14, name:"White Chocolate Mocha", price:320, discount:10, rating:"★★★★★", flavours:"White Chocolate, Hazelnut", imgSrc:"images/coffee14.jpg" },
  { id:15, name:"Italian Espresso", price:200, discount:0, rating:"★★★★", flavours:"Strong, Pure", imgSrc:"images/coffee15.jpg" },
  { id:16, name:"Turmeric Latte", price:250, discount:5, rating:"★★★★☆", flavours:"Turmeric, Honey", imgSrc:"images/coffee16.jpg" },
  { id:17, name:"Pumpkin Spice Latte", price:300, discount:12, rating:"★★★★★", flavours:"Pumpkin, Cinnamon", imgSrc:"images/coffee17.jpg" },
  { id:18, name:"Matcha Frappé", price:280, discount:6, rating:"★★★★☆", flavours:"Matcha, Ice Blend", imgSrc:"images/coffee18.jpg" },
  { id:19, name:"Iced Caramel Macchiato", price:290, discount:7, rating:"★★★★☆", flavours:"Caramel, Ice", imgSrc:"images/coffee19.jpg" },
  { id:20, name:"Honey Oat Latte", price:270, discount:8, rating:"★★★★☆", flavours:"Honey, Oat Milk", imgSrc:"images/coffee20.jpg" },
  { id:21, name:"Chocolate Muffin", price:150, discount:5, rating:"★★★★", flavours:"Chocolate, Whey-Free", imgSrc:"images/snack1.jpg" },
  { id:22, name:"Blueberry Scone", price:140, discount:0, rating:"★★★★☆", flavours:"Blueberry, Fresh", imgSrc:"images/snack2.jpg" },
  { id:23, name:"Ham & Cheese Croissant", price:180, discount:10, rating:"★★★★☆", flavours:"Ham, Cheese, Butter", imgSrc:"images/snack3.jpg" },
  { id:24, name:"Veg Sandwich", price:160, discount:5, rating:"★★★★", flavours:"Veggies, Whole-Grain", imgSrc:"images/snack4.jpg" },
  { id:25, name:"Chocolate Brownie", price:130, discount:10, rating:"★★★★☆", flavours:"Dark Chocolate, Walnuts", imgSrc:"images/snack5.jpg" },
  { id:26, name:"Fruit Salad", price:120, discount:0, rating:"★★★★", flavours:"Seasonal Fruits", imgSrc:"images/snack6.jpg" },
  { id:27, name:"Cheese Platter", price:200, discount:8, rating:"★★★★☆", flavours:"Cheese, Crackers", imgSrc:"images/snack7.jpg" },
  { id:28, name:"Almond Biscotti", price:110, discount:0, rating:"★★★★", flavours:"Almond, Crunchy", imgSrc:"images/snack8.jpg" },
  { id:29, name:"Croissant Butter", price:140, discount:5, rating:"★★★★", flavours:"Butter, Flaky", imgSrc:"images/snack9.jpg" },
  { id:30, name:"Cinnamon Roll", price:150, discount:10, rating:"★★★★☆", flavours:"Cinnamon, Icing", imgSrc:"images/snack10.jpg" },
  { id:31, name:"Strawberry Cheesecake Slice", price:170, discount:7, rating:"★★★★☆", flavours:"Strawberry, Cream Cheese", imgSrc:"images/snack11.jpg" },
  { id:32, name:"Banana Bread", price:130, discount:0, rating:"★★★★", flavours:"Banana, Nuts", imgSrc:"images/snack12.jpg" },
  { id:33, name:"Blueberry Muffin", price:145, discount:5, rating:"★★★★☆", flavours:"Blueberry, Oats", imgSrc:"images/snack13.jpg" },
  { id:34, name:"Spinach Feta Wrap", price:180, discount:6, rating:"★★★★☆", flavours:"Spinach, Feta", imgSrc:"images/snack14.jpg" },
  { id:35, name:"Chicken Panini", price:190, discount:8, rating:"★★★★☆", flavours:"Chicken, Cheese, Tomato", imgSrc:"images/snack15.jpg" },
  { id:36, name:"Pumpkin Soup Bowl", price:160, discount:0, rating:"★★★★", flavours:"Pumpkin, Cream", imgSrc:"images/snack16.jpg" },
  { id:37, name:"Avocado Toast", price:175, discount:5, rating:"★★★★☆", flavours:"Avocado, Poached Egg", imgSrc:"images/snack17.jpg" },
  { id:38, name:"Berry Smoothie", price:150, discount:0, rating:"★★★★", flavours:"Mixed Berries, Yogurt", imgSrc:"images/snack18.jpg" },
  { id:39, name:"Greek Yogurt Parfait", price:140, discount:4, rating:"★★★★", flavours:"Yogurt, Granola", imgSrc:"images/snack19.jpg" },
  { id:40, name:"Garlic Breadsticks", price:120, discount:3, rating:"★★★★", flavours:"Garlic, Herbs", imgSrc:"images/snack20.jpg" },
  { id:41, name:"Iced Mocha Frappe", price:300, discount:10, rating:"★★★★★", flavours:"Chocolate, Ice", imgSrc:"images/coffee21.jpg" },
  { id:42, name:"Hazelnut Iced Latte", price:280, discount:5, rating:"★★★★☆", flavours:"Hazelnut, Ice", imgSrc:"images/coffee22.jpg" },
  { id:43, name:"Salted Caramel Latte", price:290, discount:7, rating:"★★★★☆", flavours:"Salted Caramel, Milk", imgSrc:"images/coffee23.jpg" },
  { id:44, name:"White Chocolate Iced Mocha", price:310, discount:8, rating:"★★★★★", flavours:"White Chocolate, Ice", imgSrc:"images/coffee24.jpg" },
  { id:45, name:"Gingerbread Latte", price:260, discount:6, rating:"★★★★", flavours:"Gingerbread, Cinnamon", imgSrc:"images/coffee25.jpg" },
  { id:46, name:"Café Au Lait", price:220, discount:0, rating:"★★★★", flavours:"Coffee, Steamed Milk", imgSrc:"images/coffee26.jpg" },
  { id:47, name:"Vanilla Hazelnut Cold Brew", price:270, discount:5, rating:"★★★★☆", flavours:"Vanilla, Hazelnut, Cold", imgSrc:"images/coffee27.jpg" },
  { id:48, name:"Espresso Con Panna", price:210, discount:0, rating:"★★★★", flavours:"Espresso, Whipped Cream", imgSrc:"images/coffee28.jpg" },
  { id:49, name:"Berry Iced Latte", price:280, discount:6, rating:"★★★★☆", flavours:"Mixed Berries, Milk", imgSrc:"images/coffee29.jpg" },
  { id:50, name:"Caramel Crunch Frappé", price:320, discount:10, rating:"★★★★★", flavours:"Caramel, Crunch, Ice", imgSrc:"images/coffee30.jpg" }
];


function Cafe() {
  const [cartItems, setCartItems] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const exists = prev.find(ci => ci.id === item.id);
      if (exists) {
        return prev.map(ci =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { ...item, quantity:1 }];
    });
  };

  const handleMenuToggle = () => setSidebarOpen(o => !o);
  const handleCartToggle = () => setCartOpen(o => !o);

  return (
    <div className="App">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-logo">𝕫ꪮꪗꪖ ᥴꪖᠻꫀ</div>
        <nav className="navbar-links">
          <button onClick={handleMenuToggle}>☰ Menu</button>
          <button onClick={handleCartToggle}>Cart ({cartItems.length})</button>
        </nav>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="sidebar-close" onClick={handleMenuToggle}>×</button>
        <ul>
          <li><a href="#home" onClick={handleMenuToggle}>Home</a></li>
          <li><a href="#menu" onClick={handleMenuToggle}>Menu</a></li>
          <li><a href="#gallery" onClick={handleMenuToggle}>Gallery</a></li>
          <li><a href="#details" onClick={handleMenuToggle}>Details</a></li>
        </ul>
      </aside>

      

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="hero" id="home">
          <h1> Ԝ౿ᥣɕ𝗈ო౿ Τ𝗈 Ζ𝗈ɣɑ 𝖢ɑ𝖿౿</h1>
          <p>
            At Zoya Cafe, we believe in the art of peaceful moments. Tucked away in the heart of Mysuru, our café is a sanctuary for the senses — the aroma of freshly ground beans, the gentle hum of relaxed conversation, and the warm afternoon light through large windows make each visit a small escape from the daily rush.
          </p>
          <p>
             “Bright citrus acidity, mellow caramel sweetness, rich chocolate-nut body, and a clean, lingering finish.”
          </p>
          <p>
            We source our beans responsibly, roast them with care, and serve each cup with kindness. And our menu extends beyond coffee to include artisan snacks, light bites, and flavours that unfold gently — inviting you to linger, relax, and enjoy.
          </p>
          <p>
            Come in, take a seat, let the world outside soften, and allow yourself a moment of calm at Zoya Café. Welcome home.
          </p>

          {/*
          <div className="hero-image">
            <img src={img} alt="Coffee cup"/>
          </div>
                  */}
            
        </section>
                

        {/* Menu Section */}
        <section id="menu" className="menu-items">
          <h2>Our Menu</h2>
          <div className="menu-grid">
            {menuData.map(item => (
              <div className="menu-item" key={item.id}>
                <a href={item.imgSrc} target="_blank" rel="noreferrer">
                  <img src={item.imgSrc} alt={item.name}/>
                </a>
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="price">Price: ₹{item.price}</p>
                  <p className="discount">Discount: {item.discount}%</p>
                  <p className="rating">Rating: {item.rating}</p>
                  <p className="flavours">Flavours: {item.flavours}</p>
                  <div className="buttons">
                    <button className="add-to-cart" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    <button className="order-confirm" onClick={() => { handleAddToCart(item); alert(`Order confirmed for ${item.name}`); }}>Order & Confirm</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr />

        {/* Gallery Section */}
        
        
        <section id="gallery" className="gallery">
          <h1 id="gal">Gallery</h1>
          <div><h2>Our Coffee</h2>
          <img src={img1} alt="Coffee Cup"/>
          <h2>Snacks</h2>
          <img src={img02} alt="Snack 1"/>
          <img src={img03} alt="Snack 2"/></div>
          {/* Add more snack images if needed */}
        </section>

        {/* Details Section */}
        <section id="details" className="shop-details">
          <h2>Our Location & Details</h2>
          <p>Address: 123 Coffee Street, Mysuru, Karnataka, India</p>
          <p>Opening Hours: 8:00 AM – 10:00 PM (Daily)</p>
          <div className="back-button">
            <a href="#home"><button>Back to Home</button></a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer>
    <div class="social-menu">
      <ul>
        <li><a href="#" target="_blank" aria-label="Facebook"><i class="fab fa-facebook"></i></a></li>
        <li><a href="#" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a></li>
        <li><a href="#" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a></li>
      </ul>
    </div>
    <div id="copyright">© Copyright Zoya Cafe – All Rights Reserved</div>
  </footer>
    </div>
  );
}

export default Cafe;
