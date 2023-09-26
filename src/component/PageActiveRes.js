import { useLocation } from "react-router-dom";
import "./css/Restaurentlist.css"

export default function PageActiveRes() {
  const location = useLocation();
  const res = location?.state?.restaurant;
  return <>
    <div className="main-content mt-5">
      <section className="section">
        <div className="container-fluid overflow-scroll ">
          <div className="row mb-5 position-sticky top-50">
            <div className="col-6 col-sm-6 col-md-6 col-lg-6">
              <div className="p1 container shadow  border ">
                <h1 className="mt-2">{res.name}</h1>
                <div className="p2">
                  <div className="imgMainDiv ">
                    <img style={{ width: "95%", marginLeft: "2.5%" }} className="img-fluid mb-3" src={"/mezban-images/" + res.images[0]} alt="img" />
                  </div>
                </div>
                <div className="p2">
                  <div className="col-12 ">
                    <div className="row">
                      {res.images.map((image) => {
                        return <div style={{ height: res.images.length * 50 + 'px' }} className={"sideImgHolder col-" + (12 / res.images.length * 2)}>
                          <img style={{ width: "100%" }} className="sideImg mb-2" src={"/mezban-images/" + image} alt="Image" />
                        </div>
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 ">
              <div className="p1 container shadow border">
                <h1 className="mt-2">Restaurant Details</h1>
                <table className="resTbl2 table table-responsive table-borderless ">
                  <tr>
                    <td><b>Contact</b></td>
                    <td>{res.contact}</td>
                  </tr>
                  <tr>
                    <td><b>Email</b></td>
                    <td>{res.email}</td>
                  </tr>
                  <tr>
                    <td><b>FSSAI</b></td>
                    <td>{res.fssai}</td>
                  </tr>
                  <tr>
                    <td><b>Opening Time</b></td>
                    <td>{res.openingTime}</td>
                  </tr>
                  <tr>
                    <td><b>Closing Time</b></td>
                    <td>{res.closingTime}</td>
                  </tr>
                  <tr>
                    <td><b>Total Tables</b></td>
                    <td>{res.totalTables}</td>
                  </tr>
                  <tr>
                    <td><b>Avrage Cost Per Two People</b></td>
                    <td>{res.avgCostPer2}&nbsp;Rs.</td>
                  </tr>
                  <tr>
                    <td><b>Address</b></td>
                    <td>{res?.address?.city + "," + res.address?.state}</td>
                  </tr>
                  <tr>
                    <td><b>Details</b></td>
                    <td>{res?.address?.details}</td>
                  </tr>
                  <tr>
                    <td><b>Cuisines</b></td>
                    <td>
                      {
                        res.cuisines.map((cuisine) => cuisine + " , ")
                      }
                    </td>
                  </tr>
                  <tr>
                    <td><b>Facilities</b></td>
                    <td>
                      {
                        res.facilities.map((facility) => facility + " , ")
                      }
                    </td>
                  </tr>

                </table>

              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </section>
    </div>
  </>
}