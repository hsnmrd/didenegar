import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { createDeviceSchema, type Device } from "@/app/_schemas/device.schema";

const now = Date.now();

let devices: Device[] = [
  {
    id: "1",
    name: "Core-Switch-01",
    ip: "192.168.1.1",
    status: "Online",
    lastPing: new Date(now - 2 * 60 * 1000),
  },
  {
    id: "2",
    name: "Edge-Router",
    ip: "10.0.0.1",
    status: "Warning",
    lastPing: new Date(now - 15 * 60 * 1000),
  },
  {
    id: "3",
    name: "Storage-NAS",
    ip: "192.168.1.50",
    status: "Offline",
    lastPing: new Date(now - 2 * 60 * 60 * 1000),
  },
  {
    id: "4",
    name: "Backup-Server",
    ip: "192.168.2.10",
    status: "Online",
    lastPing: new Date(now),
  },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  await sleep(500);

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase().trim();
  const status = searchParams.get("status");

  let filtered = [...devices];

  if (status && status !== "All") {
    filtered = filtered.filter(
      (device) => device.status.toLowerCase() === status.toLowerCase(),
    );
  }

  if (query) {
    filtered = filtered.filter(
      (device) =>
        device.name.toLowerCase().includes(query) ||
        device.ip.toLowerCase().includes(query),
    );
  }

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = createDeviceSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, ip, status } = result.data;

    const newDevice: Device = {
      id: String(Date.now()),
      name,
      ip,
      status,
      lastPing: new Date(),
    };

    devices = [newDevice, ...devices];

    return NextResponse.json(
      { success: true, data: newDevice },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Device id is required" },
      { status: 400 },
    );
  }

  devices = devices.filter((device) => device.id !== id);

  return NextResponse.json({
    success: true,
    message: "Device deleted successfully",
  });
}
