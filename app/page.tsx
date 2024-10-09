import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "./components/sidebar";


export default function Home() {
  return (
    <body>
      <h1>Welcome</h1>
      <div className="container">

    <Sidebar></Sidebar>


      <div className="RecentlyCheckedIn">
        <h2>Recently Checked in Employees</h2>
        <div className="cardsCollection">

          <div className="cards">
            <img className='pfp' src="https://media.discordapp.net/attachments/1218598317970292807/1293563316995887167/IMG_0527.jpg?ex=6707d438&is=670682b8&hm=4e7a79a3385a5da125559d70875300eb4f04e87831476abd4fa5550037796374&=&format=webp&width=469&height=625"></img>
            <h3>Jane Doe</h3>
            <p>09:10</p>

          </div>
          <div className="cards">
            <img className='pfp' src="https://media.discordapp.net/attachments/1218598317970292807/1293563316995887167/IMG_0527.jpg?ex=6707d438&is=670682b8&hm=4e7a79a3385a5da125559d70875300eb4f04e87831476abd4fa5550037796374&=&format=webp&width=469&height=625"></img>
            <h3>Jane Doe</h3>
            <p>09:10</p>

          </div>
          <div className="cards">
            <img className='pfp' src="https://media.discordapp.net/attachments/1218598317970292807/1293563316995887167/IMG_0527.jpg?ex=6707d438&is=670682b8&hm=4e7a79a3385a5da125559d70875300eb4f04e87831476abd4fa5550037796374&=&format=webp&width=469&height=625"></img>
            <h3>Jane Doe</h3>
            <p>09:10</p>

          </div>

        </div>
        <h2>Recently Checked in Visitors</h2>

      </div>

      </div>


 

    </body>
  );
}
