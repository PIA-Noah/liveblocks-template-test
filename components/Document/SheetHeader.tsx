import { ClientSideSuspense } from "@liveblocks/react";
import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";
import { InboxPopover } from "@/components/Inbox";
import { ShareIcon } from "@/icons";
import { renameDocument } from "@/lib/actions";
import { useInitialDocument } from "@/lib/hooks";
import { Button } from "@/primitives/Button";
import { Skeleton } from "@/primitives/Skeleton";
import { Document } from "@/types";
import { Logo } from "../Logo";
import { SheetShareDialog } from "../ShareDialog/SheetShareDialog";
import { SheetHeaderAvatars } from "./SheetHeaderAvatars";
import { SheetHeaderName } from "./SheetHeaderName";
import styles from "./DocumentHeader.module.css";

interface Props extends ComponentProps<"header"> {
  documentId: Document["id"];
}

export function SheetHeader({ documentId, className, ...props }: Props) {
  const initialDocument = useInitialDocument();

  return (
    <header className={clsx(className, styles.header)} {...props}>
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>
          <Logo />
        </Link>
      </div>
      <div className={styles.document}>
        <ClientSideSuspense
          fallback={
            <span className={styles.documentNameFallback}>
              {initialDocument.name}
            </span>
          }
        >
          {() => (
            <SheetHeaderName
              onDocumentRename={(name) => renameDocument({ documentId, name })}
            />
          )}
        </ClientSideSuspense>
      </div>
      <div className={styles.collaboration}>
        <div className={styles.presence}>
          <ClientSideSuspense fallback={null}>
            {() => <SheetHeaderAvatars />}
          </ClientSideSuspense>
        </div>
        <ClientSideSuspense
          fallback={
            <Button icon={<ShareIcon />} disabled={true}>
              Share
            </Button>
          }
        >
          {() => (
            <SheetShareDialog>
              <Button icon={<ShareIcon />}>Share</Button>
            </SheetShareDialog>
          )}
        </ClientSideSuspense>

        <InboxPopover align="end" sideOffset={4} />
      </div>
    </header>
  );
}

export function DocumentHeaderSkeleton({
  className,
  ...props
}: ComponentProps<"header">) {
  return (
    <header className={clsx(className, styles.header)} {...props}>
      <div className={styles.logo}>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className={styles.document}>
        <Skeleton style={{ width: 120 }} />
      </div>
    </header>
  );
}
