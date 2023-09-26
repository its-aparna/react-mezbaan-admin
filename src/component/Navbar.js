import "./css/Navbar.css"
export default function Navbar() {
  return <>
    <nav id="navbar" className="navbar bg-danger navbar-expand-lg main-navbar border">
      <form className="form-inline mr-auto">
        <ul className="navbar-nav mr-3">
          <li>
            <a href="#" data-toggle="sidebar" className="nav-link nav-link-lg">
              <i className="fas fa-bars" />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link nav-link-lg d-sm-none"
            >
              <i className="fas fa-search" />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link nav-link-lg d-sm-none"
            >
              <h3>Restaurentlist</h3>
            </a>
          </li>
        </ul>

      </form>

    </nav>

  </>
}