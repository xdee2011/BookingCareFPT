import { Route, Switch } from "react-router-dom";
import Homepage from "./Components/HomePage/Header";
import Login from "./Components/Login";
import AdminHome from "./Components/AdminPage/AdminHome";
import ManageDoctor from "./Components/AdminPage/Doctor/ManageDoctor";
import DetailsDoctor from "./Components/HomePage/Doctor/DetailsDoctor";
import DoctorHome from "./Components/DoctorPage/DoctorHome";
import VerifyEmail from "./Components/HomePage/Doctor/VerifyEmail";
import SpecialtyManage from "./Components/AdminPage/Specialty/SpecialtyManage"
import ManagePatient from "./Components/DoctorPage/ManagePatient";
import SpecialtyDetails from "./Components/HomePage/Specialty/Specialty";
import ClinicAddress from "./Components/HomePage/Clinic/ClinicAddress";
import ManageClinicAddress from "./Components/AdminPage/ClinicAddress/ClinicAddress";
function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Homepage} exact />
        <Route path="/login" component={Login} />
        <Route path="/admin-homepage" component={AdminHome} />
        <Route path="/manage-doctor" component={ManageDoctor} />
        <Route path="/details-doctor/:id" component={DetailsDoctor} />
        <Route path="/doctor-homepage" component={DoctorHome} />
        <Route path="/verify-booking" component={VerifyEmail} />
        <Route path="/manage-specialty" component={SpecialtyManage} />
        <Route path="/manage-patient" component={ManagePatient} />
        <Route path="/specialty-details/:id" component={SpecialtyDetails} />
        <Route path="/clinic-manage" component={ManageClinicAddress} />
        <Route path="/clinic-address/:id" component={ClinicAddress} />
      </Switch>
    </>
  );
}

export default App;
