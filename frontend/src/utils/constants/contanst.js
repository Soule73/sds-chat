import love from "../../img/emoji/love.gif";
import like from "../../img/emoji/like.gif";
import wow from "../../img/emoji/wow.gif";
import sad from "../../img/emoji/sad.gif";
import angry from "../../img/emoji/angry.gif";
import haha from "../../img/emoji/haha.gif";
import yay from "../../img/emoji/yay.gif";
import avatar from "../../img/avatar/avatar.png";

import {
  BellIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const likeTypeAll = {
  like: { text: "J'aime", color: "text-orange-600", emoji: like },
  love: { text: "J'adore", color: "text-red-400", emoji: love },
  yay: { text: "Yay", color: "text-amber-600", emoji: yay },
  haha: { text: "Haha", color: "text-orange-600", emoji: haha },
  wow: { text: "Waouh", color: "text-orange-600", emoji: wow },
  sad: { text: "Triste", color: "text-orange-600", emoji: sad },
  angry: { text: "En colére", color: "text-red-800", emoji: angry },
};

const SECTION_MENU_ITEM = [
  { id: 1, name: "Discussions", icon: ChatBubbleLeftRightIcon },
  { id: 2, name: "Appels", icon: PhoneIcon },
  { id: 3, name: "Contacts", icon: UserIcon },
  { id: 4, name: "Notifications", icon: BellIcon },
];

const CONST_RECENTS_CHAT = [
  {
    id: 1,
    name: "Ralph L. Alva",
    message: "All the Lorem Ipsum generators",
    time: "15 sec ago",
    photo: avatar,
    color: "green",
  },
  {
    id: 2,
    name: "Ralph L. Alva",
    message: "If you are going to use a passage",
    time: "55 sec ago",
    photo: avatar,
  },
  {
    id: 3,
    name: "John B. Roman",
    message: "The standard chunk of lorem",
    time: "5 min ago",
    photo: avatar,
    color: "green",
  },
  {
    id: 4,
    name: "John B. Roman",
    message: "Many desktop publishing packages",
    time: "21 min ago",
    photo: avatar,
    color: "green",
  },
  {
    id: 5,
    name: "John B. Roman",
    message: "Various versions have evolved over",
    time: "1 hrs ago",
    photo: avatar,
    color: "red",
  },
  {
    id: 6,
    name: "Ralph L. Alva",
    message: "Making this the first true generator",
    time: "5 hrs ago",
    photo: avatar,
    color: "green",
  },
  {
    id: 7,
    name: "David O. Buckley",
    message: "Duis aute irure dolor in reprehenderit",
    time: "5 hrs ago",
    photo: avatar,
    color: "red",
  },
  {
    id: 8,
    name: "Ralph L. Alva",
    message: "The passage is attributed to an unknown",
    time: "5 hrs ago",
    photo: avatar,
    color: "green",
  },
  {
    id: 9,
    name: "John B. Roman",
    message: "The point of using Lorem",
    time: "5 hrs ago",
    photo: avatar,
    color: "green",
  },
  {
    id: 10,
    name: "Pauline I. Bird",
    message: "It was popularised in the 1960s",
    time: "5 hrs ago",
    photo: avatar,
    color: "green",
  },
];

export { likeTypeAll, SECTION_MENU_ITEM, CONST_RECENTS_CHAT };
