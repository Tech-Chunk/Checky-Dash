import {Card, CardHeader} from "@nextui-org/card";
import {Button} from "@nextui-org/button";
import { motion, AnimatePresence } from 'framer-motion';


export default function Welcome() {
    return (
        <div className="h-screen">
            
            <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
            <Card className="h-screen">
                <CardHeader className="justify-center flex flex-col gap-10 h-screen">
                    <h1 className="text-4xl justify-center font-bold">screen 2npm install framer-motion
</h1>
                    <Button radius="none" className="text-xl" variant="ghost" color="primary">Get Started</Button>  
                </CardHeader>
            </Card>
    </motion.div>   
        </div>
    )
}