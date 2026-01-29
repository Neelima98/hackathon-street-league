import UserIconSmall from "../../../../assets/UserIconSmall";
import GridButton from "../../../Reusables/Buttons/GridButton";
import LockIcon from "../../../../assets/LockIcon";
import { memo, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ModalContext } from "../../../Reusables/Modal/ModalContext";
import { AuthContext } from "../../../../context/AuthContext";

const GridItem = memo(({ item }) => {
  const {
    lesson_title,
    lesson_code,
    category_name,
    difficulty_level,
    delivery_method,
    theme_name,
    skill_name,
    session_date,
    start_time,
    duration_minutes,
    max_participants,
    locked,
    // Fallback to old video properties if they exist
    id,
    title,
    guide,
    link,
    level,
    accent,
    topics,
  } = item;

  const [src, setSrc] = useState("");
  const { openModal } = useContext(ModalContext);
  const { isAuthenticated, userInfo } = useContext(AuthContext);
  const { t } = useTranslation("home");

  const navigate = useNavigate();

  // Determine if this is a lesson plan or video
  const isLessonPlan = !!lesson_title;
  const displayTitle = lesson_title || title;
  const displayCategory = category_name || level;
  const displayTheme = theme_name || accent;
  const displaySkill = skill_name || (topics && topics.join(", "));

  const handleClick = () => {
    // Navigate to lesson/post page
    navigate(isLessonPlan ? `/post/${lesson_plan_id || 1}` : "/post/dummy");
  };

  useEffect(() => {
    setSrc('public/lesson.jpg');
  }, []);

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      role="button"
    >
      <div
        className="bg-blue relative"
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
        }}
      >
        {src ? ( // Only render the <img> tag if src is not null
          <img
            className="w-full h-full object-cover"
            src={src}
            alt={`Thumbnail for the video called ${title}`}
          />
        ) : (
          <div className="w-full h-full bg-gray-200" /> // Placeholder while loading
        )}
        {locked && (
          <>
            <div
              className="absolute inset-0 z-20"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            ></div>
            <div className="absolute inset-0 z-30 flex items-center justify-center">
              <LockIcon className="w-16 h-16 text-white" />
            </div>
          </>
        )}
      </div>
      <h1 className="font-fun font-bold text-[18px] line-clamp-2">{displayTitle}</h1>
      
      {isLessonPlan ? (
        <>
          {/* Lesson Plan Info */}
          <div className="flex items-center space-x-1 mt-2">
            <p className="text-secondary font-fun text-xs font-semibold">
              {lesson_code}
            </p>
          </div>
          <div className="space-x-[8px] mt-2">
            {difficulty_level && (
              <GridButton color="green">{difficulty_level}</GridButton>
            )}
            {delivery_method && (
              <GridButton color="blue">{delivery_method}</GridButton>
            )}
            {displayTheme && (
              <GridButton color="purple">{displayTheme}</GridButton>
            )}
          </div>
          <div className="mt-2 text-xs text-gray-600">
            <p>{session_date && `📅 ${session_date}`}</p>
            <p>{start_time && `⏰ ${start_time}`}</p>
            <p>{duration_minutes && `⏱️ ${duration_minutes} mins`}</p>
            <p>{max_participants && `👥 Max: ${max_participants}`}</p>
          </div>
          {skill_name && (
            <div className="mt-2 px-2 py-1 bg-yellow-100 rounded text-xs font-semibold text-yellow-800">
              Skill: {skill_name}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Video Info (Legacy) */}
          <div className="flex items-center space-x-1">
            <UserIconSmall className="align-bottom" />
            <p className="text-secondary font-fun text-sm">
              {guide || "Unknown Creator"}
            </p>
          </div>
          <div className="space-x-[8px] mt-1">
            {level && <GridButton color="green">{level}</GridButton>}
            {accent && <GridButton color="red">{accent}</GridButton>}
            {topics && (
              <GridButton color="yellow">{topics.join(", ")}</GridButton>
            )}
          </div>
        </>
      )}
    </div>
  );
});

export default GridItem;
