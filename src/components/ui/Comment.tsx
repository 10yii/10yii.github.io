


// comment.tsx
'use client';
import { useEffect, useRef } from "react";

export default function Comment() {
  const commentsEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptEl = document.createElement("script");
    scriptEl.async = true;
    scriptEl.src = "https://utteranc.es/client.js";
    scriptEl.setAttribute("repo", "10yii/10yii.github.io");
    scriptEl.setAttribute("issue-term", "pathname");
    scriptEl.setAttribute("theme", "github-dark");
    scriptEl.setAttribute("label", "💬");
    scriptEl.setAttribute("crossorigin", "anonymous");
    commentsEl.current?.appendChild(scriptEl);
  }, []);

  return (
    <div>
      <div ref={commentsEl} />
    </div>
  );
}