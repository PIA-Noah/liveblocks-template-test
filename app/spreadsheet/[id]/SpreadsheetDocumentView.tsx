"use client";

import { InitialDocumentProvider } from "@/lib/hooks";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  RoomProvider,
  useCanRedo,
  useCanUndo,
  useHistory,
  useSelf,
} from "@/liveblocks_sheet.config";
import { useSpreadsheet } from "@/spreadsheet/react";
import { createInitialStorage } from "@/spreadsheet/utils";
import { Document, ErrorData } from "@/types";
import { appendUnit } from "@/utils/appendUnit";
import styles from "./SpreadsheetDocumentView.module.css";
import { Avatar } from "@/primitives/Avatar";
import { Tooltip } from "@/primitives/Tooltip";
import {
  COLUMN_HEADER_WIDTH,
  COLUMN_INITIAL_WIDTH,
  GRID_INITIAL_COLUMNS,
  GRID_INITIAL_ROWS,
  GRID_MAX_COLUMNS,
  GRID_MAX_ROWS,
  ROW_INITIAL_HEIGHT,
} from "@/spreadsheet/constants";
import {
  AddColumnAfterIcon,
  AddRowAfterIcon,
  RedoIcon,
  UndoIcon,
} from "@/spreadsheet/icons";
import Image from "next/image";
import cx from "classnames";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { type CSSProperties } from "react";
import { DocumentHeaderSkeleton } from "@/components/Document";
import { DocumentLayout } from "@/layouts/Document";
import { ErrorLayout } from "@/layouts/Error";
import { SheetHeader } from "@/components/Document/SheetHeader";
import { Sheet } from "@/components/Spreadsheet/Sheet";
import "@/styles/globals.css";

type Props = {
  initialDocument: Document | null;
  initialError: ErrorData | null;
};

const AVATARS_MAX = 3;

const initialStorage = createInitialStorage(
  { length: GRID_INITIAL_COLUMNS, width: COLUMN_INITIAL_WIDTH },
  { length: GRID_INITIAL_ROWS, height: ROW_INITIAL_HEIGHT },
  [
    ["🔢 Entries", "👀 Results", ""],
    ["3", "=A2*3", ""],
    ["1234", "=(A2*A3+A4)/2", ""],
    ["-8", "=B3%2", ""],
    ["", "", ""],
  ]
);

export function SpreadsheetDocumentView({
  initialDocument,
  initialError,
}: Props) {
  const { id, error: queryError } = useParams<{ id: string; error: string }>();
  const [error, setError] = useState<ErrorData | null>(initialError);

  // If error object in params, retrieve it
  useEffect(() => {
    if (queryError) {
      setError(JSON.parse(decodeURIComponent(queryError as string)));
    }
  }, [queryError]);

  if (error) {
    return <ErrorLayout error={error} />;
  }

  if (!initialDocument) {
    return <DocumentLayout header={<DocumentHeaderSkeleton />} />;
  }

  console.log("Waiting for room");

  return (
    <RoomProvider
      id={id as string}
      initialPresence={{ selectedCell: null }}
      initialStorage={initialStorage}
    >
      <InitialDocumentProvider initialDocument={initialDocument}>
        <DocumentLayout
          header={<SheetHeader documentId={initialDocument.id} />}
        >
          <TooltipProvider>
            <SpreadsheetUI />
          </TooltipProvider>
        </DocumentLayout>
      </InitialDocumentProvider>
    </RoomProvider>
  );
}

function SpreadsheetUI() {
  console.log("creating spreadsheet");
  const spreadsheet = useSpreadsheet();
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const self = useSelf();

  if (spreadsheet == null) {
    return (
      <div>
        <Image
          alt="Loading"
          className={styles.loading}
          src="https://liveblocks.io/loading.svg"
          width={5}
          height={5}
        />
      </div>
    );
  }

  const { users, columns, rows, insertColumn, insertRow } = spreadsheet;

  return (
    <main
      className={styles.container}
      style={
        {
          "--column-header-width": appendUnit(COLUMN_HEADER_WIDTH),
          "--column-width": appendUnit(COLUMN_INITIAL_WIDTH),
          "--row-height": appendUnit(ROW_INITIAL_HEIGHT),
          "--accent": self?.info.color,
        } as CSSProperties
      }
    >
      <div className={styles.banner}>
        <div className={styles.banner_content}>
          <div className={styles.buttons}>
            <div className={styles.button_group} role="group">
              <button
                className={styles.button}
                disabled={rows.length >= GRID_MAX_ROWS}
                onClick={() => insertRow(rows.length, ROW_INITIAL_HEIGHT)}
              >
                <AddRowAfterIcon />
                <span>Add Row</span>
              </button>
              <button
                className={styles.button}
                disabled={columns.length >= GRID_MAX_COLUMNS}
                onClick={() =>
                  insertColumn(columns.length, COLUMN_INITIAL_WIDTH)
                }
              >
                <AddColumnAfterIcon />
                <span>Add Column</span>
              </button>
            </div>
            <div className={styles.button_group} role="group">
              <Tooltip content="Undo">
                <button
                  className={styles.button}
                  onClick={() => history.undo()}
                  disabled={!canUndo}
                >
                  <UndoIcon />
                </button>
              </Tooltip>
              <Tooltip content="Redo">
                <button
                  className={styles.button}
                  onClick={() => history.redo()}
                  disabled={!canRedo}
                >
                  <RedoIcon />
                </button>
              </Tooltip>
            </div>
          </div>
          <div className={styles.avatars}>
            {self && (
              <Avatar
                className={styles.avatar}
                color={self.info.color}
                key="you"
                name="You"
                src={self.info.avatar}
                // tooltipOffset={6}
              />
            )}
            {users.slice(0, AVATARS_MAX - 1).map(({ connectionId, info }) => {
              return (
                <Avatar
                  className={styles.avatar}
                  color={info.color}
                  key={connectionId}
                  name={info.name}
                  src={info.avatar}
                  // tooltipOffset={6}
                />
              );
            })}
            {users.length > AVATARS_MAX - 1 ? (
              <div className={cx(styles.avatar, styles.avatar_ellipsis)}>
                +{users.length - AVATARS_MAX + 1}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Sheet {...spreadsheet} />
    </main>
  );
}
