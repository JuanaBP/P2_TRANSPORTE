// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TicketList from './Admin/TicketList';
import PaymentList from './Admin/PaymentList';

import TicketForm from './Client/TicketForm';
import PaymentForm from './Client/PaymentForm';
import PurchaseFlow from './Client/PurchaseFlow';
import SearchForm from './Client/SearchForm';
import SelectPassengers from './Client/SelectPassengers';
import SelectSeats from './Client/SelectSeats';

function App() {
  return (
    <Router>
      <Routes>
        {/* Vistas Admin */}
  
        <Route path="/admin/tickets" element={<TicketList />} />
        <Route path="/admin/payments" element={<PaymentList />} />

        {/* Vistas Cliente */}
        <Route path="/cliente/ticket" element={<TicketForm />} />
        <Route path="/cliente/pago" element={<PaymentForm />} />
        <Route path="/cliente/flujo" element={<PurchaseFlow />} />
        <Route path="/buscar" element={<SearchForm />} />
        <Route path="/select-passengers" element={<SelectPassengers />} />
        <Route path="/select-seats" element={<SelectSeats />} />
      </Routes>
    </Router>
  );
}

export default App;



