"use client";

import { Pencil, Trash2 } from "lucide-react";
import {
  useState,
  useTransition,
  type FormEvent,
  type MouseEvent,
} from "react";
import { deleteLinkAction, updateLinkAction } from "@/app/dashboard/actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LinkItemActionsProps = {
  shortCode: string;
  url: string;
};

export function LinkItemActions({ shortCode, url }: LinkItemActionsProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [editError, setEditError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  function handleEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setEditError(null);

    startTransition(async () => {
      const result = await updateLinkAction(shortCode, formData);

      if (!result.success) {
        setEditError(result.error);
        return;
      }

      setEditOpen(false);
    });
  }

  function handleDelete(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setDeleteError(null);

    startTransition(async () => {
      const result = await deleteLinkAction(shortCode);

      if (!result.success) {
        setDeleteError(result.error);
        return;
      }

      setDeleteOpen(false);
    });
  }

  return (
    <div className="flex items-center gap-1">
      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (open) setEditError(null);
        }}
      >
        <DialogTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Edit link ${shortCode}`}
              disabled={isPending}
            />
          }
        >
          <Pencil aria-hidden="true" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit shortened link</DialogTitle>
            <DialogDescription>
              Update the destination for{" "}
              <span className="font-mono">/{shortCode}</span>.
            </DialogDescription>
          </DialogHeader>
          <form
            id={`edit-link-${shortCode}`}
            key={url}
            className="grid gap-4"
            onSubmit={handleEdit}
          >
            <div className="grid gap-2">
              <Label htmlFor={`edit-url-${shortCode}`}>Destination URL</Label>
              <Input
                id={`edit-url-${shortCode}`}
                name="url"
                type="url"
                defaultValue={url}
                autoComplete="url"
                required
                aria-invalid={editError !== null}
                aria-describedby={
                  editError ? `edit-error-${shortCode}` : undefined
                }
                disabled={isPending}
              />
              {editError && (
                <p
                  id={`edit-error-${shortCode}`}
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {editError}
                </p>
              )}
            </div>
          </form>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form={`edit-link-${shortCode}`}
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (open) setDeleteError(null);
        }}
      >
        <AlertDialogTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Delete link ${shortCode}`}
              disabled={isPending}
            />
          }
        >
          <Trash2 aria-hidden="true" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this shortened link?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-mono">/{shortCode}</span> and cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && (
            <Alert variant="destructive">
              <AlertDescription>{deleteError}</AlertDescription>
            </Alert>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete link"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
