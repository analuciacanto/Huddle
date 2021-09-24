import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AiOutlineHome, AiOutlineBarChart, AiOutlineHistory } from 'react-icons/ai';
import { Header } from '@ese_tecnodigital/dashboard';
import Monitor from './pages/Monitor';
import HospitalBed from './pages/HospitalBed';
import Charts from './pages/Charts';
import Reports from './pages/Reports';
import { sensorCheckData } from './actions';
import coppeImg from './assets/coppe.png';
import '@ese_tecnodigital/dashboard/dist/index.cjs.css'

const Routes = () => {
  return (
    <BrowserRouter>
      <Header logo={coppeImg} sensorCheckData={sensorCheckData} dashboardName="Oximetro IoT UFRJ" headerItens={[{
        path: "/",
        title:"Página Inicial",
        icon: <AiOutlineHome size={32} />
      }, {
        path: "/charts",
        title:"Gráficos Barra",
        icon: <AiOutlineBarChart size={32} />
      }, {
        path: "/reports",
        title:"Relatório de Sinais Vitais",
        icon: <AiOutlineHistory size={32} />
      }]}
 />

      <Switch>
        <Route path="/" exact component={Monitor} />
        {/*<Route path="/beds/:id" component={HospitalBed} />
        <Route path="/charts" component={Charts} />
        <Route path="/reports" component={Reports} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
