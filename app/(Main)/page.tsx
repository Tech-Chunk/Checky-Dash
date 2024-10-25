import  "./home.css";
import { Link } from "@nextui-org/link";
import {Button,ButtonGroup} from "@nextui-org/button"

export default function HomePage() {
    return (
  <div className="banner w-full">
    <div className="content">
      <h1 className="font-bold">Live tracking of staff's entrys, comfort knowing who is on and off the property and another level of saftey. Only with Checky.</h1>
      <p>The Checky app can be downloaded on Android and IOS devices, and then all entry and exit information can be accessed using the dashboard here</p>
      <div className="flex flex-wrap gap-4 items-center">
      <Button className="bg-sky-500" variant="solid">
        Download
      </Button>
      <Link href="/about">
      <Button color="primary" variant="faded">
        Learn More
      </Button>  
      </Link>
      
    </div>
    </div>
  </div>
  
  
    );
}


