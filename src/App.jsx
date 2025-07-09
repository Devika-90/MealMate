import { useEffect, useState } from "react";
import LoginPage from "./Loginpage";

export default function App() {
  const [user, setUser ] = useState(null);
  const [meal, setMeal] = useState("Breakfast");
  const [ingredients, setIngredients] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDish, setSelectedDish] = useState("");
  const [showRecipe, setShowRecipe] = useState(false);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser  = localStorage.getItem("user");
    if (savedUser ) {
      setUser (JSON.parse(savedUser ));
    }
  }, []);

  // Handle user login
  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser (userData);
  };

  
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser (null);
    setSuggestions([]); 
    setIngredients("");
    setSelectedDish("");
    setShowRecipe(false); 
  };

  
  const handleMealSubmit = (e) => {
    e.preventDefault();

    
    const allSuggestions = [
      "Paneer Butter Masala",
      "Vegetable Pulao",
      "Aloo Paratha",
      "Chole Bhature",
    ];

    
    setSuggestions(allSuggestions);
    setSelectedDish("");
    setShowRecipe(false);
  };

 
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome, {user.name}!</h1>
          <p>Plan your meals based on what you have. No repeats this week!</p>
        </div>
      </header>

      <main className="main-content">
        <form className="meal-form" onSubmit={handleMealSubmit}>
          <h2>Plan Your Meal</h2>
          <select value={meal} onChange={(e) => setMeal(e.target.value)}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Evening Snacks">Evening Snacks</option>
            <option value="Dinner">Dinner</option>
          </select>

          <textarea
            placeholder="Enter ingredients..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="4"
          />

          <button type="submit">Get Suggestions</button>
        </form>

        {suggestions.length > 0 && (
          <section className="suggestions">
            <h2>Suggestions</h2>
            <div className="cards">
              {suggestions.map((dish) => (
                <div className="card" key={dish}>
                  <h3>{dish}</h3>
                  <button
                    onClick={() => {
                      setSelectedDish(dish);
                      setShowRecipe(false);
                    }}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedDish && !showRecipe && (
          <div className="recipe-option">
            <h3>You selected: {selectedDish}</h3>
            <button onClick={() => setShowRecipe(true)}>Show Recipe</button>
          </div>
        )}

        {showRecipe && (
          <div className="recipe-details">
            <h3>Recipe for {selectedDish}</h3>
            <p>Step-by-step instructions for {selectedDish}...</p>
          </div>
        )}

        <div className="logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </main>
    </div>
  );
}
