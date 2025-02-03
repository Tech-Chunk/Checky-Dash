"use client";
import React from "react";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row gap-10 p-4">
      <div className="w-1/6">
        <h1 className="text-3xl font-medium">Settings</h1>
        <Divider className="mt-2 mb-2" />
        <div className="flex flex-col gap-2">
          <Link href="/dashboard/settings" className="text-decoration-none">
            <h2 className="text-xl">Users</h2>
          </Link>
          <Link href="/dashboard/settings/customisation" className="text-decoration-none">
            <h2 className="text-xl">Customisation</h2>
          </Link>
          <Link href="/dashboard/settings/subscription" className="text-decoration-none">
            <h2 className="text-xl">Subscription</h2>
          </Link>
        </div>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
} 