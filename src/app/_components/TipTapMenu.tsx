import { Editor } from '@tiptap/react';
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined } from 'react-icons/md';
import { AiOutlineAlignLeft, AiOutlineAlignCenter } from 'react-icons/ai';

export default function TipTapMenu({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  const toolbarItems = [
    {
      Icon: MdFormatBold,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      label: 'Toggle bold',
    },
    {
      Icon: MdFormatItalic,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      label: 'Toggle italic',
    },
    {
      Icon: MdFormatUnderlined,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
      label: 'Toggle underline',
    },
    {
      Icon: AiOutlineAlignLeft,
      action: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: editor.isActive({ textAlign: 'left' }),
      label: 'Align left',
    },
    {
      Icon: AiOutlineAlignCenter,
      action: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: editor.isActive({ textAlign: 'center' }),
      label: 'Align center',
    },
  ];

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
      {toolbarItems.map(({ Icon, action, isActive, label }, index) => (
        <Icon
          key={index}
          size={20}
          cursor="pointer"
          onClick={action}
          style={{ color: isActive ? 'white' : 'gray' }}
          aria-label={label}
        />
      ))}
    </div>
  );
}
