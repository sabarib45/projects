import React, { useEffect, useState, createContext, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams
} from 'react-router-dom';
import './components/Ecom.css';
import productList from './data/products.json';

// ---------------------------
// Auth & Cart Contexts
const AuthContext = createContext();
const CartContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}
function useCart() {
  return useContext(CartContext);
}

// ---------------------------
// Local Storage helpers
const LS_USER_KEY = 'demo_ecom_user';
const LS_CART_KEY = 'demo_ecom_cart';

function loadUserFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(LS_USER_KEY)) || null;
  } catch (e) {
    return null;
  }
}
function saveUserToStorage(user) {
  localStorage.setItem(LS_USER_KEY, JSON.stringify(user));
}
function loadCartFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(LS_CART_KEY)) || {};
  } catch (e) {
    return {};
  }
}
function saveCartToStorage(cart) {
  localStorage.setItem(LS_CART_KEY, JSON.stringify(cart));
}

// ---------------------------
// The App Root
function Ecom() {
  const [products] = useState(productList);

  const [user, setUser] = useState(() => loadUserFromStorage());
  const [cart, setCart] = useState(() => loadCartFromStorage());

  useEffect(() => {
    saveUserToStorage(user);
  }, [user]);

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const authValue = {
    user,
    signIn: (u) => setUser(u),
    signOut: () => setUser(null),
    signUp: (u) => setUser(u),
  };
  const cartValue = {
    cart,
    addToCart: (product, qty = 1) => {
      setCart((prev) => {
        const copy = { ...prev };
        const id = product.id;
        if (copy[id]) {
          copy[id].qty += qty;
        } else {
          copy[id] = { product, qty };
        }
        return copy;
      });
    },
    updateQty: (id, qty) => {
      setCart((prev) => {
        const copy = { ...prev };
        if (!copy[id]) return prev;
        copy[id].qty = qty;
        if (copy[id].qty <= 0) delete copy[id];
        return copy;
      });
    },
    clear: () => setCart({}),
  };

  return (
    <AuthContext.Provider value={authValue}>
      <CartContext.Provider value={cartValue}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home products={products} />} />
              <Route path="/products" element={<ProductsPage products={products} />} />
              <Route path="/product/:id" element={<ProductDetails products={products} />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

// ---------------------------
// Layout Components

function Header() {
  const { user, signOut } = useAuth();
  const { cart } = useCart();
  const cartCount = Object.values(cart).reduce((sum, c) => sum + c.qty, 0);

  return (
    <header>
      <div className="header-inner">
        <Link to="/" className="logo">MyReactShop</Link>
        <nav>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          {user ? (
            <>
              <Link to="/profile">Hi, {user.name}</Link>
              <button onClick={() => signOut()} className="signout-btn">Sign out</button>
            </>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
          <Link to="/cart" style={{ position: 'relative' }}>
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div>© {new Date().getFullYear()} MyReactShop</div>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------
// Pages & Components

function Home({ products }) {
  const featured = products.slice(0, 8);
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ background: '#eef2ff', padding: 20, borderRadius: 8 }}>
          <h2>Welcome to MyReactShop</h2>
          <p>Featured deals and new arrivals.</p>
        </div>
      </div>
      <h3>Featured Products</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16
      }}>
        {featured.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

function ProductsPage({ products }) {
  const categories = Array.from(new Set(products.map(p => p.category)));
  const [selectedCat, setSelectedCat] = useState(null);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');

  let filtered = products.filter(p => (
    (!selectedCat || p.category === selectedCat) &&
    (p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()))
  ));

  if (sortBy === 'price_asc') filtered = filtered.slice().sort((a, b) => a.price - b.price);
  if (sortBy === 'price_desc') filtered = filtered.slice().sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered = filtered.slice().sort((a, b) => b.rating - a.rating);

  return (
    <div className="grid">
      <Sidebar categories={categories} onSelectCategory={setSelectedCat} />
      <main>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <input
              placeholder="Search products..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ padding: 8, width: 300 }}
            />
          </div>
          <div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="">Sort</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16
        }}>
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </main>
    </div>
  );
}

function Sidebar({ categories, onSelectCategory }) {
  return (
    <aside className="sidebar">
      <h4>Categories</h4>
      <ul>
        <li><button onClick={() => onSelectCategory(null)}>All</button></li>
        {categories.map(c => (
          <li key={c}><button onClick={() => onSelectCategory(c)}>{c}</button></li>
        ))}
      </ul>
    </aside>
  );
}

function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={product.image} alt={product.name} />
        <h4>{product.name}</h4>
      </Link>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 700 }}>₹{product.price.toFixed(2)}</div>
          {product.original_price > product.price && (
            <div style={{ textDecoration: 'line-through', color: '#6b7280' }}>
              ₹{product.original_price.toFixed(2)}
            </div>
          )}
        </div>
        <div>
          <button
            disabled={!product.inStock}
            onClick={() => addToCart(product, 1)}
            className="add-btn"
          >
            {product.inStock ? 'Add' : 'Out'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductDetails({ products }) {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details">
      <div>
        <img src={product.image} alt={product.name} />
      </div>
      <div>
        <h2>{product.name}</h2>
        <div className="rating">
          Rating: {product.rating} ⭐ ({product.reviews} reviews)
        </div>
        <div className="price">
          ₹{product.price.toFixed(2)}
          {product.original_price > product.price && (
            <span className="original-price">₹{product.original_price.toFixed(2)}</span>
          )}
        </div>
        <p>{product.description}</p>
        <div className="actions">
          <button onClick={() => addToCart(product, 1)} className="add-btn">
            Add to Cart
          </button>
          <Link to="/cart">
            <button className="view-btn">View Cart</button>
          </Link>
        </div>
      </div>
    </div>
  );
}


function CartPage() {
  const { cart, updateQty, clear } = useCart();
  const navigate = useNavigate();
  const items = Object.values(cart);
  const subtotal = items.reduce((sum, { product, qty }) => sum + product.price * qty, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <div className="empty-msg">
          Your cart is empty. <Link to="/products">Shop now</Link>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items-list">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="cart-item">
                <img src={product.image} alt={product.name} />
                <div className="cart-item-details">
                  <div className="name">{product.name}</div>
                  <div className="price-qty">₹{product.price.toFixed(2)} × {qty}</div>
                  <div className="controls">
                    <button onClick={() => updateQty(product.id, qty - 1)} disabled={qty <= 1}>-</button>
                    <span style={{ margin: '0 8px' }}>{qty}</span>
                    <button onClick={() => updateQty(product.id, qty + 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="cart-summary">
            <div className="subtotal">Subtotal: ₹{subtotal.toFixed(2)}</div>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
            <button className="clear-btn" onClick={() => clear()}>
              Clear Cart
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}


function CheckoutPage() {
  const { cart, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const items = Object.values(cart);
  const subtotal = items.reduce((sum, { product, qty }) => sum + product.price * qty, 0);

  function placeOrder() {
    alert('Order placed!');
    clear();
    navigate('/');
  }

  if (items.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div className="checkout-grid">
      <div className="checkout-box">
        <h3>Shipping</h3>
        {user ? (
          <div>Delivering to: {user.email}</div>
        ) : (
          <div>Please <Link to="/signin">sign in</Link> to checkout faster.</div>
        )}
        <h3 style={{ marginTop: 12 }}>Payment</h3>
        <div>Demo payment — no real transaction.</div>
        <div style={{ marginTop: 12 }}>
          <button onClick={placeOrder} className="checkout-btn">Place Order</button>
        </div>
      </div>
      <aside className="checkout-summary">
        <div style={{ fontWeight: 700 }}>Order Summary</div>
        {items.map(({ product, qty }) => (
          <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            {product.name} x {qty} <strong>₹{(product.price * qty).toFixed(2)}</strong>
          </div>
        ))}
        <hr style={{ margin: '12px 0' }} />
        <div style={{ fontWeight: 700 }}>Total ₹{subtotal.toFixed(2)}</div>
      </aside>
    </div>
  );
}

function SignInPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    const user = { name: email.split('@')[0], email };
    signIn(user);
    navigate('/');
  }

  return (
    <div className="form-box">
      <h2>Sign In</h2>
      <form onSubmit={onSubmit} className="form">
        <input
          required
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      <div style={{ marginTop: 12 }}>
        No account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

function SignUpPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    const user = { name: name || email.split('@')[0], email };
    signUp(user);
    navigate('/');
  }

  return (
    <div className="form-box">
      <h2>Sign Up</h2>
      <form onSubmit={onSubmit} className="form">
        <input
          placeholder="Full name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          required
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Create account</button>
      </form>
    </div>
  );
}

function ProfilePage() {
  const { user } = useAuth();
  if (!user) {
    return <div>Please <Link to="/signin">sign in</Link>.</div>;
  }
  return (
    <div className="profile">
      <h2>Profile</h2>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <div style={{ marginTop: 12 }}>
        <Link to="/order-history">Order History (demo)</Link>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="about-box">
      <h2>About</h2>
      <p>This is a demo React eCommerce app using local JSON for products. Use it as a starter.</p>
    </div>
  );
}

function NotFound() {
  return <div>Page not found</div>;
}

export default Ecom;
