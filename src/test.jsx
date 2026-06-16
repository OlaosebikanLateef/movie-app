import { useState, useEffect } from "react";

const Card = ({ title }) => {
    const [hasLiked, setHasLiked] = useState(false);
    const [count, setCount] = useState(0);


  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked} }`);
  }, [hasLiked]);


  
  return (
    <div className="card" onClick={() => setCount( count + 1)}>
      <h2>{title} <br /> {count || null}</h2>

      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ?  "❤️" : "🤍"}
      </button>
    </div>
  )
}


const App = () => {


  return (
    <div className="card-container">
     
  
      <Card title="Star Wars" rating={5} isCool={true} />
      <Card title="Avatar" />
      <Card title="Titanic" />
      <Card title="The Lion King" />
    </div>
  )
}

export default App
