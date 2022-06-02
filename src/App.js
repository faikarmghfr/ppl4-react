import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Overview, OverviewUsers, Revenue } from "./pages/Dashboard";
import { Master } from "./pages/Master";
import Dashboard from "./pages/Dashboard";
import DataPenguji from "./pages/DataPenguji";
import DataPeserta from "./pages/DataPeserta";
import Team from "./pages/Team";
import { PendaftaranWawancara } from "./pages/PendaftaranWawancara";
import { PenilaianWawancara } from "./pages/PenilaianWawancara";
import { PenilaianFitandProper } from "./pages/PenilaianFitProper";
import { PendaftaranFitandProper } from "./pages/PendaftaranFitProper";

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/master" exact component={Master} />
        <Route path="/datapeserta" exact component={DataPeserta} />
        <Route path="/datapenguji" exact component={DataPenguji} />
        <Route path="/master/datapenguji" exact component={DataPenguji} />
        {/* <Route path="/fitandproper/pendaftaranFitProper" exact component={PendaftaranFitandProper} /> */}
        <Route path="/fitandproper/pendaftaranWawancara" exact component={PendaftaranWawancara} />
        <Route path="/fitandproper/penilaianWawancara" exact component={PenilaianWawancara} />
        <Route path="/fitandproper/penilaianFitProper" exact component={PenilaianFitandProper} />

      </Switch>
    </Router>
  );
}

export default App;
