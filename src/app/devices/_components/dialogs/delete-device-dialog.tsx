"use client";

import { Trash2 } from "lucide-react";

import type { Device } from "@/schemas/device.schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/ui/components/alert-dialog";

type DeleteDeviceDialogProps = {
  device: Device | null;
  isOpen: boolean;
  isDeleting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteDeviceDialog({
  device,
  isOpen,
  isDeleting = false,
  onClose,
  onConfirm,
}: DeleteDeviceDialogProps) {
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isDeleting) {
          onClose();
        }
      }}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive rounded-full">
            <Trash2 className="size-5" />
          </AlertDialogMedia>
          <AlertDialogTitle>حذف دستگاه</AlertDialogTitle>
          <AlertDialogDescription>
            آیا از حذف دستگاه&nbsp;
            <span className="text-foreground font-semibold">
              «{device?.name}»
            </span>
            &nbsp;مطمئن هستید؟ این عملیات غیرقابل بازگشت است.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} onClick={onClose}>
            انصراف
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isDeleting}
            onClick={onConfirm}
          >
            {isDeleting ? "در حال حذف..." : "حذف دستگاه"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
