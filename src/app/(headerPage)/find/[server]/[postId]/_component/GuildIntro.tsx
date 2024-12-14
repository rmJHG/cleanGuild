import classes from './styles/guildIntro.module.css';
import { useEffect, useMemo, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function GuildIntro({ description }: { description: string }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: description,
    editable: false, // 읽기 전용으로 설정
    onUpdate: ({ editor }) => {
      // 상태 업데이트를 막는 방법
      editor.commands.setContent(description);
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(description);
    }
  }, [description, editor]);

  return (
    <div className={classes.guildIntro}>
      <EditorContent editor={editor} />
    </div>
  );
}
