import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import { BACKEND_URL } from "../config"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Wallet } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy } from "lucide-react";
import { useId, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TagInput } from "emblor";
import { useRecoilState, useRecoilValue } from "recoil"
import { ContentState } from "@/atoms/Content"

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter"
}


export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  // const [type, setType] = useState(ContentType.Youtube);
  const [Content, setContent] = useRecoilState(ContentState)
  console.log(Content)


  useEffect(() => {
    refresh();
  }, [modalOpen])

  return <div>
    <Sidebar />
    <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }} />
      <div className="flex justify-end gap-4">
        <Button onClick={() => {
          setModalOpen(true)
        }} variant="primary" text="Add content" startIcon={<PlusIcon />}></Button>
        <Add_Content />
        <div>
          <Component />
        </div>

      </div>

      <div className="flex gap-4 flex-wrap">
        {contents.map(({ _id, title, link, type }) => <Card
          type={type}
          link={link}
          title={title}
          id={_id}

        />)}
      </div>
    </div>
  </div>
}



export function Component() {
  const [link, setLink] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={async () => {
          const response = await axios.post(`${BACKEND_URL}/api/v1/users/content/share`, {
            share: true
          }, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          });
          console.log(response);
          const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
          setLink(shareUrl);
        }} variant="secondary" text="Share brain" startIcon={<ShareIcon />}></Button>
      </DialogTrigger>
      <DialogContent>
        <div className="mb-2 flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Never miss an update</DialogTitle>
            <DialogDescription className="sm:text-center">
              Subscribe to receive news and special offers.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <CopyInput link={link} />
          </div>

        </form>

        <p className="text-center text-xs text-muted-foreground">
          By subscribing you agree to our{" "}
          <a className="underline hover:no-underline" href="#">
            Privacy Policy
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
}





export function CopyInput({ link }: { link: string }) {
  const id = useId();
  const [copied, setCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Copy to clipboard</Label>
      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          className="pe-9"
          type="text"
          value={link}
          readOnly
        />
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleCopy}
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed"
                aria-label={copied ? "Copied" : "Copy to clipboard"}
                disabled={copied}
              >
                <div
                  className={cn(
                    "transition-all",
                    copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
                  )}
                >
                  <Check
                    className="stroke-emerald-500"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>
                <div
                  className={cn(
                    "absolute transition-all",
                    copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
                  )}
                >
                  <Copy size={16} strokeWidth={2} aria-hidden="true" />
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">Copy to clipboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}



export function Add_Content() {
  const [Content, setContent] = useRecoilState(ContentState)
  const id = useId();

  async function addContent(e) {

    e.preventDefault()
    await axios.post(`${BACKEND_URL}/api/v1/users/content`, {
      link: Content.link,
      title: Content.title,
      type: Content.type,
      tags: Content.tags
    }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })


  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" text="Add Content" ></Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <Wallet className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Add Your Content</DialogTitle>
            <DialogDescription className="text-left">
              Your new card will replace your current card.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`name-${id}`}>Title</Label>
              <Input id={`name-${id}`} value={Content.title} onChange={(e) => setContent({ ...Content, title: e.target.value })} type="text" required />
            </div>

            <div className="w-full space-y-2">
              <Label htmlFor={`number-${id}`}>Select the Content Type</Label>
              <Select onValueChange={(value) => setContent({ ...Content, type: value })} value={Content.type}  >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>

                    <SelectLabel>image</SelectLabel>
                    <SelectItem value="image">image</SelectItem>
                    <SelectItem value="video">video</SelectItem>
                    <SelectItem value="article">article</SelectItem>
                    <SelectItem value="audio">audio</SelectItem>
                    {/* <SelectItem value="pineapple">youtube</SelectItem> */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`number-${id}`}>Link</Label>
              <div className="relative">
                <Input
                  id={`number-${id}`}
                  className="peer pe-9 [direction:inherit]"
                  type="text"
                  required
                  value={Content.link}
                  onChange={(e) => setContent({ ...Content, link: e.target.value })}
                />
                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">

                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`expiry-${id}`}>file</Label>
                <Input
                  className="[direction:inherit]"
                  id={`expiry-${id}`}
                  type="file"
                  onChange={(e) => setContent({ ...Content, Contentfile: e.target.files[0] })}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor={`cvc-${id}`}>CVC</Label>
                <Input className="[direction:inherit]" id={`cvc-${id}`} />
              </div>

            </div>
            <div>
              <Tages />
            </div>
          </div>

          <Button onClick={addContent} variant="secondary" text="Save Content" className="w-full">
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}


export function Tages() {
  const tags = [
    {
      id: "1",
      text: "Sport",
    },
    {
      id: "2",
      text: "Coding",
    },
    {
      id: "3",
      text: "Travel",
    },
  ];
  const id = useId();
  const [exampleTags, setExampleTags] = useState(tags);
  const [activeTagIndex, setActiveTagIndex] = useState(null);
  const [Content, setContent] = useRecoilState(ContentState)
  // setContent({ ...Content, tags: exampleTags })

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Add your tags</Label>
      <TagInput
        id={id}
        tags={exampleTags}
        setTags={(newTags) => {
          setExampleTags(newTags); setContent({ ...Content, tags: newTags });
        }}

        placeholder="Add a tag"
        styleClasses={{
          tagList: {
            container: "gap-1",
          },
          input:
            "rounded-lg transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20",
          tag: {
            body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
            closeButton:
              "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
          },
        }}
        activeTagIndex={activeTagIndex}
        activeTagIndex={setActiveTagIndex}
        inlineTags={false}
        inputFieldPosition="top"
      />
      {/* <p className="mt-2 text-xs text-muted-foreground" role="region" aria-live="polite">
        Built with{" "}
        <a
          className="underline hover:text-foreground"
          href="https://github.com/JaleelB/emblor"
          target="_blank"
          rel="noopener nofollow"
        >
          emblor
        </a>
      </p> */}
    </div>
  );
}