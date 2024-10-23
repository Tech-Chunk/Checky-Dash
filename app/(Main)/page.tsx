import  "./home.css";


export default function HomePage() {
    return (
  <div className="banner w-full">
    <div className="content">
      <h1>Checky - The all in one check in app</h1>
      <p>The Checky app can be downloaded and then all information can be accessed using the dashboard here</p>
      <div>
        <button className="button" type="button"><span></span>Download</button>
        <button className="button" type="button"><span></span>Learn More</button>
      </div>
    </div>
  </div>
  
    );
}