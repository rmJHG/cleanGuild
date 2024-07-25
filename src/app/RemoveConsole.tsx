"use client";
import { useEffect } from "react";

export default function RemoveConsole() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.log = function no_console() {}; // 콘솔 로그 비활성화
      console.warn = function no_console() {}; // 콘솔 경고 비활성화
      console.error = function no_console() {}; // 콘솔 에러 비활성화
    }
  });
  return null;
}
