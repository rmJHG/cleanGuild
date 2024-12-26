import classes from './styles/guildIntro.module.css';
import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';

export default function GuildIntro({ description }: { description: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({ HTMLAttributes: { class: classes.guildIntroImage } }),
    ],
    content: description,
    editable: false, // 읽기 전용으로 설정
    onUpdate: ({ editor }) => {
      // 상태 업데이트를 막는 방법
      editor.commands.setContent(description);
    },
    immediatelyRender: false,
  });

  console.log('description', description);
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
