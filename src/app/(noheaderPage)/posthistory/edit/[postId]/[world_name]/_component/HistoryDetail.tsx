'use client';
import { GuildPostData } from '@/types/guildPostData';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import DOMPurify from 'dompurify';
import classes from './_styles/historyDetail.module.css';
import { postStore } from '@/store/postStore';
import TipTapMenu from '@/app/_components/TipTapMenu';
import { useEffect, useRef, useState } from 'react';
import Radio from '@/app/_components/Radio';
import Select from '@/app/_components/Select';

import { AiOutlineDelete } from 'react-icons/ai';
import { IoIosAdd } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa6';

import { useRouter } from 'next/navigation';
import { errorModal } from '@/app/_lib/errorModal';
import { useQuery } from '@tanstack/react-query';
import { getGuildData } from '@/app/_lib/getGuildData';
import { Session } from 'next-auth';
import customFetch from '@/app/_lib/customFetch';
import { useSession } from 'next-auth/react';
import { successModal } from '@/app/_lib/successModal';

export default function HistoryDetail({
  data,
  session,
}: {
  data: GuildPostData;
  session: Session;
}) {
  const { update } = useSession();
  const { handsData } = session.user;
  const { data: guildData } = useQuery({
    queryKey: ['guildData', handsData!.world_name, handsData!.character_guild_name],
    queryFn: getGuildData,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
  console.log(data);
  const route = useRouter();
  const {
    title,
    description,
    discordLink,
    openKakaotalkLink,
    guildType,
    guildContents,
    limitedFlagPoint,
    limitedLevel,
    limitedSuroPoint,
    managerNameArr,
  } = data.postData;

  const {
    title: currentTitle,
    description: currentDescription,
    guildType: currentGuildType,
    guildContents: currentGuildContents,
    limitedLevel: currentLimitedLevel,
    limitedSuroPoint: currentLimitedSuroPoint,
    limitedFlagPoint: currentLimitedFlagPoint,
    discordLink: currentDiscordLink,
    openKakaotalkLink: currentOpenKakaotalkLink,
    managerNameArr: currentManagerNameArr,
    resetPostState,
    setPostState,
  } = postStore();
  const guildTypeOption = ['친목', '솔로', '랭킹', '자유', '유니온'];

  const [isFocused, setIsFocused] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
  const limitedLevelRef = useRef<HTMLInputElement>(null);
  const limitedSuroPointRef = useRef<HTMLInputElement>(null);
  const limitedFlagPointRef = useRef<HTMLInputElement>(null);
  const discordLinkRef = useRef<HTMLInputElement>(null);
  const openKakaotalkLinkRef = useRef<HTMLInputElement>(null);
  const managerNameRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '내용을 입력해주세요.',
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
    content: description || '',
    editable: true,

    immediatelyRender: false,
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
  const handleAddManager = (name: string) => {
    const managerName = name;
    const guildMasterName = guildData?.guild_master_name;
    const guildMember = guildData.guild_member;
    if (currentManagerNameArr.length >= 4) {
      return errorModal('인게임 문의는 최대 4명까지 추가할 수 있습니다.');
    }
    if (managerName === guildMasterName) {
      return errorModal('길드마스터는 추가할 수 없습니다.');
    }

    const newManagerName = managerName.trim();

    if (!newManagerName) {
      return errorModal('캐릭터명을 입력해주세요.');
    }

    if (!guildMember.includes(newManagerName)) {
      return errorModal('길드원이 아닌 캐릭터명은 추가할 수 없습니다.');
    }
    if (currentManagerNameArr.includes(newManagerName)) {
      return errorModal('이미 추가된 캐릭터명입니다.');
    }

    setPostState({ managerNameArr: [...managerNameArr, newManagerName] });
    managerNameRef.current!.value = '';
  };
  function isValidKakaoURL(string: string) {
    const pattern = new RegExp('^https:\\/\\/open\\.kakao\\.com\\/o\\/.+', 'i');
    return !!pattern.test(string);
  }
  function isValidDiscordURL(string: string) {
    const pattern = new RegExp('^https:\\/\\/discord\\.gg\\/.+', 'i');
    return !!pattern.test(string);
  }
  const hadleEditPostBtn = async () => {
    if (!currentTitle) return errorModal('제목을 입력해주세요.');
    if (!currentDescription) return errorModal('내용을 입력해주세요.');
    if (!currentGuildType) return errorModal('길드타입을 선택해주세요.');
    if (!currentGuildContents) return errorModal('길드 컨텐츠를 선택해주세요.');
    if (currentLimitedLevel && currentLimitedLevel > 300)
      return errorModal('레벨 제한은 300레벨 이하로 입력해주세요.');
    if (currentLimitedFlagPoint && currentLimitedFlagPoint > 1000)
      return errorModal('플래그 점수는 1000점 이하로 입력해주세요.');
    if (currentOpenKakaotalkLink && !isValidKakaoURL(currentOpenKakaotalkLink))
      return errorModal('올바른 카카오톡 링크를 입력해주세요.');
    if (currentDiscordLink && !isValidDiscordURL(currentDiscordLink))
      return errorModal('올바른 디스코드 링크를 입력해주세요.');

    console.log(currentLimitedFlagPoint, currentLimitedSuroPoint, currentGuildContents);
    try {
      const res = await customFetch({
        url: '/api/v1/guild/updateGuildRecruitmentPoster',
        method: 'PATCH',
        loginType: session.user.loginType,
        token: session.user.accessToken,
        update,
        headers: {
          'Content-Type': 'application/json',
          loginType: session.user.loginType,
        },
        body: JSON.stringify({
          world_name: handsData!.world_name,
          _id: data._id,
          postData: {
            title: currentTitle,
            description: currentDescription,
            discordLink: currentDiscordLink,
            openKakaotalkLink: currentOpenKakaotalkLink,
            guildType: currentGuildType,
            guildContents: currentGuildContents,
            limitedLevel: currentLimitedLevel,
            limitedSuroPoint: currentLimitedSuroPoint,
            limitedFlagPoint: currentLimitedFlagPoint,
            managerNameArr: currentManagerNameArr,
          },
        }),
      });
      if (res.message === '업데이트 완료') {
        successModal('게시글이 수정되었습니다.', 2000);
        resetPostState();
        route.push(`/find/${handsData?.world_name}/${data._id}`);
        route.refresh();
      }
    } catch (error) {
      errorModal('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };
  useEffect(() => {
    console.log('currentGuildContents:', currentGuildContents); // currentGuildContents 값 확인

    if (currentGuildContents === '제한없음') {
      setPostState({ limitedSuroPoint: 0, limitedFlagPoint: 0 });
      if (limitedFlagPointRef.current) {
        limitedFlagPointRef.current.value = '0';
      }
      if (limitedSuroPointRef.current) {
        limitedSuroPointRef.current.value = '0';
      }
    }
  }, [currentGuildContents]);
  useEffect(() => {
    setPostState({
      title: data.postData.title,
      description: description,
      discordLink: data.postData.discordLink,
      openKakaotalkLink: data.postData.openKakaotalkLink,
      guildType: data.postData.guildType,
      limitedLevel: data.postData.limitedLevel,
      limitedSuroPoint: data.postData.limitedSuroPoint,
      limitedFlagPoint: data.postData.limitedFlagPoint,
      managerNameArr: data.postData.managerNameArr,
    });

    return () => {
      resetPostState();
    };
  }, []);
  useEffect(() => {
    if (editor) {
      editor.on('focus', () => setIsFocused('description'));
      editor.on('blur', () => setIsFocused(''));
    }
  }, [editor]);

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <FaArrowLeft
            size={24}
            onClick={() => {
              route.back();
            }}
          />
          <h2>홍보글 수정</h2>
        </div>
        <div className={classes.headerBtnWrapper}>
          <button onClick={hadleEditPostBtn}>수정하기</button>
        </div>
      </div>

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
        className={`${classes.descriptionContainer}  ${
          isFocused === 'description' ? classes.focused : ''
        }`}
        onClick={() => editor?.commands.focus()}
      >
        <span>내용 (필수 항목)</span>
        <TipTapMenu editor={editor} />
        <EditorContent editor={editor} spellCheck={false} />
      </div>

      <div className={classes.guildTypeContainer}>
        <span>길드 타입 (필수 항목)</span>
        <Select
          optionsArr={guildTypeOption}
          selectName="guildType"
          setState={(value: string) => {
            setPostState({ guildType: value });
          }}
          placeholder="길드타입"
          currentState={currentGuildType}
        />
      </div>
      <div
        className={`${classes.limitedLevelContainer} ${
          isFocused === 'limitedLevel' ? classes.focused : ''
        }`}
        onClick={() => limitedLevelRef.current?.focus()}
      >
        <span>레벨 제한 (선택 사항)</span>
        <input
          type="number"
          max={300}
          defaultValue={limitedLevel}
          ref={limitedLevelRef}
          onChange={(e) => {
            setPostState({ limitedLevel: Number(e.target.value) });
          }}
          onFocus={() => setIsFocused('limitedLevel')}
          onBlur={() => setIsFocused('')}
        />
      </div>
      <div className={classes.guildContentsContainer}>
        <span>길드 컨텐츠</span>
        <div>
          <Radio
            setState={(value: string) => {
              setPostState({ guildContents: value });
            }}
            state={currentGuildContents}
            value="제한없음"
          />
          <Radio
            setState={(value: string) => {
              setPostState({ guildContents: value });
            }}
            state={currentGuildContents}
            value="택1"
          />
          <Radio
            setState={(value: string) => {
              setPostState({ guildContents: value });
            }}
            state={currentGuildContents}
            value="둘다필수"
          />
          {currentGuildContents !== '제한없음' && (
            <>
              <div
                className={`${classes.limitedContainer} ${
                  isFocused === 'limitedSuroPoint' ? classes.focused : ''
                }`}
                onClick={() => limitedSuroPointRef.current?.focus()}
              >
                <div>
                  <span>수로 점수 (선택 사항)</span>
                </div>
                <input
                  type="number"
                  placeholder="최소 점수"
                  ref={limitedSuroPointRef}
                  defaultValue={limitedSuroPoint}
                  onChange={(e) => {
                    setPostState({ limitedSuroPoint: Number(e.target.value) });
                  }}
                  onFocus={() => setIsFocused('limitedSuroPoint')}
                  onBlur={() => setIsFocused('')}
                />
              </div>

              <div
                className={`${classes.limitedContainer} ${
                  isFocused === 'limitedFlagPoint' ? classes.focused : ''
                }`}
                onClick={() => limitedFlagPointRef.current?.focus()}
              >
                <span>플래그 점수 (선택 사항)</span>
                <input
                  type="number"
                  placeholder="최소 점수"
                  max={1000}
                  ref={limitedFlagPointRef}
                  defaultValue={limitedFlagPoint}
                  onChange={(e) => {
                    setPostState({ limitedFlagPoint: Number(e.target.value) });
                  }}
                  onFocus={() => setIsFocused('limitedFlagPoint')}
                  onBlur={() => setIsFocused('')}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className={classes.contactContainer}>
        <div className={classes.contactHeader}>
          <h3>연락 수단</h3>
          <p>연락 수단은 필수가 아니며 매니저에 길드마스터는 기본값입니다.</p>
        </div>
        <div className={classes.contactContent}>
          <div
            className={`${classes.linkContainer} ${
              isFocused === 'discordLink' ? classes.focused : ''
            }`}
            onClick={() => discordLinkRef.current?.focus()}
          >
            <span>디스코드 링크 (선택 사항)</span>
            <input
              type="text"
              placeholder="디스코드 링크를 입력해주세요."
              defaultValue={discordLink}
              ref={discordLinkRef}
              onChange={(e) => {
                setPostState({ discordLink: e.target.value });
              }}
              onFocus={() => setIsFocused('discordLink')}
              onBlur={() => setIsFocused('')}
            />
          </div>
          <div
            className={`${classes.linkContainer} ${
              isFocused === 'openKakaotalkLink' ? classes.focused : ''
            }`}
            onClick={() => openKakaotalkLinkRef.current?.focus()}
          >
            <span>오픈 카카오톡 링크 (선택 사항)</span>
            <input
              type="text"
              placeholder="오픈 카카오톡 링크를 입력해주세요."
              defaultValue={openKakaotalkLink}
              ref={openKakaotalkLinkRef}
              onChange={(e) => {
                setPostState({ openKakaotalkLink: e.target.value });
              }}
              onFocus={() => setIsFocused('openKakaotalkLink')}
              onBlur={() => setIsFocused('')}
            />
          </div>
          <div className={classes.guildManagerContainer}>
            <div className={classes.managerHeader}>
              <span>길드매니저</span>
              <span>{currentManagerNameArr.length} / 4</span>
            </div>
            <div>
              <div className={classes.addInputContainer}>
                <input
                  type="text"
                  ref={managerNameRef}
                  onKeyDown={(e) => {
                    if (e.keyCode === 229) return;
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddManager(e.currentTarget.value);
                    }
                  }}
                />
                <IoIosAdd
                  size={20}
                  onClick={() => {
                    handleAddManager(managerNameRef.current!.value);
                  }}
                />
              </div>
              <ul>
                {currentManagerNameArr.map((name, i) => (
                  <li key={i} className={classes.managerName}>
                    <span>{name}</span>
                    <AiOutlineDelete
                      size={20}
                      onClick={() => {
                        setPostState({
                          managerNameArr: currentManagerNameArr.filter((e) => e !== name),
                        });
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
