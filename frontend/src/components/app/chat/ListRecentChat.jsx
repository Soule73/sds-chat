import { CONST_RECENTS_CHAT } from "../../../utils/constants/contanst";
import RecentChat from "./RecentChat";

export default function ListRecentChat() {
    return <div>
        {CONST_RECENTS_CHAT.map(
            ({ message, photo, name, time, color }, id) => (
                <RecentChat
                    key={id}
                    message={message}
                    name={name}
                    photo={photo}
                    time={time}
                    color={color} />
            ))}
    </div>
}
