"use client";

import { Plus } from "lucide-react";
import { useState, useTransition, type FormEvent } from "react";
import { createLinkAction } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateLinkDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [createdShortCode, setCreatedShortCode] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError(null);

    startTransition(async () => {
      const result = await createLinkAction(formData);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setCreatedShortCode(result.shortCode);
      setOpen(false);
    });
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) {
      setError(null);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger
          render={
            <Button type="button">
              <Plus aria-hidden="true" />
              Create link
            </Button>
          }
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a shortened link</DialogTitle>
            <DialogDescription>
              Enter a destination URL. We&apos;ll generate a unique short code
              for you.
            </DialogDescription>
          </DialogHeader>
          <form
            id="create-link-form"
            className="grid gap-4"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-2">
              <Label htmlFor="destination-url">Destination URL</Label>
              <Input
                id="destination-url"
                name="url"
                type="url"
                placeholder="https://example.com/page"
                autoComplete="url"
                required
                aria-invalid={error !== null}
                aria-describedby={error ? "create-link-error" : undefined}
                disabled={isPending}
              />
              {error && (
                <p
                  id="create-link-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {error}
                </p>
              )}
            </div>
          </form>
          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={isPending} />
              }
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              form="create-link-form"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {createdShortCode && (
        <p className="text-sm text-muted-foreground" role="status">
          Created short code{" "}
          <span className="font-mono font-medium text-foreground">
            {createdShortCode}
          </span>
        </p>
      )}
    </div>
  );
}
