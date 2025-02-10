import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useImageUpload } from "@/hooks/use-image-upload";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ImagePlus, X } from "lucide-react";
import { useId } from "react";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

// controlled component
export function CreateContentModal({ open, onClose }) {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/users/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        onClose();

    }

    return <div>
        {open && <div>
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">

            </div>
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded fixed">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div>
                            <Input reference={titleRef} placeholder={"Title"} />
                            <Input reference={linkRef} placeholder={"Link"} />
                        </div>
                        <div>
                            <h1>Type</h1>
                            <div className="flex gap-1 justify-center pb-2">
                                <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Youtube)
                                }}></Button>
                                <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Twitter)
                                }}></Button>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={addContent} variant="primary" text="Submit" />
                        </div>
                    </span>
                </div>
            </div>

        </div>}
    </div>

}


export function Add_Content() {
    const id = useId();

    const maxLength = 180;
    const {
        value,
        characterCount,
        handleChange,
        maxLength: limit,
    } = useCharacterLimit({
        maxLength,
        initialValue:
            "Hey, I am Margaret, a web developer who loves turning ideas into amazing websites!",
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit profile</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b border-border px-6 py-4 text-base">
                        Edit profile
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    Make changes to your profile here. You can change your photo and set a username.
                </DialogDescription>
                <div className="overflow-y-auto">
                    <ProfileBg defaultImage="/profile-bg.jpg" />
                    <Avatar defaultImage="/avatar-72-01.jpg" />
                    <div className="px-6 pb-6 pt-4">
                        <form className="space-y-4">
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <div className="flex-1 space-y-2">
                                    <Label htmlFor={`${id}-first-name`}>First name</Label>
                                    <Input
                                        id={`${id}-first-name`}
                                        placeholder="Matt"
                                        defaultValue="Margaret"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <Label htmlFor={`${id}-last-name`}>Last name</Label>
                                    <Input
                                        id={`${id}-last-name`}
                                        placeholder="Welsh"
                                        defaultValue="Villard"
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`${id}-username`}>Username</Label>
                                <div className="relative">
                                    <Input
                                        id={`${id}-username`}
                                        className="peer pe-9"
                                        placeholder="Username"
                                        defaultValue="margaret-villard-69"
                                        type="text"
                                        required
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                        <Check
                                            size={16}
                                            strokeWidth={2}
                                            className="text-emerald-500"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`${id}-website`}>Website</Label>
                                <div className="flex rounded-lg shadow-sm shadow-black/5">
                                    <span className="-z-10 inline-flex items-center rounded-s-lg border border-input bg-background px-3 text-sm text-muted-foreground">
                                        https://
                                    </span>
                                    <Input
                                        id={`${id}-website`}
                                        className="-ms-px rounded-s-none shadow-none"
                                        placeholder="yourwebsite.com"
                                        defaultValue="www.margaret.com"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`${id}-bio`}>Biography</Label>
                                <Textarea
                                    id={`${id}-bio`}
                                    placeholder="Write a few sentences about yourself"
                                    defaultValue={value}
                                    maxLength={maxLength}
                                    onChange={handleChange}
                                    aria-describedby={`${id}-description`}
                                />
                                <p
                                    id={`${id}-description`}
                                    className="mt-2 text-right text-xs text-muted-foreground"
                                    role="status"
                                    aria-live="polite"
                                >
                                    <span className="tabular-nums">{limit - characterCount}</span> characters left
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <DialogFooter className="border-t border-border px-6 py-4">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button">Save changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function ProfileBg({ defaultImage }: { defaultImage?: string }) {
    const [hideDefault, setHideDefault] = useState(false);
    const { previewUrl, fileInputRef, handleThumbnailClick, handleFileChange, handleRemove } =
        useImageUpload();

    const currentImage = previewUrl || (!hideDefault ? defaultImage : null);

    const handleImageRemove = () => {
        handleRemove();
        setHideDefault(true);
    };

    return (
        <div className="h-32">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted">
                {currentImage && (
                    <img
                        className="h-full w-full object-cover"
                        src={currentImage}
                        alt={previewUrl ? "Preview of uploaded image" : "Default profile background"}
                        width={512}
                        height={96}
                    />
                )}
                <div className="absolute inset-0 flex items-center justify-center gap-2">
                    <button
                        type="button"
                        className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                        onClick={handleThumbnailClick}
                        aria-label={currentImage ? "Change image" : "Upload image"}
                    >
                        <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                    {currentImage && (
                        <button
                            type="button"
                            className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                            onClick={handleImageRemove}
                            aria-label="Remove image"
                        >
                            <X size={16} strokeWidth={2} aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                aria-label="Upload image file"
            />
        </div>
    );
}

function Avatar({ defaultImage }: { defaultImage?: string }) {
    const { previewUrl, fileInputRef, handleThumbnailClick, handleFileChange } = useImageUpload();

    const currentImage = previewUrl || defaultImage;

    return (
        <div className="-mt-10 px-6">
            <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10">
                {currentImage && (
                    <img
                        src={currentImage}
                        className="h-full w-full object-cover"
                        width={80}
                        height={80}
                        alt="Profile image"
                    />
                )}
                <button
                    type="button"
                    className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                    onClick={handleThumbnailClick}
                    aria-label="Change profile picture"
                >
                    <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                    aria-label="Upload profile picture"
                />
            </div>
        </div>
    );
}




