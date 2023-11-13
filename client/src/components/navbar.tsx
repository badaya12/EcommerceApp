import { Link } from "react-router-dom";

export const Navbar = ()=>{
    return(
        <div>
            <div className="navbar">
                <div className="navbar-title">
                    <h1>Merch-shop</h1>
                </div>
                <div className="navbar-links">
                    <Link to = "/">shop</Link>
                    <Link to = "/purchased-items">purchases</Link>
                    <Link to = "/checkout">&#128722;</Link>
                    </div>
            </div>
        </div>
    )
}