import { useState } from "react";
import Logo from "./Logo"
import Form from "./Form"

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems((items) => [...items, item])
    }

    function handleDeleteItem(id) {
        setItems(items => items.filter(item=>item.id !== id))
    }

    function handleToggleItem(id) {
        setItems((items) => 
                items.map((item) => 
                item.id === id ? { ...item, packed: !item.packed } : item))
    }

    function handleClearList() {
        const confirmed = window.confirm('Are you sure you want to clear your list? ')
        if (confirmed)
        setItems([]);
    }
    
    return <div className="app"> 
    <>
     <Logo/>
     <Form onAddItems={handleAddItems}/>
     <PackingList items={items} 
     onDeleteItem={handleDeleteItem}
     onToggleItem={handleToggleItem}
     onClearList = {handleClearList}/>
     <Stats items={items}/>
     </> 
     </div>
}


function PackingList({items, onDeleteItem, onToggleItem, onClearList}) {
    const [sortBy, setSortBy] = useState("input");

    let sortedItems; 
    if(sortBy === "input") sortedItems = items; 
    if(sortBy === "description") 
        sortedItems = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));
    
    if(sortBy === "packed") 
        sortedItems = items
        .slice()
        .sort((a,b) => Number(a.packed) - Number(b.packed));

    return (
    <div className="list"> 
    <ul> 
     {sortedItems.map(item => <Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id} />)} 
      </ul>
    
    <div className="actions"> 
    <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="input">Sort by input order</option>
        <option value="description">Sort by Description</option>
        <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button></div>
      </div> )
}

function Item({item, onDeleteItem, onToggleItem}) {
        return ( <li> 
            <input type = 'checkbox' value={item.packed} onChange={() => onToggleItem(item.id)} />
            <span style={item.packed ? {textDecoration: "line-through"} : {}}> 
            {item.quantity} {item.description} </span>
            <button onClick={() => onDeleteItem(item.id) }>❌</button></li> )
}

function Stats({items}) {
    if (!items.length) {
        return (
            <p className="stats"><em>Start adding items to your list!</em></p>
        )
    }
    const numItems = items.length; 
    const numPacked = items.filter(item => item.packed).length;
    const percentPacked = Math.round(numPacked / numItems * 100);
    return <footer className="stats"> 
   <em> 
    {percentPacked === 100 ? 'You have packed everything! Ready to go! ✈️' : `💼 You have ${numItems} items on your list and you already packed ${numPacked}. (${percentPacked}%)`}
    </em>
    </footer>
}
