import {Button,ButtonGroup} from "@nextui-org/button"
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import './styles.css'

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center content-center min-h-screen epicgrad gap-3">
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="flex flex-col justify-center items-center">
          <Link href="/dashboard">
          <Chip>Explore Checky V1</Chip>
          </Link>
          <h1 className="text-5xl font-bold">Modernise your Workplace</h1>
        </div>
        <h3 className="text-lg text-center w-2/3">
          A Simple, Modern and Efficient way of tracking employee registration in the office
        </h3>
      </div>

      <div className="flex flex-row gap-2">
        <Button color="primary" variant="solid">Get Started</Button>
        <Button>See Demo</Button>
      </div>

    </div>
    
  );
}


