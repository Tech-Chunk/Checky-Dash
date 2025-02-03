"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useToast } from "@/hooks/use-toast";

export default function Subscription() {
  const { toast } = useToast();
  const [plan, setPlan] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<string>("");

  function handleSave() {
    toast({
      title: "Subscription Updated",
      description: "Your subscription settings have been updated.",
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl mb-2">Subscription</h1>
      <Card className="p-4">
        <CardHeader>
          <h2 className="text-2xl font-bold">Manage Subscription</h2>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Plan"
            placeholder="Enter subscription plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          />
          <Input
            label="Expiry Date"
            placeholder="Enter subscription expiry date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
          />
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button onPress={handleSave} color="primary">
            Save Subscription
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
