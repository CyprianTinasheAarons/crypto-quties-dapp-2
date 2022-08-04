import { Connect } from "./Connect"


export function Nav() {


    return (
      <>
        <div className="relative z-10 text-[#3AB6FF] border-b-4 border-white navbar bg font">
          <div className="absolute z-10 w-full h-full bg-black bg-opacity-20">

          </div>
  <div className="z-20 navbar-start">
    <div className="dropdown">
      <label tabIndex="0" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex="0" className="p-2 mt-3 uppercase shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li><a href="/">Mint</a></li>
                <li><a href="/types">Types</a></li>
                <li><a href="/faqs">FAQs</a></li>
                <li><a href="/quest">Quest</a></li>
                <li><a href="/profile">Profile</a></li>
                <li><a href="#" className="text-gray-300">Vote</a></li>
                <li><a href="#" className="text-gray-300">Stake</a></li>
      </ul>
    </div>
            <a className="text-xl normal-case btn btn-ghost" href="/">
              <img src="/spinning.gif" alt="" className="h-10 w-9" />

     </a>
  </div>
  <div className="z-20 hidden navbar-center lg:flex">
    <ul className="p-0 uppercase menu menu-horizontal ">
    <li><a href="/">Mint</a></li>
                <li><a href="/types">Types</a></li>
                <li><a href="/faqs">FAQs</a></li>
                <li><a href="/quest">Quest</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a href="#" className="text-gray-300">Vote</a></li>
                <li><a href="#" className="text-gray-300">Stake</a></li>
    </ul>
  </div>
  <div className="z-20 navbar-end">
    <Connect/>
  </div>
</div>
      </>
    )
  }
  