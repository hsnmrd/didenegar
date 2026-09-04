"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";

import { DEVICE_FORM_STATUS_OPTIONS } from "@/mock/status";
import {
  type CreateDeviceInput,
  createDeviceSchema,
  type Device,
  type DeviceStatus,
} from "@/schemas/device.schema";
import { devicesResource } from "@/services/devices.resource";
import { Button } from "@/ui/components/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/ui/components/combobox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/components/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/ui/components/field";
import { Input } from "@/ui/components/input";
import { toast } from "@/ui/components/toast";

type CreateDeviceDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateDeviceDialog({
  isOpen,
  onClose,
}: CreateDeviceDialogProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateDeviceInput>({
    resolver: zodResolver(createDeviceSchema),
    defaultValues: {
      name: "",
      ip: "",
      status: "Online",
    },
  });

  const createMutation = useMutation({
    ...devicesResource.create.toMutation(),
    onSuccess: (newDevice) => {
      queryClient.setQueriesData<Device[]>(
        { queryKey: devicesResource.list.baseKey() },
        (old) => {
          if (!old) return [newDevice];
          if (old.some((d) => d.id === newDevice.id)) return old;
          return [newDevice, ...old];
        },
      );
      queryClient.invalidateQueries({
        queryKey: devicesResource.list.baseKey(),
      });
      toast.add({
        description: "دستگاه با موفقیت افزوده شد",
        type: "success",
      });
      reset();
      onClose();
    },
  });

  const handleClose = () => {
    if (createMutation.isPending) return;
    reset();
    createMutation.reset();
    onClose();
  };

  const onSubmit = (data: CreateDeviceInput) => {
    createMutation.mutate(data);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="max-sm:fixed max-sm:inset-0 max-sm:top-0 max-sm:left-0 max-sm:m-0 max-sm:flex max-sm:h-dvh max-sm:max-h-dvh max-sm:w-screen max-sm:max-w-full max-sm:translate-none max-sm:flex-col max-sm:justify-between max-sm:rounded-none max-sm:border-0 max-sm:p-6 sm:max-w-md sm:rounded-2xl sm:p-6">
        <div className="flex flex-col gap-6">
          <DialogHeader className="text-right">
            <div className="flex items-center gap-2 text-sky-500">
              <DialogTitle className="text-lg font-bold">
                افزودن دستگاه جدید
              </DialogTitle>
            </div>
          </DialogHeader>

          <form
            id="create-device-form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="device-name">نام دستگاه</FieldLabel>
                <Input
                  id="device-name"
                  placeholder="Core-Switch-01"
                  className="h-10 rounded-xl"
                  {...register("name")}
                />
                <FieldError errors={[{ message: errors.name?.message }]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="device-ip">آدرس IP</FieldLabel>
                <Input
                  id="device-ip"
                  dir="ltr"
                  placeholder="192.168.1.1"
                  className="h-10 rounded-xl text-left font-mono"
                  {...register("ip")}
                />
                <FieldError errors={[{ message: errors.ip?.message }]} />
              </Field>

              <Field>
                <FieldLabel>وضعیت اولیه</FieldLabel>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => {
                    const currentStatus =
                      DEVICE_FORM_STATUS_OPTIONS.find(
                        (opt) => opt.value === field.value,
                      ) ?? DEVICE_FORM_STATUS_OPTIONS[0];

                    return (
                      <Combobox
                        items={DEVICE_FORM_STATUS_OPTIONS}
                        value={currentStatus}
                        onValueChange={(val) => {
                          if (val) {
                            field.onChange(val.value as DeviceStatus);
                          }
                        }}
                      >
                        <ComboboxTrigger
                          render={
                            <Button
                              type="button"
                              variant="outline"
                              className="border-border/70 bg-card hover:bg-muted/40 text-foreground h-10 w-full justify-between gap-2 rounded-xl px-3.5 text-xs font-normal shadow-xs transition-colors sm:text-sm"
                            />
                          }
                        >
                          <ComboboxValue>
                            {(val) => (val ? val.label : currentStatus.label)}
                          </ComboboxValue>
                        </ComboboxTrigger>
                        <ComboboxContent
                          align="start"
                          className="border-border/70 bg-popover w-(--anchor-width) rounded-xl p-1 shadow-md"
                        >
                          <ComboboxList>
                            {DEVICE_FORM_STATUS_OPTIONS.map((status) => (
                              <ComboboxItem
                                key={status.value}
                                value={status}
                                className="rounded-lg text-xs font-medium sm:text-sm"
                              >
                                {status.label}
                              </ComboboxItem>
                            ))}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    );
                  }}
                />
                <FieldError errors={[{ message: errors.status?.message }]} />
              </Field>
            </FieldGroup>
          </form>
        </div>

        <DialogFooter className="m-0 mt-2 flex flex-row items-center justify-end gap-3 border-0 bg-transparent p-0 max-sm:mt-auto max-sm:pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={createMutation.isPending}
            className="h-10 rounded-xl px-4 max-sm:flex-1"
          >
            انصراف
          </Button>
          <Button
            type="submit"
            form="create-device-form"
            disabled={createMutation.isPending}
            className="h-10 gap-2 rounded-xl bg-sky-500 px-5 font-semibold text-white shadow-sm shadow-sky-500/25 transition-all hover:bg-sky-600 active:scale-95 max-sm:flex-1"
          >
            {createMutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>در حال ثبت...</span>
              </>
            ) : (
              <span>افزودن دستگاه</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
