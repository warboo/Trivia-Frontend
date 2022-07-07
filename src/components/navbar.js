import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';

function OffcanvasExample() {
  return (
    <>
      
      <Navbar key="false" bg="light" expand="lg" className="mb-3">
      <div className="container">

          <Navbar.Brand href="/">
              <img style={{"width" : 8 + '%'}} src={process.env.PUBLIC_URL+"image/brain.png"}></img>
              <span class="navbar-brand mb-0 h1">&nbsp; Trivia</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>Menu</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link className="text-muted" href="/enter-name">Login</Nav.Link>
                <Nav.Link className="text-muted" href="/">Logout</Nav.Link>
              </Nav>
              
            </Offcanvas.Body>
          </Navbar.Offcanvas>

        </div>
      </Navbar>
        
    </>
  );
}

export default OffcanvasExample;