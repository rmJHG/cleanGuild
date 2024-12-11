'use client';
import { useSession } from 'next-auth/react';
import classes from './_styles/postContent.module.css';
import { postStore } from '@/store/postStore';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TipTapMenu from '@/app/_components/TipTapMenu';
import PlaceHolder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import DOMPurify from 'dompurify';
import { errorModal } from '@/app/_lib/errorModal';
import { successModal } from '@/app/_lib/successModal';
import { useRouter } from 'next/navigation';

function PostContent({ onPrev, guildData }: { onPrev: () => void; guildData: GuildData }) {
  const { data: session } = useSession();
  const { user } = session!;
  const route = useRouter();
  console.log(session);
  const {
    currentNoblePoint,
    guild_level: guildLevel,
    guild_master_name,
    guild_member_count: guildMemberCount,
    guild_name: guildName,
    world_name,
  } = guildData;

  const {
    guildType,
    guildContents,
    descreiption,
    title,
    limitedFlagPoint,
    limitedLevel,
    limitedSuroPoint,
    openKakaotalkLink,
    discordLink,
    managerNameArr,
    setPostState,
  } = postStore();

  const onPost = async () => {
    if (!title) return errorModal('제목을 입력해주세요.');
    if (editor.getHTML() === '<p></p>') return errorModal('내용을 입력해주세요.');
    const decodedContent = editor
      .getHTML()
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");

    let sanitizedContent = DOMPurify.sanitize(decodedContent, {
      ALLOWED_TAGS: ['p', 'b', 'i', 'u', 'strong', 'img'],
      ALLOWED_ATTR: ['src'],
      FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'svg'],
      FORBID_ATTR: ['onclick', 'onmouseover', 'onerror'],
      KEEP_CONTENT: true,
    });

    const inputData = {
      postData: {
        title,
        description: sanitizedContent,
        guildName,
        guildType,
        guildContents,
        limitedFlagPoint,
        limitedLevel,
        limitedSuroPoint,
        currentNoblePoint,
        guildMemberCount,
        openKakaotalkLink,
        discordLink,
        managerNameArr,
        guildLevel,
      },
      publisherData: {
        email: user.email,
        handsData: {
          ...user.handsData,
        },
      },
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/guild/${user.loginType}/postGuildRecruitments`,
        {
          method: 'POST',
          body: JSON.stringify(inputData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const data = await res.json();

      if (res.ok) {
        route.push('/');
      }
    } catch (error) {
      console.log(error);
      return errorModal('글 작성에 실패했습니다.');
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      PlaceHolder.configure({
        placeholder: '내용을 입력해주세요.',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content: '',
    editable: true,
    immediatelyRender: true,
  });

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h2>길드 홍보 ( 4 / 4 )</h2>
        <p>길드를 소개해주세요.</p>
      </header>
      <div className={classes.infoContainer}>
        <section className={classes.titleSection}>
          <span>제목</span>
          <input
            onChange={(e) => {
              setPostState({ title: e.target.value });
            }}
          />
        </section>
        <section className={classes.editorSection}>
          <TipTapMenu editor={editor} />

          <EditorContent editor={editor} spellCheck={false} />
        </section>
      </div>

      <div className={classes.btnContainer}>
        <button onClick={onPrev}>이전으로</button>
        <button onClick={onPost}>홍보하기</button>
      </div>
    </div>
  );
}

export default PostContent;
