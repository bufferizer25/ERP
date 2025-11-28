import React, {useState} from 'react'
import EnquiryForm from './components/EnquiryForm'
import { DEVOPS_MODULES } from './data/modules'

export default function App(){
  const [role, setRole] = useState('Guest')
  return (
    <div className="app">
      <header className="header">
        <h1>Batch-14 ERP Portal — DevOps Enquiry</h1>
        <div>
          <label>
            Role:
            <select onChange={(e)=>setRole(e.target.value)} value={role}>
              <option>Guest</option>
              <option>Student</option>
              <option>Faculty</option>
              <option>Admin</option>
            </select>
          </label>
        </div>
      </header>

      <main>
        <p className="lead">This is a scaffolded app ready for CI/CD. Fill the form to simulate enquiries.</p>
        <EnquiryForm role={role} modules={DEVOPS_MODULES} />
      </main>

      <footer>
        <small>Batch-14 — Demo CI/CD app</small>
      </footer>
    </div>
  )
}
