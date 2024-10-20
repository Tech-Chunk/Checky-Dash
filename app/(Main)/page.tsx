import  "./home.css";
import {Button,ButtonGroup} from "@nextui-org/button"

export default function HomePage() {
    return (
  <div className="banner w-full">
    <div className="content">
      <h1 className="font-bold">The all in one check in app</h1>
      <p>The Checky app can be downloaded and then all information can be accessed using the dashboard here</p>
      <ButtonGroup>
        <Button className="button" type="button" size="lg"><span></span>Download</Button>
        <Button className="button" type="button" size="lg"><span></span>Learn More</Button>
      </ButtonGroup>
    </div>
  </div>
  
    );
}
