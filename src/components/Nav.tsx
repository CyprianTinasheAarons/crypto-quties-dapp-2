import { Connect } from "./Connect"
export function Nav() {


    return (
      <>
        <div className="relative z-10 text-[#3AB6FF] border-b-4 border-white navbar bg font">
          <div className="absolute z-10 w-full h-full bg-black bg-opacity-20">

          </div>
  <div className="z-20 navbar-start">
            <div className="dropdown">
       
      <label  tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
              <ul tabIndex={0} className="p-2 mt-3 uppercase shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li><a href="/">Mint</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/types">Types</a></li>
                <li><a href="/rarities">Rarities</a></li>
                <li><a href="/quest">Quest</a></li>
                <li><a href="/faqs">FAQs</a></li>
         
                <li><a href="/profile">Profile</a></li>
                <li className="flex items-center align-middle"><a href="https://twitter.com/CryptoQuties" target="_blank" className="text-gray-300">
                  <svg fill="#3AB6FF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className="w-8 h-8 " >    <path d="M28,6.937c-0.957,0.425-1.985,0.711-3.064,0.84c1.102-0.66,1.947-1.705,2.345-2.951c-1.03,0.611-2.172,1.055-3.388,1.295 c-0.973-1.037-2.359-1.685-3.893-1.685c-2.946,0-5.334,2.389-5.334,5.334c0,0.418,0.048,0.826,0.138,1.215 c-4.433-0.222-8.363-2.346-10.995-5.574C3.351,6.199,3.088,7.115,3.088,8.094c0,1.85,0.941,3.483,2.372,4.439 c-0.874-0.028-1.697-0.268-2.416-0.667c0,0.023,0,0.044,0,0.067c0,2.585,1.838,4.741,4.279,5.23 c-0.447,0.122-0.919,0.187-1.406,0.187c-0.343,0-0.678-0.034-1.003-0.095c0.679,2.119,2.649,3.662,4.983,3.705 c-1.825,1.431-4.125,2.284-6.625,2.284c-0.43,0-0.855-0.025-1.273-0.075c2.361,1.513,5.164,2.396,8.177,2.396 c9.812,0,15.176-8.128,15.176-15.177c0-0.231-0.005-0.461-0.015-0.69C26.38,8.945,27.285,8.006,28,6.937z" /></svg>
                </a>
                  <a href="https://t.me/CryptoQuties" target="_blank" className="text-gray-300">
                    <svg fill="#3AB6FF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-8 h-8 "><path d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z" /></svg></a>
                </li>

      </ul>
    </div>
            <a className="text-xl normal-case btn btn-ghost" href="/">
              <img src="/spinning.gif" alt="" className="h-10 w-9" />

     </a>
  </div>
  <div className="z-20 hidden navbar-center lg:flex">
    <ul className="p-0 uppercase menu menu-horizontal ">
              <li><a href="/">Mint</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/types">Types</a></li>
              <li><a href="/rarities">Rarities</a></li>
              <li><a href="/quest">Quest</a></li>
                <li><a href="/faqs">FAQs</a></li>
            
              <li><a href="/profile">Profile</a></li>
              <li><a href="https://twitter.com/CryptoQuties" target="_blank" className="text-gray-300">
                <svg fill="#3AB6FF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className="w-8 h-8 ">    <path d="M28,6.937c-0.957,0.425-1.985,0.711-3.064,0.84c1.102-0.66,1.947-1.705,2.345-2.951c-1.03,0.611-2.172,1.055-3.388,1.295 c-0.973-1.037-2.359-1.685-3.893-1.685c-2.946,0-5.334,2.389-5.334,5.334c0,0.418,0.048,0.826,0.138,1.215 c-4.433-0.222-8.363-2.346-10.995-5.574C3.351,6.199,3.088,7.115,3.088,8.094c0,1.85,0.941,3.483,2.372,4.439 c-0.874-0.028-1.697-0.268-2.416-0.667c0,0.023,0,0.044,0,0.067c0,2.585,1.838,4.741,4.279,5.23 c-0.447,0.122-0.919,0.187-1.406,0.187c-0.343,0-0.678-0.034-1.003-0.095c0.679,2.119,2.649,3.662,4.983,3.705 c-1.825,1.431-4.125,2.284-6.625,2.284c-0.43,0-0.855-0.025-1.273-0.075c2.361,1.513,5.164,2.396,8.177,2.396 c9.812,0,15.176-8.128,15.176-15.177c0-0.231-0.005-0.461-0.015-0.69C26.38,8.945,27.285,8.006,28,6.937z" /></svg>
                </a>
                <a href="https://t.me/CryptoQuties" target="_blank" className="text-gray-300">
                  <svg fill="#3AB6FF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-8 h-8 " ><path d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z" /></svg></a>
                </li>
             
    </ul>
  </div>
  <div className="z-20 navbar-end">
    <Connect/>
  </div>
</div>
      </>
    )
  }
  