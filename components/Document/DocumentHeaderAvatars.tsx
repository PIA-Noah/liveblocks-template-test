import { useMemo } from "react";
import { useOthers, useSelf } from "../../liveblocks.config";
import { useSelf as useSelfSheet, useOthers as useOthersSheet } from "@/liveblocks_sheet.config";
import { AvatarStack } from "../../primitives/AvatarStack";
import { useInitialDocument } from "@/lib/hooks/useInitialDocument";


export function DocumentHeaderAvatars() {
  const initialDocument = useInitialDocument();
  const self = initialDocument.type === 'spreadsheet'
  ? useSelfSheet()
  : useSelf();
  const others = initialDocument.type === 'spreadsheet'
  ? useOthersSheet()
  : useOthers();
  const users = useMemo(
    () => (self ? [self, ...others] : others),
    [self, others]
  );

  return (
    <AvatarStack
      avatars={users.map((user) => ({
        name: user.info.name,
        src: user.info.avatar,
        color: user.info.color,
      }))}
      max={5}
      size={20}
      tooltip
      tooltipProps={{ sideOffset: 28 }}
    />
  );
}
