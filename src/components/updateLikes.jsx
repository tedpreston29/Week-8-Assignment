"use client";

import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <div>
      <button
        onClick={() => setLikes(likes + 1)}
        className="flex items-center gap-1"
      >
        <span className="material-symbols-outlined">thumb_up</span>
        {likes}
      </button>
    </div>
  );
}
