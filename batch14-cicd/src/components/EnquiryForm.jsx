import React, {useState} from 'react'

export default function EnquiryForm({role, modules}){
  const initial = { rollNumber:'', studentName:'', email:'', mobile:'', enquiryTopic:'', enquiryDetails:'', modulesChecked:[] }
  const [form, setForm] = useState(initial)
  const [message, setMessage] = useState('')

  function toggleModule(m){
    setForm(f=>({
      ...f,
      modulesChecked: f.modulesChecked.includes(m) ? f.modulesChecked.filter(x=>x!==m) : [...f.modulesChecked, m]
    }))
  }

  function submit(e){
    e.preventDefault()
    // simulated submit — store to localStorage
    const existing = JSON.parse(localStorage.getItem('batch14_submissions')||'[]')
    existing.unshift({...form, submittedAt:new Date().toISOString(), submittedBy: role})
    localStorage.setItem('batch14_submissions', JSON.stringify(existing))
    setMessage('Submitted (saved to localStorage). Export CSV from Admin later.')
    setForm(initial)
  }

  return (
    <form onSubmit={submit} style={{background:'white', padding:16, borderRadius:8}}>
      <div style={{display:'flex',gap:8}}>
        <div style={{flex:1}}>
          <label>Roll Number<input value={form.rollNumber} onChange={e=>setForm({...form,rollNumber:e.target.value})} /></label>
        </div>
        <div style={{flex:1}}>
          <label>Student Name<input value={form.studentName} onChange={e=>setForm({...form,studentName:e.target.value})} /></label>
        </div>
      </div>

      <div style={{display:'flex',gap:8,marginTop:8}}>
        <div style={{flex:1}}><label>Email<input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></label></div>
        <div style={{flex:1}}><label>Mobile<input value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})} /></label></div>
      </div>

      <div style={{marginTop:8}}>
        <label>Enquiry Topic<input value={form.enquiryTopic} onChange={e=>setForm({...form,enquiryTopic:e.target.value})} /></label>
      </div>

      <div style={{marginTop:8}}>
        <label>Enquiry Details<textarea rows={4} value={form.enquiryDetails} onChange={e=>setForm({...form,enquiryDetails:e.target.value})} /></label>
      </div>

      <div style={{marginTop:8}}>
        <div>Associate with DevOps Modules</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:8,marginTop:6}}>
          {modules.map(m=>(
            <label key={m} style={{display:'flex',alignItems:'center',gap:6}}>
              <input type="checkbox" checked={form.modulesChecked.includes(m)} onChange={()=>toggleModule(m)} />
              <span style={{fontSize:13}}>{m}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={{marginTop:12,display:'flex',gap:8}}>
        <button type="submit">Submit Enquiry</button>
        <button type="button" onClick={()=>{setForm(initial); setMessage('')}} style={{background:'#6c757d'}}>Clear</button>
      </div>

      {message && <div style={{marginTop:10,color:'#0b5',fontWeight:600}}>{message}</div>}
    </form>
  )
}
