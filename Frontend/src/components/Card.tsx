import axios from "axios";
import { ShareIcon } from "../icons/ShareIcon";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BACKEND_URL } from "../config";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
    id: number;
}

export function Card(props: CardProps) {
    console.log(props)


    const { title, link, type, id } = props;
    async function deletecontent() {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/users/content/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });


        console.log(response);
    }
    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-72  border min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        <ShareIcon />
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank">
                            <ShareIcon />
                        </a>
                    </div>
                    <div className="text-gray-500 cursor-pointer" onClick={deletecontent}>
                        <RiDeleteBin6Line />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                {type === "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>}
            </div>

        </div>
    </div>
}