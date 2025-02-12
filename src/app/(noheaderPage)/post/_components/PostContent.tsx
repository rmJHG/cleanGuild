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
import Image from '@tiptap/extension-image';
import DOMPurify from 'dompurify';
import { errorModal } from '@/app/_lib/errorModal';
import { successModal } from '@/app/_lib/successModal';
import { useRouter } from 'next/navigation';
import customFetch from '@/app/_lib/customFetch';
import { useEffect, useRef, useState } from 'react';
import BtnLoading from '@/app/_components/layout/BtnLoading';

function PostContent({ onPrev, guildData }: { onPrev: () => void; guildData: GuildData }) {
  const [isPosting, setIsPosting] = useState(false);
  const [isFocused, setIsFocused] = useState<string>('');
  const titleRef = useRef<HTMLInputElement>(null);

  const { data: session, update } = useSession();
  const { user } = session!;
  const route = useRouter();
  console.log(session);
  const {
    currentNoblePoint,
    guild_level: guildLevel,
    guild_member_count: guildMemberCount,
    guild_master_name: guildMasterName,
    guild_name: guildName,
  } = guildData;

  const {
    guildType,
    guildContents,
    description,
    title,
    limitedFlagPoint,
    limitedLevel,
    limitedSuroPoint,
    openKakaotalkLink,
    discordLink,
    managerNameArr,
    setPostState,
    resetPostState,
  } = postStore();

  const onPost = async () => {
    if (!editor) return null;
    setIsPosting(true);
    if (!title) {
      setIsPosting(false);
      if (!editor) return null;
      return errorModal('제목을 입력해주세요.');
    }
    if (editor.getHTML() === '<p></p>') {
      setIsPosting(false);
      return errorModal('내용을 입력해주세요.');
    }

    const inputData = {
      postData: {
        title,
        description,
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
        guildMasterName,
      },
      publisherData: {
        email: user.email,
        handsData: {
          ...user.handsData,
        },
      },
    };
    console.log(description);
    try {
      const res = await customFetch({
        url: `/api/v1/guild/${user.loginType}/postGuildRecruitments`,
        method: 'POST',
        loginType: user.loginType,
        headers: {
          'Content-Type': 'application/json',
          loginType: user.loginType,
        },
        token: session?.user.accessToken as string,
        body: JSON.stringify(inputData),
        update,
      });

      if (res.message === '저장 완료') {
        successModal('홍보글이 등록되었습니다.', 1000);
        resetPostState();
        route.push('/');
      }
    } catch (error) {
      console.log(error);
      setIsPosting(false);
      return errorModal('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      PlaceHolder.configure({
        placeholder: '내용을 입력해주세요.',
        emptyEditorClass: classes.emptyEditor,
        emptyNodeClass: classes.emptyNode,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Image.configure({
        inline: false,
        allowBase64: true,
      }).extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            class: {
              default: classes.image,
            },
            contenteditable: {
              default: false,
            },
          };
        },
      }),
    ],
    content: '',
    editable: true,

    onUpdate: ({ editor }) => {
      const decodedContent = editor
        .getHTML()
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");

      let sanitizedContent = DOMPurify.sanitize(decodedContent, {
        ALLOWED_TAGS: ['p', 'b', 'i', 'u', 'strong', 'img', 'em'],
        ALLOWED_ATTR: ['style', 'src'],
        FORBID_TAGS: ['script', 'iframe', 'object', 'svg'],
        FORBID_ATTR: ['onclick', 'onmouseover', 'onerror'],
        KEEP_CONTENT: true,
      });
      setPostState({ description: sanitizedContent });
    },
  });

  useEffect(() => {
    if (editor) {
      editor.on('focus', () => setIsFocused('description'));
      editor.on('blur', () => setIsFocused(''));
    }
  }, [editor]);
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h2>길드 홍보 ( 4 / 4 )</h2>
        <p>길드를 소개해주세요.</p>
      </header>
      <div className={classes.infoContainer}>
        <div
          className={`${classes.titleContainer} ${isFocused === 'title' ? classes.focused : ''}`}
          onClick={() => titleRef.current?.focus()}
        >
          <span>제목 (필수 항목)</span>
          <input
            type="text"
            placeholder="길드를 홍보하는 제목을 입력해주세요."
            ref={titleRef}
            defaultValue={title}
            maxLength={50}
            onChange={(e) => {
              setPostState({ title: e.target.value });
            }}
            onFocus={() => setIsFocused('title')}
            onBlur={() => setIsFocused('')}
          />
          <p className={classes.inputLengthText}>{titleRef.current?.value.length} / 50</p>
        </div>
        <div
          className={`${classes.descriptionContainer} ${
            isFocused === 'description' ? classes.focused : ''
          }`}
          onClick={() => editor?.commands.focus()}
        >
          <span>내용 (필수 항목)</span>
          <TipTapMenu editor={editor} />
          <EditorContent editor={editor} spellCheck={false} />
        </div>
      </div>

      <div className={classes.btnContainer}>
        <button onClick={onPrev}>
          <p>이전으로</p>
        </button>
        {isPosting ? (
          <button>
            <BtnLoading />
          </button>
        ) : (
          <button onClick={onPost}>
            <p>홍보하기</p>
          </button>
        )}
      </div>
    </div>
  );
}

export default PostContent;
