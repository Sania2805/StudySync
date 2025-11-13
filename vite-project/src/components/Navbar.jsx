import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../styles/Navbar.css"
function Navbar(){
     const location = useLocation();
    const [quote, setQuote] = useState(null);
    const [isModalopen, setIsModalOpen] = useState(false);
    const [author, setAuthor] = useState(null);
    const navigate = useNavigate();
    const fetchQuote = async() => {
        try{
        const response = await fetch('https://quotes-api-self.vercel.app/quote')
        const data = await response.json();
        setQuote(data.quote);
        setAuthor(data.author);
        setIsModalOpen(true);

        }
        catch (error){
            console.error(error);
        }
    }

    

    return (
        <nav className="navbar">
            <h1 className="logo">Study Sync</h1>
            <ul className="nav-links"> 
                <li className={location.pathname=="/" ? "active":""}>
                    <Link to={'/'} >🏠Home</Link>
                </li>
                <li className={location.pathname=="/notes" ? "active":""}>
                    <Link to={'/notes'} >📜Notes</Link>
                </li>
                <li className={location.pathname=="/pomodoro" ? "active":""}>
                    <Link to={'/pomodoro'} >⏰Pomodoro</Link>
                </li>
                <li className={location.pathname=="/to-do" ? "active":""}>
                    <Link to={'/to-do'} >📕To-do</Link>
                </li>
                <li >
                    <div className="quote-btn" onClick={fetchQuote}>💡 Quote</div>
                </li>
                
                </ul> 
                {
                isModalopen &&(
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <br></br>
                            <p>{quote}</p><br></br>
                            <p>-{author}</p>
                            <br></br>
                            <button className="cls-btn" onClick={()=>setIsModalOpen(false)}>Close</button>
                        </div>
                    </div>
                )
            }
        </nav>
    )
}
export default Navbar;