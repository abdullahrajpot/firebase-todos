import React from 'react'

export default function Footer() {
  
  const year= new Date().getFullYear();
  return (
    
    <footer>
      
      <div className="container-fluid text-center bg-dark text-white">
        <div className="row">
            <div className="col">
                <p>&copy; {year}. All Right Reserved.</p>
            </div>
        </div>
      </div>
    </footer>
  )
}
