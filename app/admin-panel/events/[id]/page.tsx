'use client'
import {EventInterface} from "@/lib/data";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import getEventById from "@/actions/event/get-by-id";
import {useRouter} from "next/navigation";
import {EditorContent, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

export default function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [event, setEvent] = useState<EventInterface | null>(null);
    //let editorContent = {}
    const editorContent = useRef()
    const id = parseInt(params.id);

    useLayoutEffect(() => {
        if (isNaN(id)) {
            router.push('/admin-panel/events');
            return;
        }

        const fetchEvent = async () => {
            try {
                const data = await getEventById(id);
                if (data) {
                    setEvent(data);
                    editorContent.current = JSON.parse(data.description)

                } else {
                    router.push('/admin-panel/events');
                }
            } catch (error) {
                router.push('/admin-panel/events');
            }
        };

        fetchEvent();
    }, [id, router]);



    const editor = useEditor({
        editable: false,
        extensions: [
            StarterKit,
            Link,
        ],
        content: editorContent.current,
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert p-2 min-h-96 prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc border border-black rounded',
            }
        }
    });

    return (
        <div>
            <h1>Редактировать событие</h1>
            <div className="grid grid-cols-10">
                {editorContent.current && editor?.commands.setContent(editorContent.current)}
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}