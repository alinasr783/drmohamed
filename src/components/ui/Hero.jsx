import React from 'react'

export default function Hero() {
  return (
    <section className="section">
      <div className="container grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center mt-2.5">
        <div>
          <p className="text-brand-700 font-semibold flex items-center gap-2">
            <span>Dr. Mohamed Hamdi Elgawadi</span>
            <span className="text-slate-400">|</span>
            <span dir="rtl">د. محمد حمدي الجوادي</span>
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Joint Surgery, Arthroscopy & Sports Injuries
          </h1>
          <p className="text-slate-600 mt-4 max-w-xl">
            Trusted specialized care with expertise in joint surgery, arthroscopy, and sports injuries.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 md:gap-4">
            <a href="/booking" className="btn btn-primary">Book Appointment</a>
            <a href="/#contact" className="btn btn-outline">Contact Us</a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-6 -right-6 h-48 w-48 rounded-full bg-brand-200 blur-2xl" />
          <div className="card p-0 overflow-hidden relative">
            <img className="w-full h-96 md:h-[34rem] object-cover" src="https://scontent.fcai21-4.fna.fbcdn.net/v/t39.30808-6/562375759_2523778491338301_1308738212643598636_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG5WzwjHYihTfFNH_AMixXrGq_nv9EFtjoar-e_0QW2OtUmLpkXSER-1PfhcRDzfBstDNmg378olv7_n2LKvS5c&_nc_ohc=HDi0gNOaRG4Q7kNvwG4U2qW&_nc_oc=AdnKU5xNDg6WdHZE5hXngljNPgeX1M-EnCh81uoGEcSpfEmfSXx5NomG-MK5CniVfm8&_nc_zt=23&_nc_ht=scontent.fcai21-4.fna&_nc_gid=y0xRS8mc7IN9q_FGEr299g&oh=00_Affq8Mx7Mc865dkm5yeXbg7dUhceE17YBKxq0LmtF980zA&oe=69078D97" alt="Doctor" />
            <div className="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-2 shadow-card">
              <span className="text-sm font-medium">Next available appointment today</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
