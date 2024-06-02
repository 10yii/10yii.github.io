'use client'


import {useCallback, useEffect, useState} from 'react'
import {Progress} from "@/components/ui/progress";

export function ScrollProgress() {

  const [width, setWidth] = useState<number>(0);
  const handleScroll = useCallback((): void => {
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.documentElement;

  if (scrollTop === 0) {
    // 스크롤바가 가장 위에있을때는 0으로 처리
    setWidth(0);
    return;
  }

  const windowHeight: number = scrollHeight - clientHeight;
  // 스크롤바 크기 = (내용 전체의 높이) - (스크롤바를 제외한 클라이언트 높이)

  const currentPercent: number = (scrollTop / windowHeight);
  // 스크롤바 크기 기준으로 scrollTop이 내려온만큼에 따라 계산 (계산시 소수점 둘째자리까지 반환)

  setWidth(currentPercent * 100);
  // 소수점 둘째자리 까지이므로, 100을 곱하여 정수로 만들어줍니다.
  }, []);

  useEffect(() => {
  window.addEventListener('scroll', handleScroll, true);

  return () => {
    window.removeEventListener('scroll', handleScroll, true);
  }
}, [handleScroll]);

  return (
      <Progress value={width} className={"h-1 rounded-none backdrop-blur bg-transparent"}/>

  )
}

export default ScrollProgress
