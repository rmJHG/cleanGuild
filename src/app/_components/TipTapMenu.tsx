import { Editor } from '@tiptap/react';
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined } from 'react-icons/md';
import { AiOutlineAlignLeft, AiOutlineAlignCenter } from 'react-icons/ai';
import { CiImageOn } from 'react-icons/ci';
import { errorModal } from '../_lib/errorModal';
export default function TipTapMenu({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const hasImage = editor.getHTML().includes('<img');
    if (hasImage) {
      errorModal('이미 이미지를 추가했습니다. 기존 이미지를 삭제하고 다시 시도해주세요.');
      return;
    }
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (data.url) {
          editor.chain().focus().setImage({ src: data.url }).run();
        }
      } catch (error) {
        errorModal('이미지 업로드에 실패했습니다.');
      }
    }
  };
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
          style={{ color: isActive ? '#000' : '#adadad' }}
          aria-label={label}
        />
      ))}
      <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
        <CiImageOn size={20} style={{ color: '#adadad' }} />
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
}
