"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useToast } from "@/hooks/use-toast";

export default function Customization() {
  const { toast } = useToast();
  const [themeColor, setThemeColor] = useState<string>("default");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [customMessage, setCustomMessage] = useState<string>("");

  function handleSave() {
    toast({
      title: "Settings Saved",
      description: "Your customization settings were saved successfully.",
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl mb-2">Customisation</h1>
      <Card className="p-4">
        <CardHeader>
          <h2 className="text-2xl font-bold">Customize Checky</h2>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Theme Color"
            placeholder="Enter theme color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
          />
          <Input
            label="Logo URL"
            placeholder="Enter logo URL"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
          />
          <Input
            label="Custom Message"
            placeholder="Enter a custom welcome message"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
          />
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button onPress={handleSave} color="primary">
            Save Customisation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 